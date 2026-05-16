/* ============================================================
   Feyza & Ali — Nişan Davetiyesi
   Yapılandırma + etkileşimler
   ============================================================ */

/* ----- 1) YAPILANDIRMA -----
   Bilgileri buradan kolayca güncelleyebilirsiniz.
*/
const CONFIG = {
    bride: "Feyza",
    groom: "Ali",
    surname: "Ağdemir",
    // Tarih ISO formatında: YYYY-MM-DDTHH:MM:SS (yerel saat)
    eventDate: "2026-05-31T19:00:00",
    eventDateDisplay: "31.05.2026",
    eventTimeDisplay: "19.00",
    venue: {
        name: "Diva Davet Evi",
        address: "Mehmetçik Mah. 7053. Sok. 2/1, 63000 Karaköprü / Şanlıurfa",
        // Google Maps için arama veya koordinat
        query: "Diva Davet Evi, Karaköprü, Şanlıurfa",
    },
    // RSVP yanıtlarının iletileceği WhatsApp numarası (ülke kodu ile, +veya 00 olmadan)
    rsvpWhatsapp: "905332127682",
    // RSVP yanıtlarının iletileceği e-posta (opsiyonel)
    rsvpEmail: "",
};

/* ----- 2) Sayfa geçişi (otomatik smooth scroll, mobil dahil) ----- */
function smoothScrollTo(targetY, duration = 900) {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) return;
    const startTime = performance.now();
    const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        window.scrollTo(0, startY + distance * easeInOutCubic(t));
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function scrollToPage2() {
    const p2 = document.getElementById('page2');
    if (!p2) return;
    const rect = p2.getBoundingClientRect();
    const top = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - 6;
    try {
        smoothScrollTo(top, 900);
    } catch (_) {
        p2.scrollIntoView();
    }
}

/* ----- 3) Zarf açma ----- */
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelopeHint');
let envelopeOpened = false;

function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    envelope.classList.add('opened');
    if (envelopeHint) envelopeHint.style.display = 'none';
    spawnHearts(14);

    // 3 saniye sonra otomatik olarak Sayfa 2'ye akıcı kayış
    setTimeout(scrollToPage2, 3000);
}

envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keypress', e => { if (e.key === 'Enter') openEnvelope(); });
envelope.setAttribute('tabindex', '0');
envelope.setAttribute('role', 'button');
envelope.setAttribute('aria-label', 'Zarfı aç');

/* ----- 4) Müzik (otomatik 15. saniyeden başlar) ----- */
const music = document.getElementById('bgMusic');
const MUSIC_START_AT = 5; // saniye
let musicPlaying = false;
let autoTried = false;

function seekAndPlay() {
    if (!music) return Promise.reject('no audio');
    try {
        if (isFinite(music.duration) && music.duration > MUSIC_START_AT) {
            music.currentTime = MUSIC_START_AT;
        } else {
            const onMeta = () => {
                if (music.duration > MUSIC_START_AT) music.currentTime = MUSIC_START_AT;
                music.removeEventListener('loadedmetadata', onMeta);
            };
            music.addEventListener('loadedmetadata', onMeta);
        }
    } catch (_) { /* ignore */ }
    music.muted = false;
    music.volume = 0.7;
    return music.play();
}

function tryAutoplay() {
    if (autoTried) return;
    autoTried = true;
    seekAndPlay()
        .then(() => { musicPlaying = true; })
        .catch(() => {
            autoTried = false;
            installFirstInteractionListener();
        });
}

function installFirstInteractionListener() {
    const events = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'click'];
    const handler = () => {
        if (musicPlaying) return cleanup();
        seekAndPlay().then(() => {
            musicPlaying = true;
            cleanup();
        }).catch(() => { /* sessizce vazgeç */ });
    };
    function cleanup() {
        events.forEach(ev => window.removeEventListener(ev, handler, { capture: true }));
    }
    events.forEach(ev => window.addEventListener(ev, handler, { capture: true, passive: true }));
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(tryAutoplay, 200);
} else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(tryAutoplay, 200));
}

/* ----- 5) Geri sayım ----- */
const cdDays  = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins  = document.getElementById('cdMins');
const cdSecs  = document.getElementById('cdSecs');

const eventTime = new Date(CONFIG.eventDate).getTime();

function pad(n, w = 2) {
    n = Math.max(0, Math.floor(n));
    return String(n).padStart(w, '0');
}

function tick() {
    const now = Date.now();
    let diff = Math.max(0, eventTime - now);
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    const m = Math.floor(diff / 60000);    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    cdDays.textContent  = String(Math.max(0, Math.floor(d)));
    cdHours.textContent = pad(h);
    cdMins.textContent  = pad(m);
    cdSecs.textContent  = pad(s);
}
tick();
setInterval(tick, 1000);

/* ----- 6) Harita & link ----- */
(function setMap() {
    const q = encodeURIComponent(CONFIG.venue.query || CONFIG.venue.address);
    const iframe = document.getElementById('venueMap');
    const link = document.getElementById('mapLink');
    if (iframe) iframe.src = `https://www.google.com/maps?q=${q}&output=embed`;
    if (link) link.href = `https://www.google.com/maps?q=${q}`;
})();

/* ----- 7) RSVP modal ----- */
const modal = document.getElementById('rsvpModal');
const modalClose = document.getElementById('modalClose');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpTitle = document.getElementById('rsvpModalTitle');
const rsvpSub = document.getElementById('rsvpModalSub');
const rsvpCountLabel = document.getElementById('rsvpCountLabel');
let currentAnswer = 'yes';

document.querySelectorAll('.rsvp-btn[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
        currentAnswer = btn.dataset.answer;
        if (currentAnswer === 'yes') {
            rsvpTitle.textContent = 'Katılıyorum';
            rsvpSub.textContent = 'Sizi aramızda görmek bizi çok mutlu edecek.';
            rsvpCountLabel.style.display = 'block';
        } else {
            rsvpTitle.textContent = 'Katılamıyorum';
            rsvpSub.textContent = 'Düşünceleriniz için teşekkür ederiz.';
            rsvpCountLabel.style.display = 'none';
        }
        openModal();
    });
});

function openModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

rsvpForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const count = document.getElementById('rsvpCount').value || 1;
    const message = document.getElementById('rsvpMessage').value.trim();

    if (!name) return;

    const answerText = currentAnswer === 'yes' ? 'KATILIYORUM' : 'KATILAMIYORUM';

    const lines = [
        `Merhaba Feyza & Ali,`,
        `Nişan davetiyesi yanıtı:`,
        ``,
        `Ad Soyad: ${name}`,
        `Durum: ${answerText}`,
    ];
    if (currentAnswer === 'yes') lines.push(`Kişi Sayısı: ${count}`);
    if (message) lines.push(`Mesaj: ${message}`);

    const text = encodeURIComponent(lines.join('\n'));

    if (CONFIG.rsvpWhatsapp) {
        window.open(`https://wa.me/${CONFIG.rsvpWhatsapp}?text=${text}`, '_blank');
    } else if (CONFIG.rsvpEmail) {
        const subj = encodeURIComponent('Nişan Davet Yanıtı');
        window.location.href = `mailto:${CONFIG.rsvpEmail}?subject=${subj}&body=${text}`;
    } else {
        showToast('Yanıtınız alındı. Teşekkür ederiz!');
    }

    closeModal();
    rsvpForm.reset();
    if (currentAnswer === 'yes') spawnHearts(20);
    showToast(currentAnswer === 'yes'
        ? 'Teşekkür ederiz, sizi bekliyoruz!'
        : 'Geri bildiriminiz için teşekkürler.');
});

/* ----- 8) Toast ----- */
function showToast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
        t = document.createElement('div');
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ----- 9) Kalp yağmuru ----- */
function spawnHearts(count = 12) {
    let container = document.querySelector('.heart-rain');
    if (!container) {
        container = document.createElement('div');
        container.className = 'heart-rain';
        document.body.appendChild(container);
    }
    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.className = 'heart';
        h.textContent = ['♥','❤','♡'][i % 3];
        h.style.left = Math.random() * 100 + 'vw';
        const dur = 3 + Math.random() * 3;
        h.style.animationDuration = dur + 's';
        h.style.animationDelay = (Math.random() * 0.6) + 's';
        h.style.fontSize = (14 + Math.random() * 18) + 'px';
        h.style.color = '#ffffff';
        h.style.textShadow = '0 1px 3px rgba(168,98,104,0.35), 0 0 8px rgba(255,255,255,0.6)';
        container.appendChild(h);
        setTimeout(() => h.remove(), (dur + 1) * 1000);
    }
}

/* ----- 10) Başlık dinamik (config) ----- */
document.title = `${CONFIG.bride} & ${CONFIG.groom} — Nişan Davetiyesi`;

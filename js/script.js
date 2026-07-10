/* ============================================================
   Sinematik Düğün Davetiyesi — JS
   ============================================================ */

const CONFIG = {
    bride: 'Feyza',
    groom: 'Ali',
    surname: 'Ağdemir',
    monogram: 'F&A',
    brandTitle: 'Feyza & Ali',
    eventDate: '2026-10-18T20:00:00',
    eventDateDisplay: '18 Ekim 2026 Pazar',
    eventTimeDisplay: '20.00',
    eventDateFooter: '18 EKİM 2026',
    locationDisplay: 'Şanlıurfa',
    rsvpApi: '/api/rsvp',

    venue: {
        name: 'Beyaz Saray Düğün Salonu',
        address: 'Mehmetçik Mah. 7053. Sok. 2/1, 63000 Karaköprü / Şanlıurfa',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=37.15291837944692,38.813335712511',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!3m2!1str!2str!4v1783706744832!5m2!1str!2str!6m8!1m7!1sgsL2CfeemO7jAhzdlXDrVA!2m2!1d37.15291837944692!2d38.813335712511!3f145.0524785589645!4f-7.335906145883513!5f1.4291491911355907'
    },

    events: [
        {
            icon: 'favorite',
            title: 'Düğün',
            time: '20.00',
            venueName: 'Beyaz Saray Düğün Salonu',
            address: 'Mehmetçik Mah. 7053. Sok. 2/1, 63000 Karaköprü / Şanlıurfa',
            dressCode: null,
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=37.15291837944692,38.813335712511',
            primary: true
        }
    ],

    photos: {
        splash: 'assets/photos/splash.png',
        hero: 'assets/photos/hero.png',
        couple: 'assets/photos/couple.png',
        storyIsteme: 'assets/photos/story-isteme.png',
        storyIstemeCouple: 'assets/photos/story-isteme-couple.png',
        storyNisan1: 'assets/photos/story-nisan-1.png',
        storyNisan2: 'assets/photos/story-nisan-2.png',
        gallery: [
            'assets/photos/gallery-1.png',
            'assets/photos/gallery-2.png',
            'assets/photos/gallery-3.png'
        ]
    }
};

/* ----- DOM refs ----- */
const splash = document.getElementById('splash');
const app = document.getElementById('app');
const openBtn = document.getElementById('openInvite');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const eventCards = document.getElementById('event-cards');
const rsvpForm = document.getElementById('rsvpForm');
const toast = document.getElementById('toast');
const bottomNav = document.getElementById('bottomNav');

/* ----- Init ----- */
document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    renderEvents();
    initSplashParticles();
    initMainParticles();
    initSplashOpen();
    initCountdown();
    initScrollReveal();
    initNavigation();
    initRSVP();
    initGallery();
    initImageFallbacks();
    initVenueMap();
});

function applyConfig() {
    document.title = `${CONFIG.bride} & ${CONFIG.groom} — Düğün Davetiyesi`;

    setText('hero-bride', CONFIG.bride);
    setText('hero-groom', CONFIG.groom);
    setText('hero-date', `${CONFIG.eventDateDisplay} • ${CONFIG.eventTimeDisplay} • ${CONFIG.locationDisplay}`);
    setText('footer-date', CONFIG.eventDateFooter);
    setText('monogram', CONFIG.monogram);
    setText('splash-monogram', CONFIG.monogram);
    setText('footer-monogram', CONFIG.monogram);

    document.querySelectorAll('.header-brand').forEach(el => {
        el.textContent = CONFIG.brandTitle;
    });
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

/* ----- Events cards ----- */
function renderEvents() {
    if (!eventCards) return;
    eventCards.innerHTML = CONFIG.events.map(ev => `
        <article class="event-card reveal">
            <span class="material-symbols-outlined">${ev.icon}</span>
            <h3>${ev.title}</h3>
            <p class="event-time">${ev.time}</p>
            ${ev.venueName ? `<p class="event-venue">${ev.venueName}</p>` : ''}
            <p class="event-address">${ev.address}</p>
            ${ev.dressCode ? `
                <div class="event-dress">
                    <span class="material-symbols-outlined">styler</span>
                    ${ev.dressCode}
                </div>` : ''}
            <a href="${ev.mapUrl}" target="_blank" rel="noopener"
               class="btn-map ${ev.primary ? 'primary' : 'secondary'}">
                Haritada Aç
            </a>
        </article>
    `).join('');
}

function initVenueMap() {
    const iframe = document.getElementById('venue-map-iframe');
    const title = document.getElementById('venue-map-title');
    if (iframe && CONFIG.venue?.mapEmbed) {
        iframe.src = CONFIG.venue.mapEmbed;
        iframe.title = `${CONFIG.venue.name} konumu`;
    }
    if (title && CONFIG.venue?.name) {
        title.textContent = CONFIG.venue.name;
    }
    const address = document.querySelector('.venue-map-address');
    if (address && CONFIG.venue?.address) {
        address.textContent = CONFIG.venue.address;
    }
    const mapLink = document.getElementById('venue-map-link');
    if (mapLink && CONFIG.venue?.mapUrl) {
        mapLink.href = CONFIG.venue.mapUrl;
    }
}

/* ----- Splash open ----- */
function initSplashOpen() {
    openBtn?.addEventListener('click', openInvitation);
    splash?.addEventListener('click', (e) => {
        if (e.target === splash || e.target.classList.contains('splash-bg')) {
            openInvitation();
        }
    });
}

function openInvitation() {
    splash?.classList.add('closing');
    setTimeout(() => {
        splash?.classList.add('hidden');
        app?.classList.remove('hidden');
        document.body.style.overflow = '';
        spawnHearts(16);
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }, 900);
}

/* ----- Countdown ----- */
function initCountdown() {
    tickCountdown();
    setInterval(tickCountdown, 1000);
}

function tickCountdown() {
    const target = new Date(CONFIG.eventDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    setText('cd-days', String(days));
    setText('cd-hours', pad(hours));
    setText('cd-minutes', pad(minutes));
    setText('cd-seconds', pad(seconds));

    const mini = document.getElementById('mini-countdown');
    if (mini) {
        if (diff <= 0) {
            mini.innerHTML = '<span>Bugün o büyük gün!</span>';
        } else {
            mini.innerHTML = `
                <div class="unit"><span>${days}</span><span>GÜN</span></div>
                <span>:</span>
                <div class="unit"><span>${pad(hours)}</span><span>SAAT</span></div>
                <span>:</span>
                <div class="unit"><span>${pad(minutes)}</span><span>DK</span></div>
            `;
        }
    }
}

function pad(n) { return String(n).padStart(2, '0'); }

/* ----- Scroll reveal ----- */
let observer;

function initScrollReveal() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
}

/* ----- Navigation ----- */
function initNavigation() {
    menuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu?.classList.add('hidden'));
    });

    const sections = ['story', 'events', 'countdown', 'rsvp', 'gallery'];
    const navItems = bottomNav?.querySelectorAll('.nav-item') || [];

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navItems.forEach(item => {
                const match = item.getAttribute('data-section') === id ||
                    (id === 'countdown' && item.getAttribute('data-section') === 'rsvp');
                item.classList.toggle('active', match);
            });
        });
    }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });
}

/* ----- Mesaj gönder (sunucuya txt) ----- */
function initRSVP() {
    const attendingEl = document.getElementById('rsvpAttending');
    const guestsGroup = document.getElementById('guestsGroup');
    const submitBtn = document.getElementById('rsvpSubmit');

    function toggleGuests() {
        const show = attendingEl?.value === 'yes';
        if (guestsGroup) guestsGroup.style.display = show ? '' : 'none';
        const guestsInput = document.getElementById('rsvpGuests');
        if (guestsInput) guestsInput.required = show;
    }
    attendingEl?.addEventListener('change', toggleGuests);
    toggleGuests();

    rsvpForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('rsvpName')?.value?.trim() || '';
        const attending = attendingEl?.value;
        const guests = document.getElementById('rsvpGuests')?.value;
        const note = document.getElementById('rsvpNote')?.value?.trim() || '';

        if (!name) {
            showToast('Lütfen adınızı yazın.');
            return;
        }
        if (!attending) {
            showToast('Lütfen katılım durumunuzu seçin.');
            return;
        }

        const payload = { name, attending, note };
        if (attending === 'yes') payload.guests = guests;

        submitBtn?.setAttribute('disabled', 'true');
        const label = submitBtn?.querySelector('.rsvp-btn-label');
        if (label) label.textContent = 'Gönderiliyor…';

        try {
            const res = await fetch(CONFIG.rsvpApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.ok) {
                showToast(data.error || 'Gönderilemedi, tekrar deneyin.');
                return;
            }

            if (attending === 'yes') spawnHearts(20);
            showToast('Mesajınız iletildi, teşekkürler!');
            rsvpForm.reset();
            toggleGuests();
        } catch {
            showToast('Bağlantı hatası, lütfen tekrar deneyin.');
        } finally {
            submitBtn?.removeAttribute('disabled');
            if (label) label.textContent = 'Gönder';
        }
    });
}

function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ----- Gallery expand ----- */
function initGallery() {
    document.getElementById('galleryExpand')?.addEventListener('click', () => {
        const track = document.getElementById('galleryTrack');
        track?.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    });
}

/* ----- Image fallbacks ----- */
function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.classList.add('photo-missing');
            img.alt = '';
        }, { once: true });
    });
}

/* ----- Heart rain (beyaz kalpler) ----- */
function spawnHearts(count = 12) {
    let container = document.querySelector('.heart-rain');
    if (!container) {
        container = document.createElement('div');
        container.className = 'heart-rain';
        container.style.cssText = 'position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:90;';
        document.body.appendChild(container);
    }

    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.textContent = ['♥', '❤', '♡'][i % 3];
        h.style.cssText = `
            position:absolute;top:-10vh;left:${Math.random() * 100}vw;
            font-size:${14 + Math.random() * 18}px;color:#ffffff;
            text-shadow:0 1px 3px rgba(93,64,55,0.35),0 0 10px rgba(255,255,255,0.55);
            animation:heartFall ${3 + Math.random() * 3}s linear forwards;
            animation-delay:${Math.random() * 0.6}s;opacity:0.85;
        `;
        container.appendChild(h);
        setTimeout(() => h.remove(), 7000);
    }

    if (!document.getElementById('heart-fall-style')) {
        const s = document.createElement('style');
        s.id = 'heart-fall-style';
        s.textContent = `@keyframes heartFall{
            0%{transform:translateY(0) rotate(0);opacity:0}
            10%{opacity:1}
            100%{transform:translateY(110vh) rotate(360deg);opacity:0.9}
        }`;
        document.head.appendChild(s);
    }
}

/* ----- Particle systems ----- */
function initSplashParticles() {
    const canvas = document.getElementById('splash-canvas');
    if (!canvas) return;
    runParticles(canvas, 40);
}

function initMainParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    runParticles(canvas, 30);
}

function runParticles(canvas, count) {
    const ctx = canvas.getContext('2d');
    const heartPath = new Path2D('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    const particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(true); }
        reset(initial) {
            this.x = Math.random() * canvas.width;
            this.y = initial ? Math.random() * canvas.height : canvas.height + 50;
            this.type = Math.random() > 0.88 ? 'heart' : 'dust';
            if (this.type === 'heart') {
                this.size = Math.random() * 10 + 5;
                this.speedY = Math.random() * 1 + 0.5;
            } else {
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = Math.random() * 0.5 + 0.1;
            }
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            if (this.y < -50) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            if (this.type === 'dust') {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.translate(this.x, this.y);
                ctx.scale(this.size / 24, this.size / 24);
                ctx.fillStyle = 'rgba(255,255,255,0.75)';
                ctx.fill(heartPath);
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    })();
}

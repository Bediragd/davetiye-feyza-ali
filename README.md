# Feyza & Ali — Dijital Nişan Davetiyesi

Şık, mobil uyumlu, animasyonlu bir dijital nişan davetiyesi sitesi.
Tek bir HTML dosyasıyla çalışır — sunucuya gerek yoktur.

## Özellikler

- Zarf açılma animasyonu (mum mühürlü)
- Üst kısımda müzik aç/kapat butonu (`assets/music.mp3`)
- **Sayfa 1:** Karşılama, monogram, "zarfa tıkla"
- **Sayfa 2:**
  - İsimler, tarih, saat ve davet metni
  - Canlı geri sayım: **Nişanımıza Son** *(Gün : Saat : Dakika : Saniye)*
  - RSVP — **Katılıyorum / Katılamıyorum** *(WhatsApp veya e-posta ile yanıt)*
  - Tören yeri + Google Haritalar gömülü harita ve konum linki
- Kalp animasyonu, duyarlı (responsive) tasarım, telefon ekranları için optimize.

## Hızlı Başlangıç

`index.html` dosyasını çift tıklayarak tarayıcıda açabilirsiniz.

## Bilgileri Güncelleme

Tüm metin/tarih/numara bilgileri tek bir yerden değiştirilir:
`js/script.js` dosyasının üst kısmındaki `CONFIG` nesnesi.

```javascript
const CONFIG = {
    bride: "Feyza",
    groom: "Ali",
    surname: "Ağdemir",
    eventDate: "2026-07-19T19:00:00",     // ISO formatı
    eventDateDisplay: "19.07.2026",
    eventTimeDisplay: "19.00",
    venue: {
        name: "Saray Event Center",
        address: "Bağdat Cd. No: 123, Kadıköy / İstanbul",
        query: "Saray Event Center, İstanbul"
    },
    rsvpWhatsapp: "905555555555",         // WhatsApp numarası (ülke kodu ile)
    rsvpEmail: ""                         // İsteğe bağlı: e-posta
};
```

> Sayfadaki gözle görülen tarih/yer/isim bilgileri `index.html` içinde de geçer.
> Tam tutarlılık için orada da değişiklik yapın *(Ctrl+H ile toplu değiştir)*.

## Müzik Eklemek

İstediğiniz müziği `assets/music.mp3` adıyla projeye atın.
Üstteki "Müziği aç" butonu otomatik olarak çalıştıracaktır.
Tarayıcılar otomatik oynatmaya izin vermediği için kullanıcı butona tıklamalıdır.

## Konumu Değiştirmek

`CONFIG.venue.query` alanına Google Maps üzerinde aratacağınız metni yazın
(örn. `"Saray Event Center, İstanbul"` veya `"41.0082, 28.9784"` koordinatı).
Harita ve "Konumu haritalarda görün" linki bu metne göre otomatik güncellenir.

## Yayınlama (Ücretsiz Seçenekler)

- **Netlify Drop:** Klasörü https://app.netlify.com/drop adresine sürükleyip bırakın.
- **GitHub Pages:** Yeni repo oluşturup dosyaları yükleyin, Settings → Pages.
- **Vercel:** `vercel` CLI ile bir komutta yayın.

Yayınlandıktan sonra elinizdeki link davetlilere paylaşılabilir.

## Dosya Yapısı

```
davetiye/
├── index.html          # Ana sayfa (iki sayfa: karşılama + detaylar)
├── css/styles.css      # Tüm stil ve animasyonlar
├── js/script.js        # CONFIG + tüm etkileşimler
├── assets/             # music.mp3 (opsiyonel) ve görseller
└── README.md
```

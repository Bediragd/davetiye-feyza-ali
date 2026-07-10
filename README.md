# Feyza & Ali — Dijital Düğün Davetiyesi

Sinematik, mobil uyumlu düğün davetiyesi sitesi.

## Özellikler

- Açılış ekranı (Davetiyeyi Aç)
- Hikâye timeline (İsteme, Nişan, Nişan Töreni)
- Düğün programı + Google Harita
- Canlı geri sayım
- WhatsApp ile RSVP
- Fotoğraf galerisi

## Bilgileri güncelleme

`js/script.js` dosyasındaki `CONFIG` nesnesini düzenleyin:

- Tarih: `2026-10-18T20:00:00` (18 Ekim 2026 Pazar, 20.00)
- Mekân: Diva Davet Evi, Karaköprü / Şanlıurfa
- WhatsApp: `905332127682`

## Fotoğraflar

`assets/photos/` klasörü:

| Dosya | Kullanım |
|-------|----------|
| `splash.png` | Açılış ekranı |
| `hero.png` | Hero arka plan |
| `couple.png` | Masaüstü portre |
| `story-isteme.png` | Timeline — İsteme |
| `story-nisan-1.png` | Timeline — Nişan |
| `story-nisan-2.png` | Timeline — Nişan Töreni |
| `gallery-1..3.png` | Galeri |

## Yerel önizleme

```bash
python -m http.server 8080
```

Tarayıcı: http://localhost:8080

## Sunucuya deploy

```bash
git pull
docker compose up -d --build
```

Detaylar: `deploy/DEPLOY.md`

## Dosya yapısı

```
davetiye/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/photos/
├── Dockerfile
├── docker-compose.yml
└── deploy/
```

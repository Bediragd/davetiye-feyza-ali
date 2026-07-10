# Feyza & Ali — Dijital Düğün Davetiyesi

Sinematik, mobil uyumlu düğün davetiyesi sitesi.

## Özellikler

- Açılış ekranı (Davetiyeyi Aç)
- Hikâye timeline (İsteme, Nişan, Nişan Töreni)
- Düğün programı + Google Harita
- Canlı geri sayım
- Mesaj gönder formu (yanıtlar sunucuda `data/rsvp.txt` dosyasına yazılır)
- Fotoğraf galerisi

## Bilgileri güncelleme

`js/script.js` dosyasındaki `CONFIG` nesnesini düzenleyin:

- Tarih: `2026-10-18T20:00:00` (18 Ekim 2026 Pazar, 20.00)
- Mekân: Beyaz Saray Düğün Salonu, Karaköprü / Şanlıurfa

## RSVP / Mesaj yanıtları

Form gönderildiğinde yanıtlar sunucuda şu dosyaya eklenir:

```
/opt/davetiye-feyza-ali/data/rsvp.txt
```

Örnek kayıt:

```
====================================================
Tarih      : 18.10.2026 20:15:32
Ad Soyad   : Ayşe Yılmaz
Katılım    : Evet, katılacağım
Kişi sayısı: 2
Mesaj      : Tebrikler!
```

Görüntülemek için sunucuda:

```bash
cat /opt/davetiye-feyza-ali/data/rsvp.txt
```

## Fotoğraflar

`assets/photos/` klasörü:

| Dosya | Kullanım |
|-------|----------|
| `splash.png` | Açılış ekranı |
| `hero.png` | Hero arka plan |
| `couple.png` | Masaüstü portre |
| `story-isteme.png` | Timeline — İsteme |
| `story-isteme-couple.png` | Timeline — İsteme (çift) |
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

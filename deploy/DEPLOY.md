# Sunucu Kurulum — davetiye-feyza-ali-agdemir.com

Sunucuda host'ta nginx + Docker olduğu varsayılmıştır.

## 1. Repoyu güncelle ve container'ı kaldır

```bash
cd /opt/davetiye-feyza-ali
git pull
docker compose up -d --build
docker ps | grep davetiye
curl -I http://127.0.0.1:8090   # 200 OK görmelisin
```

## 2. Nginx config'ini yerleştir

```bash
sudo cp /opt/davetiye-feyza-ali/deploy/nginx-davetiye.conf \
        /etc/nginx/sites-available/davetiye-feyza-ali
sudo ln -sf /etc/nginx/sites-available/davetiye-feyza-ali \
            /etc/nginx/sites-enabled/davetiye-feyza-ali
sudo nginx -t
sudo systemctl reload nginx
```

> `nginx -t` başarılı olmazsa hatayı oku — büyük ihtimalle port çakışması veya symlink yolu.

## 3. DNS kontrolü

Domain sağlayıcısında **A kaydı** sunucunun IP'sine bakmalı:

```bash
dig +short davetiye-feyza-ali-agdemir.com
dig +short www.davetiye-feyza-ali-agdemir.com
# Her ikisi de sunucunun IP'sini döndürmeli (örn: 31.40.205.92)
```

## 4. SSL (Let's Encrypt)

```bash
# certbot kurulu değilse:
sudo apt update && sudo apt install -y certbot python3-certbot-nginx

# SSL sertifikası al ve nginx config'e otomatik ekle
sudo certbot --nginx \
  -d davetiye-feyza-ali-agdemir.com \
  -d www.davetiye-feyza-ali-agdemir.com \
  --redirect --agree-tos -m senin-mailin@example.com
```

Certbot işini bitirdiğinde nginx config'inde otomatik olarak HTTPS bloğu ve HTTP→HTTPS redirect eklenmiş olacak. Site **https://davetiye-feyza-ali-agdemir.com** adresinde yayında.

## 5. Güncelleme akışı (gelecekte)

İlk kurulumdan sonra her güncellemede sunucuda sadece şunu çalıştır:

```bash
cd /opt/davetiye-feyza-ali
git pull
docker compose up -d --build
```

Nginx ve SSL tarafına dokunmaya gerek yok.

## Sorun giderme

- **Container ayakta mı?** `docker logs davetiye-feyza-ali`
- **Nginx config sözdizimi:** `sudo nginx -t`
- **Nginx hata logu:** `sudo tail -f /var/log/nginx/davetiye-error.log`
- **Port çakışması:** `sudo ss -tlnp | grep 8090` — başka bir şey kullanıyorsa, hem `docker-compose.yml`'deki `8090` hem `nginx-davetiye.conf`'taki `proxy_pass` portunu değiştir.
- **SSL yenileme:** certbot otomatik yeniler. Manuel test: `sudo certbot renew --dry-run`

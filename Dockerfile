# Çok küçük, statik dosya sunan nginx imajı
FROM nginx:1.27-alpine

# Varsayılan nginx config'i temizle
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Özel nginx config (gzip + cache + SPA-friendly)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Statik dosyaları kopyala
COPY index.html /usr/share/nginx/html/
COPY css/      /usr/share/nginx/html/css/
COPY js/       /usr/share/nginx/html/js/
# assets/ klasörü boş olabilir — yine de var olmasını garantile
RUN mkdir -p /usr/share/nginx/html/assets/photos
COPY assets/   /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]

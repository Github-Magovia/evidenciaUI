FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/evidencia-ui/ /usr/share/nginx/html/

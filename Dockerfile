FROM golang:alpine AS builder

COPY html /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "deamon off;"]

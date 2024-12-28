FROM node:22-slim as builder
LABEL authors="w3ll1ngt"

WORKDIR /app

COPY webapp/package.json .

RUN npm install

COPY webapp .

RUN npm run build

FROM python:3.9-slim as app

WORKDIR /app

RUN apt -y update && apt -y install --no-install-recommends nginx  \
    && rm -rf /var/lib/apt/lists/*  \
    && rm /etc/nginx/conf.d/default.conf /etc/nginx/sites-enabled/default || true

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

VOLUME ["/app/data"]

ENV PYTHONUNBUFFERED=1

EXPOSE 3000
EXPOSE 80

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]

FROM node:22-slim as builder
LABEL authors="w3ll1ngt"

WORKDIR /app

COPY webapp/package.json .

RUN npm install

COPY webapp .

RUN npm run build

FROM python:3.9-slim as app

WORKDIR /app

COPY --from=builder /app/dist dist

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY backend .

VOLUME ["/app/data"]

ENV PYTHONUNBUFFERED=1

EXPOSE 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]

#!/bin/sh

nginx -g 'daemon off;' &

uvicorn main:app --host 0.0.0.0 --port 3000

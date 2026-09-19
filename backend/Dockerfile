# Stage 1: Build stage
FROM python:3.11-slim AS builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt


# Stage 2: Hardened Runtime
FROM python:3.11-slim

# Sicherheitsupdates für Debian einspielen (behebt OS-CVEs wie bsdutils / util-linux)
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Non-Root-User einrichten
RUN groupadd -r appgroup && useradd -r -g appgroup -s /sbin/nologin appuser

# Nur installierte Pakete und Anwendungscode übernehmen
COPY --from=builder /install /usr/local
COPY . /app

# Rechte vergeben und Benutzer wechseln
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]
#!/bin/bash
# VPS Setup Script for Sports Recommendation System
# Run as root on Ubuntu VPS: bash setup.sh
set -e

echo "=========================================="
echo " Sports Recommendation — VPS Setup"
echo "=========================================="

# 1. Stop and remove existing services on ports 80/443/8000
echo "[1/8] Cleaning existing services..."
systemctl stop nginx 2>/dev/null || true
systemctl stop sports-rec 2>/dev/null || true
# Kill anything on key ports
fuser -k 80/tcp 2>/dev/null || true
fuser -k 443/tcp 2>/dev/null || true
fuser -k 8000/tcp 2>/dev/null || true

# 2. Install system dependencies
echo "[2/8] Installing system packages..."
apt update -qq
apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx

# 3. Create app directory
echo "[3/8] Setting up /opt/sports-rec..."
mkdir -p /opt/sports-rec

# 4. Python virtual environment
echo "[4/8] Creating Python venv..."
cd /opt/sports-rec
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip -q
pip install -r /opt/sports-rec/app/backend/requirements.txt -q
echo "  Python deps installed."

# 5. Install systemd service
echo "[5/8] Installing systemd service..."
cp /opt/sports-rec/app/deploy/sports-rec.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable sports-rec
systemctl start sports-rec
echo "  FastAPI service started."

# 6. Install nginx config
echo "[6/8] Configuring Nginx..."
rm -f /etc/nginx/sites-enabled/default
cp /opt/sports-rec/app/deploy/nginx-sports-rec.conf /etc/nginx/sites-available/sports-rec
ln -sf /etc/nginx/sites-available/sports-rec /etc/nginx/sites-enabled/sports-rec
nginx -t
systemctl restart nginx
echo "  Nginx configured and running."

# 7. SSL via Let's Encrypt
echo "[7/8] Setting up SSL (Let's Encrypt)..."
echo "  Make sure sports.gmora.dev DNS A record points to this server!"
certbot --nginx -d sports.gmora.dev --non-interactive --agree-tos --email kusalp.23@cse.mrt.ac.lk --redirect || {
    echo "  WARNING: Certbot failed. DNS may not have propagated yet."
    echo "  Run manually later: certbot --nginx -d sports.gmora.dev"
}

# 8. Verify
echo "[8/8] Verifying..."
systemctl status sports-rec --no-pager -l
curl -s http://127.0.0.1:8000/api/health | python3 -m json.tool

echo ""
echo "=========================================="
echo " DONE! App should be live at:"
echo " https://sports.gmora.dev"
echo "=========================================="

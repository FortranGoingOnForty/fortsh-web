#!/usr/bin/env bash
#
# Deploy fortsh-web to production (Node.js server mode)
# Run this script on the server hosting the site
#
# Usage: ./scripts/deploy.sh
#

set -euo pipefail

DOMAIN="fortsh.musicsian.com"
STAMP=$(date +%Y-%m-%d-%H%M%S)
RELEASES_DIR="/var/www/$DOMAIN/releases"
RELEASE_DIR="$RELEASES_DIR/$STAMP"
APP_NAME="fortsh-web"
USER=$(whoami)

echo "=== fortsh-web deployment ==="
echo "Timestamp: $STAMP"

# Install dependencies
echo ""
echo "▶ npm ci"
npm ci

# Build the project
echo ""
echo "▶ npm run build"
npm run build

# Create release directory with correct ownership
echo ""
echo "▶ Creating release $STAMP"
sudo mkdir -p "$RELEASE_DIR"
sudo chown "$USER:$USER" "$RELEASE_DIR"

# Copy necessary files for Node.js server
echo ""
echo "▶ Copying build artifacts"
cp -r .next "$RELEASE_DIR/"
cp -r public "$RELEASE_DIR/"
cp package.json "$RELEASE_DIR/"
cp package-lock.json "$RELEASE_DIR/"
cp next.config.mjs "$RELEASE_DIR/"

# Copy data directory if exists (for stats.json)
if [ -d "data" ]; then
    cp -r data "$RELEASE_DIR/"
fi

# Install production dependencies in release directory
echo ""
echo "▶ Installing production dependencies"
cd "$RELEASE_DIR"
npm ci --omit=dev

# Update symlink
echo ""
echo "▶ Flipping symlink"
sudo ln -nfs "$RELEASE_DIR" "/var/www/$DOMAIN/current"

# Restart the application with pm2
echo ""
echo "▶ Restarting application"
cd "/var/www/$DOMAIN/current"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    pm2 restart "$APP_NAME"
else
    pm2 start npm --name "$APP_NAME" -- start
fi
pm2 save

# Reload nginx
echo ""
echo "▶ Reloading nginx"
sudo systemctl reload nginx

# Clean up old releases (keep last 5)
echo ""
echo "▶ Cleaning up old releases"
cd "$RELEASES_DIR" && ls -1t | tail -n +6 | xargs -r sudo rm -rf

echo ""
echo "✓ Deployed $STAMP"
echo "  Site: https://$DOMAIN"

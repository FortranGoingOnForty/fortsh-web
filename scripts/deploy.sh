#!/bin/bash
#
# Deploy fortsh-web to production
# Usage: ./scripts/deploy.sh
#

set -e

# Configuration
REMOTE_HOST="fortsh.musicsian.com"
REMOTE_USER="deploy"
REMOTE_PATH="/var/www/fortsh.musicsian.com"
RELEASES_DIR="$REMOTE_PATH/releases"
CURRENT_LINK="$REMOTE_PATH/current"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "=== fortsh-web deployment ==="
echo "Timestamp: $TIMESTAMP"

# Build the project
echo ""
echo "Building..."
npm run build

# Create release directory on remote
echo ""
echo "Creating release directory..."
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $RELEASES_DIR/$TIMESTAMP"

# Sync files
echo ""
echo "Syncing files..."
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.next/cache' \
    --exclude '*.md' \
    --exclude 'scripts' \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.ts \
    "$REMOTE_USER@$REMOTE_HOST:$RELEASES_DIR/$TIMESTAMP/"

# Install production dependencies on remote
echo ""
echo "Installing dependencies..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $RELEASES_DIR/$TIMESTAMP && npm ci --production"

# Update symlink
echo ""
echo "Updating symlink..."
ssh "$REMOTE_USER@$REMOTE_HOST" "ln -sfn $RELEASES_DIR/$TIMESTAMP $CURRENT_LINK"

# Restart the application
echo ""
echo "Restarting application..."
ssh "$REMOTE_USER@$REMOTE_HOST" "sudo systemctl restart fortsh-web || pm2 restart fortsh-web 2>/dev/null || true"

# Clean up old releases (keep last 5)
echo ""
echo "Cleaning up old releases..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $RELEASES_DIR && ls -1t | tail -n +6 | xargs -r rm -rf"

# Verify deployment
echo ""
echo "Verifying..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$REMOTE_HOST")
if [ "$HTTP_CODE" = "200" ]; then
    echo "Deployment successful! Site is live at https://$REMOTE_HOST"
else
    echo "Warning: Site returned HTTP $HTTP_CODE"
fi

echo ""
echo "=== Deployment complete ==="

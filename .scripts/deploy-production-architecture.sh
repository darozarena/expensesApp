#!/bin/bash

set -eu

HEROKU_ENVIRONMENT=expenses-app-production

echo "🏗  Building architecture..."
echo "building dockers 🐳"
docker build -t zzm-backend-server --build-arg NPM_TOKEN="${NPM_TOKEN}" -f Dockerfile.web .
docker build -t zzm-backend-release --build-arg NPM_TOKEN="${NPM_TOKEN}" -f Dockerfile.release .

echo "Login to Heroku Container registry"
heroku container:login

echo "Heroku containers push 👆📦"
heroku container:push --recursive --arg NPM_TOKEN="${NPM_TOKEN}" -a $HEROKU_ENVIRONMENT

echo "Release images"
heroku container:release web worker release -a $HEROKU_ENVIRONMENT

echo "Done ✅"

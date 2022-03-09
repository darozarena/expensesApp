#!/bin/bash

set -eu

HEROKU_ENVIRONMENT=expenses-app-pmp

echo "🏗  Building architecture..."
echo "building dockers 🐳"
docker build -t backend-server --build-arg NPM_TOKEN="${NPM_TOKEN}" -f Dockerfile.app .

echo "Login to Heroku Container registry"
heroku container:login

echo "Heroku containers push 👆📦"
heroku container:push --recursive --arg NPM_TOKEN="${NPM_TOKEN}" -a $HEROKU_ENVIRONMENT

echo "Release images"
heroku container:release app -a $HEROKU_ENVIRONMENT

echo "Done ✅"

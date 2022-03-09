#!/bin/bash

set -eu

HEROKU_ENVIRONMENT=expenses-app-pmp

echo "🏗  Building architecture..."
echo "building dockers 🐳"
docker build -t backend-server --build-arg NPM_TOKEN="${NPM_TOKEN}" -f Dockerfile.web .
docker build -t backend-release --build-arg NPM_TOKEN="${NPM_TOKEN}" -f Dockerfile.release .

echo "Login to Heroku Container registry"
heroku container:login

echo "Heroku containers push 👆📦"
heroku container:push --recursive --arg NPM_TOKEN="${NPM_TOKEN}" -a $HEROKU_ENVIRONMENT

echo "Release images"
heroku container:release web release -a $HEROKU_ENVIRONMENT

echo "Done ✅"

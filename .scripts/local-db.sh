#!/usr/bin/env bash

set -eu

mkdir -p .cache/DB
docker run -d -p 27018:27017 -v "${PWD}"/.cache/DB/data:/data/db mongo:4.4.6

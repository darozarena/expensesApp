#!/bin/bash

set -eu

npm i

node .scripts/check_node_version.js

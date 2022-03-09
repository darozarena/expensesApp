#!/bin/bash

set -e

call() {
  node --unhandled-rejections=strict $@
}

if [ "$1" == 'down' ]; then
  echo "🧹 Cleaning migrations..."
  call node_modules/.bin/migrate-mongo down
elif [ "$1" == 'new' ]; then
  echo "Enter the migration name or description: "
  read -r migration_name
  call node_modules/.bin/migrate-mongo create "$migration_name"
elif [ "$1" == 'status' ]; then
  call node_modules/.bin/migrate-mongo status
else
  echo "💽 Doing migrations..."
  call node_modules/.bin/migrate-mongo up
fi

echo "Done ✅"

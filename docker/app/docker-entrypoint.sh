#!/bin/sh
set -e

npm install --force --legacy-peer-deps;
npm run build;

exec docker-entrypoint.sh "$@"

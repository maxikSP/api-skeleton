#!/bin/sh
set -e

npm install --force --legacy-peer-deps;
npm run build;
npm run db:migration:run;

exec docker-entrypoint.sh "$@"

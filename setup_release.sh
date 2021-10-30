#!/bin/sh

rm -rf dist

npm run build

cp package.dist.json dist/package.json
cp README.md dist/README.md

echo "All set to release"
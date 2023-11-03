#! /usr/bin/env bash

bun run build
rm -fr /usr/share/nginx/upload-it-build
cp -r ./dist /usr/share/nginx/upload-it-build
systemctl restart nginx
nginx -t

echo "Builds were replaced"

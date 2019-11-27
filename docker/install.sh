#!/bin/bash
set -e
set -u
apt-get update -y &&
#apt upgrade -y &&
echo 'Basic installations completed' &&
#apt-get install build-essential -y &&
#echo 'Build-essential completed' &&
#rm package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp &&
#echo 'Removed files' &&
npm install
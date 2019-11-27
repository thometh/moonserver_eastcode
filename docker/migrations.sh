#!/usr/bin/env bash
set -e
echo 'Running cert-gen' &&
bash bin/cert-gen.sh &&
echo 'Running migration file' &&
node bin/lamassu-migrate
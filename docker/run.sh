#!/usr/bin/env bash
set -e
echo 'Running migrations'
migrations.sh
echo 'Running defaults' &&
node bin/lamassu-apply-defaults &&
echo 'Running registration' 
node bin/lamassu-register admin &&
echo 'Basic installations run'

node bin/lamassu-admin-server --dev &
node bin/lamassu-server --mockSms


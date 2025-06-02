#!/bin/bash
source .env.public
: "${PUB_KEY:?PUB_KEY is not set in .env.public}"
set -euv
node scripts/encrypt.js encrypt $PUB_KEY "${*:?missing msg}"

#!/bin/bash -x
source .env || exit 1
set -eu
npx hardhat compile || exit 1
npx hardhat run scripts/deploy.js --network moonbase

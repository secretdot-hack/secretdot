#!/bin/bash
set -euv
source .env || true

# Check if we are in local test mode
if [[ "${RPC_URL:-}" == "http://localhost:8545" ]]; then
    NETWORK="anvil"
else
    NETWORK="moonbase"
fi

# Compile contracts
npx hardhat compile

# Deploy contract
npx hardhat run scripts/deploy.js --network $NETWORK

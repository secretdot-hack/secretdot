#!/bin/bash
set -euo pipefail

# Start anvil in the background with deterministic accounts
echo "Starting Anvil..."
anvil --block-time 1 > anvil.log 2>&1 &
ANVIL_PID=$!

# Ensure we kill anvil on script exit
trap "kill $ANVIL_PID" EXIT

# Wait a bit for anvil to start
sleep 2

# Setup environment for local testing
export NETWORK=anvil
export PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export RPC_URL=http://localhost:8545

# Test contract deployment
echo -e "
Deploying contract to local Anvil..."
make deploy NETWORK=$NETWORK RPC_URL=$RPC_URL PRIVATE_KEY=$PRIVATE_KEY

# Get deployed contract address and export it
export CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
echo "Contract deployed at: $CONTRACT_ADDRESS"

echo "Testing against network: ${RPC_URL}"
echo "Using contract: ${CONTRACT_ADDRESS}"
echo "Using wallet: $(cast wallet address --private-key ${PRIVATE_KEY})"

# Common make arguments
MAKE_ARGS="NETWORK=$NETWORK RPC_URL=$RPC_URL PRIVATE_KEY=$PRIVATE_KEY CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
source test-common.sh
# Run the test suite
test_suite

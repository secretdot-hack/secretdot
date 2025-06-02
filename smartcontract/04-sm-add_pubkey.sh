#!/bin/bash
command -v cast >/dev/null 2>&1 || {
    echo "cast is not installed; install with 'brew install foundry'" >&2
    exit 1
}
source .env || exit 1
: ${PRIVATE_KEY:?required PRIVATE_KEY environment variable is not set}
source .env.public || exit 1
: ${CONTRACT_ADDRESS:?required CONTRACT_ADDRESS environment variable is not set}
: ${PUB_KEY:?required PUB_KEY environment variable is not set}
: ${WALLET_ADDRESS:?required PUB_KEY environment variable is not set}

set -euv
cast send ${CONTRACT_ADDRESS:?} "RegisterUserPubKey(string)" "${PUB_KEY:?}" --rpc-url "${RPC_URL}" --private-key ${PRIVATE_KEY}

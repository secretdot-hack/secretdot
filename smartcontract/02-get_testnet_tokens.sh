#!/bin/bash
source .env.public || exit 1
echo Visit https://apps.moonbeam.network/moonbase-alpha/faucet/ and load tokens to the Metamask address: ${WALLET_ADDRESS:?}

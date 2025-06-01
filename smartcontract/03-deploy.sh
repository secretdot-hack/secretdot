source .env || exit 1
npx hardhat run scripts/deploy.js --network moonbase

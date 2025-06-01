// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying SecretDot contract...");

  // Get the contract factory
  const SecretDot = await hre.ethers.getContractFactory("SecretDot");
  
  // Deploy the contract
  const secretDot = await SecretDot.deploy();
  
  // Wait for deployment to finish
  await secretDot.deployed();

  console.log("SecretDot deployed to:", secretDot.address);
  console.log("Transaction hash:", secretDot.deployTransaction.hash);
  
  // Verify deployment
  console.log("Deployment successful!");
  console.log("Contract address:", secretDot.address);
  console.log("Network:", hre.network.name);
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

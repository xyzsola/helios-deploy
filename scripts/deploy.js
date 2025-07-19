const hre = require("hardhat");
  
async  function  deployContract() {
	const [deployer] = await hre.ethers.getSigners();

	const CounterContract = await hre.ethers.getContractFactory("CounterContract");
	const contract = await CounterContract.deploy();
	await contract.waitForDeployment();

	const contractAddress = await contract.getAddress();
	const explorerURL = `https://explorer.helioschainlabs.org/address/${contractAddress}`;

	console.log("✅ Contract deployed!");
	console.log("📍 Address:", contractAddress);
	console.log("🔗 Explorer:", explorerURL);
}

deployContract().catch(err => {
	console.error("❌ Deployment error:", err);
	process.exit(1);
});

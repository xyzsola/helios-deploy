const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
  
async  function  deployContract() {
	const [deployer] = await hre.ethers.getSigners();

	const AutoReporter = await hre.ethers.getContractFactory("AutoReporter");
	const contract = await AutoReporter.deploy();
	await contract.waitForDeployment();

	const contractAddress = await contract.getAddress();
	const explorerURL = `https://explorer.helioschainlabs.org/address/${contractAddress}`;

	const now = new Date();
	const logEntry = {
	    message: `Contract deployed!`,
	    address: contractAddress,
	    timestamp: now.toISOString(),
	};

	const logPath = path.join(__dirname, "../deploy-log.json");
	let logs = [];
	if (fs.existsSync(logPath)) {
	   logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
	}
	logs.push(logEntry);
	fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

	console.log("✅ Contract deployed!");
	console.log("📍 Address:", contractAddress);
	console.log("🔗 Explorer:", explorerURL);
}

deployContract().catch(err => {
	console.error("❌ Deployment error:", err);
	process.exit(1);
});

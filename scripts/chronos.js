const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const cronABI = require("../abi/chronos.json"); 
const targetABI = require("../artifacts/contracts/AutoReporter.sol/AutoReporter.json");
const logPath = path.join(__dirname, "../deploy-log.json");


dotenv.config();

async function deploy() {
  if (!fs.existsSync(logPath)) {
    console.error("❌ Deploy contract first before deploy Chronos!");
    return;
  }

  const [deployer] = await hre.ethers.getSigners();

  // Helios Chronos precompile
  const cronAddress = "0x0000000000000000000000000000000000000830"; 
  
  const cronContract = new hre.ethers.Contract(cronAddress, cronABI.abi, deployer);

  const logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
  const last = logs[logs.length - 1];

  if (!last) {
    console.error("❌ Contract address not found. Deploy contract first!");
    return;
  }

  // ambil contract address terakhir
  const contractAddress = last.address;

  const tx = await cronContract.createCron(
    contractAddress,
    JSON.stringify(targetABI.abi),
    "takeSnapshot", // fungsi yang mau dipanggil
    [],          // argumen jika ada
    300,          // frequency: setiap 60 block (sekitar 3 menit)
    0,           // no expiration
    400_000,     // gas limit
    hre.ethers.parseUnits("2", "gwei"), // maxGasPrice
    hre.ethers.parseEther("0.05") // deposit 0.05 HLS
  );

  await tx.wait();
  console.log("Scheduled task created, transaction hash:", tx.hash);
}

deploy().catch(err => {
  console.error("❌ Deployment error:", err);
  process.exit(1);
});

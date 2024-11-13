const { ethers } = require("hardhat");

async function main() {
  // 获取部署的合约地址
  const cmcAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const polyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const polyProxyAddress = "0x9fE46736679d2D9a65F0992f2272dE9f3c7fa6e0";

  // 获取Signer
  const [signer] = await ethers.getSigners();

  // 获取CMC合约实例
  // 例如，调用CMC合约的方法
  const createOrder = await CMC.totalSupply();
  console.log("CMC Total Supply:", initialSupply.toString());

  // 调用Poly合约的方法
  const casinoChipsAddress = await Poly.casinoChips();
  console.log("Casino Chips Address:", casinoChipsAddress);

  // 与PolyProxy交互（假设你要设置新的目标合约地址）
  const newTargetAddress = "0xNewTargetContractAddress";
  await PolyProxy.setTarget(newTargetAddress);
  console.log("Target set to:", newTargetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

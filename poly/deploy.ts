import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
//
// Deploying contracts with the account: 0x243749Bf42346bB9A122034E81281819AA2CFbb6
// cmc deployed to: 0x245711CD1997126c61D46c2Cd1C71dE93DC07b3E
// ProxyAdmin deployed to: 0xe8e6179DA85d87f26078D4d8A6E9bf2f837Ab444
// Proxy deployed to: 0xcdc5D5e5CC91a47b644D0749C49e029dD8C6562B
// cmcV2 deployed to: 0x24d65574f2b173BE07Ef04DF5B02519207989Dc6
async function main() {
  const [deployer, addr1, addr2] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. 部署代币合约
  const CMC = await ethers.getContractFactory("CMC");
  const cmc = await CMC.deploy(deployer, 0);
  await cmc.waitForDeployment();
  console.log("cmc deployed to:", cmc.target);
  const cmcAbi = cmc.interface

  // 2. 部署逻辑合约
  const Poly = await ethers.getContractFactory("Poly");
  const poly = await Poly.deploy();
  await poly.waitForDeployment();
  console.log("poly deployed to:", poly.target);
  const polyAbi = poly.interface

  // 3. 部署 Proxy 合约
  const ProxyAdmin = await ethers.getContractFactory("PolyProxy");
  const proxy = await ProxyAdmin.deploy();
  await proxy.waitForDeployment();
  console.log("ProxyAdmin deployed to:", proxy.target);

  const settx = await proxy.setTarget(poly.target);
  await settx.wait(); // 等待交易确认
  console.log(`Set implementation address to `, poly.target);

  //铸造及授权
  const mintTx1 = await cmc.mint(addr1.address, 100000);
  await mintTx1.wait();
  console.log(`Minted 100000 tokens to ${addr1.address}`);

  const mintTx2 = await cmc.mint(addr2.address, 100000);
  await mintTx2.wait();
  console.log(`Minted 100000 tokens to ${addr2.address}`);

  // addr1 授权 Poly 合约使用其代币
  const approveTx = await cmc.connect(addr1).approve(proxy.getAddress(), 5000000000);
  await approveTx.wait();
  console.log(`Approved Poly contract to spend 50000 tokens of ${addr1.address}`);
  // addr2 授权 Poly 合约使用其代币
  const approveTx2 = await cmc.connect(addr2).approve(proxy.getAddress(), 5000000000);
  await approveTx.wait();
  console.log(`Approved Poly contract to spend 50000 tokens of ${addr1.address}`);
  // 调用 getImplementation 方法
  // const implementationAddress = await proxy.target;
  // console.log(`Current implementation address:`,implementationAddress);

  const initialOwner = deployer.address; // 替换为实际地址

  // 创建 Interface 实例，编码函数调用数据
  // 通过代理初始化poly合约
  const initdata = polyAbi.encodeFunctionData("initialize", [initialOwner, cmc.target, initialOwner]);

  try {
    const tx = await deployer.sendTransaction({
      to: proxy.getAddress(),
      data: initdata
    });
    const receipt = await tx.wait(); // 等待交易确认
    // @ts-ignore
    if (receipt.status === 1) {
      console.log("Transaction successful");
    } else {
      console.error("Transaction failed");
    }
  } catch (err) {
    console.error("Error during transaction:", err);
  }

  const condition1 = "this is a test"
  //创建赌桌 -- prepareConditionTx
  const prepareConditondata = polyAbi.encodeFunctionData("prepareCondition", [condition1, 3]);
  try {
    const tx = await deployer.sendTransaction({
      to: proxy.getAddress(),
      data: prepareConditondata
    });
    const receipt = await tx.wait(); // 等待交易确认
    // @ts-ignore
    if (receipt.status === 1) {
      console.log("prepareConditionTx Transaction successful");
    } else {
      console.error("prepareConditionTx Transaction failed");
    }
  } catch (err) {
    console.error("Error during prepareConditionTx transaction:", err);
  }

  //给每个赌注添加下注地址
  const placeOrderdata = polyAbi.encodeFunctionData("placeOrder", [condition1, 1, 1000]);
  try {
    const tx = await addr1.sendTransaction({
      to: proxy.getAddress(),
      data: placeOrderdata
    });
    const receipt = await tx.wait(); // 等待交易确认
    // @ts-ignore
    if (receipt.status === 1) {
      console.log("placeOrderdata Transaction successful");
    } else {
      console.error("placeOrderdata Transaction failed");
    }
  } catch (err) {
    console.error("Error during addKYCAddress transaction:", err);
  }
  //下单
  const addKYCAddress = polyAbi.encodeFunctionData("addKYCAddress", [condition1, [deployer.address, addr1.address, addr2.address]]);
  try {
    const tx = await deployer.sendTransaction({
      to: proxy.getAddress(),
      data: addKYCAddress
    });
    const receipt = await tx.wait(); // 等待交易确认
    // @ts-ignore
    if (receipt.status === 1) {
      console.log("addKYCAddress Transaction successful");
    } else {
      console.error("addKYCAddress Transaction failed");
    }
  } catch (err) {
    console.error("Error during addKYCAddress transaction:", err);
  }

  const reportPayouts = polyAbi.encodeFunctionData("reportPayouts", [condition1,addr1.address]);
  try {
    const tx = await deployer.sendTransaction({
      to: proxy.getAddress(),
      data: reportPayouts
    });
    const receipt = await tx.wait(); // 等待交易确认
    // @ts-ignore
    if (receipt.status === 1) {
      console.log("addKYCAddress Transaction successful");
    } else {
      console.error("addKYCAddress Transaction failed");
    }
  } catch (err) {
    console.error("Error during addKYCAddress transaction:", err);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

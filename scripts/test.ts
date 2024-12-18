import hre from "hardhat";
import { ethers } from "hardhat";
import { Addressable, N } from "ethers";
import { task } from "hardhat/config";


async function main() {

  const [deployer, addr1, addr2] = await ethers.getSigners();
  const CDC = await ethers.getContractFactory("CDC");
  const PCC = await ethers.getContractFactory("PCC");
  const CCT = await ethers.getContractFactory("CCT");

  const CDCAbi = CDC.interface
  const PCCAbi = PCC.interface
  const CCTAbi = CCT.interface
  const CDCProxy = "0x721de43FE40631a65Eb16d3635E67bdd17D0641d"
  const PCCProxy = "0x4Bf21DCEf9ae1c6970359f37c0390672aF5eaA58"
  const CCTProxy = "0x4C54522f49bE859fE0FdCd18c984022126b830E2"
//   issue cdc
  console.log("start issue")
  const issueCDC = CDCAbi.encodeFunctionData("issue", [deployer.address, 100000])
  const issueCDCTx = await deployer.sendTransaction({
    to: CDCProxy,
    data: issueCDC
  });
  const issueCDCReceipt = await issueCDCTx.wait(); // 等待交易确认
  // @ts-ignore
  if (issueCDCReceipt.status === 1) {
    console.log("issueCDCTransaction successful");
  } else {
    console.error("issueCDC Transaction failed");
  }
  
  const ownerBalanceCDC = CDCAbi.encodeFunctionData("balanceOf", [deployer.address])
  const ownerBalanceCDCTx = await deployer.call({
    to: CDCProxy,
    data: ownerBalanceCDC
  });
  // @ts-ignore
  const result = CDCAbi.decodeFunctionResult("balanceOf", ownerBalanceCDCTx);
  console.log("Owner balanceOf:", result[0]);

  // 设置最小月娥


  
  const ownerBalanceCDCTx1 = await deployer.call({
    to: CDCProxy,
    data: ownerBalanceCDC
  });
  // @ts-ignore
  const result1 = CDCAbi.decodeFunctionResult("balanceOf", ownerBalanceCDCTx1);
  console.log("Owner balanceOf:", result1[0]);
}
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
main().catch(console.error);
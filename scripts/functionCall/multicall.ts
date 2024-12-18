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
  const CDCProxy = "0x3F627DA48a211f121f4e171f53f164AF5b2e534e"
  const PCCProxy = "0x6e6CfD08c63413688eC8d7aFB558246e0cc223BB"
  const CCTProxy = "0x0d9e7760b384B0A258528dd317aD744a26962E11"
  //issue cdc
//   console.log("start issue")
//   const issueCDC = CDCAbi.encodeFunctionData("issue", [deployer.address, 100100])
//   const issueCDCTx = await deployer.sendTransaction({
//     to: CDCProxy,
//     data: issueCDC
//   });
//   const issueCDCReceipt = await issueCDCTx.wait(); // 等待交易确认
//   // @ts-ignore
//   if (issueCDCReceipt.status === 1) {
//     console.log("issueCDCTransaction successful");
//   } else {
//     console.error("issueCDC Transaction failed");
//   }
  
  const ownerBalanceCDC = CDCAbi.encodeFunctionData("balanceOf", [deployer.address])
  const ownerBalanceCDCTx = await deployer.call({
    to: CDCProxy,
    data: ownerBalanceCDC
  });
  // @ts-ignore
  const result = CDCAbi.decodeFunctionResult("balanceOf", ownerBalanceCDCTx);
  console.log("Owner balanceOf:", result[0]);

  //CDC convert 
  //  const cdcConvert = CDCAbi.encodeFunctionData("convert", [deployer.address,100])
  //  const cdcConvertTx = await deployer.sendTransaction({
  //   to: CDCProxy.getAddress(),
  //   data: cdcConvert
  // });
  // const cdcConvertReceipt = await cdcConvertTx.wait(); // 等待交易确认
  // // @ts-ignore
  // if (cdcConvertReceipt.status === 1) {
  //   console.log("cdcConvert Transaction successful");
  // } else {
  //   console.error("cdcConvert Transaction failed");
  // }
  const transactionsPerBatch = 10; // 每批10个交易
  const totalTransactions = 100; // 总共1000个交易
  let nextNonce;
  for (let i = 0; i < transactionsPerBatch; i ++ ) {
    const batch = [];

    for (let j = 0; j < transactionsPerBatch && (i + j) < totalTransactions; j++) {
      console.log('start convert')
      const cdcConvert = CDCAbi.encodeFunctionData("convert", [deployer.address, 100]);
      const nonce = await deployer.getNonce("pending"); // 获取当前的 pending nonce
      if (i != 0 && nextNonce == nonce){nextNonce++ }
      // 创建每笔交易，但不立即等待
      console.log(`cdcConvert Transaction ${i + j + 1} start`);

      const txPromise = deployer.sendTransaction({
        to: CDCProxy,
        data: cdcConvert,
        nonce: nextNonce
      }).then(async (cdcConvertTx) => {
        const cdcConvertReceipt = await cdcConvertTx.wait(); // 等待交易确认
        // 检查交易状态
        //@ts-ignore
        if (cdcConvertReceipt.status === 1) {
          console.log(`cdcConvert Transaction ${i + j + 1} successful`);
        } else {
          console.error(`cdcConvert Transaction ${i + j + 1} failed`);
        }
      }).catch(error => {
        console.error(`cdcConvert Transaction ${i + j + 1} failed with error:`, error);
      });
      await delay(2000);
      batch.push(txPromise);
    }
  
    // 等待当前批次的所有交易完成
    // console.log("等待当前批次的所有交易完成")
    // await Promise.all(batch);
    console.log(`第 ${i } 批交易完成`)
  }
  
  console.log("All transactions have been processed.");
  
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
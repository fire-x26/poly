import { ethers } from "hardhat";
import axios from "axios";
import path from "path";
import fs from "fs";

// 定义数据结构类型
interface TokenHolder {
    Holder: {
        Address: string;
    };
    Balance: {
        Amount: string;
    };
}

const API_URL = 'https://streaming.bitquery.io/graphql';
const API_TOKEN = 'Bearer ory_at_P5ePqG4MEBZk-wfkZT4QXR2Sl8exQrF9pT-7s6_F2yQ.YV5rVTYD5TArHBIKgWobf-5r8hctam-ew63suAR_f6E';
const CONTRACT_ADDRESS = "Proxy_Address"; // 替换为你的合约地址
const CONTRACT_ABI = [
    "function mintInterest(address[] memory addresses) public"
];

async function mintInterest(addresses: string[]) {
    const CDC = await ethers.getContractFactory("CDC");
    const cdcAbi = CDC.interface
    const [caller, addr1, addr2] = await ethers.getSigners();


    console.log("Caller address:", caller.address);
    console.log("Addresses to be processed:");
    for (const [_address,amount] of addresses.entries()) {
        const calldata = cdcAbi.encodeFunctionData("convert", [_address,amount]);
        console.log(`Calling mintInterest with calldata to ${_address}...`);

        try {
            const tx = await caller.sendTransaction({
                to: CONTRACT_ADDRESS,
                data: calldata
            });
            await tx.wait();
            console.log(`Transaction sent to ${addr1.address} with tx hash: ${tx.hash}`);
        } catch (error) {
            console.error(`Error sending transaction for address ${_address}:`, error);
        }
    }
}


// async function fetchAddresses() {
//     const data = JSON.stringify({
//         "query": "{\n  EVM(dataset: archive, network: eth) {\n    TokenHolders(\n      date: \"2024-03-01\"\n      tokenSmartContract: \"0x60E4d786628Fea6478F785A6d7e704777c86a7c6\"\n      limit: {count: 10}\n      orderBy: {descending: Balance_Amount}\n    ) {\n      Holder {\n        Address\n      }\n      Balance {\n        Amount\n      }\n    }\n  }\n}\n",
//         "variables": "{}"
//     });
//
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: API_URL,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': API_TOKEN
//         },
//         data: data
//     };
//
//     try {
//         const response = await axios.request(config);
//         const holders: TokenHolder[] = response.data.data.EVM.TokenHolders;
//
//         // 提取地址
//         const addresses = holders.map(holder => holder.Holder.Address);
//         await mintInterest(addresses);
//     } catch (error) {
//         console.error('Error fetching addresses:', error);
//     }
// }
 async function fetchAddresses() {
     // 指定你的 txt 文件路径
     const recordDir = path.join(__dirname, '.', 'record');

     const filePath = path.join(recordDir, `addresses_${1}.txt`);

    // 读取文件
     fs.readFile(filePath, 'utf8', (err, data) => {
         if (err) {
             console.error('Error reading file:', err);
             return;
         }

         // 按行分割文件内容
         const lines = data.split('\n');

         // 提取地址并存储在数组中
         const addresses: string[] = lines.map(line => {
             const parts = line.split(',');
             return parts[0].trim(); // 提取前面的地址
         });
         console.log(addresses);
         mintInterest(addresses)

     });

 }
// Run the script
fetchAddresses();
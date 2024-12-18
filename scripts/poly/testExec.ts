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
    console.log("Deploying contracts with the account:", deployer.address,addr1.address,addr2.address);

    // 1. 部署代币合约
    const CMC = await ethers.getContractFactory("CMC");
    const cmc = await CMC.deploy(deployer, 0);
    await cmc.waitForDeployment();
    console.log("cmc deployed to:", cmc.target);
    const cmcAbi = cmc.interface

    // 2. 部署逻辑合约
    const Poly = await ethers.getContractFactory("Option");
    const poly = await Poly.deploy();
    await poly.waitForDeployment();
    console.log("poly deployed to:", poly.target);
    const polyAbi = poly.interface

    // 3. 部署 Proxy 合约
    const ProxyAdmin = await ethers.getContractFactory("OptionProxy");
    const proxy = await ProxyAdmin.deploy();
    await proxy.waitForDeployment();
    console.log("ProxyAdmin deployed to:", proxy.target);

    // 4. 部署 Execution 合约
    const Execution = await ethers.getContractFactory("Execution");
    const execution = await Execution.deploy();
    await execution.waitForDeployment();
    console.log("Execution deployed to:", execution.target);

    // 5. 设置代理合约的logic
    const setLogicTx = await proxy.setTarget(poly.target);
    await setLogicTx.wait(); // 等待交易确认
    console.log(`Set implementation address to `, poly.target);

    // 6. init proxy
    const initialOwner = deployer.address; // 替换为实际地址
    const initdata = polyAbi.encodeFunctionData("initialize", [cmc.target, initialOwner]);
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

    // 7.配置资产及授权
    //铸造及授权
    const mintTx1 = await cmc.mint(addr1.address, 10000000);
    await mintTx1.wait();
    console.log(`Minted 10000000 tokens to ${addr1.address}`);

    const mintTx2 = await cmc.mint(addr2.address, 10000000);
    await mintTx2.wait();
    console.log(`Minted 10000000 tokens to ${addr2.address}`);

    // addr1 授权 Poly 合约使用其代币
    // const approveTx = await cmc.connect(addr1).approve(execution.getAddress(), 5000000000000);
    // await approveTx.wait();
    // console.log(`Approved Poly contract to spend 5000000000000 tokens of ${addr1.address}`);

    // // addr2 授权 Poly 合约使用其代币
    // const approveTx2 = await cmc.connect(addr2).approve(execution.getAddress(), 500000000000);
    // await approveTx.wait();
    // console.log(`Approved Poly contract to spend 5000000000000 tokens of ${addr1.address}`);

    const approveTx3 = await cmc.connect(addr1).approve(proxy.getAddress(), 5000000000000);
    await approveTx3.wait();
    console.log(`Approved Poly contract to spend 5000000000000 tokens of ${addr1.address}`);

    // addr2 授权 Poly 合约使用其代币
    const approveTx4 = await cmc.connect(addr2).approve(proxy.getAddress(), 500000000000);
    await approveTx4.wait();
    console.log(`Approved Poly contract to spend 5000000000000 tokens of ${addr1.address}`);

    //8. create Option
    const prepareConditondata = polyAbi.encodeFunctionData("prepareCondition", ["topic01", 3]);
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

    //9. add KYC addresses
    const addKYCAddress = polyAbi.encodeFunctionData("addKYCAddress", ["topic01", [deployer.address, addr1.address, addr2.address]]);
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

    const balance1 = await cmc.balanceOf(addr1.address)
    console.log("下注后addr1地址余额:",balance1)
//   //下注
//   const placeOrderdata = polyAbi.encodeFunctionData("placeOrder", ["topic01", 1, 1000]);
//   try {
//     const tx = await addr1.sendTransaction({
//       to: proxy.getAddress(),
//       data: placeOrderdata
//     });
//     const receipt = await tx.wait(); // 等待交易确认
//     // @ts-ignore
//     if (receipt.status === 1) {
//       console.log("placeOrderdata Transaction successful");
//     } else {
//       console.error("placeOrderdata Transaction failed");
//     }
//   } catch (err) {
//     console.error("Error during placeOrder transaction:", err);
//   }
    //10. 使用address1 and address2 进行下注
    const placeOrderData = polyAbi.encodeFunctionData("placeOrder", ["topic01", 1, 10000]);
    console.log("hash:",placeOrderData)
    const to = await proxy.getAddress(); // 替换为目标合约地址
    const value = ethers.parseEther("0"); // 发送的以太坊数量
    const chainId = 31337;; // 获取链 ID
    // 计算交易哈希
    const txHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "bytes32","uint256","uint256"],
        [to, value, ethers.keccak256(placeOrderData),1, chainId]
    );
    // addr1 签名
    const signature = await addr1.signMessage(txHash);
    console.log("签名：", signature);

    // 执行
    try {
        const tx = await execution
            .connect(deployer)
            .execTransaction(to, value, placeOrderData, signature, { gasLimit: 3000000 });
        const receipt = await tx.wait();
        if (receipt && receipt.status === 1) {
            console.log("execution Transaction executed successfully:");
        } else if (receipt && receipt.status === 0) {
            console.error("execution Transaction failed:");
        } else {
            console.error("execution Failed to retrieve receipt or transaction not processed.");
        }
    } catch (err) {
        console.error("Error during execution transaction:", err);
    }

    try {
        const tx = await execution
            .connect(deployer)
            .execTransaction(to, value, placeOrderData, signature, { gasLimit: 3000000 });
        const receipt = await tx.wait();
        if (receipt && receipt.status === 1) {
            console.log("execution Transaction executed successfully:");
        } else if (receipt && receipt.status === 0) {
            console.error("execution Transaction failed:");
        } else {
            console.error("execution Failed to retrieve receipt or transaction not processed.");
        }
    } catch (err) {
        console.error("Error during execution transaction:", err);
    }
    try {
        const tx = await execution
            .connect(deployer)
            .execTransaction(to, value, placeOrderData, signature, { gasLimit: 3000000 });
        const receipt = await tx.wait();
        if (receipt && receipt.status === 1) {
            console.log("execution Transaction executed successfully:");
        } else if (receipt && receipt.status === 0) {
            console.error("execution Transaction failed:");
        } else {
            console.error("execution Failed to retrieve receipt or transaction not processed.");
        }
    } catch (err) {
        console.error("Error during execution transaction:", err);
    }

    const balance2 = await cmc.balanceOf(addr1.address)
    console.log("下注后addr1地址余额:",balance2)

    //11.获取下注信息
    const getOrderInfoData = polyAbi.encodeFunctionData("getOrderInfo", ["topic01"]);
    try {
        // 发送调用请求到代理合约
        const result = await deployer.call({
            to: proxy.getAddress(),
            data: getOrderInfoData
        });
        // 解码返回数据
        const decodedResult = polyAbi.decodeFunctionResult("getOrderInfo", result);

        const totalBet = decodedResult[0]; // 总下注金额
        const betDetails = decodedResult[1]; // 每个选项的详细信息

        console.log("Total amount bet:", totalBet.toString());
        console.log("Bet details:");

        for (let i = 0; i < betDetails.length; i++) {
            console.log(`Option ${i + 1}:`);
            console.log(`  Amount: ${betDetails[i].amount.toString()}`);
            console.log(`  To Win: ${betDetails[i].toWin.toString()}`);
        }
    } catch (err) {
        console.error("Error during getOrderInfo call:", err);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

 
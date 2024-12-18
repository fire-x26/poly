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
    const mintTx1 = await cmc.mint(deployer.address, 10000000);
    await mintTx1.wait();
    console.log(`Minted 10000000 tokens to ${deployer.address}`);

    const approveTx3 = await cmc.connect(deployer).approve(proxy.getAddress(), 5000000000000);
    await approveTx3.wait();
    console.log(`Approved Poly contract to spend 5000000000000 tokens of ${deployer.address}`);

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

    const balance4 = await cmc.balanceOf(deployer.address)
    console.log("下注前deployer地址余额:",balance4)

    //10. 使用address1 and address2 进行下注
    const placeOrderData1 = polyAbi.encodeFunctionData("placeOrder", ["topic01", 0, 10000]);
    try {
        const tx = await deployer.sendTransaction({
            to: proxy.getAddress(),
            data: placeOrderData1
        });
        const receipt = await tx.wait(); // 等待交易确认
        // @ts-ignore
        if (receipt.status === 1) {
            console.log("placeOrderDataTx Transaction successful");
        } else {
            console.error("placeOrderDataTx Transaction failed");
        }
    } catch (err) {
        console.error("Error during placeOrderDataTx transaction:", err);
    }

    const placeOrderData11 = polyAbi.encodeFunctionData("placeOrder", ["topic01", 1, 10000]);
    try {
        const tx = await deployer.sendTransaction({
            to: proxy.getAddress(),
            data: placeOrderData11
        });
        const receipt = await tx.wait(); // 等待交易确认
        // @ts-ignore
        if (receipt.status === 1) {
            console.log("placeOrderDataTx Transaction successful");
        } else {
            console.error("placeOrderDataTx Transaction failed");
        }
    } catch (err) {
        console.error("Error during placeOrderDataTx transaction:", err);
    }
    const balance2 = await cmc.balanceOf(deployer.address)
    console.log("下注后deployer地址余额:",balance2)

    //11.获取下注信息
    const getOrderInfoData1 = polyAbi.encodeFunctionData("getOrderInfo", ["topic01"]);
    try {
        // 发送调用请求到代理合约
        const result = await deployer.call({
            to: proxy.getAddress(),
            data: getOrderInfoData1
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
    
    //结算
    const reportPayouts = polyAbi.encodeFunctionData("reportPayouts", ["topic01", 1]);
    try {
        const tx = await deployer.sendTransaction({
            to: proxy.getAddress(),
            data: reportPayouts
        });
        const receipt = await tx.wait(); // 等待交易确认
        // @ts-ignore
        if (receipt.status === 1) {
            console.log("placeOrderDataTx Transaction successful");
        } else {
            console.error("placeOrderDataTx Transaction failed");
        }
    } catch (err) {
        console.error("Error during placeOrderDataTx transaction:", err);
    }

    const balance3 = await cmc.balanceOf(deployer.address)
    console.log("结算后deployer地址余额:",balance3)

        //8-1. create Option
        const prepareConditondata1 = polyAbi.encodeFunctionData("prepareCondition", ["topic02", 3]);
        try {
            const tx = await deployer.sendTransaction({
                to: proxy.getAddress(),
                data: prepareConditondata1
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
    
        const balance1 = await cmc.balanceOf(deployer.address)
        console.log("下注前deployer地址余额:",balance1)
    
        //10. 使用address1 and address2 进行下注
        const placeOrderData3 = polyAbi.encodeFunctionData("placeOrder", ["topic02", 0, 10000]);
        try {
            const tx = await deployer.sendTransaction({
                to: proxy.getAddress(),
                data: placeOrderData3
            });
            const receipt = await tx.wait(); // 等待交易确认
            // @ts-ignore
            if (receipt.status === 1) {
                console.log("placeOrderDataTx Transaction successful");
            } else {
                console.error("placeOrderDataTx Transaction failed");
            }
        } catch (err) {
            console.error("Error during placeOrderDataTx transaction:", err);
        }

        const balance5 = await cmc.balanceOf(deployer.address)
        console.log("下注后deployer地址余额:",balance5)
    
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
    // 取消下单
    const cancelData = polyAbi.encodeFunctionData("cancelOption", ["topic02"]);
    try {
        const tx = await deployer.sendTransaction({
            to: proxy.getAddress(),
            data: cancelData
        });
        const receipt = await tx.wait(); // 等待交易确认
        // @ts-ignore
        if (receipt.status === 1) {
            console.log("cancelTx Transaction successful");
        } else {
            console.error("cancelTx Transaction failed");
        }
    } catch (err) {
        console.error("Error during cancelTx transaction:", err);
    }

    const balance6 = await cmc.balanceOf(deployer.address)
    console.log("下注后deployer地址余额:",balance6)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

 
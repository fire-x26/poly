import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks:{
    localhost: {
      url: "http://127.0.0.1:8545", // 本地以太坊节点的URL
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80','0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d','0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a','0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6'], // 私钥
    },
    bnbtest:{
      url:'https://bsc-testnet.blockpi.network/v1/rpc/public',
      accounts:['47517bedd55cedc14d1c33ea65c2e7712bf1cd8a891cc8c7b690843a430d3fd1','bafd477f0f3763436c8d90944cace4bebc129c2dc7adb1f52090da1889d6040c','4ebdec0e6ab126a070f46f7c76ab6e8e259954a8771360e1e6e609b26781ea4b'],
    },
    sepolia:{
      url:'https://sepolia.infura.io/v3/5a6dd183d94a4299a96adea41777ba74',
      accounts:['47517bedd55cedc14d1c33ea65c2e7712bf1cd8a891cc8c7b690843a430d3fd1','957ea229d4ec29fc8c8208bb834f1bc9ac4dc8c5ffa4150ca6d6dcf14328cb72','2e953e2cd22f8e05ec5e11f89e19c3f86d950cb87bdad60e0eaef8ff10a40e8c'],
    },
    // holesky:{
    //   url:'https://eth-holesky.g.alchemy.com/v2/cVEt-fnCUJl8EuLm6CFKNLZWQ62Ubegu',
    //   accounts:['4ebdec0e6ab126a070f46f7c76ab6e8e259954a8771360e1e6e609b26781ea4b']
    // },
    holesky:{
      url:'https://holesky.infura.io/v3/5a6dd183d94a4299a96adea41777ba74',
      accounts:['4ebdec0e6ab126a070f46f7c76ab6e8e259954a8771360e1e6e609b26781ea4b']
    },
    polygon:{
      url:'https://polygon-rpc.com',
      accounts:['47517bedd55cedc14d1c33ea65c2e7712bf1cd8a891cc8c7b690843a430d3fd1','bafd477f0f3763436c8d90944cace4bebc129c2dc7adb1f52090da1889d6040c','4ebdec0e6ab126a070f46f7c76ab6e8e259954a8771360e1e6e609b26781ea4b'],
    }
  },
  etherscan:{
    apiKey:"9DCFEERAVHYQHW2PYVFCNC6XS2XMZYQYF5",
  },

};

export default config;

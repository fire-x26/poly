// Setup: npm install alchemy-sdk
const { Alchemy, AlchemySubscription, Network } = require("alchemy-sdk");

async function main() {
  // Optional config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: "cVEt-fnCUJl8EuLm6CFKNLZWQ62Ubegu", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Subscription for new blocks on Eth Mainnet.
  alchemy.ws.on("block", (blockNumber) => {
    console.log("The latest block number is", blockNumber);
  });

  // Subscription for Alchemy's pendingTransactions Enhanced API
  alchemy.ws.on(
    {
      method: AlchemySubscription.PENDING_TRANSACTIONS,
    },
    (tx) => console.log(tx)
  );
}

main().catch(console.error);

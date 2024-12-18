const { ethers } = require("ethers");
const XLSX = require("xlsx");
const express = require('express');
const router = express.Router();

router.post('/generate', (req, res) => {
  const { numWallets } = req.body;  // Get the number of wallets to generate from request body

  if (!numWallets || numWallets <= 0) {
    return res.status(400).send('Invalid number of wallets requested.');
  }

  // Create HD Wallet (ethers V6)
  // Generate a random mnemonic phrase
  console.log("\n1. Create HD Wallet");
  const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));

  // Create the base HD wallet
  // Base path: "m / purpose' / coin_type' / account' / change"
  const basePath = "44'/60'/0'/0";
  const baseWallet = ethers.HDNodeWallet.fromPhrase(mnemonic, basePath);
  console.log(baseWallet);

  console.log("\n2. Derive 20 wallets from the HD wallet");
  const numWallet = numWallets;

  // Derivation path: Base path + "/ address_index"
  // We only need to provide the address_index (last part) as a string to derive new wallets from the baseWallet. In V6, no need to repeat the base path!
  let wallets = [];
  for (let i = 0; i < numWallet; i++) {
    let baseWalletNew = baseWallet.derivePath(i.toString());
    console.log(`Wallet ${i + 1} Address: ${baseWalletNew.address}`);
    wallets.push({
      address: baseWalletNew.address,
      privateKey: baseWalletNew.privateKey.toString('hex'),
    });
  }

  // Save wallet information to an Excel file
  console.log("\n5. Save wallet information to Excel");

  const wsData = wallets.map((wallet, index) => ({
    "Wallet Number": index + 1,
    "Address": wallet.address,
    "Private Key": wallet.privateKey,
  }));

  // Create a worksheet and save sheet
  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Wallets");
  const filePath = "wallets.xlsx";
  XLSX.writeFile(wb, filePath);

  console.log(`Wallet information saved to ${filePath}`);
  return res.status(200).json({
    message: 'Wallets generated successfully.',
    filePath: filePath,
  });
})

module.exports = router;

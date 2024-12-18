const axios = require('axios');
const fs = require('fs');
const path = require('path');


let data = JSON.stringify({
    "query": "{\n  EVM(dataset: archive, network: eth) {\n    TokenHolders(\n      date: \"2024-03-01\"\n      tokenSmartContract: \"0xdAC17F958D2ee523a2206206994597C13D831ec7\"\n      limit: {count: 1}\n      orderBy: {descending: Balance_Amount}\n    ) {\n      Holder {\n        Address\n      }\n      Balance {\n        Amount\n      }\n    }\n  }\n}\n",
    "variables": "{}"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://streaming.bitquery.io/graphql',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQY4tlTtCEBQ3uXnQkX7GgJUf5VGUYEB',
        'Authorization': 'Bearer ory_at_P5ePqG4MEBZk-wfkZT4QXR2Sl8exQrF9pT-7s6_F2yQ.YV5rVTYD5TArHBIKgWobf-5r8hctam-ew63suAR_f6E'
    },
    data: data
};
const recordDir = path.join(__dirname, '.', 'record');
if (!fs.existsSync(recordDir)) {
    fs.mkdirSync(recordDir, { recursive: true }); // 使用 recursive 选项来确保路径中所有的目录都被创建
}
axios.request(config)
    .then((response) => {
        const holders = response.data.data.EVM.TokenHolders;
        const addresses = holders.map(holder => ({
            address: holder.Holder.Address,
            amount: holder.Balance.Amount
        }));

        const chunkSize = 10000; // 每一万条记录
        const totalChunks = Math.ceil(addresses.length / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = start + chunkSize;
            const chunk = addresses.slice(start, end);
            const filePath = path.join(recordDir, `addresses_${i + 1}.txt`);

            const content = chunk.map(item => `${item.address}, ${item.amount}`).join('\n');

            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                } else {
                    console.log(`Addresses written to addresses_${i + 1}.txt`);
                }
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
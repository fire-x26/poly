/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  CAToken,
  CATokenInterface,
} from "../../../../contracts/CarbonAssets/Token/CAToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "available",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "AddedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Issue",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "RemovedBlackList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "Version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_evilUser",
        type: "address",
      },
    ],
    name: "addBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isBlackListed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "issue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_clearedUser",
        type: "address",
      },
    ],
    name: "removeBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611b37806100206000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c80638456cb59116100b8578063bb62860d1161007c578063bb62860d1461032d578063ce606ee01461034b578063dd62ed3e14610369578063e47d606014610399578063e4997dc5146103c9578063f2fde38b146103e557610142565b80638456cb591461029b578063867904b4146102a55780638f32d59b146102c157806395d89b41146102df578063a9059cbb146102fd57610142565b806323b872dd1161010a57806323b872dd146101eb578063313ce5671461021b5780633f4ba83a146102395780635c975abb1461024357806370a0823114610261578063715018a61461029157610142565b806306fdde0314610147578063095ea7b3146101655780630ecb93c01461019557806318160ddd146101b15780631e9a6950146101cf575b600080fd5b61014f610401565b60405161015c91906115b5565b60405180910390f35b61017f600480360381019061017a9190611670565b6104a2565b60405161018c91906116cb565b60405180910390f35b6101af60048036038101906101aa91906116e6565b6104c5565b005b6101b96105aa565b6040516101c69190611722565b60405180910390f35b6101e960048036038101906101e49190611670565b6105c2565b005b6102056004803603810190610200919061173d565b6106b0565b60405161021291906116cb565b60405180910390f35b6102236106ed565b60405161023091906117ac565b60405180910390f35b6102416106f6565b005b61024b610747565b60405161025891906116cb565b60405180910390f35b61027b600480360381019061027691906116e6565b61076c565b6040516102889190611722565b60405180910390f35b6102996107c3565b005b6102a36108cb565b005b6102bf60048036038101906102ba9190611670565b61091c565b005b6102c9610920565b6040516102d691906116cb565b60405180910390f35b6102e7610978565b6040516102f491906115b5565b60405180910390f35b61031760048036038101906103129190611670565b610a19565b60405161032491906116cb565b60405180910390f35b610335610a3c565b60405161034291906115b5565b60405180910390f35b610353610a75565b60405161036091906117d6565b60405180910390f35b610383600480360381019061037e91906117f1565b610a9f565b6040516103909190611722565b60405180910390f35b6103b360048036038101906103ae91906116e6565b610b34565b6040516103c091906116cb565b60405180910390f35b6103e360048036038101906103de91906116e6565b610b54565b005b6103ff60048036038101906103fa91906116e6565b610c39565b005b6060600061040d610c8c565b905080600301805461041e90611860565b80601f016020809104026020016040519081016040528092919081815260200182805461044a90611860565b80156104975780601f1061046c57610100808354040283529160200191610497565b820191906000526020600020905b81548152906001019060200180831161047a57829003601f168201915b505050505091505090565b6000806104ad610cb4565b90506104ba818585610cbc565b600191505092915050565b6104cd610920565b61050c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610503906118dd565b60405180910390fd5b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f42e160154868087d6bfdc0ca23d96a1c1cfa32f1b72ba9ba27b69b98a0d819dc60405160405180910390a250565b6000806105b5610c8c565b9050806002015491505090565b6105ca610920565b610609576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610600906118dd565b60405180910390fd5b806106138361076c565b1015610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064b90611949565b60405180910390fd5b61065e8282610cce565b8173ffffffffffffffffffffffffffffffffffffffff167f222838db2794d11532d940e8dec38ae307ed0b63cd97c233322e221f998767a6826040516106a49190611722565b60405180910390a25050565b60006040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e4906119b5565b60405180910390fd5b60006006905090565b6106fe610920565b61073d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610734906118dd565b60405180910390fd5b610745610d50565b565b600080610752610dc2565b90508060000160009054906101000a900460ff1691505090565b600080610777610c8c565b90508060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915050919050565b6107cb610920565b61080a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610801906118dd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6108d3610920565b610912576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610909906118dd565b60405180910390fd5b61091a610dea565b565b5050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b60606000610984610c8c565b905080600401805461099590611860565b80601f01602080910402602001604051908101604052809291908181526020018280546109c190611860565b8015610a0e5780601f106109e357610100808354040283529160200191610a0e565b820191906000526020600020905b8154815290600101906020018083116109f157829003601f168201915b505050505091505090565b600080610a24610cb4565b9050610a31818585610e5c565b600191505092915050565b6040518060400160405280600181526020017f340000000000000000000000000000000000000000000000000000000000000081525081565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080610aaa610c8c565b90508060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b60036020528060005260406000206000915054906101000a900460ff1681565b610b5c610920565b610b9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b92906118dd565b60405180910390fd5b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167fd7e9ec6e6ecd65492dce6bf513cd6867560d49544421d0783ddf06e76c24470c60405160405180910390a250565b610c41610920565b610c80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c77906118dd565b60405180910390fd5b610c8981610f50565b50565b60007f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace00905090565b600033905090565b610cc9838383600161107f565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610d405760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610d3791906117d6565b60405180910390fd5b610d4c82600083611265565b5050565b610d586114a4565b6000610d62610dc2565b905060008160000160006101000a81548160ff0219169083151502179055507f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa610daa610cb4565b604051610db791906117d6565b60405180910390a150565b60007fcd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300905090565b610df26114e4565b6000610dfc610dc2565b905060018160000160006101000a81548160ff0219169083151502179055507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610e44610cb4565b604051610e5191906117d6565b60405180910390a150565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610ece5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610ec591906117d6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f405760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610f3791906117d6565b60405180910390fd5b610f4b838383611265565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610fbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fb690611a47565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000611089610c8c565b9050600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036110fd5760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016110f491906117d6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361116f5760006040517f94280d6200000000000000000000000000000000000000000000000000000000815260040161116691906117d6565b60405180910390fd5b828160010160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550811561125e578373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925856040516112559190611722565b60405180910390a35b5050505050565b600061126f610c8c565b9050600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036112c557818160020160008282546112b99190611a96565b9250508190555061139e565b60008160000160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015611354578481846040517fe450d38c00000000000000000000000000000000000000000000000000000000815260040161134b93929190611aca565b60405180910390fd5b8281038260000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036113e957818160020160008282540392505081905550611439565b818160000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516114969190611722565b60405180910390a350505050565b6114ac610747565b6114e2576040517f8dfc202b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6114ec610747565b15611523576040517fd93c066500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600081519050919050565b600082825260208201905092915050565b60005b8381101561155f578082015181840152602081019050611544565b60008484015250505050565b6000601f19601f8301169050919050565b600061158782611525565b6115918185611530565b93506115a1818560208601611541565b6115aa8161156b565b840191505092915050565b600060208201905081810360008301526115cf818461157c565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611607826115dc565b9050919050565b611617816115fc565b811461162257600080fd5b50565b6000813590506116348161160e565b92915050565b6000819050919050565b61164d8161163a565b811461165857600080fd5b50565b60008135905061166a81611644565b92915050565b60008060408385031215611687576116866115d7565b5b600061169585828601611625565b92505060206116a68582860161165b565b9150509250929050565b60008115159050919050565b6116c5816116b0565b82525050565b60006020820190506116e060008301846116bc565b92915050565b6000602082840312156116fc576116fb6115d7565b5b600061170a84828501611625565b91505092915050565b61171c8161163a565b82525050565b60006020820190506117376000830184611713565b92915050565b600080600060608486031215611756576117556115d7565b5b600061176486828701611625565b935050602061177586828701611625565b92505060406117868682870161165b565b9150509250925092565b600060ff82169050919050565b6117a681611790565b82525050565b60006020820190506117c1600083018461179d565b92915050565b6117d0816115fc565b82525050565b60006020820190506117eb60008301846117c7565b92915050565b60008060408385031215611808576118076115d7565b5b600061181685828601611625565b925050602061182785828601611625565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061187857607f821691505b60208210810361188b5761188a611831565b5b50919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006118c7602083611530565b91506118d282611891565b602082019050919050565b600060208201905081810360008301526118f6816118ba565b9050919050565b7f496e73756666696369656e7420746f6b656e0000000000000000000000000000600082015250565b6000611933601283611530565b915061193e826118fd565b602082019050919050565b6000602082019050818103600083015261196281611926565b9050919050565b7f6e6f7420737570706f7274000000000000000000000000000000000000000000600082015250565b600061199f600b83611530565b91506119aa82611969565b602082019050919050565b600060208201905081810360008301526119ce81611992565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611a31602683611530565b9150611a3c826119d5565b604082019050919050565b60006020820190508181036000830152611a6081611a24565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611aa18261163a565b9150611aac8361163a565b9250828201905080821115611ac457611ac3611a67565b5b92915050565b6000606082019050611adf60008301866117c7565b611aec6020830185611713565b611af96040830184611713565b94935050505056fea264697066735822122050bee24eee5f1ec9500fc04a5e68e2ae86cc2385634f29b44e86b681e33bf77964736f6c63430008180033";

type CATokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CATokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CAToken__factory extends ContractFactory {
  constructor(...args: CATokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CAToken & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CAToken__factory {
    return super.connect(runner) as CAToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CATokenInterface {
    return new Interface(_abi) as CATokenInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CAToken {
    return new Contract(address, _abi, runner) as unknown as CAToken;
  }
}
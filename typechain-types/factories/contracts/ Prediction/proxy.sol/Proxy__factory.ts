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
  Proxy,
  ProxyInterface,
} from "../../../../contracts/ Prediction/proxy.sol/Proxy";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ProxyOwnerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "ProxyTargetSet",
    type: "event",
  },
  {
    stateMutability: "nonpayable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
    ],
    name: "setTarget",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "target",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105b5806100606000396000f3fe608060405234801561001057600080fd5b50600436106100505760003560e01c806313af40351461010d578063776d1a01146101295780638da5cb5b14610145578063d4b839921461016357610051565b5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100de90610439565b60405180910390fd5b3660008037600080366000845af43d6000803e8060008114610108573d6000f35b3d6000fd5b610127600480360381019061012291906104bc565b610181565b005b610143600480360381019061013e91906104bc565b610289565b005b61014d610392565b60405161015a91906104f8565b60405180910390f35b61016b6103b6565b60405161017891906104f8565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461020f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102069061055f565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fe543d3a077035cec99b732bad2c4cf1c0fdee02ddf561ae543106ccc31cf35a38160405161027e91906104f8565b60405180910390a150565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610317576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030e9061055f565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff1b1e874978309afba903baec19abf568b0337fcedc05dde58cfea25ec25b94d8160405161038791906104f8565b60405180910390a150565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600082825260208201905092915050565b7f546172676574206e6f7420736574000000000000000000000000000000000000600082015250565b6000610423600e836103dc565b915061042e826103ed565b602082019050919050565b6000602082019050818103600083015261045281610416565b9050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104898261045e565b9050919050565b6104998161047e565b81146104a457600080fd5b50565b6000813590506104b681610490565b92915050565b6000602082840312156104d2576104d1610459565b5b60006104e0848285016104a7565b91505092915050565b6104f28161047e565b82525050565b600060208201905061050d60008301846104e9565b92915050565b7f4e6f74206f776e65720000000000000000000000000000000000000000000000600082015250565b60006105496009836103dc565b915061055482610513565b602082019050919050565b600060208201905081810360008301526105788161053c565b905091905056fea2646970667358221220733e3a7c34c42238b22585ca2a3607407854770f73d6be493f343ab66120dbda64736f6c63430008180033";

type ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proxy__factory extends ContractFactory {
  constructor(...args: ProxyConstructorParams) {
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
      Proxy & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Proxy__factory {
    return super.connect(runner) as Proxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyInterface {
    return new Interface(_abi) as ProxyInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Proxy {
    return new Contract(address, _abi, runner) as unknown as Proxy;
  }
}

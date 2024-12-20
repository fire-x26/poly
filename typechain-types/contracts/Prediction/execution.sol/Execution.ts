/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface ExecutionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "checkSignature"
      | "contractOwner"
      | "encodeTransactionData"
      | "execTransaction"
      | "getNonce"
      | "isOwner"
      | "nonce"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ExecutionFailure"
      | "ExecutionSuccess"
      | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "checkSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "contractOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "encodeTransactionData",
    values: [AddressLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "execTransaction",
    values: [AddressLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getNonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeTransactionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "execTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace ExecutionFailureEvent {
  export type InputTuple = [txHash: BytesLike];
  export type OutputTuple = [txHash: string];
  export interface OutputObject {
    txHash: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutionSuccessEvent {
  export type InputTuple = [txHash: BytesLike];
  export type OutputTuple = [txHash: string];
  export interface OutputObject {
    txHash: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Execution extends BaseContract {
  connect(runner?: ContractRunner | null): Execution;
  waitForDeployment(): Promise<this>;

  interface: ExecutionInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  checkSignature: TypedContractMethod<
    [dataHash: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;

  contractOwner: TypedContractMethod<[], [string], "view">;

  encodeTransactionData: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      chainid: BigNumberish
    ],
    [string],
    "view"
  >;

  execTransaction: TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      signatures: BytesLike
    ],
    [boolean],
    "payable"
  >;

  getNonce: TypedContractMethod<[], [bigint], "view">;

  isOwner: TypedContractMethod<[], [boolean], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "checkSignature"
  ): TypedContractMethod<
    [dataHash: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "contractOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "encodeTransactionData"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      chainid: BigNumberish
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "execTransaction"
  ): TypedContractMethod<
    [
      to: AddressLike,
      value: BigNumberish,
      data: BytesLike,
      signatures: BytesLike
    ],
    [boolean],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getNonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "isOwner"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "ExecutionFailure"
  ): TypedContractEvent<
    ExecutionFailureEvent.InputTuple,
    ExecutionFailureEvent.OutputTuple,
    ExecutionFailureEvent.OutputObject
  >;
  getEvent(
    key: "ExecutionSuccess"
  ): TypedContractEvent<
    ExecutionSuccessEvent.InputTuple,
    ExecutionSuccessEvent.OutputTuple,
    ExecutionSuccessEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "ExecutionFailure(bytes32)": TypedContractEvent<
      ExecutionFailureEvent.InputTuple,
      ExecutionFailureEvent.OutputTuple,
      ExecutionFailureEvent.OutputObject
    >;
    ExecutionFailure: TypedContractEvent<
      ExecutionFailureEvent.InputTuple,
      ExecutionFailureEvent.OutputTuple,
      ExecutionFailureEvent.OutputObject
    >;

    "ExecutionSuccess(bytes32)": TypedContractEvent<
      ExecutionSuccessEvent.InputTuple,
      ExecutionSuccessEvent.OutputTuple,
      ExecutionSuccessEvent.OutputObject
    >;
    ExecutionSuccess: TypedContractEvent<
      ExecutionSuccessEvent.InputTuple,
      ExecutionSuccessEvent.OutputTuple,
      ExecutionSuccessEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}

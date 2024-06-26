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
} from "../common";

export interface RockPaperScissorsInterface extends Interface {
  getFunction(
    nameOrSignature: "createGame" | "joinGame" | "makeMove"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "GameComplete" | "GameCreated" | "GameStarted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createGame",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "joinGame",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "makeMove",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "joinGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "makeMove", data: BytesLike): Result;
}

export namespace GameCompleteEvent {
  export type InputTuple = [winner: AddressLike, gameNumber: BigNumberish];
  export type OutputTuple = [winner: string, gameNumber: bigint];
  export interface OutputObject {
    winner: string;
    gameNumber: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameCreatedEvent {
  export type InputTuple = [
    creator: AddressLike,
    gameNumber: BigNumberish,
    bet: BigNumberish
  ];
  export type OutputTuple = [creator: string, gameNumber: bigint, bet: bigint];
  export interface OutputObject {
    creator: string;
    gameNumber: bigint;
    bet: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameStartedEvent {
  export type InputTuple = [
    players: [AddressLike, AddressLike],
    gameNumber: BigNumberish
  ];
  export type OutputTuple = [players: [string, string], gameNumber: bigint];
  export interface OutputObject {
    players: [string, string];
    gameNumber: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RockPaperScissors extends BaseContract {
  connect(runner?: ContractRunner | null): RockPaperScissors;
  waitForDeployment(): Promise<this>;

  interface: RockPaperScissorsInterface;

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

  createGame: TypedContractMethod<
    [participant: AddressLike],
    [void],
    "payable"
  >;

  joinGame: TypedContractMethod<[gameNumber: BigNumberish], [void], "payable">;

  makeMove: TypedContractMethod<
    [gameNumber: BigNumberish, moveNumber: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createGame"
  ): TypedContractMethod<[participant: AddressLike], [void], "payable">;
  getFunction(
    nameOrSignature: "joinGame"
  ): TypedContractMethod<[gameNumber: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "makeMove"
  ): TypedContractMethod<
    [gameNumber: BigNumberish, moveNumber: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "GameComplete"
  ): TypedContractEvent<
    GameCompleteEvent.InputTuple,
    GameCompleteEvent.OutputTuple,
    GameCompleteEvent.OutputObject
  >;
  getEvent(
    key: "GameCreated"
  ): TypedContractEvent<
    GameCreatedEvent.InputTuple,
    GameCreatedEvent.OutputTuple,
    GameCreatedEvent.OutputObject
  >;
  getEvent(
    key: "GameStarted"
  ): TypedContractEvent<
    GameStartedEvent.InputTuple,
    GameStartedEvent.OutputTuple,
    GameStartedEvent.OutputObject
  >;

  filters: {
    "GameComplete(address,uint256)": TypedContractEvent<
      GameCompleteEvent.InputTuple,
      GameCompleteEvent.OutputTuple,
      GameCompleteEvent.OutputObject
    >;
    GameComplete: TypedContractEvent<
      GameCompleteEvent.InputTuple,
      GameCompleteEvent.OutputTuple,
      GameCompleteEvent.OutputObject
    >;

    "GameCreated(address,uint256,uint256)": TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;
    GameCreated: TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;

    "GameStarted(address[2],uint256)": TypedContractEvent<
      GameStartedEvent.InputTuple,
      GameStartedEvent.OutputTuple,
      GameStartedEvent.OutputObject
    >;
    GameStarted: TypedContractEvent<
      GameStartedEvent.InputTuple,
      GameStartedEvent.OutputTuple,
      GameStartedEvent.OutputObject
    >;
  };
}

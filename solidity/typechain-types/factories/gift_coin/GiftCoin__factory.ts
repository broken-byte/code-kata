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
import type { NonPayableOverrides } from "../../common";
import type { GiftCoin, GiftCoinInterface } from "../../gift_coin/GiftCoin";

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
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "GiftCoinSent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "targetAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "targetAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "mintedAmount",
        type: "uint256",
      },
    ],
    name: "mintGiftCoins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendGiftCoins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061072b806100616000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806355b845891461005157806370a082311461006d5780638da5cb5b1461009d578063bd981b31146100bb575b600080fd5b61006b60048036038101906100669190610431565b6100d7565b005b61008760048036038101906100829190610471565b6101c0565b60405161009491906104ad565b60405180910390f35b6100a5610208565b6040516100b291906104d7565b60405180910390f35b6100d560048036038101906100d09190610431565b61022e565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015e90610575565b60405180910390fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546101b591906105c4565b925050819055505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156102af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a69061066a565b60405180910390fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102fd919061068a565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461035291906105c4565b925050819055507f1e243e36793a0ee042b46740ec05a7b582c6ad3cdf4ac57ae96426f415aa6a1233838360405161038c939291906106be565b60405180910390a15050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103c88261039d565b9050919050565b6103d8816103bd565b81146103e357600080fd5b50565b6000813590506103f5816103cf565b92915050565b6000819050919050565b61040e816103fb565b811461041957600080fd5b50565b60008135905061042b81610405565b92915050565b6000806040838503121561044857610447610398565b5b6000610456858286016103e6565b92505060206104678582860161041c565b9150509250929050565b60006020828403121561048757610486610398565b5b6000610495848285016103e6565b91505092915050565b6104a7816103fb565b82525050565b60006020820190506104c2600083018461049e565b92915050565b6104d1816103bd565b82525050565b60006020820190506104ec60008301846104c8565b92915050565b600082825260208201905092915050565b7f4f6e6c7920746865206f776e65722063616e2063616c6c20746869732066756e60008201527f6374696f6e000000000000000000000000000000000000000000000000000000602082015250565b600061055f6025836104f2565b915061056a82610503565b604082019050919050565b6000602082019050818103600083015261058e81610552565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105cf826103fb565b91506105da836103fb565b92508282019050808211156105f2576105f1610595565b5b92915050565b7f4e6f7420656e6f75676820636f696e7320746f2073656e64207468697320676960008201527f6674000000000000000000000000000000000000000000000000000000000000602082015250565b60006106546022836104f2565b915061065f826105f8565b604082019050919050565b6000602082019050818103600083015261068381610647565b9050919050565b6000610695826103fb565b91506106a0836103fb565b92508282039050818111156106b8576106b7610595565b5b92915050565b60006060820190506106d360008301866104c8565b6106e060208301856104c8565b6106ed604083018461049e565b94935050505056fea26469706673582212205946f737cd61d69800c7570815599f5ddf76dec2ce922bbe43748da24c4c582864736f6c63430008130033";

type GiftCoinConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GiftCoinConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GiftCoin__factory extends ContractFactory {
  constructor(...args: GiftCoinConstructorParams) {
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
      GiftCoin & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): GiftCoin__factory {
    return super.connect(runner) as GiftCoin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GiftCoinInterface {
    return new Interface(_abi) as GiftCoinInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): GiftCoin {
    return new Contract(address, _abi, runner) as unknown as GiftCoin;
  }
}

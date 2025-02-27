import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'getEmpty' : () => Promise<never>,
  'getFloat32' : () => Promise<number>,
  'getFloat64' : () => Promise<number>,
  'getInt' : () => Promise<bigint>,
  'getInt16' : () => Promise<number>,
  'getInt32' : () => Promise<number>,
  'getInt64' : () => Promise<bigint>,
  'getInt8' : () => Promise<number>,
  'getNat' : () => Promise<bigint>,
  'getNat16' : () => Promise<number>,
  'getNat32' : () => Promise<number>,
  'getNat64' : () => Promise<bigint>,
  'getNat8' : () => Promise<number>,
  'getNull' : () => Promise<null>,
  'getPrincipal' : () => Promise<Principal>,
  'getReserved' : () => Promise<any>,
  'printEmpty' : (arg_0: never) => Promise<never>,
  'printFloat32' : (arg_0: number) => Promise<number>,
  'printFloat64' : (arg_0: number) => Promise<number>,
  'printInt' : (arg_0: bigint) => Promise<bigint>,
  'printInt16' : (arg_0: number) => Promise<number>,
  'printInt32' : (arg_0: number) => Promise<number>,
  'printInt64' : (arg_0: bigint) => Promise<bigint>,
  'printInt8' : (arg_0: number) => Promise<number>,
  'printNat' : (arg_0: bigint) => Promise<bigint>,
  'printNat16' : (arg_0: number) => Promise<number>,
  'printNat32' : (arg_0: number) => Promise<number>,
  'printNat64' : (arg_0: bigint) => Promise<bigint>,
  'printNat8' : (arg_0: number) => Promise<number>,
  'printNull' : (arg_0: null) => Promise<null>,
  'printPrincipal' : (arg_0: Principal) => Promise<Principal>,
  'printReserved' : (arg_0: any) => Promise<any>,
}

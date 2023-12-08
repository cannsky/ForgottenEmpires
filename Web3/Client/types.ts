// 0 means error, 1 means success, 2 means cancelation.
export type ReturnValue<T extends 'wallet' | 'potionUse' | 'potionBuy'> = `${T}:0` | `${T}:1` | `${T}:2`

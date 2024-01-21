import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32
} from "o1js";

export class ItemKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}


export class ItemEntity extends Struct({
    damage: UInt32,
}) {}

@runtimeModule()
export class Item extends RuntimeModule<{}> {

    @state() public itemStats = StateMap.from<ItemKey, ItemEntity>(ItemKey, ItemEntity);

    // methods will be added later...
}
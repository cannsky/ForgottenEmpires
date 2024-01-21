import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32
} from "o1js";

export class PlayerEntity extends Struct({
    xp: UInt32
}) {}

@runtimeModule()
export class Player extends RuntimeModule<{}> {

    @state() public players = StateMap.from<PublicKey, PlayerEntity>(PublicKey, PlayerEntity);

    // methods will be added later...
}
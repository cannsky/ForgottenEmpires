// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt32,
    Bool
} from "o1js";

export class DuelKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export class DuelEntity extends Struct({
    offensiveplayer: PublicKey,
    defensiveplayer: PublicKey,
}) {}

@runtimeModule()
export class Duel extends RuntimeModule<{}> {

    @state() public duels = StateMap.from<DuelKey, DuelEntity>(DuelKey, DuelEntity);

}
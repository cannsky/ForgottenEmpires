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

export class CharacterKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export class CharacterEntity extends Struct({
    xp: UInt32,
}) {}

@runtimeModule()
export class Character extends RuntimeModule<{}> {

    @state() public characterStats = StateMap.from<CharacterKey, CharacterEntity>(CharacterKey, CharacterEntity);

    // methods will be added later...
}
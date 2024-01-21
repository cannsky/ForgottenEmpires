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
    level: UInt32,
}) {}

@runtimeModule()
export class Character extends RuntimeModule<{}> {

    @state() public characterStats = StateMap.from<CharacterKey, CharacterEntity>(CharacterKey, CharacterEntity);

    @runtimeMethod()
    public levelUP(address: PublicKey, id: UInt32) {
        // Get the xp of the player
        //const player = this.players.get(address).value;
    }

    // methods will be added later...
}
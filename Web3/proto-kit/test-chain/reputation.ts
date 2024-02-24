// This code is not completed.
// This code is not audited.

import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
} from "@proto-kit/module";

import {
    StateMap,
    assert
} from "@proto-kit/protocol";

import {
    PublicKey,
    Struct,
    UInt64
} from "o1js";

export class PlayerReputationStatsEntity extends Struct({
    reputationpoints: UInt64,
    maxreputation: UInt64,
}) {}

export class PlayerReputationEntity extends Struct({
    charismatic: UInt64,
    leadership: UInt64,
    bravery: UInt64,
    maxreputationlevel: UInt64,
}) {}

@runtimeModule()
export class Reputation extends RuntimeModule<{}> {

    @state() public playerReputationStats = StateMap.from<PublicKey, PlayerReputationStatsEntity>(UInt64, PlayerReputationStatsEntity);

    @state() public playerReputations = StateMap.from<PublicKey, PlayerReputationEntity>(PublicKey, PlayerReputationEntity);

    // methods will be added later...
}
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

export class StatsEntity extends Struct({
    xp: UInt32
}) {}

@runtimeModule()
export class Stats extends RuntimeModule<{}> {

    @state() public playerStats = StateMap.from<PublicKey, StatsEntity>(PublicKey, StatsEntity);

    // methods will be added later...
}
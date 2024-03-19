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

export class BuffSkillEntity extends Struct({
    vitality: UInt64,
    strength: UInt64,
    dexterity: UInt64,
    intelligence: UInt64,
    maxlevel: UInt64,
}) {}

export class DebuffSkillEntity extends Struct({
    damage: UInt64,
    maxlevel: UInt64,
}) {}

@runtimeModule()
export class Rune extends RuntimeModule<{}> {

    @state() public playerBuffSkills = StateMap.from<PublicKey, BuffSkillEntity>(PublicKey, BuffSkillEntity);

    @state() public playerDebuffSkills = StateMap.from<PublicKey, DebuffSkillEntity>(PublicKey, DebuffSkillEntity);

    @state() public playerSkillUpgradePoints = StateMap.from<PublicKey, UInt64>(PublicKey, UInt64);

    @runtimeMethod()
    public newPlayerSkills() {
        // Ensure the caller is not already having a buff skills
        assert(this.playerBuffSkills.get(this.transaction.sender).isSome.not(), "you already have buff skills");
        // Ensure the caller is not already having a debuff skills
        assert(this.playerDebuffSkills.get(this.transaction.sender).isSome.not(), "you already have debuff skills");
        // Create new buff skills for the player
        this.playerBuffSkills.set(
            this.transaction.sender,
            new BuffSkillEntity({ 
                vitality: UInt64.From(1),
                strength: UInt64.From(1),
                dexterity: UInt64.From(1),
                intelligence: UInt64.From(1),
                maxlevel: UInt64.From(0),
            })
        );
        // Create new debuff skills for the player
        this.playerDebuffSkills.set(
            this.transaction.sender,
            new DebuffSkillEntity({ 
                damage: UInt64.From(1),
                maxlevel: UInt64.From(5)
            })
        );
        // Create new player skill upgrade points
        this.playerSkillUpgradePoints.set(
            this.transaction.sender,
            UInt64.From(5)
        );
    }

    // methods will be added later...
}
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
    UInt32
} from "o1js";

export class CharacterKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) {}

export class CharacterEntity extends Struct({
    level: UInt32,
    xp: UInt32,
    statxp: UInt32,
    damage: UInt32,
    defense: UInt32,
}) {}

@runtimeModule()
export class Character extends RuntimeModule<{}> {

    @state() public characters = StateMap.from<CharacterKey, CharacterEntity>(CharacterKey, CharacterEntity);

    @state() public characterCounts = StateMap.from<PublicKey, UInt32>(PublicKey, UInt32);

    @runtimeMethod()
    public levelUP(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender, id: id })).value;
        // Get current xp value of the character
        const currentXP = character.xp;
        // Get current level value of the character
        const currentLevel = character.level;
        // Check if the xp is enough for a level up
        assert(currentXP.value.greaterThanOrEqual(100), "not enough xp");
        // Calculate new level of the character
        const newLevel = currentLevel.value.add(1);
        // Calculate new xp of the character
        const newXP = currentXP.value.sub(100);
        // Set new xp and level of the character
        this.characters.set(
            new CharacterKey({ owner: this.transaction.sender, id: id }), 
            new CharacterEntity({ 
                level: newLevel, 
                xp: newXP, 
                statxp: character.statxp, 
                damage: character.damage, 
                defense: character.defense })
        );
    }

    @runtimeMethod()
    public upgradeDamage(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender, id: id })).value;
        // Get current stat xp value of the character
        const currentStatXP = character.statxp;
        // Get current damage value of the character
        const currentDamage = character.damage;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.value.greaterThanOrEqual(1), "not enough stat xp");
        // Calculate new damage value of the character
        const newDamage = currentDamage.value.add(1);
        // Calculate new stat xp of the character
        const newStatXP = currentStatXP.value.sub(1);
        // Set new stat xp and damage value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender, 
                id: id 
            }), 
            new CharacterEntity({ 
                level: character.level, 
                xp: character.xp,
                statxp: newStatXP, 
                damage: newDamage, 
                defense: character.defense 
            })
        );
    }

    @runtimeMethod()
    public upgradeDefense(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender, id: id })).value;
        // Get current stat xp value of the character
        const currentStatXP = character.statxp;
        // Get current defense value of the character
        const currentDefense = character.defense;
        // Check if the stat xp is enough for an upgrade
        assert(currentStatXP.value.greaterThanOrEqual(1), "not enough stat xp");
        // Calculate new defense value of the character
        const newDefense = currentDefense.value.add(1);
        // Calculate new stat xp of the character
        const newStatXP = currentStatXP.value.sub(1);
        // Set stat xp and defense value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender, 
                id: id 
            }), 
            new CharacterEntity({ 
                level: character.level, 
                xp: character.xp,
                statxp: newStatXP, 
                damage: character.damage, 
                defense: newDefense 
            })
        );
    }

    // methods will be added later...
}
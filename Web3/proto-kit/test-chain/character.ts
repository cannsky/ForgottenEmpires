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
    type: UInt32,
    maxupgrade: UInt32,
    maxlevel: UInt32,
}) {}

@runtimeModule()
export class Character extends RuntimeModule<{}> {

    @state() public characters = StateMap.from<CharacterKey, CharacterEntity>(CharacterKey, CharacterEntity);

    @state() public characterCounts = StateMap.from<PublicKey, UInt32>(PublicKey, UInt32);

    @runtimeMethod()
    public newCharacter(type: UInt32) {
        // Get character count of the player
        const characterCount = this.characterCounts.get(this.transaction.sender);
        // Increase character count by 1
        characterCount.value.add(1);
        // Update character counts
        this.characterCounts.set(this.transaction.sender, characterCount);
        // Create new character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender, 
                id: characterCount 
            }), 
            new CharacterEntity({ 
                level: UInt32.from(1), 
                xp: UInt32.from(100),
                statxp: UInt32.from(1), 
                damage: UInt32.from(1), 
                defense: UInt32.from(1),
                type: type,
                maxupgrade: UInt32.from(5),
                maxlevel: UInt32.from(5)
            })
        )
    }

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
                defense: character.defense,
                type: character.type,
                maxupgrade: character.maxupgrade,
                maxlevel: character.maxlevel
            })
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
                defense: character.defense,
                type: character.type,
                maxupgrade: character.maxupgrade,
                maxlevel: character.maxlevel
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
                defense: newDefense,
                type: character.type,
                maxupgrade: character.maxupgrade,
                maxlevel: character.maxlevel
            })
        );
    }

    @runtimeMethod()
    public upgradeMaxUpgrade(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender, id: id })).value;
        // Get current max upgrade value of the character
        const currentMaxUpgrade = character.maxupgrade;
        // The maximum upgrade limit is 25
        assert(currentMaxUpgrade.value.greaterThanOrEqual(25), "you cannot upgrade more than 25");
        // Calculate new max upgrade value of the character
        const newMaxUpgrade = currentMaxUpgrade.value.add(1);
        // Set new max upgrade value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender, 
                id: id 
            }), 
            new CharacterEntity({ 
                level: character.level, 
                xp: character.xp,
                statxp: character.statxp, 
                damage: character.damage, 
                defense: character.defense,
                type: character.type,
                maxupgrade: newMaxUpgrade,
                maxlevel: character.maxlevel
            })
        );
    }

    // methods will be added later...
}
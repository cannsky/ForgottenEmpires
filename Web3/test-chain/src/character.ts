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
    UInt32
} from "@proto-kit/library";

import {
    PublicKey,
    Struct
} from "o1js";

export class CharacterKey extends Struct({
    owner: PublicKey,
    id: UInt32,
}) { }

export class CharacterEntity extends Struct({
    level: UInt32,
    xp: UInt32,
    statxp: UInt32,
    damage: UInt32,
    defense: UInt32,
    type: UInt32,
    maxupgrade: UInt32,
    maxlevel: UInt32,
    world: UInt32,
}) {}

@runtimeModule()
export class Character extends RuntimeModule<{}> {

    @state() public characters = StateMap.from<CharacterKey, CharacterEntity>(CharacterKey, CharacterEntity);

    @state() public characterCounts = StateMap.from<PublicKey, UInt32>(PublicKey, UInt32);

    @runtimeMethod()
    public newCharacter(type: UInt32) {
        // Get character count of the player
        const characterCount = this.characterCounts.get(this.transaction.sender.value).value;
        // Increase character count by 1
        const newCharacterCount = UInt32.from(characterCount).add(UInt32.from(1));
        // Update character counts
        this.characterCounts.set(this.transaction.sender.value, characterCount);
        // Create new character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
                id: newCharacterCount 
            }), 
            new CharacterEntity({ 
                level: UInt32.from(1), 
                xp: UInt32.from(100),
                statxp: UInt32.from(1), 
                damage: UInt32.from(1), 
                defense: UInt32.from(1),
                type: type,
                maxupgrade: UInt32.from(5),
                maxlevel: UInt32.from(5),
                world: UInt32.from(0)
            })
        )
    }

    @runtimeMethod()
    public levelUP(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
                id: id 
            })).value;
        // Get current xp value of the character
        const currentXP = character.xp;
        // Get current level value of the character
        const currentLevel = character.level;
        // Check if the xp is enough for a level up
        assert(UInt32.from(currentXP).greaterThanOrEqual(UInt32.from(100)), "not enough xp");
        // Calculate new level of the character
        const newLevel = UInt32.from(currentLevel).add(UInt32.from(1));
        // Calculate new xp of the character
        const newXP = UInt32.from(currentXP).sub(UInt32.from(100));
        // Set new xp and level of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
                id: id 
            }), 
            new CharacterEntity({ 
                level: newLevel, 
                xp: newXP, 
                statxp: character.statxp, 
                damage: character.damage, 
                defense: character.defense,
                type: character.type,
                maxupgrade: character.maxupgrade,
                maxlevel: character.maxlevel,
                world: character.world
            })
        );
    }

    @runtimeMethod()
    public upgradeDamage(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
                id: id 
            })).value;
        // Get current stat xp value of the character
        const currentStatXP = character.statxp;
        // Get current damage value of the character
        const currentDamage = character.damage;
        // Check if the stat xp is enough for an upgrade
        assert(UInt32.from(currentStatXP).greaterThanOrEqual(UInt32.from(1)), "not enough stat xp");
        // Calculate new damage value of the character
        const newDamage = UInt32.from(currentDamage).add(UInt32.from(1));
        // Calculate new stat xp of the character
        const newStatXP = UInt32.from(currentStatXP).sub(UInt32.from(1));
        // Set new stat xp and damage value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
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
                maxlevel: character.maxlevel,
                world: character.world
            })
        );
    }

    @runtimeMethod()
    public upgradeDefense(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender.value, id: id })).value;
        // Get current stat xp value of the character
        const currentStatXP = character.statxp;
        // Get current defense value of the character
        const currentDefense = character.defense;
        // Check if the stat xp is enough for an upgrade
        assert(UInt32.from(currentStatXP).greaterThanOrEqual(UInt32.from(1)), "not enough stat xp");
        // Calculate new defense value of the character
        const newDefense = UInt32.from(currentDefense).add(UInt32.from(1));
        // Calculate new stat xp of the character
        const newStatXP = UInt32.from(currentStatXP).sub(UInt32.from(1));
        // Set stat xp and defense value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
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
                maxlevel: character.maxlevel,
                world: character.world
            })
        );
    }

    @runtimeMethod()
    public upgradeMaxUpgrade(id: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ owner: this.transaction.sender.value, id: id })).value;
        // Get current max upgrade value of the character
        const currentMaxUpgrade = character.maxupgrade;
        // The maximum upgrade limit is 25
        assert(UInt32.from(currentMaxUpgrade).greaterThanOrEqual(UInt32.from(25)), "you cannot upgrade more than 25");
        // Calculate new max upgrade value of the character
        const newMaxUpgrade = UInt32.from(currentMaxUpgrade).add(UInt32.from(1));
        // Set new max upgrade value of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
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
                maxlevel: character.maxlevel,
                world: character.world
            })
        );
    }

    @runtimeMethod()
    public changeWorld(id: UInt32, worldId: UInt32) {
        // Check if there is a character with character id on the player or not
        assert(this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).isSome, "there is no character specified for this address");
        // Get character
        const character = this.characters.get(new CharacterKey({ 
            owner: this.transaction.sender.value, 
            id: id 
        })).value;
        // Get current world of the character
        const currentWorld = character.world;
        // Make sure the current world is not equal to the world id
        assert(UInt32.from(currentWorld).equals(UInt32.from(worldId)).not(), "you are trying to change to the same world");
        // Set new world
        const newWorld = worldId;
        // Set new world of the character
        this.characters.set(
            new CharacterKey({ 
                owner: this.transaction.sender.value, 
                id: id 
            }), 
            new CharacterEntity({ 
                level: character.level, 
                xp: character.xp,
                statxp: character.statxp, 
                damage: character.damage, 
                defense: character.defense,
                type: character.type,
                maxupgrade: character.maxupgrade,
                maxlevel: character.maxlevel,
                world: newWorld
            })
        );
    }

    @runtimeMethod()
    public getTotalCharacterDamage(characterOwner: PublicKey, characterId: UInt32) {
        // Check if there is a character or not at specified character key
        assert(this.characters.get(new CharacterKey({ 
            owner: characterOwner, 
            id: characterId
        })).isSome, "you don't have specified character");
        // Get character
        const character = this.characters.get(new CharacterKey({ 
            owner: characterOwner, 
            id: characterId
        })).value;
        // Get character level
        const characterLevel = character.level;
        // Get character damage
        const characterDamage = character.damage;
        // Get total damage
        const totalDamage = UInt32.from(characterDamage).mul(UInt32.from(characterLevel));
        // Return total damage calculated
        return totalDamage;
    }

    @runtimeMethod()
    public getTotalCharacterDefense(characterOwner: PublicKey, characterId: UInt32) {
        // Check if there is a character or not at specified character key
        assert(this.characters.get(new CharacterKey({ 
            owner: characterOwner, 
            id: characterId
        })).isSome, "you don't have specified character");
        // Get character
        const character = this.characters.get(new CharacterKey({ 
            owner: characterOwner, 
            id: characterId
        })).value;
        // Get character level
        const characterLevel = character.level;
        // Get character defense
        const characterDefense = character.defense;
        // Get total defense
        const totalDefense = UInt32.from(characterDefense).mul(UInt32.from(characterLevel));
        // Return total defense calculated
        return totalDefense;
    }

    // methods will be added later...
}
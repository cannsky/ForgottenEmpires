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
    level: UInt64,
    vitality: UInt64,
    strength: UInt64,
    dexterity: UInt64,
    intelligence: UInt64,
    maxlevel: UInt64,
}) {}

export class DebuffSkillEntity extends Struct({
    level: UInt64,
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
                level: UInt64.From(1),
                vitality: UInt64.From(1),
                strength: UInt64.From(1),
                dexterity: UInt64.From(1),
                intelligence: UInt64.From(1),
                maxlevel: UInt64.From(5),
            })
        );
        // Create new debuff skills for the player
        this.playerDebuffSkills.set(
            this.transaction.sender,
            new DebuffSkillEntity({
                level: UInt64.From(1),
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

    @runtimeMethod()
    public upgradePlayerBuffSkill() {
        // Ensure the caller has buff skill
        assert(this.playerBuffSkills.get(this.transaction.sender).isSome, "you don't have buff skills");
        // Ensure the caller has upgrade points
        assert(this.playerSkillUpgradePoints.get(this.transaction.sender).isSome, "you don't have skill upgrade points");
        // Get player upgrade points
        const skillUpgradePoints = this.playerSkillUpgradePoints.get(this.transaction.sender);
        // Check if there are any skill points or not
        assert(skillUpgradePoints.greaterThanOrEqual(1), "you don't have any skill upgrade points available");
        // Get player buff skill
        const buffSkill = this.playerBuffSkills.get(this.transaction.sender).value;
        // Get level of the buff skill
        const currentLevel = buffSkill.level;
        // Get max level of the buff skill.
        const maxLevel = buffSkill.maxlevel;
        // Check if the buff skill is already in the max level or not
        assert(currentLevel.lessThan(maxLevel), "your skill has the max level");
        // Get vitality of the buff skill
        const currentVitality = buffSkill.vitality;
        // Get strength of the buff skill
        const currentStrength = buffSkill.strength;
        // Get dexterity of the buff skill
        const currentDexterity = buffSkill.dexterity;
        // Get intelligence of the buff skill
        const currentIntelligence = buffSkill.intelligence;
        // Increase vitality of the buff skill by 1
        const newVitality = currentVitality.add(1);
        // Increase strength of the buff skill by 3
        const newStrength = currentStrength.add(3);
        // Increase dexterity of the buff skill by 3
        const newDexterity = currentDexterity.add(3);
        // Increase intelligence of the buff skill by 1
        const newIntelligence = currentIntelligence.add(1);
        // Increase level of the buff skill by 1
        const newLevel = currentLevel.add(1);
        // Update buff skill
        this.playerBuffSkills.set(
            this.transaction.sender,
            new BuffSkillEntity({ 
                level: newLevel,
                vitality: newVitality,
                strength: newStrength,
                dexterity: newDexterity,
                intelligence: newIntelligence,
                maxlevel: buffSkill.maxlevel,
            })
        );
        // Decrease skill points by 1
        const newSkillUpgradePoints = skillUpgradePoints.sub(1);
        // Update skill upgrade points
        this.playerSkillUpgradePoints.set(
            this.transaction.sender,
            newSkillUpgradePoints
        )
    }

    @runtimeMethod()
    public upgradePlayerDebuffSkill() {
        // Ensure the caller has debuff skill
        assert(this.playerDebuffSkills.get(this.transaction.sender).isSome, "you don't have debuff skills");
        // Ensure the caller has upgrade points
        assert(this.playerSkillUpgradePoints.get(this.transaction.sender).isSome, "you don't have skill upgrade points");
        // Get player upgrade points
        const skillUpgradePoints = this.playerSkillUpgradePoints.get(this.transaction.sender);
        // Check if there are any skill points or not
        assert(skillUpgradePoints.greaterThanOrEqual(1), "you don't have any skill upgrade points available");
        // Get player debuff skill
        const debuffSkill = this.playerDebuffSkills.get(this.transaction.sender).value;
        // Get level of the debuff skill
        const currentLevel = debuffSkill.level;
        // Get max level of the debuff skill.
        const maxLevel = debuffSkill.maxlevel;
        // Check if the debuff skill is already in the max level or not
        assert(currentLevel.lessThan(maxLevel), "your skill has the max level");
        // Get damage of the debuff skill
        const currentDamage = debuffSkill.damage;
        // Increase damage of the debuff skill by 1
        const newDamage = currentDamage.add(1);
        // Increase level of the buff skill by 1
        const newLevel = currentLevel.add(1);
        // Update debuff skill
        this.playerDebuffSkills.set(
            this.transaction.sender,
            new BuffSkillEntity({ 
                level: newLevel,
                damage: newDamage,
                maxlevel: debuffSkill.maxlevel,
            })
        );
        // Decrease skill points by 1
        const newSkillUpgradePoints = skillUpgradePoints.sub(1);
        // Update skill upgrade points
        this.playerSkillUpgradePoints.set(
            this.transaction.sender,
            newSkillUpgradePoints
        )
    }

    @runtimeMethod
    public upgradeBuffSkillMaxLevel()
    {
        // Ensure the caller has buff skill
        assert(this.playerBuffSkills.get(this.transaction.sender).isSome, "you don't have buff skills");
        // Ensure the caller has upgrade points
        assert(this.playerSkillUpgradePoints.get(this.transaction.sender).isSome, "you don't have skill upgrade points");
        // Get player upgrade points
        const skillUpgradePoints = this.playerSkillUpgradePoints.get(this.transaction.sender);
        // Check if there are any skill points or not
        assert(skillUpgradePoints.greaterThanOrEqual(5), "you don't have any skill upgrade points available");
        // Get player buff skill
        const buffSkill = this.playerBuffSkills.get(this.transaction.sender).value;
        // Get current max level of the buff skill
        const currentMaxLevel = buffSkill.maxlevel;
        // Increase max level of the buff skill by 1
        const newMaxLevel = currentMaxLevel.add(1);
        // Update buff skill
        this.playerBuffSkills.set(
            this.transaction.sender,
            new BuffSkillEntity({ 
                level: buffSkill.level,
                vitality: buffSkill.vitality,
                strength: buffSkill.strength,
                dexterity: buffSkill.dexterity,
                intelligence: buffSkill.intelligence,
                maxlevel: newMaxLevel,
            })
        );
        // Decrease skill points by 5
        const newSkillUpgradePoints = skillUpgradePoints.sub(5);
        // Update skill upgrade points
        this.playerSkillUpgradePoints.set(
            this.transaction.sender,
            newSkillUpgradePoints
        )
    }

    @runtimeMethod
    public upgradeDebuffSkillMaxLevel()
    {
        // Ensure the caller has buff skill
        assert(this.playerDebuffSkills.get(this.transaction.sender).isSome, "you don't have debuff skills");
        // Ensure the caller has upgrade points
        assert(this.playerSkillUpgradePoints.get(this.transaction.sender).isSome, "you don't have skill upgrade points");
        // Get player upgrade points
        const skillUpgradePoints = this.playerSkillUpgradePoints.get(this.transaction.sender);
        // Check if there are any skill points or not
        assert(skillUpgradePoints.greaterThanOrEqual(5), "you don't have any skill upgrade points available");
        // Get player buff skill
        const debuffSkill = this.playerDebuffSkills.get(this.transaction.sender).value;
        // Get current max level of the debuff skill
        const currentMaxLevel = debuffSkill.maxlevel;
        // Increase max level of the debuff skill by 1
        const newMaxLevel = currentMaxLevel.add(1);
        // Update debuff skill
        this.playerDebuffSkills.set(
            this.transaction.sender,
            new BuffSkillEntity({ 
                level: debuffSkill.level,
                damage: debuffSkill.damage,
                maxlevel: newMaxLevel,
            })
        );
        // Decrease skill points by 5
        const newSkillUpgradePoints = skillUpgradePoints.sub(5);
        // Update skill upgrade points
        this.playerSkillUpgradePoints.set(
            this.transaction.sender,
            newSkillUpgradePoints
        )
    }

    // methods will be added later...
}
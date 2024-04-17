import { Player } from "./player";
import { Character } from "./character";
import { Item } from "./item";
import { Team } from "./team";
import { Guild } from "./guild";
import { Kingdom } from "./kingdom";
import { Skill } from "./skill";
import { Rune } from "./rune";

import { ModulesConfig } from "@proto-kit/common";

export const modules = {
    Player,
    Character,
    Item,
    Team,
    Guild,
    Kingdom,
    Skill,
    Rune,
};

export const config: ModulesConfig<typeof modules> = {
    Player: {},
    Character: {},
    Item: {},
    Team: {},
    Guild: {},
    Kingdom: {},
    Skill: {},
    Rune: {},
};

export default {
    modules,
    config,
};
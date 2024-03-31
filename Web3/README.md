# Forgotten Empires - Web3 Codes

Forgotten empires uses proto-kit, a web3 framework built on top of o1js which allows decentralized application development even faster and better. For detailed information please check proto-kit framework on github.

#### Architecture of Web3 Codes

**Player**

Player class is designed to manage player entities within a decentralized application, specifically focusing on role-playing game (RPG) mechanics such as player levels, experience points (XP), and stats including charisma, reputation, leadership, bravery, and upgrade capabilities. It outlines a structured approach to declare a module within the blockchain runtime, manage state with state maps for player data and statistics, and define methods for player interactions such as creating a new player, leveling up, increasing leadership and bravery, and calculating total leadership and bravery.

**Character**

Character class is structured around managing character entities within the game, identified by unique keys that associate characters with their owners and an identifier. The character management system encompasses attributes like level, experience points (XP), statistical XP, damage, defense, and more, emphasizing role-playing game (RPG) elements. Characters can be created, leveled up, and enhanced.

**Item**

Item class facilitates intricate item management within a game, including the creation, equipping, upgrading, and consumption of items by players. Each item, represented by ItemEntity, possesses attributes such as stat experience points (XP), damage, defense, and flags indicating whether it is consumable or upgradable. Additionally, items can be uniquely identified and associated with players through ItemKey, while equipped and consumed items are managed using EquippedItemKey and ConsumedItemKey structures.

**Guild**

Guild class introduces structures for guild entities and guild wars, allowing players to join or leave guilds, manage guild member counts, and declare wars against other guilds. Guild entities are characterized by their leaders and member counts, while guild wars record the participating guilds and the winner.

**Kingdom**

Kingdom class enables players to change allegiances between kingdoms, initiate or respond to war and peace requests, and cast votes to influence the outcomes of these events. Kingdoms are defined by their leaders and member counts, with wars and peace requests tracked through unique identifiers and statuses indicating their activity. The system provides a decentralized framework for a dynamic and player-driven narrative, where the fates of kingdoms are determined by the strategic decisions and alliances of its participants.

**Rune**

Rune class structures include RunePointEntity for tracking players' rune points across the three axes (x, y, z) and RuneEntity for managing the levels of each elemental rune and the maximum achievable rune level. Methods like newPlayerRuneStats, upgradeFireRune, and others, provide functionalities for players to initialize their rune statistics, upgrade specific runes, and calculate their overall attack and defense powers based on their rune levels.

**Skill**

Skill class orchestrates the creation, enhancement, and strategic deployment of player abilities. Players are endowed with BuffSkillEntity and DebuffSkillEntity structures, enabling the enhancement of attributes such as vitality, strength, dexterity, intelligence, and the infliction of damage on adversaries. The innovative design facilitates a dynamic gameplay experience by allowing players to initiate new skill sets, upgrade existing skills, and elevate skill levels using accumulated upgrade points.

**Team**

Team class introduces a sophisticated team management system that allows players to form teams, invite members, accept invitations, and leave teams. Through the use of structures like TeamEntity and TeamInvitationKey, the class ensures that each team has a designated leader and maintains a count of its members, while also tracking invitations to manage team composition dynamically.

#### Proofs

Guild creation and Kingdom creation is only available if a wallet address is described as "can create guild or kingdom". This boolean is later set to false, if a kingdom or guild is created once, the wallet address cannot create guild or kingdom again.

**Proof Usage:** Proofs are used for checking if player is eligible or not to perform certain actions.

1) Proof is verified (if player is eligible or not)
2) Proof verification is checked (if verification is verified or not)
3) Get is nullifier used value
4) Check if nullifier used or not
5) If nullifier is not used, perform action
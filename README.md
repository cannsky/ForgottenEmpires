# ForgottenEmpires

Forgotten Empires is an onchain game built on the Mina Protocol and based on zk-proof technology. Some in-game actions are transactions on the Mina blockchain with changes captured by a prover-server. Prover server also builds and maintains a Merkle tree, interfacing directly with the game server.

### Version

[<img src="https://img.shields.io/badge/Version-Alpha 0.3-green">](./StarkSharp/StarkSharp.Docs/Platforms/DotNet/Setup.md)

### Docs

[<img src="https://img.shields.io/badge/Docs-Gitbook-green">](./StarkSharp/StarkSharp.Docs/Platforms/DotNet/Setup.md)

A detailed docs about Forgotten Empires classes, modules, setup and much more can be found on docs.

### Features

- Component Based Architecture
- Headless, Client-Server Implementation
  - Client
    - Animation System
    - Behaviour Tree Based AI System
    - Game Logic (Stats System)
    - Game Mechanics (Physics, Movement)
    - Component Based Architecture
    - SFX System
    - VFX System
    - Linux Server Build Support
    - Inventory System
    - Interaction System
    - **Elements:** Player, NPC, Enemy
    - **Modules:** Spawner System, Scene Optimizer, JS Connector, Checker System
    - **Build:** Client WebGL build is supported
  - Server
    - Data Manager (On Chain Data Retrival from Prover Server)
    - **Build:** Server Linux build is supported
- Aurora Wallet Connection Support
- Zk Proof Generation with o1js
- Transaction Sending
- Prover Server Implementation

### Prerequisites

- Unity Game Engine (2022 LTS+)
- Mirror
- Ngnix
- o1js
- Newtonsoft JSON
- Node JS (20+)

Detailed information about prerequisites can be found on Docs at [Prerequisites](https://forgottenempires.gitbook.io/forgotten-empires/prerequisites) section.

### How to Set Up

Detailed information about this can be found on Docs at [Building On Chain Games to Web GL](https://forgottenempires.gitbook.io/forgotten-empires/building-on-chain-games-to-webgl) section.

This readme file will much later be edited for features of the game, but if you are interested please check detailed docs for features of the project.

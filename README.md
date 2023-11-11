# ForgottenEmpires

Welcome to Forgotten Empires, an onchain game built on the Mina Protocol.

### Overview

Forgotten Empires is based on zk-proof technology. Some in-game actions are a transactions on the Mina blockchain with changes captured by a prover-server. Prover server also builds and maintains a Merkle tree, interfacing directly with the game server.

### Prerequisites

Before using source codes of the Forgotten Empires, you need:

- Unity Engine (2022 LTS+)
- Newtonsoft Json and .NET Framework (4.5+)
- Node.js (Version 20+)
- Unity Mirror

### How to Set Up?

Setting up Forgotten Empires includes several steps.

- Unity Setup: Install Unity with Unity Hub from Unity's offical website.
- Dependency Installation: Add Newtonsoft Json via Unity Package Manager and download Unity Mirror from the Unity Asset Store.
- Repository Cloning: Clone the game repository and integrate it into your Unity project.
- Building Contracts:
```
cd Contracts
npm install
npm run build
```
- Prover-Server Start:
```
npm install
npm run start
```
This activates the prover-server and server starts listening the network changes.

### Project Components

There are 5 main components inside the project:

- Game: Basic & dynamic mechanics and user interactions.
- Client JS: Manages web3 operations, including wallet connection and transactions (including zk-proofs etc.).
- Prover-Server: Provides Merkle tree storage and generation, also supplies the game server with JSON-formatted blockchain data.
- Contracts: Simple contracts, enabling inventory management in the blockchain.
- Game Server: An authoritative server that moderates player interactions with the world using data taken from prover-server

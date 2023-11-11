# ForgottenEmpires

Forgotten Empires is an onchain game built on the Mina Protocol and based on zk-proof technology. Some in-game actions are transactions on the Mina blockchain with changes captured by a prover-server. Prover server also builds and maintains a Merkle tree, interfacing directly with the game server.

### Prerequisites

Before using source codes of the Forgotten Empires, you need:

- Unity Engine (2022 LTS+)
- Newtonsoft Json and .NET Framework (4.5+)
- Node.js (Version 20+)
- Unity Mirror
- A web server (Apache web server used in the project)
- Vds, vps or a cloud server with at least 8 gb ram.

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
  - Unity mirror uses an approach called server and the client at the same code.
  - That's why Unity scripts are consisting both WebGL and Game Server codes.
  - Build to WebGL: Open build settings on Unity and build your project in WebGL Platform.
  - Build to GameServer: Open build settings on Unity and build your project in Dedicated Server Platform.
- Client JS: Manages web3 operations, including wallet connection and transactions (including zk-proofs etc.).
  - You can put client js build together with index.html of the web build.
  - Create a file called index.js and write these codes:

```javascript
import { connectWallet, buyPotion, usePotion } from './lib.js'

window.connectWallet = connectWallet
window.buyPotion = buyPotion
window.usePotion = usePotion
```

  - Name your client code as lib.js and add both add index.js and lib.js inside your index.html file
  
```html
<script type="module" async defer src="./index.js"></script>
<script type="module" async defer src="./lib.js"></script>
```

  - In order to create communication between client js and game, we need to add unityGameInstance variable. Please update index.html of the WebGL build as follows:

```javascript
var unityGameInstance;

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
  progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      unityGameInstance = unityInstance;
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
   }).catch((message) => {
   alert(message);
 });
};
```

- Prover-Server: Provides Merkle tree storage and generation, also supplies the game server with JSON-formatted blockchain data.
  - Open a port at 4321 (default) for your prover server to communicate with players & game server.
- Contracts: Simple contracts, enabling inventory management in the blockchain.
- Game Server: An authoritative server that moderates player interactions with the world using data taken from prover-server
  - Open a port at 7777 (default) for your game server to communicate with the players.

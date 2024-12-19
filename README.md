# Casino Minecraft Project

## Overview
This repository contains a set of interactive casino-themed games built using **ComputerCraft** for Minecraft. The games include:
- **Coin Machine**
- **Slot Machine**
- **Blackjack**
- **Double or Cashout**

The system uses a **Firebase Realtime Database** for tracking player balances via a Node.js API. Players can interact with the games using in-game monitors and peripherals.

## Features
- Virtual currency system integrated with Firebase.
- Interactive gameplay using monitors and peripherals.
- Real-time balance updates for each player.
- Configurable betting systems.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [1. Firebase Setup](#1-firebase-setup)
  - [2. Node.js API Setup](#2-nodejs-api-setup)
  - [3. ComputerCraft Scripts Setup](#3-computercraft-scripts-setup)
- [Configuration](#configuration)
- [How to Play](#how-to-play)
- [Customization](#customization)

---

## Prerequisites
To use this project, ensure you have the following:
- **Minecraft** with the **CC: Tweaked** mod installed.
- **Node.js** and **npm** installed.
- A **Firebase Project**.
- Basic knowledge of setting up Minecraft mods and peripherals.

---

## Setup

### 1. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Navigate to **Project Settings > Service Accounts**.
4. Generate a new private key and download the `JSON` file.
5. Place the downloaded file in your API directory and name it `config.json`.
6. Enable the **Realtime Database** in Firebase.
   - Go to **Build > Realtime Database** and create a new database.
   - Use the default rules for development:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```

### 2. Node.js API Setup
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Navigate to the `api` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Place `config.json` from firebase in the api directory.
5. Update the Firebase database URL in `server.js`:
   ```javascript
   databaseURL: "https://<your-database-url>.firebasedatabase.app"
   ```
6. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000` by default.

### 3. ComputerCraft Scripts Setup
1. Copy the scripts for each game (**Coin Machine**, **Slot Machine**, **Blackjack**, **Double or Cashout**) into your Minecraft `computercraft` directory.
2. Update the **API URL** in each script to point to your running API:
   ```lua
   local API_URL = "http://<your-server-ip>:3000/balance/"
   ```
3. Ensure the necessary peripherals are connected and configured:
   - **Monitor**
   - **Player Detector**
   - **Speaker**
   - **Chests/Drawers**
  If some of those items are not being detected correctly you will have to adjust the peripheral wrap/find. You can use the `peripherals = peripheral.getNames()` to check which devices are currently connected.

---

## Configuration
The following settings can be adjusted in the scripts:

### General Settings
- **API URL**: Update the `API_URL` variable in each script to match your API endpoint.
- **Player Balances**: Modify initial balances directly in Firebase if needed.

### Coin Machine
- **Valid Items**: Update the `validItems` table to include additional Minecraft items and their values.
  ```lua
  local validItems = {
      ["minecraft:emerald"] = { name = "Emerald", value = 10 },
      ["minecraft:diamond"] = { name = "Diamond", value = 5 }
  }
  ```

### Slot Machine
- **Mob Faces**: Customize the available faces and their weights in `mobFaces` and `weightedRandom`.
- **Bet Range**: Adjust `MIN_BET`, `MAX_BET`, and `BET_INCREMENT` to control betting limits.

### Blackjack
- **Max Bet**: Modify the `MAX_BET` constant to set a new maximum bet.
- **Card Deck**: Customize the deck values in the `values` array.

### Double or Cashout
- **Multipliers**: Adjust the `multipliers` array to change the reward scaling.
- **Risk Chance**: Update `RISK_CHANCE` to change the win probability.

---

## How to Play

### General Steps
1. **Login**: Right-click the player detector to register as a player.
2. **Bet Adjustment**: Use the **Higher/Lower** monitors to adjust your bet.
3. **Play**: Interact with the **Play** monitor to start the game.

### Specific Instructions
#### Coin Machine
1. Place valid items into the chest (I was using Drawers from Functional Storage).
2. Right-click the **Player Detector** to start.
3. Follow on-screen instructions to confirm deposits.

#### Slot Machine
1. Adjust your bet using the **Higher/Lower** monitors.
2. Press **Play** to spin the reels.
3. Collect your winnings if you match symbols.

#### Blackjack
1. Adjust your bet using the **Higher/Lower** monitors.
2. Press **Play** to start the game.
3. Use the **Hit** or **Stand** monitors to play your hand.

#### Double or Cashout
1. Adjust your bet using the **Higher/Lower** monitors.
2. Press **Play** to start.
3. Choose **Double** to risk your winnings or **Cashout** to collect them.

---

## Customization
This project is highly customizable. Feel free to:
- Add new games or features.
- Modify the user interface.
- Integrate additional peripherals.

## Support
If you encounter any issues, please create an issue in this repository or reach out for support.

---

## License
This project is open-source under the [MIT License](LICENSE).


# 🎲 Fair Dice Game

A simple and fair dice game where players can place bets and roll a dice to either win or lose based on the outcome. The game maintains the player's balance using `localStorage`, and the backend ensures fair play using a provably fair hashing mechanism.

## 🚀 Features
- Place bets and roll a 6-sided dice.
- Win or lose based on the dice roll.
- Balance is stored in `localStorage` to persist across sessions.
- Reset balance when it reaches `0`.
- Backend uses SHA-256 hashing for fairness.

## 🛠️ Technologies Used
### Frontend:
- React (useState, useEffect)
- TailwindCSS for styling
- Axios for API calls
- Framer Motion for animations

### Backend:
- Node.js with Express
- Crypto module for SHA-256 hashing

## 🎮 How to Play
1. Enter a bet amount.
2. Click "Roll Dice".
3. If the roll is `4, 5, or 6`, you **win** and double your bet.
4. If the roll is `1, 2, or 3`, you **lose** the bet.
5. If your balance reaches `0`, click the "Reset Balance" button to start over.

## 🏗️ Installation & Setup
### 1️⃣ Backend Setup
```sh
cd backend
npm install
node server.js
```

### 2️⃣ Frontend Setup
```sh
cd frontend
npm install
npm start
```

## 🔌 API Endpoints
| Method | Endpoint          | Description          |
|--------|------------------|----------------------|
| POST   | `/roll-dice`      | Rolls the dice and returns the result |

## 🔒 Fairness Algorithm
The backend generates a random dice roll using SHA-256 hashing:
```js
const hash = crypto.createHash("sha256")
  .update(serverSeed + clientSeed + nonce)
  .digest("hex");
const roll = (parseInt(hash.substring(0, 8), 16) % 6) + 1;
```
This ensures **provably fair results**, preventing manipulation.

## 📜 License
This project is open-source under the MIT License.

---

Enjoy the game! 🎲🔥
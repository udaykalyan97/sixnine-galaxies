import crypto from "crypto";

const serverSeed = "837494304"; // Hidden from User

export const Dice = (req, res) => {
  const { bet, balance } = req.body;     // Get balance from frontend

  if (!balance || isNaN(balance) || bet <= 0 || bet > balance) {
    return res.status(400).json({ error: "Invalid bet amount" });
  }

  const clientSeed = Date.now().toString();
  const nonce = Math.floor(Math.random() * 1000000);

  const hash = crypto.createHash("sha256")
    .update(serverSeed + clientSeed + nonce)
    .digest("hex");

  const roll = (parseInt(hash.substring(0, 8), 16) % 6) + 1;

  let newBalance = balance;
  if (roll >= 4) {
    newBalance += bet; // Win (2x payout)
  } else {
    newBalance -= bet; // Loss
  }

  res.json({ roll, newBalance, hash, clientSeed, nonce });
};

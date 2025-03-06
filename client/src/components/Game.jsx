import { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";

export default function Game() {
  
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance !== null && !isNaN(storedBalance)) {
      return Number(storedBalance);
    } else {
      localStorage.setItem("balance", Number(1000));
      return Number(1000);
    }
  });

  const [bet, setBet] = useState(10);
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!isNaN(balance)) {
      localStorage.setItem("balance", Number(balance));
    }
  }, [balance]);

  const rollDice = async () => {
    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount!");
      return;
    }

    setRolling(true);
    setResult(null);

    try {
      const response = await axios.post("https://dice-game-backend-cxph.onrender.com/roll-dice", {
        bet,
        balance, // Send balance to backend
      });

      const { roll, newBalance } = response.data;

      setTimeout(() => {
        if (newBalance !== undefined && !isNaN(newBalance)) {
          setBalance(newBalance);
          localStorage.setItem("balance", newBalance); // Save balance in localStorage
        } else {
          console.error("Invalid balance received:", newBalance);
        }
        setResult(roll);
        setRolling(false);
      }, 1000);
    } catch (error) {
      console.error("Error rolling dice:", error);
      setRolling(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🎲 Fair Dice Game</h1>
      <p className="text-xl">Balance: ${balance}</p>

      {balance === 0 ? (
        <button
          onClick={() => {
            setBalance(1000);
            localStorage.setItem("balance", 1000);
          }}
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-md"
        >
          Reset Balance to $1000
        </button>
      ) : (
        <>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="mt-4 p-2 rounded bg-gray-800 text-white border border-gray-600 w-32 text-center"
          />

          <button
            onClick={rollDice}
            disabled={rolling}
            className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            {rolling ? "Rolling..." : "Roll Dice"}
          </button>
        </>
      )}

      {/* Dice Line */}
      <div className="mt-6 flex space-x-4">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <motion.div
            key={num}
            className={`w-12 h-12 flex items-center justify-center border rounded-md ${
              result === num ? "bg-green-500 scale-125" : "bg-gray-800"
            }`}
            animate={{ opacity: rolling ? [0.5, 1, 0.5] : 1 }}
            transition={{ repeat: rolling ? Infinity : 0, duration: 0.3 }}
          >
            {num}
          </motion.div>
        ))}
      </div>

      {result !== null && (
        <>
          <p className="mt-4 text-2xl">
            🎲 You rolled: <strong>{result}</strong>
          </p>
          <p className="mt-4 text-2xl">
            {result < 4 ? "!!!LOST!!!" : "$$$WON$$$"}
          </p>
        </>
      )}
    </div>
  );
}

import express from "express";
import cors from "cors";

import { rollDice } from "./routes/rolldice.route.js";

const PORT = 4500;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/roll-dice", rollDice);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

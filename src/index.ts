import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "@/api";
import sql from "@/config/postgres";

const PORT = process.env.PORT || "8000";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => res.send("🦀"));

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

(async () => {
  // console.log(await sql`SELECT * FROM users`);
})();

import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "@/api/api.router";
import corsOptions from "@/utils/cors";
import rateLimiter from "@/utils/express-rate-limit";

const PORT = process.env.PORT || "8000";

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(rateLimiter);

app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

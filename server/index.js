import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./MongoDB/connection.js";
import bodyParser from "body-parser";
import Routes from "./routes/route.js";
import cookieParser from "cookie-parser";

const app = express();
config({ path: "./.env" });

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

connectDB();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/api", Routes);

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});

import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./database.js";
import usuarioRoutes from "./routes/usuario.routes.js";

connectDb();

dotenv.config();

const app = express();

app.set("port", process.env.PORT);
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

app.listen(app.get("port"), () => {
  console.log("Escuchando por el puerto", app.get("port"));
});

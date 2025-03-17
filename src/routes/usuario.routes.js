import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";

const usuarioRoutes = Router();

usuarioRoutes.post("/", usuarioController.postUser);
usuarioRoutes.get("/", usuarioController.getAllUser);
usuarioRoutes.get("/buscar", usuarioController.getUserByCiudad); 
usuarioRoutes.get("/:id", usuarioController.getUserById);
usuarioRoutes.put("/:id", usuarioController.putUsuario);
usuarioRoutes.delete("/:id", usuarioController.deleteUser);

export default usuarioRoutes;

import mongoose from "mongoose";
import { handleError } from "../helpers/error.handler.js";
import { response } from "../helpers/response.js";
import { usuarioModel } from "../models/usuario.model.js";

const usuarioController = {};

// ** Crea un usuario en la base de datos

usuarioController.postUser = async (req, res) => {
  try {
    const { nombre, email, edad, direcciones } = req.body;

    if (
      !nombre ||
      !email ||
      !edad ||
      !Array.isArray(direcciones) ||
      direcciones.length === 0
    ) {
      return response(
        res,
        400,
        false,
        "",
        "Todos los campos son requeridos para crear el usuario"
      );
    }

    const emailFound = await usuarioModel.findOne({ email: email });
    if (emailFound) {
      return response(
        res,
        400,
        false,
        "",
        `El email ${email} ya se encuentra registrado en la base de datos`
      );
    }

    const newUser = await usuarioModel.create(req.body);
    return response(res, 201, true, newUser, "Usuario creado");
  } catch (error) {
    return handleError(res, error);
  }
};

// ** Obtiene la lista de usuarios

usuarioController.getAllUser = async (req, res) => {
    try {
      let { pagina, limite } = req.query;
  
      pagina = parseInt(pagina) || 1;
      limite = parseInt(limite) || 10;
  
      if (isNaN(pagina) || isNaN(limite) || pagina < 1 || limite < 1) {
        return response(
          res,
          400,
          false,
          "",
          "Los parámetros 'pagina' y 'limite' tienen que ser numéricos y mayores a 0"
        );
      }
  
      const skip = (pagina - 1) * limite;
  
      const users = await usuarioModel
        .find()
        .sort({ fecha_creacion: -1 })
        .skip(skip)
        .limit(limite)
        .lean();
  
      if (users.length === 0) {
        return response(res, 404, false, "", "No se encontraron usuarios");
      }
  
      const totalUsers = await usuarioModel.countDocuments();
  
      return response(
        res,
        200,
        true,
        {
          totalUsers,
          pagina, 
          limite,
          totalPages: Math.ceil(totalUsers / limite),
          users,
        },
        "Lista de usuarios por paginación"
      );
  
    } catch (error) {
      return handleError(res, error);
    }
  };

// ** Obtiene un usuario por su ID

usuarioController.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response(
        res,
        400,
        false,
        "",
        `El id ${id} no es valido para la base de datos`
      );
    }

    const userFound = await usuarioModel.findById({ _id: id });
    if (!userFound) {
      return response(
        res,
        404,
        false,
        "",
        `Usuario no encontrado con el id ${id}`
      );
    }

    return response(res, 200, true, userFound, "Usuario encontrado");
  } catch (error) {
    return handleError(res, error);
  }
};

// ** Actualiza un usuario por su ID

usuarioController.putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, edad, direcciones } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response(
        res,
        400,
        false,
        "",
        `El id ${id} no es valido para la base de datos`
      );
    }

    const userFound = await usuarioModel.findById({ _id: id });
    if (!userFound) {
      return response(
        res,
        404,
        false,
        "",
        `Usuario no encontrado con el id ${id}`
      );
    }

    if (
      !nombre ||
      !email ||
      !edad ||
      !Array.isArray(direcciones) ||
      direcciones.length === 0
    ) {
      return response(
        res,
        400,
        false,
        "",
        "Todos los campos son requeridos para actualizar el usuario"
      );
    }

    if (userFound.email !== email) {
      const emailFound = await usuarioModel.findOne({ email: email });
      if (emailFound) {
        return response(
          res,
          400,
          false,
          "",
          `El email ${email} ya se encuentra registrado en la base de datos`
        );
      }
    }

    const userUpdate = await usuarioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return response(
      res,
      200,
      true,
      userUpdate,
      "Usuario actualizado"
    );
  } catch (error) {
    return handleError(res, error);
  }
};

// ** Elimina un usuario por su ID

usuarioController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response(
        res,
        400,
        false,
        "",
        `El id ${id} no es valido para la base de datos`
      );
    }

    const userFound = await usuarioModel.findById({ _id: id });
    if (!userFound) {
      return response(
        res,
        404,
        false,
        "",
        `Usuario no encontrado con el id ${id}`
      );
    }

    await userFound.deleteOne();
    return response(res, 200, true, "", `Usuario eliminado con el id ${id}`);
  } catch (error) {
    return handleError(res, error);
  }
};

// ** Busca usuarios que tengan una dirección en una

usuarioController.getUserByCiudad = async (req, res) => {
  try {
    const { ciudad } = req.query;

    if (!ciudad) {
      return response(res, 400, false, "", "El parametro ciudad es requerido");
    }

    const usersByCiudad = await usuarioModel.find({
      "direcciones.ciudad": ciudad,
    });
    if (usersByCiudad.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        `No se encontraron usuarios en la ciudad ${ciudad}`
      );
    }

    return response(
      res,
      200,
      true,
      usersByCiudad,
      `Lista de usuarios registrados en la ciudad ${ciudad}`
    );
  } catch (error) {
    return handleError(res, error);
  }
};

export default usuarioController;

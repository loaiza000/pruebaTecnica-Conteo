import mongoose from "mongoose";

const { model, Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: [true, "El campo nombre es requerido"] },
    email: {
      type: String,
      required: [true, "El campo email es requerido"],
      unique: true,
    },
    edad: { type: Number },
    fecha_creacion: { type: Date, default: Date.now },
    direcciones: [
      {
        calle: {
          type: String,
          required: [true, "El campo calle es requerido"],
        },
        ciudad: {
          type: String,
          required: [true, "El campo ciudad es requerido"],
        },
        pais: { type: String, required: [true, "El campo pais es requerido"] },
        codigo_postal: {
          type: String,
          required: [true, "El campo codigo postal es requerido"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const usuarioModel = model("usuario", usuarioSchema);

import mongoose from "mongoose";

// esquema de usuario unificado para autenticacion y roles
const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        contrasenia: {
            type: String,
            select: false,
        },
        password: {
            type: String,
            select: false,
        },
        rol: {
            type: String,
            enum: ["cliente", "admin"],
            default: "cliente",
        },
    },
    {
        timestamps: true,
        collection: "usuarios", // unica coleccion en la base de datos
    }
);

// validamos que exista contraseña y sincronizamos campos por compatibilidad
userSchema.pre("validate", function () {
    if (!this.contrasenia && !this.password) {
        this.invalidate("contrasenia", "La contrasenia es obligatoria");
    }
    if (this.contrasenia && !this.password) {
        this.password = this.contrasenia;
    } else if (this.password && !this.contrasenia) {
        this.contrasenia = this.password;
    }
});

// exportamos el modelo User apuntando a la tabla 'usuarios'
const User = mongoose.models.User || mongoose.model("User", userSchema, "usuarios");

export default User;

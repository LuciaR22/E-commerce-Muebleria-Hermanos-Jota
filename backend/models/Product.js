
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
    },
    descripcion: {
        type: String,
        required: false,
    },
    precio: {
        type: Number,
        required: [true, "El precio del producto es obligatorio"],
        min: [0.01, "El precio no puede ser menor a 0.01"],
    },
    stock: {
        type: Number,
        required: false,
        min: [0, "El stock no puede ser negativo"],
        default: 0,
    },
    imagenUrl: {
        type: String,
        required: false,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

import { useEffect, useState } from "react";
import "./ProductForm.css";

const defaultInitialValues = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
};

/**
 * formulario reutilizable para crear y editar productos.
 *
 * 
 * podés reutilizar este mismo formulario en tu vista de editar producto así:
 *
 * <ProductForm
 *     initialValues={producto}          // producto traído desde get /api/productos/:id
 *     onSubmit={handleEditarProducto}   // función que hace el put /api/productos/:id
 *     submitLabel="Guardar cambios"     // texto del botón para edición
 *     isSubmitting={guardando}          // booleano mientras se envía el put
 * />
 *
 * qué hace el componente por vos:
 * - precarga los campos cuando le pasas initialValues.
 * - ya convierte automáticamente precio y stock a Number antes de llamar a onSubmit.
 * - deshabilita el botón y muestra "Guardando..." si isSubmitting es true.
 */
function ProductForm({
    initialValues = defaultInitialValues,
    onSubmit,
    submitLabel = "Guardar producto",
    isSubmitting = false,
}) {
    // estado único en forma de objeto para controlar todos los inputs
    const [formData, setFormData] = useState({
        ...defaultInitialValues,
        ...initialValues,
    });

    // sincronizar los campos si initialValues cambia tras cargar datos de la api (útil para t4)
    useEffect(() => {
        if (initialValues) {
            setFormData(prev => ({
                ...prev,
                ...initialValues,
            }));
        }
    }, [initialValues]);

    // un solo manejador de cambios usando el atributo name del input
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // manejo del envío del formulario
    const handleSubmit = e => {
        e.preventDefault();

        // convertir precio y stock a número
        const datosAEnviar = {
            ...formData,
            precio: Number(formData.precio),
            stock: formData.stock === "" ? 0 : Number(formData.stock),
        };

        if (onSubmit) {
            onSubmit(datosAEnviar);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            {/* campo: nombre */}
            <div className="form-group">
                <label htmlFor="nombre">Nombre del producto *</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* campo: descripción */}
            <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    rows="4"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>

            {/* campos: precio y stock */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="precio">Precio (ARS) *</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        min="0.01"
                        step="any"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock disponible</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        min="0"
                        step="1"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* campo: imagenUrl */}
            <div className="form-group">
                <label htmlFor="imagenUrl">URL de la imagen</label>
                <input
                    type="text"
                    id="imagenUrl"
                    name="imagenUrl"
                    value={formData.imagenUrl}
                    onChange={handleChange}
                />
            </div>

            {/* botón de envío con estado deshabilitado mientras se guarda */}
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : submitLabel}
            </button>
        </form>
    );
}

export default ProductForm;

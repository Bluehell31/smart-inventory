"use client";
import { crearProducto, modificarProducto } from "@/lib/productos"; // Importar las funciones para crear y modificar productos
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Productos({ form, categorias,medidas,proveedores,usuarios, mode }) {
  const { refresh,replace } = useRouter();
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState(form || {});

  // Manejador para los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = async () => {
    switch (mode) {
      case "create":
        await crearProducto(formData);
        break;
      case "update":
        await modificarProducto(formData);
        break;
    }
    refresh();
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      <div className="mb-4">
        <label
          htmlFor="nombre"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre del Producto:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="descripcion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="precio"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Precio:
        </label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="idcategoria"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Categoría:
        </label>
        <select
          id="idcategoria"
          name="idcategoria"
          value={formData.idcategoria || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {categorias.map((categoria) => (
            <option key={categoria.value} value={categoria.value}>
              {categoria.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="idmedida" className="block text-gray-700 text-sm font-bold mb-2">
          Medida:
        </label>
        <select
          id="idmedida"
          name="idmedida"
          value={formData.idmedida || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {medidas.map((medida) => (
            <option key={medida.value} value={medida.value}>
              {medida.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="idproveedor" className="block text-gray-700 text-sm font-bold mb-2">
          Proveedor:
        </label>
        <select
          id="idproveedor"
          name="idproveedor"
          value={formData.idproveedor || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {proveedores.map((proveedor) => (
            <option key={proveedor.value} value={proveedor.value}>
              {proveedor.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
      <label htmlFor="usuariocreador" className="block text-gray-700 text-sm font-bold mb-2">
        Usuario Creador:
      </label>
      <select
        id="usuariocreador"
        name="usuariocreador"
        value={formData.usuariocreador || ""}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        {usuarios.map((usuario) => (
          <option key={usuario.value} value={usuario.value}>
            {usuario.label}
          </option>
        ))}
      </select>
    </div>
      <button
        onClick={async () => {
          await handleSubmit(); // Espera a que handleSubmit se complete
          refresh();
          replace('/productos');
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
      Enviar  
      </button>
    </div>
  );
}

"use client";
import { crearCategoria, modificarCategoria } from "@/lib/categorias";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Categorias({ form, mode }) {
  const { refresh, replace } = useRouter();
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
        await crearCategoria(formData);
        break;
      case "update":
        await modificarCategoria(formData);
        break;
    }
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      <div className="mb-4">
      <label
          htmlFor="idcategoria"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Código de la Categoría:
        </label>
        {mode === "update" && (
            
          <input
            type="text"
            id="idcategoria"
            name="idcategoria"
            value={formData.idcategoria || ""}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="nombrecategoria"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de la Categoría:
        </label>
        <input
          type="text"
          id="nombrecategoria"
          name="nombrecategoria"
          value={formData.nombrecategoria || ""}
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
      <button
        onClick={async () => {
          await handleSubmit(); // Espera a que handleSubmit se complete
          refresh();
          replace('/categorias');
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </div>
  );
}

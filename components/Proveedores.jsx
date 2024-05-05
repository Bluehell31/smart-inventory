"use client";
import { crearProveedor, modificarProveedor } from "@/lib/proveedores";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Proveedores({ form, mode }) {
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
        await crearProveedor(formData);
        break;
      case "update":
        await modificarProveedor(formData);
        break;
    }
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      {mode === "update" && (
        <div className="mb-4">
          <label
            htmlFor="idproveedor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Código del Proveedor:
          </label>
          <input
            type="text"
            id="idproveedor"
            name="idproveedor"
            value={formData.idproveedor || ""}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="nombreproveedor"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre del Proveedor:
        </label>
        <input
          type="text"
          id="nombreproveedor"
          name="nombreproveedor"
          value={formData.nombreproveedor || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="direccion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Dirección:
        </label>
        <textarea
          id="direccion"
          name="direccion"
          value={formData.direccion || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="telefono"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Teléfono:
        </label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={async () => {
          await handleSubmit(); // Espera a que handleSubmit se complete
          refresh();
          replace("/proveedores");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </div>
  );
}

"use client";
import { crearMedida, modificarMedida } from "@/lib/medidas";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Medidas({ form, mode }) {
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
        await crearMedida(formData);
        break;
      case "update":
        await modificarMedida(formData);
        break;
    }
    refresh();
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      {mode === "update" && (
        <div className="mb-4">
          <label
            htmlFor="idmedida"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Código de la Medida:
          </label>
          <input
            type="text"
            id="idmedida"
            name="idmedida"
            value={formData.idmedida || ""}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="nombremedida"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de la Medida:
        </label>
        <input
          type="text"
          id="nombremedida"
          name="nombremedida"
          value={formData.nombremedida || ""}
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
          replace('/medidas');
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </div>
  );
}

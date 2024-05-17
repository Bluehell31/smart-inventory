"use client";
import { crearBodega, modificarBodega } from "@/lib/bodegas";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Bodegas({ form, mode }) {
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

  
  const handleSubmit = async () => {
    switch (mode) {
      case "create":
        await crearBodega(formData);
        break;
      case "update":
        await modificarBodega(formData);
        break;
    }
    
    replace('/bodegas');
    refresh();
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      {mode === "update" && (
      <div className="mb-4">
        <label
          htmlFor="idbodega"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Código de la Bodega:
        </label>
        
          <input
            type="text"
            id="idbodega"
            name="idbodega"
            value={formData.idbodega || ""}
            readOnly
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        
      </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="nombrebodega"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre de la Bodega:
        </label>
        <input
          type="text"
          id="nombrebodega"
          name="nombrebodega"
          value={formData.nombrebodega || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ubicacion"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Ubicación:
        </label>
        <textarea
          id="ubicacion"
          name="ubicacion"
          value={formData.ubicacion || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={async () => {
          await handleSubmit(); // Espera a que handleSubmit se complete
          refresh();
          
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </div>
  );
}

"use client";
import { crearMovimiento, modificarMovimiento } from "@/lib/movimientos"; // Import functions for creating and modifying movements
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Movimientos({ form, productos, bodegas, usuarios, mode }) {
  const { refresh, replace } = useRouter();
  const [formData, setFormData] = useState(form || {
  idproducto: '', // Valor inicial vacío para que se seleccione la etiqueta por defecto
  idbodega: '',
  idusuario: ''});

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
        await crearMovimiento(formData);
        break;
      case "update":
        await modificarMovimiento(formData);
        break;
    }
    
    replace('/movimientos');
  };

  return (
    <div className="w-1/3 mx-auto p-4 shadow-md bg-white">
      <div className="mb-4">
        <label htmlFor="idproducto" className="block text-gray-700 text-sm font-bold mb-2">
          Producto:
        </label>
        <select
          id="idproducto"
          name="idproducto"
          value={formData.idproducto}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.value} value={producto.value}>
              {producto.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="idbodega" className="block text-gray-700 text-sm font-bold mb-2">
          Bodega:
        </label>
        <select
          id="idbodega"
          name="idbodega"
          value={formData.idbodega}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una bodega</option>
          {bodegas.map((bodega) => (
            <option key={bodega.value} value={bodega.value}>
              {bodega.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="cantidad" className="block text-gray-700 text-sm font-bold mb-2">
          Cantidad:
        </label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad || ""}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="idusuario" className="block text-gray-700 text-sm font-bold mb-2">
          Usuario:
        </label>
        <select
          id="idusuario"
          name="idusuario"
          value={formData.idusuario}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.value} value={usuario.value}>
              {usuario.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={async () => {
          await handleSubmit();
          refresh(); // Refresh the page to reflect changes
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </div>
  );
}

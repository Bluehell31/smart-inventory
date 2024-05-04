"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Button({ action, value, children }) {
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAction = async () => {
    try {
      setLoading(true);
      await action(value);
      refresh();  // Refrescar la página para mostrar los cambios
      setLoading(false);
    } catch (err) {
      setError(err.message);  // Guardar mensaje de error
      setLoading(false);
      console.error("Error in Button component:", err);
    }
  };

  return (
    <button
      onClick={handleAction}
      disabled={loading}
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Cargando..." : children || "Eliminar"}
      {error && <p className="text-red-500 text-xs">{error}</p>} 
    </button>
  );
}

import Link from "next/link";
import Button from "@/components/Button";
import { eliminarMedida, obtenerMedidas } from "@/lib/medidas";

export default async function Page() {
  const medidas = await obtenerMedidas();

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="flex justify-center">
        <Link
          href="/medidas/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nueva Medida
        </Link>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medidas.map((medida) => (
            <tr key={medida.idmedida} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link
                  href={`/medidas/${medida.idmedida}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {medida.idmedida}
                </Link>
              </td>
              <td className="border px-4 py-2">{medida.nombremedida}</td>
              <td className="border px-4 py-2">{medida.descripcion}</td>
              <td className="border px-4 py-2">
                <Button
                  action={eliminarMedida}
                  value={medida.idmedida}
                > 
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

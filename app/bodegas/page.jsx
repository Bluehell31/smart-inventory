import Link from "next/link";
import Button from "@/components/Button";
import { eliminarBodega, obtenerBodegas } from "@/lib/bodegas.js";

export default async function Page() {
  const bodegas = await obtenerBodegas();

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="flex justify-center">
        <Link
          href="/bodegas/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nueva Bodega
        </Link>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Ubicación</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bodegas.map((bodega) => (
            <tr key={bodega.idbodega} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link href={`/bodegas/${bodega.idbodega}`} className="text-blue-600 hover:text-blue-800">
                  {bodega.idbodega}
                </Link>
              </td>
              <td className="border px-4 py-2">{bodega.nombrebodega}</td>
              <td className="border px-4 py-2">{bodega.ubicacion}</td>
              <td className="border px-4 py-2">
                <Button
                 action={eliminarBodega}
                 value={bodega.idbodega}
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

import Link from "next/link";
import Button from "@/components/Button";
import { eliminarProveedor, obtenerProveedores } from "@/lib/proveedores";
import Proveedores from "@/components/Proveedores";

export default async function Page() {
  const proveedores = await obtenerProveedores();

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="flex justify-center">
        <Link
          href="/proveedores/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nuevo Proveedor
        </Link>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.idproveedor} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link
                  href={`/proveedores/${proveedor.idproveedor}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {proveedor.idproveedor}
                </Link>
              </td>
              <td className="border px-4 py-2">{proveedor.nombreproveedor}</td>
              <td className="border px-4 py-2">{proveedor.direccion}</td>
              <td className="border px-4 py-2">{proveedor.telefono}</td>
              <td className="border px-4 py-2">{proveedor.email}</td>
              <td className="border px-4 py-2">
                <Button
                  action={eliminarProveedor}
                  value={proveedor.idproveedor}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Proveedores mode="insert" />
    </div>
  );
}

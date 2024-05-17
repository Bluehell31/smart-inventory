import Link from "next/link";
import Button from "@/components/Button";
import { eliminarMovimiento, obtenerMovimientos } from "@/lib/movimientos"; // Ajustar las importaciones

export default async function Page() {
  const movimientos= await obtenerMovimientos(); // Obtener la lista de productos

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="absolute top-4 left-4">
      <Link
          href="/" // Cambiar la ruta a donde se crea un nuevo producto
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
            Volver al menu principal
          </Link>
        </div>
      <div className="flex justify-center">
        <Link
          href="/movimientos/create" // Ruta para crear un nuevo movimiento
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nuevo Movimiento
        </Link>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID Movimiento</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Bodega</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
            <tr key={movimiento.idmovimiento} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link
                  href={`/movimientos/${movimiento.idmovimiento}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {movimiento.idmovimiento}
                </Link>
              </td>
              <td className="border px-4 py-2">{new Date(movimiento.fechamovimiento).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{movimiento.nombre}</td>
              <td className="border px-4 py-2">{movimiento.nombrebodega}</td>
              <td className="border px-4 py-2">{movimiento.cantidad}</td>
              <td className="border px-4 py-2">{movimiento.nombreusuario}</td>
              <td className="border px-4 py-2">
                <Button
                  action={eliminarMovimiento}
                  value={movimiento.idmovimiento}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

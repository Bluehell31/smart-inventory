import Link from "next/link";
import Button from "@/components/Button";
import { eliminarProducto, obtenerProductos } from "@/lib/productos";

export default async function Page() {
  const productos = await obtenerProductos(); // Obtener la lista de productos

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="absolute top-4 left-4">
        <Link
          href="/" 
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Volver al menu principal
        </Link>
      </div>
      <div className="flex justify-center">
        <Link
          href="/productos/create" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nuevo Producto
        </Link>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Medida</th>
            <th className="px-4 py-2">Proveedor</th>
            <th className="px-4 py-2">Usuario Creador</th> 
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.idproducto} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link
                  href={`/productos/${producto.idproducto}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {producto.idproducto}
                </Link>
              </td>
              <td className="border px-4 py-2">{producto.nombre_producto}</td>
              <td className="border px-4 py-2">{producto.descripcion_producto}</td>
              <td className="border px-4 py-2">{producto.precio}</td>
              <td className="border px-4 py-2">{producto.nombre_categoria}</td>
              <td className="border px-4 py-2">{producto.nombre_medida}</td>
              <td className="border px-4 py-2">{producto.nombre_proveedor}</td>
              <td className="border px-4 py-2">{producto.nombre_usuario}</td>
              <td className="border px-4 py-2">
                <Button
                  action={eliminarProducto}
                  value={producto.idproducto}
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

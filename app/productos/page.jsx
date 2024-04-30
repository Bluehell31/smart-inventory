import Link from "next/link";
import Button from "@/components/Button";
import { eliminarProducto, obtenerProductos } from "@/lib/productos"; // Importar las funciones para eliminar y obtener productos
import Productos from "@/components/Productos"; // Importar el componente de productos

export default async function Page() {
  const productos = await obtenerProductos(); // Obtener la lista de productos

  return (
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="flex justify-center">
        <Link
          href="/productos/create" // Cambiar la ruta a donde se crea un nuevo producto
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
            <th className="px-4 py-2">Descripción</th> {/* Cambiar a "Descripción" */}
            <th className="px-4 py-2">Precio</th> {/* Agregar "Precio" */}
            <th className="px-4 py-2">ID Categoría</th> {/* Agregar "ID Categoría" */}
            <th className="px-4 py-2">ID Medida</th> {/* Agregar "ID Medida" */}
            <th className="px-4 py-2">ID Proveedor</th> {/* Agregar "ID Proveedor" */}
            <th className="px-4 py-2">Usuario Creador</th> {/* Agregar "Usuario Creador" */}
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => ( // Iterar sobre la lista de productos
            <tr key={producto.idproducto} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{producto.idproducto}</td>
              <td className="border px-4 py-2">{producto.nombre}</td> {/* Cambiar a "Nombre" */}
              <td className="border px-4 py-2">{producto.descripcion}</td> {/* Cambiar a "Descripcion" */}
              <td className="border px-4 py-2">{producto.precio}</td> {/* Agregar "Precio" */}
              <td className="border px-4 py-2">{producto.idcategoria}</td> {/* Agregar "IDCategoria" */}
              <td className="border px-4 py-2">{producto.idcategoria}</td> {/* Agregar "IDMedida" */}
              <td className="border px-4 py-2">{producto.idcategoria}</td> {/* Agregar "IDProveedor" */}
              <td className="border px-4 py-2">{producto.usuariocreador}</td> {/* Agregar "UsuarioCreador" */}
              <td className="border px-4 py-2">
                <Button
                  action={eliminarProducto} // Cambiar la función para eliminar productos
                  value={producto.IDProducto} // Cambiar el valor que se pasa a la función eliminarProducto
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Productos mode="insert" /> {/* Utilizar el componente de productos con el modo "insert" */}
    </div>
  );
}
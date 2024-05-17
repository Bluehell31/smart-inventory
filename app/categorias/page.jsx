import Link from "next/link";
import Button from "@/components/Button";
import { eliminarCategoria, obtenerCategorias } from "@/lib/categorias.js";

export default async function Page() {
  const categorias = await obtenerCategorias();

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
          href="/categorias/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nueva Categoria
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
          {categorias.map((categoria) => (
            <tr key={categoria.idcategoria} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <Link href={`/categorias/${categoria.idcategoria}`} className="text-blue-600 hover:text-blue-800">
                  {categoria.idcategoria}
                </Link>
              </td>
              <td className="border px-4 py-2">{categoria.nombrecategoria}</td>
              <td className="border px-4 py-2">{categoria.descripcion}</td>
              <td className="border px-4 py-2">
              <Button
                  action={eliminarCategoria}
                  value={categoria.idcategoria}
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

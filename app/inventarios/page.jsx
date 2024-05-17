import Link from "next/link";
import { obtenerInventario } from "@/lib/inventarios"; // Asegúrate de que la ruta y el nombre de la función sean correctos

export default async function Page() {
  const inventario = await obtenerInventario(); // Obtener la lista de inventario agrupada por bodega

  return (
    
    <div className="flex flex-col mx-auto px-4 py-6 gap-6">
      <div className="absolute top-2 left-2">
      <Link
          href="/" // Cambiar la ruta a donde se crea un nuevo producto
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
            Volver al menu principal
          </Link>
        </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID Bodega</th>
            <th className="px-4 py-2">Nombre Bodega</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Cantidad Total</th>
          </tr>
        </thead> 
        <tbody>
          {inventario.map((item) => (
            <tr key={`${item.idbodega}-${item.idproducto}`} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{item.idbodega}</td>
              <td className="border px-4 py-2">{item.nombrebodega}</td>
              <td className="border px-4 py-2">{item.nombreproducto}</td>
              <td className="border px-4 py-2">{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

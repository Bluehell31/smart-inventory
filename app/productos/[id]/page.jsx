import Productos from "@/components/Productos"; // Importa el componente de productos
import { obtenerProducto } from "@/lib/productos"; // Importa la función para obtener un producto

export default async function Page({ params: { id } }) {
  const producto = await obtenerProducto(id); // Obtiene el producto con el ID especificado
  return <Productos form={producto} mode="update" />; // Renderiza el componente de productos con el modo "update"
}

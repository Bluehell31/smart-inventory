import Productos from "@/components/Productos"; // Importa el componente de productos
import { obtenerCategoriasArray } from "@/lib/categorias";
import { obtenerProducto } from "@/lib/productos"; // Importa la función para obtener un producto
import { obtenerProveedoresArray } from "@/lib/proveedores";
import { obtenerMedidasArray } from "@/lib/medidas";
import { obtenerUsuariosArray } from "@/lib/usuarios";
export default async function page({ params: { id } }) {
  const producto = await obtenerProducto(id); // Obtiene el producto con el ID especificado
  const categorias = await obtenerCategoriasArray();
  const medidas = await obtenerMedidasArray();
  const proveedores = await obtenerProveedoresArray();
  const usuarios = await obtenerUsuariosArray();
  return <Productos form={producto} categorias={categorias} medidas={medidas} proveedores={proveedores} usuarios={usuarios} mode="update" />; // Renderiza el componente de productos con el modo "update"
}

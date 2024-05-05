import Movimientos from "@/components/Movimientos"; // Importa el componente de movimientos
import { obtenerProductosArray } from "@/lib/productos"; // Asumiendo que tienes una función para obtener todos los productos
import { obtenerBodegasArray } from "@/lib/bodegas"; // Función para obtener todas las bodegas
import { obtenerUsuariosArray } from "@/lib/usuarios"; // Función para obtener todos los usuarios

export default async function Page() {
  const productos = await obtenerProductosArray();
  const bodegas = await obtenerBodegasArray();
  const usuarios = await obtenerUsuariosArray();
  return (
    <Movimientos 
      productos={productos} 
      bodegas={bodegas} 
      usuarios={usuarios} 
      mode="create" 
    /> // Renderiza el componente de movimientos con el modo "create"
  );
}

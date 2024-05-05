import Movimientos from "@/components/Movimientos"; // Asegúrate de que la ruta al componente sea correcta
import { obtenerMovimiento } from "@/lib/movimientos"; // Importa la función para obtener un movimiento
import { obtenerProductosArray } from "@/lib/productos"; // Asumiendo que tienes una función para obtener todos los productos
import { obtenerBodegasArray } from "@/lib/bodegas"; // Función para obtener todas las bodegas
import { obtenerUsuariosArray } from "@/lib/usuarios"; // Función para obtener todos los usuarios

export default async function Page({ params: { id } }) {
  const movimiento = await obtenerMovimiento(id); // Obtiene el movimiento con el ID especificado
  const productos = await obtenerProductosArray();
  const bodegas = await obtenerBodegasArray();
  const usuarios = await obtenerUsuariosArray();
  return (
    <Movimientos 
      form={movimiento} 
      productos={productos} 
      bodegas={bodegas} 
      usuarios={usuarios} 
      mode="update" 
    /> // Renderiza el componente de movimientos con el modo "update"
  );
}

import Productos from "@/components/Productos"; // Importa el componente de productos
import { obtenerCategoriasArray } from "@/lib/categorias";
import { obtenerProveedoresArray } from "@/lib/proveedores";
import { obtenerMedidasArray } from "@/lib/medidas";
import { obtenerUsuariosArray } from "@/lib/usuarios";

export default async function page() {
  const categorias = await obtenerCategoriasArray();
  const proveedores = await obtenerProveedoresArray();
  const medidas = await obtenerMedidasArray();
  const usuarios = await obtenerUsuariosArray();
  return (
    <Productos 
      categorias={categorias} 
      medidas={medidas} 
      proveedores={proveedores} 
      usuarios={usuarios}
      mode="create" 
    />
  ); // Renderiza el componente de productos con el modo "update"
}

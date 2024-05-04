import Categorias from "@/components/Categorias";
import { obtenerCategoria } from "@/lib/categorias"; // Asegúrate de tener esta función en tu librería de categorías

export default async function Page({ params: { id } }) {
  const categoria = await obtenerCategoria(id);
  return <Categorias form={categoria} mode="update" />;
}

import Medidas from "@/components/Medidas";
import { obtenerMedida } from "@/lib/medidas"; // Asegúrate de tener esta función en tu librería de categorías

export default async function Page({ params: { id } }) {
  const medida = await obtenerMedida(id);
  return <Medidas form={medida} mode="update" />;
}

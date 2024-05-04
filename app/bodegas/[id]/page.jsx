import Bodegas from "@/components/Bodegas";
import { obtenerBodega } from "@/lib/bodegas";

export default async function Page({ params: { id } }) {
  const bodega = await obtenerBodega(id);
  return <Bodegas form={bodega} mode="update" />;
}

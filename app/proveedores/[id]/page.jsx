import Proveedores from "@/components/Proveedores";
import { obtenerProveedor } from "@/lib/proveedores";

export default async function page({ params: { id } }) {
  const proveedor = await obtenerProveedor(id);
  return <Proveedores form={proveedor} mode="update" />;
}

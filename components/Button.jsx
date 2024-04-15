"use client";
import { useRouter } from "next/navigation";
export default function Button({ action, value }) {
  const { refresh } = useRouter();
  const handleAction = async () => {
    await action(value);
    refresh();
  };
  return (
    <button
      onClick={handleAction}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Eliminar
    </button>
  );
}

// pages/index.js

import Link from 'next/link';

export default function Home() {
    return (
        <div className="container mx-auto p-4 text-center">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Bienvenido a Smart Inventory</h1>
                <p className="text-lg text-gray-600">La herramienta definitiva para gestionar tu inventario de manera eficiente.</p>
            </header>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/productos" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Gestionar Productos
                </Link>
                <Link href="/categorias" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Gestionar Categorías
                </Link>
                <Link href="/proveedores" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Gestionar Proveedores
                </Link>
                <Link href="/inventarios" className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                    Gestionar Inventario
                </Link>
                <Link href="/bodegas" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Gestionar Bodegas
                </Link>
                <Link href="/movimientos" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Registro de Movimientos
                </Link>
                <Link href="/traslados" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Gestionar Traslados
                </Link>
                <Link href="/historialInventario" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                    Historial de Inventario
                </Link>
                <Link href="/medidas" className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Medidas
                </Link>
            </div>
        </div>
    );
}

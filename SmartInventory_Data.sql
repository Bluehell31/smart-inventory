-- Insertar datos de prueba en la tabla Roles
INSERT INTO Roles (NombreRol, Descripcion) VALUES 
('Administrador', 'Gestión completa del sistema'),
('Operador de Inventario', 'Gestión y actualización de inventario'),
('Gerente de Bodega', 'Supervisión y manejo de operaciones de bodega'),
('Analista de Datos', 'Análisis de tendencias de inventario y reportes'),
('Supervisor de Proveedores', 'Manejo de relaciones con proveedores'),
('Auditor', 'Verificación y auditoría de inventario'),
('Técnico de Inventario', 'Asistencia técnica en la gestión de inventario'),
('Coordinador de Transporte', 'Coordinación de traslados y logística'),
('Ejecutivo de Ventas', 'Manejo de ventas y pedidos de clientes'),
('Agente de Compras', 'Gestión de compras y órdenes a proveedores');

-- Insertar datos de prueba en la tabla Usuarios
-- Por favor, reemplaza 'contraseña_hash' por una contraseña real encriptada.
INSERT INTO Usuarios (NombreUsuario, Password, Email, IDRol) VALUES 
('jdoe', 'contraseña_hash', 'jdoe@example.com', 1),
('mdavis', 'contraseña_hash', 'mdavis@example.com', 2),
('ftorres', 'contraseña_hash', 'ftorres@example.com', 3),
('lsmith', 'contraseña_hash', 'lsmith@example.com', 4),
('ejohnson', 'contraseña_hash', 'ejohnson@example.com', 5),
('mwilson', 'contraseña_hash', 'mwilson@example.com', 6),
('jwright', 'contraseña_hash', 'jwright@example.com', 7),
('rlopez', 'contraseña_hash', 'rlopez@example.com', 8),
('klee', 'contraseña_hash', 'klee@example.com', 9),
('hmartin', 'contraseña_hash', 'hmartin@example.com', 10);

-- Insertar datos de prueba en la tabla Categorias
INSERT INTO Categorias (NombreCategoria, Descripcion) VALUES 
('Electrónicos', 'Dispositivos electrónicos y accesorios'),
('Ropa', 'Prendas de vestir y accesorios de moda'),
('Alimentos', 'Productos alimenticios y bebidas'),
('Ferretería', 'Herramientas y materiales de construcción'),
('Juguetes', 'Juguetes y juegos para todas las edades'),
('Libros', 'Literatura y materiales educativos'),
('Deportes', 'Equipo y accesorios deportivos'),
('Belleza', 'Cosméticos y productos de cuidado personal'),
('Hogar', 'Artículos para el hogar y decoración'),
('Jardinería', 'Herramientas y suministros para jardinería');

-- Insertar datos de prueba en la tabla Medidas
INSERT INTO Medidas (NombreMedida, Descripcion) VALUES 
('Unidades', 'Conteo por artículo individual'),
('Kilogramos', 'Peso medido en kilogramos'),
('Litros', 'Volumen medido en litros'),
('Metros', 'Longitud medida en metros'),
('Paquetes', 'Artículos empaquetados juntos'),
('Cajas', 'Artículos empaquetados en cajas'),
('Barriles', 'Líquidos almacenados en barriles'),
('Toneladas', 'Peso medido en toneladas'),
('Docenas', 'Conteo por docenas de artículos'),
('Pares', 'Conteo por pares, especialmente para zapatos y guantes');

-- Insertar datos de prueba en la tabla Proveedores
INSERT INTO Proveedores (NombreProveedor, Direccion, Telefono, Email) VALUES 
('ElectroMax', '1234 Elm St, Ciudad Sol', '555-0011', 'info@electromax.com'),
('RopaFashion', '4321 Maple Ave, Ciudad Luna', '555-0012', 'contacto@ropafashion.com'),
('FoodFresh', '6789 Oak St, Ciudad Estrella', '555-0013', 'ventas@foodfresh.com'),
('HerramientasTech', '9876 Pine St, Ciudad Cometa', '555-0014', 'soporte@herramientastech.com'),
('ToysKids', '5432 Birch St, Ciudad Cosmos', '555-0015', 'info@toyskids.com'),
('LibrosYa', '1234 Cedar St, Ciudad Planeta', '555-0016', 'contacto@librosya.com'),
('DeportesTotal', '4321 Spruce St, Ciudad Galaxia', '555-0017', 'ventas@deportestotal.com'),
('BeautyLine', '6789 Willow St, Ciudad Nebulosa', '555-0018', 'soporte@beautyline.com'),
('HomeGoods', '9876 Aspen St, Ciudad Aurora', '555-0019', 'info@homegoods.com'),
('GardenPlus', '5432 Palm St, Ciudad Eclipse', '555-0020', 'contacto@gardenplus.com');

-- Insertar datos de prueba en la tabla Bodegas
INSERT INTO Bodegas (NombreBodega, Ubicacion) VALUES 
('Bodega Central', 'Zona Industrial #1'),
('Bodega Secundaria', 'Zona Industrial #2'),
('Depósito Norte', 'Zona Industrial Norte'),
('Depósito Sur', 'Zona Industrial Sur'),
('Almacén Este', 'Zona Comercial Este'),
('Almacén Oeste', 'Zona Comercial Oeste'),
('Centro Logístico', 'Zona de Carga #1'),
('Punto de Distribución', 'Zona de Carga #2'),
('Bodega Temporal', 'Zona Temporal'),
('Espacio de Almacenaje', 'Zona de Reserva');

-- Insertar datos de prueba en la tabla Productos
-- Asegúrate de que las categorías y medidas ya estén insertadas.
INSERT INTO Productos (Nombre, Descripcion, Precio, IDCategoria, IDMedida, IDProveedor, UsuarioCreador) VALUES 
('Teléfono Inteligente', 'Smartphone de última generación', 499.99, 1, 1, 1, 1),
('Jeans Casual', 'Jeans de moda para todo uso', 39.99, 2, 6, 2, 1),
('Manzanas Orgánicas', 'Manzanas frescas y orgánicas', 2.99, 3, 2, 3, 1),
('Taladro Inalámbrico', 'Taladro de alto rendimiento', 89.99, 4, 6, 4, 1),
('Muñeca Cantante', 'Juguete musical para niños', 25.99, 5, 5, 5, 1),
('Novela Histórica', 'Libro de aventuras históricas', 14.99, 6, 4, 6, 1),
('Balón de Fútbol', 'Balón oficial de fútbol', 29.99, 7, 5, 7, 1),
('Lápiz Labial', 'Cosmético de larga duración', 9.99, 8, 3, 8, 1),
('Set de Cuchillos', 'Cuchillos de cocina profesionales', 79.99, 9, 6, 9, 1),
('Fertilizante', 'Fertilizante para todo tipo de plantas', 19.99, 10, 2, 10, 1);

-- Insertar datos de prueba en la tabla Movimientos
-- Asegúrate de que los productos y bodegas ya estén insertados.
INSERT INTO Movimientos (TipoMovimiento, FechaMovimiento, IDProducto, IDBodega, Cantidad, IDUsuario) VALUES 
('Entrada', '2024-03-01 10:00:00', 1, 1, 100, 1),
('Salida', '2024-03-02 15:30:00', 2, 2, 20, 1),
('Entrada', '2024-03-03 08:45:00', 3, 1, 150, 1),
('Salida', '2024-03-04 14:00:00', 4, 3, 30, 1),
('Entrada', '2024-03-05 09:15:00', 5, 2, 200, 1),
('Salida', '2024-03-06 16:00:00', 6, 4, 25, 1),
('Entrada', '2024-03-07 11:00:00', 7, 3, 300, 1),
('Salida', '2024-03-08 13:20:00', 8, 1, 40, 1),
('Entrada', '2024-03-09 10:10:00', 9, 2, 250, 1),
('Salida', '2024-03-10 12:00:00', 10, 4, 50, 1);

-- Insertar datos de prueba en la tabla Traslados
-- Asegúrate de que los productos y bodegas ya estén insertados.
INSERT INTO Traslados (IDProducto, BodegaOrigenID, BodegaDestinoID, FechaTraslado, Cantidad, IDUsuario) VALUES 
(1, 1, 2, '2024-03-11 09:00:00', 50, 1),
(2, 2, 3, '2024-03-12 10:00:00', 30, 1),
(3, 3, 4, '2024-03-13 11:00:00', 20, 1),
(4, 4, 1, '2024-03-14 12:00:00', 10, 1),
(5, 1, 2, '2024-03-15 09:30:00', 60, 1),
(6, 2, 3, '2024-03-16 10:30:00', 70, 1),
(7, 3, 4, '2024-03-17 11:30:00', 80, 1),
(8, 4, 1, '2024-03-18 12:30:00', 90, 1),
(9, 1, 2, '2024-03-19 09:45:00', 100, 1),
(10, 2, 3, '2024-03-20 10:45:00', 110, 1);

-- Insertar datos de prueba en la tabla HistorialInventario
-- Asegúrate de que los productos, bodegas y usuarios ya estén insertados.
INSERT INTO HistorialInventario (IDProducto, IDBodega, FechaCambio, Cantidad, TipoCambio, IDUsuario) VALUES 
(1, 1, '2024-03-21 09:00:00', 20, 'ajuste', 1),
(2, 1, '2024-03-22 10:00:00', 20, 'venta', 1),
(3, 1, '2024-03-23 11:00:00', 20, 'compra', 1),
(4, 1, '2024-03-24 12:00:00', 20, 'merma', 1),
(5, 2, '2024-03-25 09:15:00', 20, 'ajuste', 1),
(6, 2, '2024-03-26 10:15:00', 20, 'venta', 1),
(7, 2, '2024-03-27 11:15:00', 20, 'compra', 1),
(8, 2, '2024-03-28 12:15:00', 20, 'merma', 1),
(9, 3, '2024-03-29 09:30:00', 20, 'ajuste', 1),
(10, 3, '2024-03-30 10:30:00', 20, 'venta', 1);


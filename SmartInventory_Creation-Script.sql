-- Script para crear la base de datos para SmartInventory

-- Crear la tabla de Roles
CREATE TABLE Roles (
    IDRol SERIAL PRIMARY KEY,
    NombreRol VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

-- Crear la tabla de Usuarios
CREATE TABLE Usuarios (
    IDUsuario SERIAL PRIMARY KEY,
    NombreUsuario VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    IDRol INT NOT NULL,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IDRol) REFERENCES Roles(IDRol)
);

-- Crear la tabla de Categorias
CREATE TABLE Categorias (
    IDCategoria SERIAL PRIMARY KEY,
    NombreCategoria VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

-- Crear la tabla de Medidas
CREATE TABLE Medidas (
    IDMedida SERIAL PRIMARY KEY,
    NombreMedida VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

-- Crear la tabla de Proveedores
CREATE TABLE Proveedores (
    IDProveedor SERIAL PRIMARY KEY,
    NombreProveedor VARCHAR(255) NOT NULL,
    Direccion TEXT,
    Telefono VARCHAR(15),
    Email VARCHAR(255)
);

-- Crear la tabla de Bodegas
CREATE TABLE Bodegas (
    IDBodega SERIAL PRIMARY KEY,
    NombreBodega VARCHAR(255) NOT NULL,
    Ubicacion TEXT
);

-- Crear la tabla de Productos
CREATE TABLE Productos (
    IDProducto SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    IDCategoria INT,
    IDMedida INT,
    IDProveedor INT,
    UsuarioCreador INT,
    FOREIGN KEY (IDCategoria) REFERENCES Categorias(IDCategoria),
    FOREIGN KEY (IDMedida) REFERENCES Medidas(IDMedida),
    FOREIGN KEY (IDProveedor) REFERENCES Proveedores(IDProveedor),
    FOREIGN KEY (UsuarioCreador) REFERENCES Usuarios(IDUsuario)
);

-- Crear la tabla de Movimientos
CREATE TABLE Movimientos (
    IDMovimiento SERIAL PRIMARY KEY,
    TipoMovimiento VARCHAR(255) NOT NULL,
    FechaMovimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IDProducto INT NOT NULL,
    IDBodega INT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    IDUsuario INT NOT NULL,
    FOREIGN KEY (IDProducto) REFERENCES Productos(IDProducto),
    FOREIGN KEY (IDBodega) REFERENCES Bodegas(IDBodega),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario)
);

-- Crear la tabla de Traslados
CREATE TABLE Traslados (
    IDTraslado SERIAL PRIMARY KEY,
    IDProducto INT NOT NULL,
    BodegaOrigenID INT NOT NULL,
    BodegaDestinoID INT NOT NULL,
    FechaTraslado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    IDUsuario INT NOT NULL,
    FOREIGN KEY (IDProducto) REFERENCES Productos(IDProducto),
    FOREIGN KEY (BodegaOrigenID) REFERENCES Bodegas(IDBodega),
    FOREIGN KEY (BodegaDestinoID) REFERENCES Bodegas(IDBodega),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario)
);
-- Creación de la tabla HistorialInventario
CREATE TABLE HistorialInventario (
    IDHistorial SERIAL PRIMARY KEY,
    IDProducto INT NOT NULL,
    IDBodega INT NOT NULL,
    FechaCambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Cantidad INT NOT NULL,
    TipoCambio VARCHAR(255) NOT NULL, -- Ejemplos: 'entrada', 'salida', 'ajuste'
    IDUsuario INT NOT NULL,
    FOREIGN KEY (IDProducto) REFERENCES Productos(IDProducto),
    FOREIGN KEY (IDBodega) REFERENCES Bodegas(IDBodega),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario)
);

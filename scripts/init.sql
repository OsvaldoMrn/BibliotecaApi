CREATE database biblioteca;

use biblioteca;

-- Tabla Administrador
CREATE TABLE Administrador (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nombre_admin VARCHAR(255) NOT NULL,
    username_admin VARCHAR(100) NOT NULL UNIQUE,
    pass_admin VARCHAR(255) NOT NULL
);

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    pass_usuario VARCHAR(255) NOT NULL
);

-- Tabla Libro
CREATE TABLE Libro (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo_libro VARCHAR(255) NOT NULL,
    fecha_publicacion_libro DATE NOT NULL,
    disponibilidad_libro BOOLEAN NOT NULL
);

-- Tabla Autores
CREATE TABLE Autores (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nombre_autor VARCHAR(255) NOT NULL
);

-- Tabla Generos
CREATE TABLE Generos (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nombre_genero VARCHAR(255) NOT NULL
);

-- Tabla intermedia Autor_Libro
CREATE TABLE Autor_Libro (
    id_libro INT NOT NULL,
    id_autor INT NOT NULL,
    PRIMARY KEY (id_libro, id_autor),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_autor) REFERENCES Autores(id_autor) ON DELETE CASCADE
);

-- Tabla intermedia Genero_Libro
CREATE TABLE Genero_Libro (
    id_libro INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_libro, id_genero),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES Generos(id_genero) ON DELETE CASCADE
);

-- Tabla Préstamo
CREATE TABLE Prestamo (
    id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    id_libro INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_inicio_prestamo DATE NOT NULL,
    fecha_fin_prestamo DATE NOT NULL,
    estado_prestamo VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);
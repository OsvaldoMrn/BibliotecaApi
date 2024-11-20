
use biblioteca;

-- Tabla Administrador
CREATE TABLE Administrador (
    id_administrador INT PRIMARY KEY AUTO_INCREMENT,
    nombre_administrador VARCHAR(255) NOT NULL,
    username_administrador VARCHAR(100) NOT NULL UNIQUE,
    pass_administrador VARCHAR(255) NOT NULL
);

-- Insertar registros en la tabla Administrador
INSERT INTO Administrador (nombre_administrador, username_administrador, pass_administrador) VALUES
('Carlos Gómez', 'CaGóm231564', 'admin1234'),
('María López', 'MaLóp457821', 'prueba5678'),
('Fernando García', 'FeGar312789', 'test4321'),
('Ana Martínez', 'AnMar984672', 'demo8765'),
('Luis Hernández', 'LuHer543210', 'simple123');

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    pass_usuario VARCHAR(255) NOT NULL
);

-- Insertar registros en la tabla Usuario
INSERT INTO Usuario (nombre_usuario, email_usuario, pass_usuario) VALUES
('JUAN PEREZ', 'juanperez@gmail.com', 'Juan123'),
('maria lopez', 'mlopez@alumnos.uaq.mx', 'Maria2020'),
('Carlos García', 'carlos.garcia@hotmail.com', 'Garcia2023'),
('ana MARTÍNEZ', 'anaM@alumnos.uaq.mx', 'ana!Martinez'),
('Luis Hernandez', 'luis_hdz@hotmail.com', 'Luis98'),
('FERNANDO CRUZ', 'fercruz@gmail.com', 'Fernando!'),
('sofia ramirez', 'sofia.r@alumnos.uaq.mx', 'sofi@ram2021'),
('Pedro Gómez', 'pedro_gomez@gmail.com', 'pedroG.456'),
('Diana Torres', 'dianatorres@alumnos.uaq.mx', 'Torres1987'),
('RAUL CASTRO', 'raul_castro@hotmail.com', 'raul2024'),
('Sara mendoza', 'saramendoza@gmail.com', 'Sara_12345'),
('JOSE LOPEZ', 'jose.lopez@alumnos.uaq.mx', 'JoseL0pez'),
('Camila moreno', 'camila.moreno@hotmail.com', 'c4milA'),
('Miguel Ávila', 'miguel.avila@gmail.com', 'Avila!2023'),
('paola garcía', 'paola_garcia@alumnos.uaq.mx', 'p@oLa456'),
('ANGEL VARGAS', 'angelvargas@hotmail.com', 'Ang3l_99'),
('david fernandez', 'david.fernandez@gmail.com', 'Dav1d_F3rnandez'),
('Adriana Martínez', 'adriana.mtz@alumnos.uaq.mx', 'adrimtz2022'),
('JORGE PÉREZ', 'jorge_perez@gmail.com', 'JorgeP!'),
('luz espinoza', 'luz.espinoza@hotmail.com', 'luzespinoza'),
('ALICIA SANDOVAL', 'alicia.sandoval@alumnos.uaq.mx', 'Sandoval*78'),
('Mauricio Lara', 'm.lara@gmail.com', 'Lara1995'),
('paulo miranda', 'paulo.m@alumnos.uaq.mx', 'mir@nda123'),
('ANA FERNÁNDEZ', 'ana.fernandez@hotmail.com', 'AnaF2022!'),
('Rosa Jiménez', 'rosa.jimenez@gmail.com', 'R0sA2020'),
('CRISTIAN NAVARRO', 'cristian_navarro@alumnos.uaq.mx', 'Cristian!123'),
('mario soto', 'mariosoto@hotmail.com', 'Mario#987'),
('Diego Vargas', 'diego_vargas@gmail.com', 'D1egov@rgas'),
('EVA MARTÍNEZ', 'eva.martinez@alumnos.uaq.mx', 'evam4rt!'),
('Laura Escobar', 'laura.escobar@hotmail.com', 'esc0bar99'),
('JOEL RAMOS', 'joelramos@gmail.com', 'R@mosjoel'),
('Sergio Castillo', 'sergio_castillo@alumnos.uaq.mx', 'sergi0.C'),
('VICTOR REYES', 'victor.reyes@hotmail.com', 'V!ctor987'),
('Andrea Aguilar', 'andrea.aguilar@gmail.com', 'Aguil@r2021'),
('Fabiola Cruz', 'fabiola.cruz@alumnos.uaq.mx', 'Fab1Cruz'),
('OSCAR ORTIZ', 'oscar_ortiz@hotmail.com', 'Ortiz99!'),
('Mónica Hernández', 'monica.hernandez@gmail.com', 'Moni.H'),
('ismael solis', 'ismael.solis@alumnos.uaq.mx', 'Sol1s2020'),
('SILVIA VARGAS', 'silvia.vargas@hotmail.com', 'Vargas2024'),
('José Navarro', 'jose_navarro@gmail.com', 'Jos3Nav!'),
('carmen romero', 'carmen.romero@alumnos.uaq.mx', 'C@rm3n456'),
('Luis Franco', 'luis_franco@hotmail.com', 'FrancoLuis'),
('VANESSA MORALES', 'vanessa.morales@gmail.com', 'v.moral3s'),
('Karen Ruiz', 'karen.ruiz@alumnos.uaq.mx', 'Ru1zKaren'),
('OSCAR LEÓN', 'oscar.leon@hotmail.com', 'LeonOsc4r'),
('marisol perez', 'marisol.perez@gmail.com', 'm@riS0l'),
('Roberto Campos', 'roberto.campos@alumnos.uaq.mx', 'CamposRob'),
('IVAN HERNÁNDEZ', 'ivan.hernandez@hotmail.com', 'Iv4nHdz2023'),
('Patricia Torres', 'patricia.torres@gmail.com', 'TorresP@t'),
('Eduardo Gutiérrez', 'eduardo.gtz@alumnos.uaq.mx', 'EduGtz123');

-- Tabla Libro
CREATE TABLE Libro (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo_libro VARCHAR(255) NOT NULL,
    fecha_publicacion_libro DATE NOT NULL,
    disponibilidad_libro INT NOT NULL
);

INSERT INTO Libro (titulo_libro, fecha_publicacion_libro, disponibilidad_libro) VALUES
('Cien años de soledad', '1967-06-05', 1),
('La ciudad y los perros', '1963-01-01', 1),
('Ficciones', '1944-01-01', 1),
('La casa de los espíritus', '1982-01-01', 1),
('La muerte de Artemio Cruz', '1962-01-01', 1),
('El laberinto de la soledad', '1950-01-01', 1),
('Rayuela', '1963-01-01', 1),
('Pedro Páramo', '1955-01-01', 1),
('Veinte poemas de amor y una canción desesperada', '1924-01-01', 1),
('Cuentos de la selva', '1918-01-01', 1);

-- Tabla Autores
CREATE TABLE Autor (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nombre_autor VARCHAR(255) NOT NULL
);

-- 1. Insertar autores
INSERT INTO Autor (nombre_autor) VALUES
('Gabriel García Márquez'),
('Mario Vargas Llosa'),
('Jorge Luis Borges'),
('Isabel Allende'),
('Carlos Fuentes'),
('Octavio Paz'),
('Julio Cortázar'),
('Juan Rulfo'),
('Pablo Neruda'),
('Horacio Quiroga');

-- Tabla Genero
CREATE TABLE Genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    nombre_genero VARCHAR(255) NOT NULL
);

INSERT INTO Genero (nombre_genero) VALUES
('Realismo mágico'),
('Poesía'),
('Cuento'),
('Novela histórica'),
('Ensayo'),
('Literatura fantástica');

-- Tabla intermedia Autor_Libro
CREATE TABLE Autor_Libro (
    id_libro INT NOT NULL,
    id_autor INT NOT NULL,
    PRIMARY KEY (id_libro, id_autor),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_autor) REFERENCES Autor(id_autor) ON DELETE CASCADE
);

INSERT INTO Autor_Libro (id_libro, id_autor) VALUES
(1, 1), -- Cien años de soledad - Gabriel García Márquez
(2, 2), -- La ciudad y los perros - Mario Vargas Llosa
(3, 3), -- Ficciones - Jorge Luis Borges
(4, 4), -- La casa de los espíritus - Isabel Allende
(5, 5), -- La muerte de Artemio Cruz - Carlos Fuentes
(6, 6), -- El laberinto de la soledad - Octavio Paz
(7, 7), -- Rayuela - Julio Cortázar
(8, 8), -- Pedro Páramo - Juan Rulfo
(9, 9), -- Veinte poemas de amor y una canción desesperada - Pablo Neruda
(10, 10); -- Cuentos de la selva - Horacio Quiroga

-- Tabla intermedia Genero_Libro
CREATE TABLE Genero_Libro (
    id_libro INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_libro, id_genero),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero) ON DELETE CASCADE
);

INSERT INTO Genero_Libro (id_libro, id_genero) VALUES
(1, 1), -- Cien años de soledad - Realismo mágico
(2, 4), -- La ciudad y los perros - Novela histórica
(3, 6), -- Ficciones - Literatura fantástica
(4, 1), -- La casa de los espíritus - Realismo mágico
(5, 4), -- La muerte de Artemio Cruz - Novela histórica
(6, 5), -- El laberinto de la soledad - Ensayo
(7, 6), -- Rayuela - Literatura fantástica
(8, 1), -- Pedro Páramo - Realismo mágico
(9, 2), -- Veinte poemas de amor y una canción desesperada - Poesía
(10, 3); -- Cuentos de la selva - Cuento

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

CREATE DATABASE IF NOT EXISTS biblioteca;
ALTER DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use biblioteca;

-- Tabla Administrador
CREATE TABLE Administrador (
    id_administrador INT PRIMARY KEY AUTO_INCREMENT,
    nombre_administrador VARCHAR(255) NOT NULL,
    username_administrador VARCHAR(100) NOT NULL UNIQUE,
    pass_administrador VARCHAR(255) NOT NULL
);

-- Inicializar los ids en un número random
INSERT INTO Administrador (id_administrador, nombre_administrador, username_administrador, pass_administrador) VALUES
(285813, 'Osvaldo Moreno', 'OsMor041013', 'pass123');

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
    fecha_publicacion_libro VARCHAR(4) NOT NULL,
    disponibilidad_libro INT NOT NULL
);

INSERT INTO Libro (titulo_libro, fecha_publicacion_libro, disponibilidad_libro) VALUES
('Cien años de soledad', '1967', 10),
('La ciudad y los perros', '1963', 2),
('Ficciones', '1944', 5),
('La casa de los espíritus', '1982', 7),
('La muerte de Artemio Cruz', '1962', 2),
('El laberinto de la soledad', '1950', 1),
('Rayuela', '1963', 9),
('Pedro Páramo', '1955', 11),
('Veinte poemas de amor y una canción desesperada', '1924', 7),
('Cuentos de la selva', '1918', 2),
('Don Quijote de la Mancha', '1605', 3),
('El túnel', '1948', 4),
('Crónica de una muerte anunciada', '1981', 5),
('La Metamorfosis', '1915', 6),
('1984', '1949', 7),
('Rebelión en la granja', '1945', 8),
('Farenheit 451', '1953', 9),
('El extranjero', '1942', 1),
('En busca del tiempo perdido', '1913', 1),
('El principito', '1943', 1),
('La montaña mágica', '1924', 1),
('Orgullo y prejuicio', '1813', 1),
('Madame Bovary', '1857', 1),
('Guerra y paz', '1869', 1),
('Crimen y castigo', '1866', 1),
('Anna Karenina', '1877', 1),
('El gran Gatsby', '1925', 1),
('Matar a un ruiseñor', '1960', 1),
('Las uvas de la ira', '1939', 1),
('Ensayo sobre la ceguera', '1995', 1),
('El nombre de la rosa', '1960', 1),
('Los miserables', '1862', 1),
('Drácula', '1897', 1),
('Frankenstein', '1918', 1),
('El retrato de Dorian Gray', '1890', 1),
('Las ciudades invisibles', '1972', 1),
('El Aleph', '1949', 1),
('La tregua', '1960', 1),
('Sobre héroes y tumbas', '1961', 1),
('2666', '2004', 1),
('La sombra del viento', '2001', 1),
('El amor en los tiempos del cólera', '1985', 1),
('Los detectives salvajes', '1998', 1),
('El libro de arena', '1975', 1),
('La insoportable levedad del ser', '1984', 1),
('El código Da Vinci', '2003', 1),
('Ángeles y demonios', '2000', 1),
('Bajo la misma estrella', '2012', 1),
('Los juegos del hambre', '2008', 1),
('Divergente', '2011', 1),
('El guardián entre el centeno', '1951', 1),
('El viejo y el mar', '1952', 1),
('Los pilares de la tierra', '1989', 1),
('Cementerio de animales', '1983', 1),
('It', '1986', 1),
('El manifiesto comunista', '1848', 1);

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
('Horacio Quiroga'),
('Miguel de Cervantes'),
('Ernesto Sabato'),
('Franz Kafka'),
('George Orwell'),
('Ray Bradbury'),
('Albert Camus'),
('Marcel Proust'),
('Antoine de Saint-Exupéry'),
('Thomas Mann'),
('Jane Austen'),
('Gustave Flaubert'),
('Leon Tolstói'),
('Fiódor Dostoyevski'),
('F. Scott Fitzgerald'),
('Harper Lee'),
('John Steinbeck'),
('José Saramago'),
('Umberto Eco'),
('Victor Hugo'),
('Bram Stoker'),
('Mary Shelley'),
('Oscar Wilde'),
('Italo Calvino'),
('Mario Benedetti'),
('Roberto Bolaño'),
('Carlos Ruiz Zafón'),
('Milan Kundera'),
('Dan Brown'),
('John Green'),
('Suzanne Collins'),
('Veronica Roth'),
('J. D. Salinger'),
('Ernest Hemingway'),
('Ken Follett'),
('Stephen King'),
('Karl Marx'),
('Friedrich Engels');

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
('Literatura fantástica'),
('Literatura clásica'),
('Aventura'),
('Literatura contemporánea'),
('Experimental'),
('Existencialismo'),
('Policial'),
('Ciencia ficción'),
('Distopía'),
('Fábula política'),
('Filosofía'),
('Autobiografía'),
('Filosófica'),
('Romance'),
('Realismo'),
('Histórico'),
('Psicológica'),
('Drama'),
('Social'),
('Misterio'),
('Terror'),
('Gótico'),
('Fantasía'),
('Thriller'),
('Suspenso'),
('Política'),
('Novela histórica'),
('Novela social');

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
(10, 10), -- Cuentos de la selva - Horacio Quiroga
(11, 11), -- Don Quijote de la Mancha - Miguel de Cervantes  
(12, 12), -- El túnel - Ernesto Sabato  
(13, 1), -- Crónica de una muerte anunciada - Gabriel García Márquez  
(14, 13), -- La Metamorfosis - Franz Kafka  
(15, 14), -- 1984 - George Orwell  
(16, 14), -- Rebelión en la granja - George Orwell  
(17, 15), -- Farenheit 451 - Ray Bradbury  
(18, 16), -- El extranjero - Albert Camus  
(19, 17), -- En busca del tiempo perdido - Marcel Proust  
(20, 18),-- El principito - Antoine de Saint-Exupéry  
(21, 19),  -- La montaña mágica - Thomas Mann  
(22, 20), -- Orgullo y prejuicio - Jane Austen  
(23, 21), -- Madame Bovary - Gustave Flaubert  
(24, 22), -- Guerra y paz - León Tolstói  
(25, 23), -- Crimen y castigo - Fiódor Dostoyevski  
(26, 22), -- Anna Karenina - León Tolstói  
(27, 24), -- El gran Gatsby - F. Scott Fitzgerald  
(28, 25), -- Matar a un ruiseñor - Harper Lee  
(29, 26), -- Las uvas de la ira - John Steinbeck  
(30, 27), -- Ensayo sobre la ceguera - José Saramago  
(31, 28), -- El nombre de la rosa - Umberto Eco  
(32, 29), -- Los miserables - Victor Hugo  
(33, 30), -- Drácula - Bram Stoker  
(34, 31), -- Frankenstein - Mary Shelley  
(35, 32), -- El retrato de Dorian Gray - Oscar Wilde  
(36, 33), -- Las ciudades invisibles - Italo Calvino  
(37, 3), -- El Aleph - Jorge Luis Borges  
(38, 34), -- La tregua - Mario Benedetti  
(39, 12), -- Sobre héroes y tumbas - Ernesto Sabato  
(40, 35), -- 2666 - Roberto Bolaño  
(41, 36), -- La sombra del viento - Carlos Ruiz Zafón  
(42, 1), -- El amor en los tiempos del cólera - Gabriel García Márquez  
(43, 35), -- Los detectives salvajes - Roberto Bolaño  
(44, 3), -- El libro de arena - Jorge Luis Borges  
(45, 37), -- La insoportable levedad del ser - Milan Kundera  
(46, 38), -- El código Da Vinci - Dan Brown  
(47, 38), -- Ángeles y demonios - Dan Brown  
(48, 39), -- Bajo la misma estrella - John Green  
(49, 40), -- Los juegos del hambre - Suzanne Collins  
(50, 41), -- Divergente - Veronica Roth  
(51, 42), -- El guardián entre el centeno - J. D. Salinger  
(52, 43), -- El viejo y el mar - Ernest Hemingway  
(53, 44), -- Los pilares de la tierra - Ken Follett  
(54, 45), -- Cementerio de animales - Stephen King  
(55, 45), -- It - Stephen King  
(56, 46), -- El manifiesto comunista - Karl Marx y Friedrich Engels  
(56, 47);


-- Tabla intermedia Genero_Libro
CREATE TABLE Genero_Libro (
    id_libro INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_libro, id_genero),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES Genero(id_genero) ON DELETE CASCADE
);

INSERT INTO Genero_Libro (id_libro, id_genero) VALUES
(1, 1), (1, 7), (1, 9), (1, 23), (1, 24), -- Cien años de soledad - Realismo mágico (1), Literatura clásica (7), Literatura contemporánea (9), Drama (23), Social (24)  
(2, 20), (2, 33), (2, 22), (2, 9), -- La ciudad y los perros - Realismo (20), Novela social (33), Psicológica (22), Literatura contemporánea (9)  
(3, 6), (3, 3), (3, 16), (3, 10),-- Ficciones - Literatura fantástica (6), Cuento (3), Filosofía (16), Experimental (10)  
(4, 1), (4, 23), (4, 21), (4, 33), -- La casa de los espíritus - Realismo mágico (1), Drama (23), Histórico (21), Novela social (33)  
(5, 20), (5, 33), (5, 22), (5, 21), -- La muerte de Artemio Cruz - Realismo (20), Novela social (33), Psicológica (22), Histórico (21)  
(6, 5), (6, 16), (6, 24), -- El laberinto de la soledad - Ensayo (5), Filosofía (16), Social (24)  
(7, 10), (7, 16), (7, 11), (7, 9), -- Rayuela - Experimental (10), Filosofía (16), Existencialismo (11), Literatura contemporánea (9)  
(8, 1), (8, 7), (8, 3), (8, 23), (8, 18), -- Pedro Páramo - Realismo mágico (1), Literatura clásica (7), Cuento (3), Drama (23), Filosófica (18)  
(9, 2), (9, 19), (9, 16), -- Veinte poemas de amor y una canción desesperada - Poesía (2), Romance (19), Filosofía (16)  
(10, 3), (10, 8), (10, 7), -- Cuentos de la selva - Cuento (3), Aventura (8), Literatura clásica (7)  
(11, 7), (11, 8), (11, 16),-- Don Quijote de la Mancha - Literatura clásica (7), Aventura (8), Filosofía (16) 
(12, 11), (12, 22), (12, 18), (12, 23),-- El túnel - Existencialismo (11), Psicológica (22), Filosófica (18), Drama (23)  
(13, 20), (13, 25), (13, 9), -- Crónica de una muerte anunciada - Realismo (20), Misterio (25), Literatura contemporánea (9)  
(14, 11), (14, 6), (14, 22),-- La Metamorfosis - Existencialismo (11), Literatura fantástica (6), Psicológica (22)  
(15, 13), (15, 14), (15, 31), (15, 16),-- 1984 - Ciencia ficción (13), Distopía (14), Política (31), Filosofía (16)  
(16, 15), (16, 6), (16, 31), -- Rebelión en la granja - Fábula política (15), Literatura fantástica (6), Política (31)  
(17, 13), (17, 14), (17, 16), (17, 24), -- Farenheit 451 - Ciencia ficción (13), Distopía (14), Filosofía (16), Social (24)  
(18, 11), (18, 22), (18, 18), -- El extranjero - Existencialismo (11), Psicológica (22), Filosófica (18)  
(19, 17), (19, 16), (19, 22), (19, 21), -- En busca del tiempo perdido - Autobiografía (17), Filosofía (16), Psicológica (22), Histórico (21)  
(20, 7), (20, 16), (20, 28), -- El principito - Literatura clásica (7), Filosofía (16), Fantasía (28)  
(21, 16), (21, 11), (21, 22), (21, 21), -- La montaña mágica - Filosofía (16), Existencialismo (11), Psicológica (22), Histórico (21) 
(22, 19), (22, 23), (22, 7), -- Orgullo y prejuicio - Romance (19), Drama (23), Literatura clásica (7)  
(23, 20), (23, 22), (23, 23), (23, 7), -- Madame Bovary - Realismo (20), Psicológica (22), Drama (23), Literatura clásica (7)  
(24, 32), (24, 16), (24, 23), (24, 7), -- Guerra y paz - Novela histórica (32), Filosofía (16), Drama (23), Literatura clásica (7)  
(25, 22), (25, 11), (25, 16), (25, 23), -- Crimen y castigo - Psicológica (22), Existencialismo (11), Filosofía (16), Drama (23)  
(26, 20), (26, 19), (26, 22), (26, 33), -- Anna Karenina - Realismo (20), Romance (19), Psicológica (22), Novela social (33)  
(27, 9), (27, 23), (27, 22), (27, 24), -- El gran Gatsby - Literatura contemporánea (9), Drama (23), Psicológica (22), Social (24)  
(28, 24), (28, 32), (28, 23), (28, 22), -- Matar a un ruiseñor - Social (24), Novela histórica (32), Drama (23), Psicológica (22)
(29, 24), (29, 22), (29, 32), (29, 23), -- Las uvas de la ira - Social (24), Psicológica (22), Novela histórica (32), Drama (23)  
(30, 16), (30, 22), (30, 23), (30, 9), -- Ensayo sobre la ceguera - Filosofía (16), Psicológica (22), Drama (23), Literatura contemporánea (9) 
(31, 12), (31, 21), (31, 16), (31, 25), -- El nombre de la rosa - Policial (12), Histórico (21), Filosofía (16), Misterio (25)  
(32, 32), (32, 24), (32, 23), (32, 16), -- Los miserables - Novela histórica (32), Social (24), Drama (23), Filosofía (16)  
(33, 26), (33, 27), (33, 25), (33, 28), -- Drácula - Terror (26), Gótico (27), Misterio (25), Fantasía (28)  
(34, 13), (34, 16), (34, 27), (34, 22), -- Frankenstein - Ciencia ficción (13), Filosofía (16), Gótico (27), Psicológica (22)  
(35, 27), (35, 22), (35, 16), (35, 7), -- El retrato de Dorian Gray - Gótico (27), Psicológica (22), Filosofía (16), Literatura clásica (7)  
(36, 6), (36, 16), (36, 10), -- Las ciudades invisibles - Literatura fantástica (6), Filosofía (16), Experimental (10)
(37, 6), (37, 16), (37, 3), (37, 10), -- El Aleph - Literatura fantástica (6), Filosofía (16), Cuento (3), Experimental (10) 
(38, 22), (38, 19), (38, 9), (38, 23), -- La tregua - Psicológica (22), Romance (19), Literatura contemporánea (9), Drama (23)  
(39, 22), (39, 16), (39, 24), (39, 10), -- Sobre héroes y tumbas - Psicológica (22), Filosofía (16), Social (24), Experimental (10)  
(40, 9), (40, 25), (40, 10), (40, 22), -- 2666 - Literatura contemporánea (9), Misterio (25), Experimental (10), Psicológica (22) 
(41, 25), (41, 30), (41, 23), (41, 9), -- La sombra del viento - Misterio (25), Suspenso (30), Drama (23), Literatura contemporánea (9)  
(42, 19), (42, 20), (42, 9), (42, 23), -- El amor en los tiempos del cólera - Romance (19), Realismo (20), Literatura contemporánea (9), Drama (23)  
(43, 9), (43, 10), (43, 22), (43, 24), -- Los detectives salvajes - Literatura contemporánea (9), Experimental (10), Psicológica (22), Social (24)  
(44, 6), (44, 16), (44, 10), (44, 3), -- El libro de arena - Literatura fantástica (6), Filosofía (16), Experimental (10), Cuento (3)  
(45, 16), (45, 11), (45, 19), (45, 9), -- La insoportable levedad del ser - Filosofía (16), Existencialismo (11), Romance (19), Literatura contemporánea (9)  
(46, 12), (46, 30), (46, 29), (46, 25), -- El código Da Vinci - Policial (12), Suspenso (30), Thriller (29), Misterio (25)  
(47, 12), (47, 30), (47, 29), (47, 25), -- Ángeles y demonios - Policial (12), Suspenso (30), Thriller (29), Misterio (25)  
(48, 19),(48, 23), (48, 9), (48, 24), -- Bajo la misma estrella - Romance (19), Drama (23), Literatura contemporánea (9), Social (24)  
(49, 14), (49, 30), (49, 8), (49, 29), -- Los juegos del hambre - Distopía (14), Suspenso (30), Aventura (8), Thriller (29)  
(50, 14), (50, 8), (50, 9), (51, 30), -- Divergente - Distopía (14), Aventura (8), Suspenso (30), Literatura contemporánea (9)  
(51, 11), (51, 23), (51, 9), (51, 22), -- El guardián entre el centeno - Existencialismo (11), Drama (23), Literatura contemporánea (9), Psicológica (22)  
(52, 7), (52, 16), (52, 8), (52, 22), -- El viejo y el mar - Literatura clásica (7), Filosofía (16), Aventura (8), Psicológica (22)  
(53, 32), (53, 23), (53, 24), (53, 22), -- Los pilares de la tierra - Novela histórica (32), Drama (23), Social (24), Psicológica (22)  
(54, 26), (54, 30), (54, 27), (54, 22), (55, 26), -- Cementerio de animales - Terror (26), Suspenso (30), Gótico (27), Psicológica (22)  
(55, 30), (55, 23), (55, 22), -- It - Terror (26), Suspenso (30), Drama (23), Psicológica (22)  
(56, 5), (56, 31), (56, 16); -- El manifiesto comunista - Ensayo (5), Política (31), Filosofía (16)  



-- Tabla Préstamo
CREATE TABLE Prestamo (
    id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    id_libro INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_inicio_prestamo DATE NOT NULL,
    fecha_fin_prestamo DATE,
    estado_prestamo VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

INSERT INTO Prestamo (id_usuario, id_libro, fecha_inicio_prestamo, fecha_fin_prestamo, estado_prestamo) VALUES
(1, 1, '2024-11-01', NULL, 'Activo'), -- Cien años de soledad
(1, 7, '2024-11-05', NULL, 'Activo'), -- Rayuela
(1, 13, '2024-11-10', NULL, 'Activo'); -- Crónica de una muerte anunciada

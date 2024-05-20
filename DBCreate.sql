CREATE DATABASE Tarea4_Lenguajes

USE Tarea4_Lenguajes

CREATE TABLE Usuario
(
	idUsuario INT PRIMARY KEY IDENTITY
	, nombre NVARCHAR(MAX)
	, apellidos NVARCHAR(MAX)
	, fechaNacimiento DATETIME
	, correo NVARCHAR(MAX)
	, contrasenna NVARCHAR(MAX)
)

CREATE TABLE Concierto
(
	idConcierto INT PRIMARY KEY IDENTITY
	, artista NVARCHAR(MAX)
	, imagen NVARCHAR(MAX)
	, fechaEvento DATETIME
	, lugar NVARCHAR(MAX)
)

CREATE TABLE Asiento
(
	idAsiento INT PRIMARY KEY IDENTITY
	, numero NVARCHAR(MAX)
)

CREATE TABLE Zona
(
	idZona INT PRIMARY KEY IDENTITY
	, nombre NVARCHAR(MAX)
)

CREATE TABLE Concierto_Zona
(
	idConciertoZona INT PRIMARY KEY IDENTITY
	, idConcierto INT NOT NULL
	, idZona INT NOT NULL
	, precio DECIMAL(18,0)
)

CREATE TABLE Concierto_Asiento
(
	idConciertoAsiento INT PRIMARY KEY IDENTITY
	, idZona INT NOT NULL
	, idConcierto INT NOT NULL
	, idAsiento INT NOT NULL
	, FOREIGN KEY (idConcierto) REFERENCES Concierto(idConcierto)
	, FOREIGN KEY (idZona) REFERENCES Concierto_Zona(idConciertoZona)
	, FOREIGN KEY (idAsiento) REFERENCES Asiento(idAsiento)
)

CREATE TABLE Reserva
(
	idReserva INT
	, idUsuario INT NOT NULL
	, idConcierto INT NOT NULL
	, idAsiento INT NOT NULL
	, FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	, FOREIGN KEY (idConcierto) REFERENCES Concierto(idConcierto)
	, FOREIGN KEY (idAsiento) REFERENCES Concierto_Asiento(idConciertoAsiento)
	, CONSTRAINT PK_Reserva PRIMARY KEY (idReserva, idUsuario, idConcierto, idAsiento)
)

--INSERTS

--Usuario
INSERT INTO Usuario (nombre, apellidos, fechaNacimiento, correo, contrasenna)
VALUES ('Juan', 'Pérez', '1985-05-15', 'juan.perez@example.com', '123'),
       ('María', 'Gómez', '1990-10-25', 'maria.gomez@example.com', '456');

--Concierto
INSERT INTO Concierto (artista, imagen, fechaEvento, lugar)
VALUES ('Starset', 'starset.jpg', '2024-06-20', 'Costa Rica'),
       ('Bad Omens', 'badOmens.jpg', '2024-07-15', 'México'),
       ('Bring Me the Horizon', 'BMH.jpg', '2024-08-10', 'Brasil');

--Asiento
INSERT INTO Asiento (numero)
VALUES ('A1'), ('A2'), ('A3'), ('A4'), ('A5'), ('A6'), ('A7'), ('A8'), ('A9'), ('A10'),
       ('A11'), ('A12'), ('A13'), ('A14'), ('A15'), ('A16'), ('A17'), ('A18'), ('A19'), ('A20'),
       ('A21'), ('A22'), ('A23'), ('A24'), ('A25'), ('A26'), ('A27'), ('A28'), ('A29'), ('A30'),
       ('A31'), ('A32');

--Zona
INSERT INTO Zona (nombre)
VALUES ('VIP'), ('Diamante'), ('General'), ('Platea'), ('Gramilla');

--Concierto_Zona
-- Concierto 1
INSERT INTO Concierto_Zona (idConcierto, idZona, precio)
VALUES (1, 1, 1500), (1, 2, 1200), (1, 3, 800), (1, 4, 1000), (1, 5, 600);

-- Concierto 2
INSERT INTO Concierto_Zona (idConcierto, idZona, precio)
VALUES (2, 1, 1500), (2, 2, 1200), (2, 3, 800), (2, 4, 1000), (2, 5, 600);

-- Concierto 3
INSERT INTO Concierto_Zona (idConcierto, idZona, precio)
VALUES (3, 1, 1500), (3, 2, 1200), (3, 3, 800), (3, 4, 1000), (3, 5, 600);

--Concierto_Asiento
-- Concierto 1
INSERT INTO Concierto_Asiento (idZona, idConcierto, idAsiento)
VALUES (1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 1, 4), (1, 1, 5),
       (2, 1, 6), (2, 1, 7), (2, 1, 8), (2, 1, 9), (2, 1, 10),
       (3, 1, 11), (3, 1, 12), (3, 1, 13), (3, 1, 14), (3, 1, 15),
       (4, 1, 16), (4, 1, 17), (4, 1, 18), (4, 1, 19), (4, 1, 20),
       (5, 1, 21), (5, 1, 22), (5, 1, 23), (5, 1, 24), (5, 1, 25),
       (1, 1, 26), (2, 1, 27), (3, 1, 28), (4, 1, 29), (5, 1, 30),
       (1, 1, 31), (2, 1, 32);

-- Concierto 2
INSERT INTO Concierto_Asiento (idZona, idConcierto, idAsiento)
VALUES (6, 2, 1), (6, 2, 2), (6, 2, 3), (6, 2, 4), (6, 2, 5),
       (7, 2, 6), (7, 2, 7), (7, 2, 8), (7, 2, 9), (7, 2, 10),
       (8, 2, 11), (8, 2, 12), (8, 2, 13), (8, 2, 14), (8, 2, 15),
       (9, 2, 16), (9, 2, 17), (9, 2, 18), (9, 2, 19), (9, 2, 20),
       (10, 2, 21), (10, 2, 22), (10, 2, 23), (10, 2, 24), (10, 2, 25),
       (6, 2, 26), (7, 2, 27), (8, 2, 28), (9, 2, 29), (10, 2, 30),
       (6, 2, 31), (2, 2, 32);

-- Concierto 3
INSERT INTO Concierto_Asiento (idZona, idConcierto, idAsiento)
VALUES (11, 3, 1), (11, 3, 2), (11, 3, 3), (11, 3, 4), (11, 3, 5),
       (12, 3, 6), (12, 3, 7), (12, 3, 8), (12, 3, 9), (12, 3, 10),
       (13, 3, 11), (13, 3, 12), (13, 3, 13), (13, 3, 14), (13, 3, 15),
       (14, 3, 16), (14, 3, 17), (14, 3, 18), (14, 3, 19), (14, 3, 20),
       (15, 3, 21), (15, 3, 22), (15, 3, 23), (15, 3, 24), (15, 3, 25),
       (11, 3, 26), (12, 3, 27), (13, 3, 28), (14, 3, 29), (15, 3, 30),
       (11, 3, 31), (12, 3, 32);

--Reserva
INSERT INTO Reserva (idReserva, idUsuario, idConcierto, idAsiento)
VALUES (1, 1, 1, 1), (1, 1, 1, 2), (1, 2, 2, 3), (2, 2, 2, 4), (2, 1, 3, 5),
       (3, 2, 3, 6), (4, 1, 1, 7), (4, 2, 1, 8), (4, 1, 2, 9), (5, 2, 2, 10);


--DROPS
DROP TABLE Reserva
DROP TABLE Concierto_Asiento
DROP TABLE Concierto_Zona
DROP TABLE Zona
DROP TABLE Asiento
DROP TABLE Concierto
DROP TABLE Usuario
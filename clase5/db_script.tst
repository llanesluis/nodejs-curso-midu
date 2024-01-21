-- Asegurarnos de eliminar la base de datos si existe
DROP DATABASE IF EXISTS moviesdb;

-- Crear la base de datos 
CREATE DATABASE moviesdb;

-- Usar la base de datos 
USE moviesdb;

-- Crear la tabla de pelicula
--   {
--     "id": "dcdd0fad-a94c-4810-8acc-5f108d3b18c3",
--     "title": "The Shawshank Redemption",
--     "year": 1994,
--     "director": "Frank Darabont",
--     "duration": 142,
--     "poster": "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
--     "genre": ["Drama"],
--     "rate": 9.3
--   }
CREATE TABLE movie (
	id binary(16) primary key default (UUID_TO_BIN(UUID())),
    title varchar(255) not null,
    year int not null,
    director varchar(255),
    duration int not null,
    poster text not null,
    rate decimal(2,1) unsigned not null
    -- No permite arrays, entonces se crea una tabla extra
);

-- Crear tabla de los generos
CREATE TABLE genre (
	id int auto_increment primary key,
    name varchar(255) unique not null
);

-- Crear tabla que guarda la relacion entre las peliculas y sus generos
-- Es una relacion de muchos a muchos
CREATE TABLE movie_genres(
	movie_id binary(16) references movie(id),
    genre_id int references genre(id),
    primary key (movie_id, genre_id)
);

-- Insertar los registros de los generos
INSERT INTO genre (name) VALUES 
	('Drama'),
	('Crime'),
	('Sci-Fi'),
	('Animation'),
	('Fantasy'),
	('Action'),
	('Adventure'),
	('Biography'),
	('Romance');

-- Insertar algunos registros de peliculas
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
(UUID_TO_BIN(UUID()), "Pelicula 	1", 1980, "Manuela Aide", 10, "https://static.posters.cz/image/1300/posters/pocoyo-group-i3022.jpg", 9.9),
(UUID_TO_BIN(UUID()), "Pelicula 2", 1990, "Nolan", 120, "https://i0.wp.com/hipertextual.com/wp-content/uploads/2016/10/avatar-poster-01-600x886.jpg?resize=600%2C886&quality=50&strip=all&ssl=1", 7.4),
(UUID_TO_BIN(UUID()), "Pelicula 3", 2000, "Pollo feliz", 110, "https://www.carlosvillarin.com/wp-content/uploads/cartel-venom-carlos-villarin-freelance.jpg", 9.5),
(UUID_TO_BIN(UUID()), "Pelicula 4", 2010, "Laura Garza", 130, "https://i0.wp.com/hipertextual.com/wp-content/uploads/2016/10/10346626_260153840835091_3121210337900902159_n1-600x889.jpg?resize=600%2C889&quality=50&strip=all&ssl=1", 6.9),
(UUID_TO_BIN(UUID()), "Pelicula 5", 2020, "Los teletubis", 150, "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/reportajes/los-20-posters-de-peliculas-mas-creativos/los-idus-de-marzo/7055664-1-esl-ES/LOS-IDUS-DE-MARZO.jpg", 7.9);

-- Insertar las relaciones entre peliculas y generos
-- TRAMPA: Se hara un select para obtener el id generado y asociarlo
INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie where title = 'Pelicula 1'), (SELECT id FROM genre where name = 'Fantasy')),
((SELECT id FROM movie where title = 'Pelicula 1'), (SELECT id FROM genre where name = 'Adventure')),
((SELECT id FROM movie where title = 'Pelicula 2'), (SELECT id FROM genre where name = 'Adventure')),
((SELECT id FROM movie where title = 'Pelicula 3'), (SELECT id FROM genre where name = 'Biography')),
((SELECT id FROM movie where title = 'Pelicula 4'), (SELECT id FROM genre where name = 'Romance')),
((SELECT id FROM movie where title = 'Pelicula 4'), (SELECT id FROM genre where name = 'Sci-Fi')),
((SELECT id FROM movie where title = 'Pelicula 5'), (SELECT id FROM genre where name = 'Crime'));

SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;
SELECT * FROM genre;
SELECT * FROM movie_genres;

-- Query para obtener peliculas filtradas por genero
SELECT BIN_TO_UUID(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.name as genre
FROM movie m 
INNER JOIN movie_genres mg ON mg.movie_id = m.id
INNER JOIN genre g ON  g.id = mg.genre_id
WHERE g.name = 'Adventure';
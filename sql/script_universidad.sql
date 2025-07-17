use facultad;

SELECT * from alumno;
SELECT * from alumno WHERE apellido1 LIKE "G%" ORDER BY apellido1, apellido2;

SELECT * FROM alumno WHERE apellido1 LIKE "g%" and apellido2 LIKE "l%";

SELECT p.nombre, p.apellido1, a.nombre 
FROM profesor p 
NATURAL JOIN impartir i 
JOIN asignatura a
ON i.idAsignatura = a.idAsignatura
WHERE p.nombre ="David" and p.apellido1 ="Serna";
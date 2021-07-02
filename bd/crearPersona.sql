/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           crearAsignatura.sql
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

-- crearPersona.sql
create table Persona ( 
dni char(9) not null, /*define una columna dni de tipo char 9 caracteres y no puede quedarse vacia*/
nombre varchar(20) not null, /*define una columna nombre de tipo varchar 20 caracteres y no puede quedarse vacia*/
apellidos varchar(80) not null, /*define una columna apellidos de tipo varchar 80 caracteres y no puede quedarse vacia*/
primary key (dni) /*nombre dni como una clave primaria*/
);

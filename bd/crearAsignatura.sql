/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           crearAsignatura.sql
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

-- crearAsignatura.sql
create table Asignatura ( 
codigo char(4) not null, 
nombre varchar(20) not null, 
grado varchar(20) not null,
creditos varchar(4) not null,
primary key (codigo) 
);

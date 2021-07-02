/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           crearAsignatura.sql
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */
-- crearMatricula.sql
create table Matricula (
dni char(9) not null,
codigo char(8) not null,
nota int(4),
curso char(8) not null,
foreign key (dni) references Persona(dni),
foreign key (codigo) references Asignatura(codigo),
primary key (dni,codigo)
);
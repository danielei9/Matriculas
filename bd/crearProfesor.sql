/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           crearProfesor.sql
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

-- crearProfesor.sql
create table Profesor (
dni char(9) not null,
cargaLectiva int(8) not null,
foreign key (dni) references Persona(dni),
primary key (dni)
);

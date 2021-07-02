/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           crearImparte.sql
 *   DATE:           20/06/2021
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

-- crearImparte.sql
create table Imparte (
dni char(9) not null,
codigo char(8) not null,
foreign key (dni) references Profesor(dni),
foreign key (codigo) references Asignatura(codigo),
primary key (dni,codigo)
);

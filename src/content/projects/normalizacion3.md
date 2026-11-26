---
title: 'Normalización 3'
summary: 'Una biblioteca que hace prestamos de libros a usuarios'
cover: ../../assets/images/projects/libro.jpg
coverAlt: 'Normalización 2'
tech: ['Normalización', 'Formas normales', 'Bases de Datos']
role: 'Diseño de bases de datos'
year: 2026
featured: false
---
Tabla original
PrestamoLibro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr>
        <th>codLibro PK</th>
        <th>Titulo</th>
        <th>Autor</th>
        <th>Editorial</th>
        <th>nombreLector PK</th>
        <th>Fechadev PK</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>Variable compleja</td><td>Murray Spiegel</td><td>McGraw Hill</td><td>Pérez Gómez, Juan</td><td>15/04/2005</td></tr>
      <tr><td>1004</td><td>Visual Basic 5</td><td>E. Petroustsos</td><td>Anaya</td><td>Ríos Terán, Ana</td><td>17/04/2005</td></tr>
      <tr><td>1005</td><td>Estadística</td><td>Murray Spiegel</td><td>McGraw Hill</td><td>Roca, René</td><td>16/04/2005</td></tr>
      <tr><td>1006</td><td>Oracle University</td><td>Nancy Greenberg y Priya Nathan</td><td>Oracle Corp.</td><td>García Roque, Luis</td><td>20/04/2005</td></tr>
      <tr><td>1007</td><td>Clipper 5.01</td><td>Ramalho</td><td>McGraw Hill</td><td>Pérez Gómez, Juan</td><td>18/04/2005</td></tr>
    </tbody>
  </table>
</div>
NO CUMPLE NINGUNA FORMA NORMAL


Primera forma normal (1FN)
NO CUMPLE 1FN

Autor en el libro 1006: Nancy Greenberg y Priya Nathan. Hay dos autores en una sola celda, así que no es atómico.

NombreLector: Pérez Gómez, Juan junta apellidos y nombre en una celda. Se decide manejar el apellido y nombre en columnas diferentes.

PrestamoLibro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr>
        <th>codLibro PK</th>
        <th>Titulo</th>
        <th>Editorial</th>
        <th>apellidoLector PK</th>
        <th>nombreLector PK</th>
        <th>Fechadev PK</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>Variable compleja</td><td>McGraw Hill</td><td>Pérez Gómez</td><td>Juan</td><td>15/04/2005</td></tr>
      <tr><td>1004</td><td>Visual Basic 5</td><td>Anaya</td><td>Ríos Terán</td><td>Ana</td><td>17/04/2005</td></tr>
      <tr><td>1005</td><td>Estadística</td><td>McGraw Hill</td><td>Roca</td><td>René</td><td>16/04/2005</td></tr>
      <tr><td>1006</td><td>Oracle University</td><td>Oracle Corp.</td><td>García Roque</td><td>Luis</td><td>20/04/2005</td></tr>
      <tr><td>1007</td><td>Clipper 5.01</td><td>McGraw Hill</td><td>Pérez Gómez</td><td>Juan</td><td>18/04/2005</td></tr>
    </tbody>
  </table>
</div>
Autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idAutor PK </th><th>nombreAutor</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Murray Spiegel</td></tr>
      <tr><td>2</td><td>E. Petroustsos</td></tr>
      <tr><td>3</td><td>Nancy Greenberg</td></tr>
      <tr><td>4</td><td>Priya Nathan</td></tr>
      <tr><td>5</td><td>Ramalho</td></tr>
    </tbody>
  </table>
</div>
Libro_autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>codLibro PK FK</th><th>idAutor PK FK</th></tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>1</td></tr>
      <tr><td>1004</td><td>2</td></tr>
      <tr><td>1005</td><td>1</td></tr>
      <tr><td>1006</td><td>3</td></tr>
      <tr><td>1006</td><td>4</td></tr>
      <tr><td>1007</td><td>5</td></tr>
    </tbody>
  </table>
</div>Segunda forma normal (2FN)
NO CUMPLE 2FN

Titulo y Editorial dependen solo de codLibro → dependencia parcial → no cumple 2FN. Se crea Libro.

Se separa el lector como entidad propia. Como nombre y apellido no garantizan unicidad (homónimos), se le asigna un identificador idLector.

libro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>codLibro PK </th><th>Titulo</th><th>Editorial</th></tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>Variable compleja</td><td>McGraw Hill</td></tr>
      <tr><td>1004</td><td>Visual Basic 5</td><td>Anaya</td></tr>
      <tr><td>1005</td><td>Estadística</td><td>McGraw Hill</td></tr>
      <tr><td>1006</td><td>Oracle University</td><td>Oracle Corp.</td></tr>
      <tr><td>1007</td><td>Clipper 5.01</td><td>McGraw Hill</td></tr>
    </tbody>
  </table>
</div>
Autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idAutor PK </th><th>nombreAutor</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Murray Spiegel</td></tr>
      <tr><td>2</td><td>E. Petroustsos</td></tr>
      <tr><td>3</td><td>Nancy Greenberg</td></tr>
      <tr><td>4</td><td>Priya Nathan</td></tr>
      <tr><td>5</td><td>Ramalho</td></tr>
    </tbody>
  </table>
</div>
Lector
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idLector PK </th><th>apellidoLector</th><th>nombreLector</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Pérez Gómez</td><td>Juan</td></tr>
      <tr><td>2</td><td>Ríos Terán</td><td>Ana</td></tr>
      <tr><td>3</td><td>Roca</td><td>René</td></tr>
      <tr><td>4</td><td>García Roque</td><td>Luis</td></tr>
    </tbody>
  </table>
</div>
Libro_autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>codLibro PK FK</th><th>idAutor PK FK</th></tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>1</td></tr>
      <tr><td>1004</td><td>2</td></tr>
      <tr><td>1005</td><td>1</td></tr>
      <tr><td>1006</td><td>3</td></tr>
      <tr><td>1006</td><td>4</td></tr>
      <tr><td>1007</td><td>5</td></tr>
    </tbody>
  </table>
</div>
PrestamoLibro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idPrestamo PK </th><th>codLibro FK</th><th>idLector FK</th><th>fecha</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>1001</td><td>1</td><td>15/04/2005</td></tr>
      <tr><td>2</td><td>1004</td><td>2</td><td>17/04/2005</td></tr>
      <tr><td>3</td><td>1005</td><td>3</td><td>16/04/2005</td></tr>
      <tr><td>4</td><td>1006</td><td>4</td><td>20/04/2005</td></tr>
      <tr><td>5</td><td>1007</td><td>1</td><td>18/04/2005</td></tr>
    </tbody>
  </table>
</div>Tercera forma normal (3FN)
EN TEORIA CUMPLE 3FN

Aun no hay unicidad en editorial, lo ideal seria crear otra tabla con el nit de la editorial y su nombre. El nit es inventado ya que no se da esta informacion lo ideal es poner datos reales alli.

Libro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>codLibro PK </th><th>Titulo</th><th>nitEditorial FK</th></tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>Variable compleja</td><td>1</td></tr>
      <tr><td>1004</td><td>Visual Basic 5</td><td>2</td></tr>
      <tr><td>1005</td><td>Estadística</td><td>1</td></tr>
      <tr><td>1006</td><td>Oracle University</td><td>3</td></tr>
      <tr><td>1007</td><td>Clipper 5.01</td><td>1</td></tr>
    </tbody>
  </table>
</div>
Editorial
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>nitEditorial PK </th><th>nombreEditorial</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>McGraw Hill</td></tr>
      <tr><td>2</td><td>Anaya</td></tr>
      <tr><td>3</td><td>Oracle Corp.</td></tr>
    </tbody>
  </table>
</div>
Autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idAutor PK </th><th>nombreAutor</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Murray Spiegel</td></tr>
      <tr><td>2</td><td>E. Petroustsos</td></tr>
      <tr><td>3</td><td>Nancy Greenberg</td></tr>
      <tr><td>4</td><td>Priya Nathan</td></tr>
      <tr><td>5</td><td>Ramalho</td></tr>
    </tbody>
  </table>
</div>
Lector
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idLector PK</th><th>apellidoLector</th><th>nombreLector</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>Pérez Gómez</td><td>Juan</td></tr>
      <tr><td>2</td><td>Ríos Terán</td><td>Ana</td></tr>
      <tr><td>3</td><td>Roca</td><td>René</td></tr>
      <tr><td>4</td><td>García Roque</td><td>Luis</td></tr>
    </tbody>
  </table>
</div>
Libro_autor
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>codLibro PK FK</th><th>idAutor PK FK</th></tr>
    </thead>
    <tbody>
      <tr><td>1001</td><td>1</td></tr>
      <tr><td>1004</td><td>2</td></tr>
      <tr><td>1005</td><td>1</td></tr>
      <tr><td>1006</td><td>3</td></tr>
      <tr><td>1006</td><td>4</td></tr>
      <tr><td>1007</td><td>5</td></tr>
    </tbody>
  </table>
</div>
PrestamoLibro
<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>idPrestamo PK </th><th>codLibro FK</th><th>idLector FK</th><th>fecha</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>1001</td><td>1</td><td>15/04/2005</td></tr>
      <tr><td>2</td><td>1004</td><td>2</td><td>17/04/2005</td></tr>
      <tr><td>3</td><td>1005</td><td>3</td><td>16/04/2005</td></tr>
      <tr><td>4</td><td>1006</td><td>4</td><td>20/04/2005</td></tr>
      <tr><td>5</td><td>1007</td><td>1</td><td>18/04/2005</td></tr>
    </tbody>
  </table>
</div>

## Archivos del proyecto

Aquí puedes descargar el ejericio realizado en Excel.

<div class="download-box">
  <p class="download-box__title">Normalización</p>
  <div class="download-box__buttons">
    <a class="download-btn" href="/descargas/biblioteca.zip" download>↓ Excel</a>
  </div>
</div>
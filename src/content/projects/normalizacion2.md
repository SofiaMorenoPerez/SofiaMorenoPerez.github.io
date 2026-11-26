---
title: 'Normalización 2'
summary: 'Una tienda que distribuye productos en múltiples sucursales y registra ventas'
cover: ../../assets/images/projects/sucursal.jpg
coverAlt: 'Normalización 2'
tech: ['Normalización', 'Formas normales', 'Bases de Datos']
role: 'Diseño de bases de datos'
year: 2026
featured: false
---

Una tienda que distribuye productos en múltiples sucursales y registra ventas

(`ID_Venta`, `Fecha_Venta`, `ID_Sucursal`, `Nombre_Sucursal`, `Ciudad_Sucursal`, `ID_Producto`, `Nombre_Producto`, `Categoría_Producto`, `Precio_Unitario`, `Cantidad_Vendida`, `ID_Vendedor`, `Nombre_Vendedor`, `Comisión_Vendedor`)

## Tabla inicial

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>Fecha_Venta</th><th>ID_Sucursal</th><th>Nombre_Sucursal</th><th>Ciudad_Sucursal</th><th>ID_Producto (PK)</th><th>Nombre_Producto</th><th>Categoría_Producto</th><th>Precio_Unitario</th><th>Cantidad_Vendida</th><th>ID_Vendedor</th><th>Nombre_Vendedor</th><th>Comisión_Vendedor</th></tr>
    </thead>
  </table>
</div>

---

## Dependencias funcionales

<div class="hr-table-wrapper">
  <table class="hr-table">
    <tbody>
      <tr><td>ID_Venta → Fecha_Venta</td><td>porque una venta ocurre en un solo momento, entonces tiene una única fecha.</td></tr>
      <tr><td>ID_Venta → ID_Sucursal</td><td>porque una venta se realiza en una sola sucursal.</td></tr>
      <tr><td>ID_Venta → ID_Vendedor</td><td>porque una venta la atiende un único vendedor.</td></tr>
      <tr><td>ID_Sucursal → Nombre_Sucursal</td><td>porque cada sucursal tiene un nombre único.</td></tr>
      <tr><td>ID_Sucursal → Ciudad_Sucursal</td><td>porque cada sucursal está físicamente ubicada en una sola ciudad.</td></tr>
      <tr><td>ID_Producto → Nombre_Producto</td><td>porque cada producto tiene un nombre único.</td></tr>
      <tr><td>ID_Producto → Categoría_Producto</td><td>porque cada producto pertenece a una única categoría (no puede estar en "Electrodomésticos" y "Ropa" al tiempo).</td></tr>
      <tr><td>ID_Producto → Precio_Unitario</td><td>porque cada producto tiene un precio fijo de catálogo.</td></tr>
      <tr><td>{ID_Venta, ID_Producto} → Cantidad_Vendida</td><td>porque la cantidad vendida depende de la unión de cuántas unidades de ESE producto se vendieron en ESA venta específicamente.</td></tr>
      <tr><td>ID_Vendedor → Nombre_Vendedor</td><td>porque cada vendedor tiene un nombre único.</td></tr>
      <tr><td>ID_Vendedor → Comisión_Vendedor</td><td>porque cada vendedor tiene un porcentaje de comisión fijo asignado para las ventas.</td></tr>
    </tbody>
  </table>
</div>

---

## 1FN

Una relación está en 1FN si todos sus atributos son atómicos (un solo valor por celda) y no existen grupos repetidos.

Como la relación presenta dependencias parciales (2FN), y teniendo en cuenta que para estar en 3FN primero se debe cumplir 2FN, la relación se encuentra únicamente en **1FN**.

---

## 2FN

Una relación está en 2FN si, además de cumplir 1FN, todos los atributos no-clave dependen de la clave primaria completa, en este caso no aplica porque la clave de esta relación es compuesta: (ID_Venta, ID_Producto) y todo atributo no-clave debe depender de las dos partes de la clave combinada, no de una sola de las dos partes por separado, como pasa en este caso

Sí, hay varios atributos que dependen de solo parte de la clave, ya que la clave primaria es compuesta: (`ID_Venta`, `ID_Producto`).

- Solo de **`ID_Venta`** dependen: `Fecha_Venta`, `ID_Sucursal`, `Nombre_Sucursal`, `Ciudad_Sucursal`, `ID_Vendedor`, `Nombre_Vendedor`, `Comisión_Vendedor`.
- Solo de **`ID_Producto`** dependen: `Nombre_Producto`, `Categoría_Producto`, `Precio_Unitario`.
- Para `Cantidad_Vendida` si depende de la clave completa (`ID_Venta` y `ID_Producto` juntos)

En si 10 atributos no clave presentan dependencia parcial → no cumple **2FN**.

**CLAVE PRIMARIA** · **CLAVE FORANEA**

**Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>Fecha_Venta</th><th>ID_Sucursal</th><th>Nombre_Sucursal</th><th>Ciudad_Sucursal</th><th>ID_Vendedor</th><th>Nombre_Vendedor</th><th>Comisión_Vendedor</th></tr>
    </thead>
  </table>
</div>

Todos estos atributos ya dependen de la clave completa de esta tabla (ID_Venta, que ahora es clave simple aquí) y ya no hay dependencia parcial en esta tabla

**Producto**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Producto (PK)</th><th>Nombre_Producto</th><th>Categoría_Producto</th><th>Precio_Unitario</th></tr>
    </thead>
  </table>
</div>

Id_Producto queda como clave simple, todos los atributos dependen directamente de ella. Sin dependencias parciales ni transitivas

**Detalle_Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>ID_Producto (PK)</th><th>Cantidad_Vendida</th></tr>
    </thead>
  </table>
</div>

Cantidad_Vendida es el único atributo que necesitaba la clave compuesta completa (depende de qué venta Y qué producto a la vez). Al quedar solo con la clave compuesta, ya no hay dependencia parcial en esta tabla.

---

## 3FN

Para estar en 3FN ningún atributo no-clave puede depender de otro atributo no-clave — todos los atributos deben depender directamente de la clave primaria, sin en si necesitar de otro atributo intermedio, en este caso Venta tiene dependencias transitivas, es necesario normalizarlo

Sí, hay atributos que no dependen directamente de la clave, sino de otro atributo que no es clave, dependencias transitivas

- `ID_Venta` → `ID_Sucursal` → `Nombre_Sucursal`, `Ciudad_Sucursal`
- `ID_Venta` → `ID_Vendedor` → `Nombre_Vendedor`, `Comisión_Vendedor`

En ambos casos, el nombre y los datos de sucursal y vendedor no dependen directamente de `ID_Venta`, sino de `ID_Sucursal` y `ID_Vendedor` que no son atributos clave → problema de **3FN.**

**CLAVE PRIMARIA** · **CLAVE FORANEA**

**Sucursal**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Sucursal (PK)</th><th>Nombre_Sucursal</th><th>Ciudad_Sucursal</th></tr>
    </thead>
  </table>
</div>

Clave simple, ambos atributos dependen directamente de ella. Sin dependencias transitivas.

**Vendedor**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Vendedor (PK)</th><th>Nombre_Vendedor</th><th>Comisión_Vendedor</th></tr>
    </thead>
  </table>
</div>

Clave simple, ambos atributos dependen directamente de ella. Sin dependencias transitivas.

**Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>Fecha_Venta</th><th>ID_Sucursal (FK)</th><th>ID_Vendedor (FK)</th></tr>
    </thead>
  </table>
</div>

Ya no existen dependencias transitivas en esta tabla, los atributos que antes dependían indirectamente de ID_Venta a traves de ID_Sucursal y ID_Vendedor se movieron a tablas propias. Solo quedan las llaves foráneas (ID_Sucursal, ID_Vendedor) y Fecha_Venta

**Detalle_Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>ID_Producto (PK)</th><th>Cantidad_Vendida</th></tr>
    </thead>
  </table>
</div>

**Producto**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Producto (PK)</th><th>Nombre_Producto</th><th>Categoría_Producto</th><th>Precio_Unitario</th></tr>
    </thead>
  </table>
</div>

---

## Esquema resultante

**CLAVE PRIMARIA** · **CLAVE FORANEA**

**Sucursal**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Sucursal (PK)</th><th>Nombre_Sucursal</th><th>Ciudad_Sucursal</th></tr>
    </thead>
  </table>
</div>

**Vendedor**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Vendedor (PK)</th><th>Nombre_Vendedor</th><th>Comisión_Vendedor</th></tr>
    </thead>
  </table>
</div>

**Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>Fecha_Venta</th><th>ID_Sucursal (FK)</th><th>ID_Vendedor (FK)</th></tr>
    </thead>
  </table>
</div>

**Detalle_Venta**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Venta (PK)</th><th>ID_Producto (PK)</th><th>Cantidad_Vendida</th></tr>
    </thead>
  </table>
</div>

**Producto**

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ID_Producto (PK)</th><th>Nombre_Producto</th><th>Categoría_Producto</th><th>Precio_Unitario</th></tr>
    </thead>
  </table>
</div>

---

## Análisis

**B)** Después de cada paso: ¿desaparecieron las dependencias problemáticas? ¿surgieron nuevas? ¿en qué tabla?

Para el paso 1 (2FN) las 10 dependencias parciales (las que dependían de solo una parte de la clave compuesta) desaparecieron, no surgieron dependencias problemáticas nuevas, pero quedaban las dependencias transitivas que ya existían de fondo, ahora concentradas en la tabla Venta (Nombre_Sucursal, Ciudad_Sucursal dependientes de ID_Sucursal, y Nombre_Vendedor, Comisión_Vendedor dependientes de ID_Vendedor).Después del Paso 2 (3FN): Desaparecieron también las dependencias transitivas, al separar Sucursal y Vendedor en sus propias tablas, finalmente luego de esto tampoco surgió ninguna dependencia problemática nueva en ninguna de las 5 tablas resultantes.

**C)** Operación típica: describe una búsqueda o cambio común en el ESQUEMA ORIGINAL vs tu ESQUEMA NORMALIZADO. ¿En cuántas tablas buscas en cada caso? ¿Se simplifica o se complica?

Como ejemplo de operación típica se puede tomar la consulta del nombre y ciudad de la sucursal, junto con el nombre y comisión del vendedor, para una venta específica como la venta #330. En el esquema original, al estar todo en una sola tabla, solo se revisaría por ID_Venta = 330, se busca en una única tabla. En el esquema normalizado, en cambio, es necesario revisar varias tablas, como la tabla Venta con Sucursal (a través de ID_Sucursal) y con Vendedor (a través de ID_Vendedor), y si se requiere el detalle de los productos vendidos, también seria necesario cruzar con Detalle_Venta y Producto, llegando a consultar hasta 5 tablas según la información que se necesite. Significa que la consulta se complica ya que es necesario la revisión de varias tablas en lugar de una sola tabla, pero a cambio se simplifica y se asegura el tema en las actualizaciones en los datos, ya que cambiar el nombre de una sucursal o la comisión de un vendedor ahora implica una sola actualización, en lugar de modificar varias filas repetidas.

**D)** ¿En qué forma normal está? ¿Necesitaría BCNF? ¿Por qué sí o por qué no? ¿Detienes ahí o continuarías normalizando?

Al finalizar se encuentran en Tercera Forma Normal (3FN), ya que no existen dependencias parciales ni transitivas en ninguna de ellas. Al revisar si sería necesario avanzar a BCNF, se encuentra que en cada tabla la única dependencia presente tiene como determinante exactamente a la clave primaria de esa misma tabla; por ejemplo, en Venta el único determinante es ID_Venta, y en Detalle_Venta es la combinación completa (ID_Venta, ID_Producto). Por lo tanto, el esquema ya cumple BCNF de forma automática, dado que ninguna tabla presenta claves candidatas que se solapen entre sí. Entonces pararía ahi ya que de igual manera tampoco se identifican dependencias multivaluadas independientes que justifique el avanzar hacia la Cuarta Forma Normal (4FN)
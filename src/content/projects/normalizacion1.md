---
title: 'Normalización: caso de consultas médicas'
summary: 'Normalización paso a paso de una tabla de consultas médicas, desde la primera forma normal hasta la cuarta, identificando dependencias y descomponiendo en cada etapa.'
cover: ../../assets/images/projects/consultorio.jpg
coverAlt: 'Tablas resultantes de la normalización del caso de consultas médicas'
tech: ['Normalización', 'Formas normales', 'Bases de Datos']
role: 'Diseño de bases de datos'
year: 2026
featured: false
---

En esta actividad se normalizó una tabla de **consultas médicas** que mezclaba datos de visitas, pacientes y proveedores (médicos y practicantes). Se fue descomponiendo en cada forma normal, justificando cada paso con las dependencias funcionales de los atributos.

## ¿Qué es la normalización?

Es el proceso mediante el cual se crean relaciones (tablas) que evitan la mayoría de los problemas de un mal diseño relacional. Se apoya en la **proyección** del álgebra relacional, porque cada vez que se pasa a una forma normal superior se *descompone* una tabla en varias, y ocasionalmente en el **join**, que sirve para volver a reconstruir la información original.

Cada forma normal pide reglas más estrictas que la anterior: una tabla que cumple una forma normal alta cumple también las anteriores. En la práctica, llegar a **tercera forma normal (3FN)** evita la mayoría de los problemas.

## Anomalías que se quieren evitar

- **De inserción:** no poder registrar un dato porque falta otro. Por ejemplo, no poder guardar un paciente hasta que tenga una visita.
- **De eliminación:** perder datos que se querían conservar al borrar otros. Por ejemplo, al borrar la única visita de un proveedor se pierde su especialidad.
- **De modificación:** tener datos repetidos que pueden quedar inconsistentes. Por ejemplo, si cambia la ciudad de un paciente hay que actualizarla en todas sus filas.

## Tabla original

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>VisitaNo</th><th>DiaVisita</th><th>PacNo</th><th>PacEdad</th><th>PacCiudad</th><th>ProvNo</th><th>ProvEspecialidad</th><th>Diagnostico</th></tr>
    </thead>
    <tbody>
      <tr><td>V10020</td><td>13/01/2019</td><td>P1</td><td>35</td><td>BOGOTA</td><td>D1</td><td>INTERNISTA</td><td>INFECCIÓN DE OÍDO</td></tr>
      <tr><td>V10020</td><td>13/01/2019</td><td>P1</td><td>35</td><td>BOGOTA</td><td>D2</td><td>PRACTICANTE ENFERMERÍA</td><td>INFLUENZA</td></tr>
      <tr><td>V93030</td><td>20/01/2019</td><td>P3</td><td>17</td><td>CALI</td><td>D2</td><td>PRACTICANTE ENFERMERÍA</td><td>EMBARAZO</td></tr>
      <tr><td>V82110</td><td>18/01/2019</td><td>P2</td><td>60</td><td>CUCUTA</td><td>D3</td><td>CARDIÓLOGO</td><td>SOPLO CARDIACO</td></tr>
    </tbody>
  </table>
</div>

**Clave primaria:** (`VisitaNo`, `ProvNo`), porque en una misma visita (por ejemplo `V10020`) pueden atender varios proveedores.

**Dependencias funcionales identificadas:**

- `VisitaNo` → `DiaVisita`, `PacNo`
- `PacNo` → `PacEdad`, `PacCiudad`
- `ProvNo` → `ProvEspecialidad`
- (`VisitaNo`, `ProvNo`) → `Diagnostico`

**Problemas de la tabla:** los datos de la visita y del paciente se repiten en cada fila (la visita `V10020` aparece dos veces con la misma edad y ciudad), no se puede registrar un proveedor ni un paciente sin una visita, y la especialidad de `D2` se repite cada vez que atiende.

---

## Primera forma normal (1FN)

Una tabla está en 1FN si los datos están en una tabla bidimensional y **no hay grupos repetitivos**.

**Aplicación:** en este caso el grupo repetitivo son los **proveedores que atienden en una misma visita** (`ProvNo`, `ProvEspecialidad`, `Diagnostico`): una visita puede tener varios. La forma correcta de manejarlo es sacar ese grupo a **otra tabla** que apunte a la visita por medio de `VisitaNo`, en lugar de repetir los datos de la visita en cada fila.

**Consulta** (`VisitaNo` PK, DiaVisita, PacNo, PacEdad, PacCiudad)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>VisitaNo (PK)</th><th>DiaVisita</th><th>PacNo</th><th>PacEdad</th><th>PacCiudad</th></tr>
    </thead>
    <tbody>
      <tr><td>V10020</td><td>13/01/2019</td><td>P1</td><td>35</td><td>BOGOTA</td></tr>
      <tr><td>V93030</td><td>20/01/2019</td><td>P3</td><td>17</td><td>CALI</td></tr>
      <tr><td>V82110</td><td>18/01/2019</td><td>P2</td><td>60</td><td>CUCUTA</td></tr>
    </tbody>
  </table>
</div>

**Consulta-Especialidad** (`VisitaNo` FK + `ProvNo` PK, ProvEspecialidad, Diagnostico)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>VisitaNo (PK, FK)</th><th>ProvNo (PK)</th><th>ProvEspecialidad</th><th>Diagnostico</th></tr>
    </thead>
    <tbody>
      <tr><td>V10020</td><td>D1</td><td>INTERNISTA</td><td>INFECCIÓN DE OÍDO</td></tr>
      <tr><td>V10020</td><td>D2</td><td>PRACTICANTE ENFERMERÍA</td><td>INFLUENZA</td></tr>
      <tr><td>V93030</td><td>D2</td><td>PRACTICANTE ENFERMERÍA</td><td>EMBARAZO</td></tr>
      <tr><td>V82110</td><td>D3</td><td>CARDIÓLOGO</td><td>SOPLO CARDIACO</td></tr>
    </tbody>
  </table>
</div>

Ahora cada visita se guarda una sola vez. Aún queda un problema: la especialidad de `D2` se repite en dos filas.

---

## Segunda forma normal (2FN)

Una tabla está en 2FN si está en 1FN y **todos los atributos que no son clave dependen de toda la clave primaria**, no solo de una parte.

**Aplicación:** en `Consulta-Especialidad` la clave es (`VisitaNo`, `ProvNo`), pero `ProvEspecialidad` depende **solo de `ProvNo`**. Es una **dependencia parcial**. Se separa en su propia tabla:

**Consulta** queda igual que en 1FN.

**Consulta-Especialidad** (`VisitaNo` FK + `ProvNo` FK, Diagnostico)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>VisitaNo (PK, FK)</th><th>ProvNo (PK, FK)</th><th>Diagnostico</th></tr>
    </thead>
    <tbody>
      <tr><td>V10020</td><td>D1</td><td>INFECCIÓN DE OÍDO</td></tr>
      <tr><td>V10020</td><td>D2</td><td>INFLUENZA</td></tr>
      <tr><td>V93030</td><td>D2</td><td>EMBARAZO</td></tr>
      <tr><td>V82110</td><td>D3</td><td>SOPLO CARDIACO</td></tr>
    </tbody>
  </table>
</div>

**Especialidad** (`ProvNo` PK, ProvEspecialidad)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ProvNo (PK)</th><th>ProvEspecialidad</th></tr>
    </thead>
    <tbody>
      <tr><td>D1</td><td>INTERNISTA</td></tr>
      <tr><td>D2</td><td>PRACTICANTE ENFERMERÍA</td></tr>
      <tr><td>D3</td><td>CARDIÓLOGO</td></tr>
    </tbody>
  </table>
</div>

Ya se puede registrar un proveedor sin que haya atendido a nadie, y la especialidad de `D2` se guarda una sola vez.

---

## Tercera forma normal (3FN)

Una tabla está en 3FN si está en 2FN y **no hay dependencias transitivas**: un atributo que no es clave no puede depender de otro atributo que tampoco es clave.

**Aplicación:** en `Consulta` existe la cadena `VisitaNo` → `PacNo` → (`PacEdad`, `PacCiudad`). La edad y la ciudad no dependen de la visita sino del **paciente**, y `PacNo` no es una clave candidata de `Consulta`. Se separa a los pacientes en su propia tabla:

**Consulta** (`VisitaNo` PK, DiaVisita, `PacNo` FK)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>VisitaNo (PK)</th><th>DiaVisita</th><th>PacNo (FK)</th></tr>
    </thead>
    <tbody>
      <tr><td>V10020</td><td>13/01/2019</td><td>P1</td></tr>
      <tr><td>V93030</td><td>20/01/2019</td><td>P3</td></tr>
      <tr><td>V82110</td><td>18/01/2019</td><td>P2</td></tr>
    </tbody>
  </table>
</div>

**Paciente** (`PacNo` PK, PacEdad, PacCiudad)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>PacNo (PK)</th><th>PacEdad</th><th>PacCiudad</th></tr>
    </thead>
    <tbody>
      <tr><td>P1</td><td>35</td><td>BOGOTA</td></tr>
      <tr><td>P2</td><td>60</td><td>CUCUTA</td></tr>
      <tr><td>P3</td><td>17</td><td>CALI</td></tr>
    </tbody>
  </table>
</div>

Las tablas **Consulta-Especialidad** y **Especialidad** no cambian. Ahora los datos de un paciente se guardan una sola vez, así que si cambia su ciudad se corrige en un único lugar.

---

## Forma normal de Boyce-Codd (BCNF)

BCNF se encarga del caso en que existen varias claves candidatas que se solapan entre sí: cuando un atributo que no es la clave completa determina a otro atributo, aunque ese atributo sea parte de una clave. Para estar en BCNF, una tabla debe estar en 3FN y **todo determinante debe ser una clave candidata** (todo atributo debe depender únicamente de un determinante que sea superclave).

**Aplicación:** se revisan los determinantes de cada tabla:

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>Tabla</th><th>Determinante</th><th>Determina</th><th>¿Es clave candidata?</th></tr>
    </thead>
    <tbody>
      <tr><td>Consulta</td><td>VisitaNo</td><td>DiaVisita, PacNo</td><td>Sí</td></tr>
      <tr><td>Consulta-Especialidad</td><td>(VisitaNo, ProvNo)</td><td>Diagnostico</td><td>Sí</td></tr>
      <tr><td>Especialidad</td><td>ProvNo</td><td>ProvEspecialidad</td><td>Sí</td></tr>
      <tr><td>Paciente</td><td>PacNo</td><td>PacEdad, PacCiudad</td><td>Sí</td></tr>
    </tbody>
  </table>
</div>

Todos los determinantes son claves candidatas, y ninguna tabla tiene claves solapadas. Por eso el modelo **ya está en BCNF** y no hace falta descomponer más.

---

## Cuarta forma normal (4FN)

La 4FN trata las **dependencias multivaluadas**: cuando para un mismo valor de la clave, un atributo puede tomar varios valores a la vez (varios teléfonos, varios idiomas) y esos conjuntos de valores son **independientes entre sí**. El problema es que, al poner dos atributos así en la misma tabla, las filas se cruzan entre sí. Una tabla está en 4FN si está en BCNF y no tiene dependencias multivaluadas.

**Aplicación:** las cuatro tablas del caso no tienen dos atributos multivaluados e independientes para una misma clave, así que **ya cumplen 4FN**.

Para ver qué pasaría si existiera, se plantea un caso hipotético: un proveedor con varios teléfonos y varios idiomas, que son independientes (el idioma no depende del teléfono).

**Proveedor** (hipotético, en la misma tabla se cruzan los dos conjuntos)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ProvNo</th><th>ProvTelefono</th><th>ProvIdioma</th></tr>
    </thead>
    <tbody>
      <tr><td>D1</td><td>3675422765</td><td>Español</td></tr>
      <tr><td>D1</td><td>3675422765</td><td>Inglés</td></tr>
      <tr><td>D1</td><td>3572456789</td><td>Español</td></tr>
      <tr><td>D1</td><td>3572456789</td><td>Inglés</td></tr>
      <tr><td>D2</td><td>3006547893</td><td>Español</td></tr>
      <tr><td>D3</td><td>3296548976</td><td>Español</td></tr>
      <tr><td>D3</td><td>3296548976</td><td>Inglés</td></tr>
    </tbody>
  </table>
</div>

`D1` tiene 2 teléfonos y 2 idiomas, y por eso aparece en 4 filas (2 × 2): cada teléfono se repite por cada idioma. Se dice que `ProvNo` **multidetermina** a `ProvTelefono` y a `ProvIdioma`. Se resuelve separando cada dependencia multivaluada en su propia tabla:

**Proveedor_Telefono** (`ProvNo`, `ProvTelefono`)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ProvNo (PK)</th><th>ProvTelefono (PK)</th></tr>
    </thead>
    <tbody>
      <tr><td>D1</td><td>3675422765</td></tr>
      <tr><td>D1</td><td>3572456789</td></tr>
      <tr><td>D2</td><td>3006547893</td></tr>
      <tr><td>D3</td><td>3296548976</td></tr>
    </tbody>
  </table>
</div>

**Proveedor_Idioma** (`ProvNo`, `ProvIdioma`)

<div class="hr-table-wrapper">
  <table class="hr-table">
    <thead>
      <tr><th>ProvNo (PK)</th><th>ProvIdioma (PK)</th></tr>
    </thead>
    <tbody>
      <tr><td>D1</td><td>Español</td></tr>
      <tr><td>D1</td><td>Inglés</td></tr>
      <tr><td>D2</td><td>Español</td></tr>
      <tr><td>D3</td><td>Español</td></tr>
      <tr><td>D3</td><td>Inglés</td></tr>
    </tbody>
  </table>
</div>

Con este diseño se pueden agregar o quitar teléfonos e idiomas de forma independiente, y cada dato aparece una sola vez.

> Ejemplo: una **dependencia funcional** significa que `X` determina un único valor de `Y` (`ProvNo` → `ProvEspecialidad`). Una **dependencia multivaluada** significa que `X` se relaciona con un conjunto de valores de `Y` (`ProvNo` ↠ `ProvTelefono`).

---

## Modelo final

Después de normalizar hasta 4FN, el caso queda en **4 tablas**:

- **Paciente** (`PacNo` PK, PacEdad, PacCiudad)
- **Consulta** (`VisitaNo` PK, DiaVisita, `PacNo` FK → Paciente)
- **Especialidad** (`ProvNo` PK, ProvEspecialidad)
- **Consulta-Especialidad** (`VisitaNo` PK/FK → Consulta, `ProvNo` PK/FK → Especialidad, Diagnostico)

**Relaciones:** un paciente tiene muchas consultas (1:N), y una consulta puede ser atendida por varios proveedores y un proveedor atiende muchas consultas (M:N, resuelta por la tabla `Consulta-Especialidad`).

<!-- ![Ejercicio desarrollado en Excel](../../assets/images/projects/normalizacion-excel.png) -->

## Decisiones y dificultades

[Lo más difícil de este ejercicio fue identificar hasta qué forma normal había que llevar la tabla inicial. Además, surgió un debate: normalizar hasta la tercera forma normal (3FN) ya es para mí algo obligatorio, pero si la tabla ya está en un nivel de normalización adecuado, ¿es necesario seguir? ¿Vale la pena el costo adicional en tablas, uniones (joins) y complejidad? También siempre hay que preguntarse qué quiere el cliente: ¿nos permite crear más tablas?, ¿podemos usar más espacio de almacenamiento? ]

## Conclusión

La normalización permitió pasar de una sola tabla con datos repetidos a cuatro tablas donde cada dato vive en un único lugar. Cada forma normal eliminó un tipo de problema: la 1FN quitó el grupo repetitivo, la 2FN la dependencia parcial, la 3FN la dependencia transitiva, y BCNF y 4FN confirmaron que no quedaban determinantes ni dependencias multivaluadas problemáticas.
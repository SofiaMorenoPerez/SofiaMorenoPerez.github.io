---
title: 'Álgebra relacional: Empleados y universidades'
summary: 'Siete consultas resueltas con expresiones de álgebra relacional sobre empleados, universidades y sueldos.'
cover: ../../assets/images/projects/empleados.jpg
coverAlt: 'Expresiones de álgebra relacional sobre empleados y universidades'
tech: ['Álgebra relacional', 'Bases de Datos']
role: 'Estudiante'
year: 2026
featured: false
---

## Las relaciones

```
empleado    (cod_emp, nombre_empleado, calle, ciudad)
trabaja     (cod_emp, cod_uni, sueldo_mensual)
universidad (cod_uni, nombre_uni, ciudad)
jefe        (cod_jefe, nombre_jefe, calle, ciudad)
```

Para cada enunciado se diseña una expresión del álgebra relacional.

> `empleado` y `universidad` tienen un atributo `ciudad`. Por eso, cuando se necesita una de las dos, se escribe con el nombre de la relación (`EMPLEADO.ciudad`). La relación `jefe` no se usa en estas consultas.

---

## Ejercicio 1

**Enunciado:** averiguar los nombres de todos los empleados que trabajan para la Universidad Central.

```
π nombre_empleado (
  σ nombre_uni = "Universidad Central" (
    (EMPLEADO ⋈ EMPLEADO.cod_emp = TRABAJA.cod_emp TRABAJA)
    ⋈ TRABAJA.cod_uni = UNIVERSIDAD.cod_uni UNIVERSIDAD
  )
)
```

---

## Ejercicio 2

**Enunciado:** averiguar el nombre y la ciudad de residencia de todos los empleados que trabajan para la Universidad de Los Andes.

```
π nombre_empleado, EMPLEADO.ciudad (
  σ nombre_uni = "Universidad de Los Andes" (
    (EMPLEADO ⋈ EMPLEADO.cod_emp = TRABAJA.cod_emp TRABAJA)
    ⋈ TRABAJA.cod_uni = UNIVERSIDAD.cod_uni UNIVERSIDAD
  )
)
```

---

## Ejercicio 3

**Enunciado:** averiguar el nombre, la calle y la ciudad de residencia de todos los empleados que trabajan para la Universidad Central y ganan más de 25'000.000 anuales.

```
π nombre_empleado, calle, EMPLEADO.ciudad (
  σ nombre_uni = "Universidad Central" ∧ sueldo_mensual * 12 > 25000000 (
    (EMPLEADO ⋈ EMPLEADO.cod_emp = TRABAJA.cod_emp TRABAJA)
    ⋈ TRABAJA.cod_uni = UNIVERSIDAD.cod_uni UNIVERSIDAD
  )
)
```

---

## Ejercicio 4

**Enunciado:** averiguar el nombre de todos los empleados que viven en la misma ciudad que la universidad para la que trabajan.

```
π nombre_empleado (
  σ EMPLEADO.ciudad = UNIVERSIDAD.ciudad (
    (EMPLEADO ⋈ EMPLEADO.cod_emp = TRABAJA.cod_emp TRABAJA)
    ⋈ TRABAJA.cod_uni = UNIVERSIDAD.cod_uni UNIVERSIDAD
  )
)
```

---

## Ejercicio 5

**Enunciado:** averiguar el nombre de todos los empleados que no trabajan para la Universidad Central.

Aquí se usa la **diferencia (−)**: todos los empleados menos los que sí trabajan en la Universidad Central.

```
π nombre_empleado (EMPLEADO)
−
π nombre_empleado (
  σ nombre_uni = "Universidad Central" (
    (EMPLEADO ⋈ EMPLEADO.cod_emp = TRABAJA.cod_emp TRABAJA)
    ⋈ TRABAJA.cod_uni = UNIVERSIDAD.cod_uni UNIVERSIDAD
  )
)
```

---

## Ejercicio 6

**Enunciado:** averiguar el nombre de todos los empleados que ganan más que cualquier empleado de la Universidad de Los Andes.

Se resuelve en dos pasos. Primero se calcula el sueldo máximo de la Universidad de Los Andes (agregación **𝒢**) y se guarda en la relación `M`. Luego se comparan los sueldos con ese máximo.

```
Paso 1:
ρ M(max_sueldo) (
  𝒢 max(sueldo_mensual) (
    TRABAJA ⋈ σ nombre_uni = "Universidad de Los Andes" (UNIVERSIDAD)
  )
)

Paso 2:
π nombre_empleado (
  σ sueldo_mensual > max_sueldo (
    (EMPLEADO ⋈ TRABAJA) × M
  )
)
```

---

## Ejercicio 7

**Enunciado:** como la Universidad Nacional de Colombia está instalada en varias ciudades del país, halla todas las universidades instaladas en cada ciudad en la que está instalada la Universidad Nacional de Colombia.

Esta es una consulta de **división (÷)**, porque pide las universidades que están en *todas* esas ciudades.

```
Paso 1:
ρ C(ciudad) (
  π ciudad (σ nombre_uni = "Universidad Nacional de Colombia" (UNIVERSIDAD))
)

Paso 2:
π nombre_uni, ciudad (UNIVERSIDAD) ÷ C
```

---


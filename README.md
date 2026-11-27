# Full Stack Open — Ejercicios

Repositorio con mis soluciones a los ejercicios del curso [Full Stack Open](https://fullstackopen.com/es/) de la Universidad de Helsinki, un curso sobre desarrollo web moderno con JavaScript centrado en la construcción de aplicaciones de una sola página (SPA) con React, apoyadas por APIs REST y GraphQL construidas con Node.js.

## Estructura del repositorio

Cada parte del curso vive en su propia carpeta, con sus ejercicios organizados como proyectos independientes:

```
.
├── part0/    Fundamentos de las aplicaciones web
├── part1/    Introducción a React
├── part2/    Comunicación con el servidor
├── part3/    Programación del lado del servidor con Node.js
├── part4/    Testing del backend, seguridad de la aplicación
├── part5/    Testing de aplicaciones React, configuración de aplicaciones
├── part6/    Manejo del estado avanzado (Redux, React Query, contexto)
├── part7/    React router, estilos, webpack, hooks
├── part8/    GraphQL
├── part9/    TypeScript
├── part10/   React Native
├── part11/   CI/CD
├── part12/   Contenedores
└── part13/   Uso de una base de datos relacional
```

Cada subcarpeta de ejercicio (`partX/nombre-del-ejercicio`) es un proyecto independiente con su propio `package.json`.

## Progreso

- [x] Parte 0 — Fundamentos de las aplicaciones web
- [x] Parte 1 — Introducción a React
- [x] Parte 2 — Comunicación con el servidor
- [x] Parte 3 — Programación del lado del servidor con Node.js ([Phonebook deployment](https://fullstackopen-99ai.onrender.com))
- [x] Parte 4 — Testing del backend, seguridad de la aplicación
- [x] Parte 5 — Testing de aplicaciones React, configuración de aplicaciones
- [x] Parte 6 — Manejo del estado avanzado
- [x] Parte 7 — React router, estilos, webpack, hooks
- [x] Parte 8 — GraphQL
- [x] Parte 9 — TypeScript
- [x] Parte 10 — React Native ([Rate Repository App](#parte-10--rate-repository-app))
- [x] Parte 11 — CI/CD ([Pokedex deployment](https://fullstackopen-pockedex.onrender.com))
- [ ] Parte 12 — Contenedores
- [ ] Parte 13 — Uso de una base de datos relacional

## Cómo ejecutar un ejercicio

La mayoría de los ejercicios son proyectos independientes de Node.js. Para ejecutar uno:

```bash
cd partX/nombre-del-ejercicio
npm install
npm start
```

Para los ejercicios que incluyen tests:

```bash
npm test
```

## Tecnologías

A lo largo del curso se usan, entre otras:

- React
- Redux / React Query
- Node.js y Express
- MongoDB / PostgreSQL
- GraphQL
- TypeScript
- React Native
- Docker

## Parte 10 — Rate Repository App

Aplicación móvil desarrollada con React Native y Expo para consultar, calificar y reseñar repositorios de GitHub, consumiendo una API GraphQL con Apollo Client y autenticación con JWT (`AsyncStorage`).

### Publicación con EAS Update

La aplicación está publicada mediante EAS Update en el canal `production`:

- **EAS Project**: [@mierri/rate-repository-app](https://expo.dev/accounts/mierri/projects/rate-repository-app)
- **Update Group ID**: `e9786ba5-001a-4cda-b232-7408a4d643f3`
- **Expo Go URL**: `exp://u.expo.dev/3f923677-49c6-4476-b3b6-dcda7071994b?runtime-version=1.0.0&channel-name=production`

#### Código QR

Escanea este código QR con la app **Expo Go** (o con la cámara en iOS / Android) para abrir la aplicación:

<p align="center">
  <img src="./part10/rate-repository-app/assets/qr-code.png" alt="Rate Repository App QR Code" width="280" />
</p>

> Nota: En caso de probar desde un emulador de Android o iOS, se puede abrir directamente mediante el enlace de Expo Go anterior.

## Parte 11 — CI/CD

Pipelines de integración y despliegue continuo configurados con GitHub Actions (ESLint, pruebas unitarias, build de producción, pruebas E2E con Playwright, despliegue automático en Render, versionado semántico por tags, soporte para `#skip`, notificaciones en Discord y health check periódico).

### Pokedex (Ejercicios 11.2–11.20)

- **Aplicación desplegada en Render**: [https://fullstackopen-pockedex.onrender.com](https://fullstackopen-pockedex.onrender.com)
- **Health Check**: [`/health`](https://fullstackopen-pockedex.onrender.com/health)
- **Version Endpoint**: [`/version`](https://fullstackopen-pockedex.onrender.com/version)
- **Código fuente**: [`./part11`](./part11)

### Anecdotes CI/CD (Ejercicios 11.21–11.22)

- **Repositorio independiente**: [https://github.com/mierri/anecdotes-cicd](https://github.com/mierri/anecdotes-cicd)

## Sobre el curso

Full Stack Open es un curso gratuito y abierto ofrecido por el [Departamento de Ciencias de la Computación de la Universidad de Helsinki](https://www.cs.helsinki.fi/). Más información en [fullstackopen.com](https://fullstackopen.com/es/).

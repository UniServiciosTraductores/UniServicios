# Proyecto Blockchain con Truffle y Ganache como simliador de Billeteras para la Autenticación del Estudiante Digital

Este proyecto fue desarrollado por:
<ul>
  <li>Jhoselyn Farfán</li>
  <li>José Luna</li>
  <li>Keidys Machado</li>
  <li>Williams Suarez</li>
  <li>Ramsés Sotomayor</li>
  <li>Javier Pereira</li>
  <li>Raislyn Córdova</li>
</ul>


Esto es una guía para configurar un entorno de desarrollo blockchain utilizando Truffle y Ganache. 
Aquí encontrarás instrucciones para la instalación y uso de estas herramientas, así como algunos ejemplos básicos para comenzar a desarrollar contratos inteligentes en Ethereum, para así autenticar de manera privada y agil a los estudiantes

## Prerrequisitos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 10.0 o superior)
- [Git](https://git-scm.com/)
- [Ganache](https://github.com/trufflesuite/ganache-ui/releases/download/v2.7.1/Ganache-2.7.1-win-x64.appx)

## Instalación

### Paso 1: Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/UniServiciosTraductores/UniServicios/
cd UniServicios
```
### Paso 2: Iniciar Ganache
![Screenshot_1](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/fdb9a37f-2025-4c57-b62b-ed9f384911c7)

#### Le damos en Quick Start

![Screenshot_2](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/7be8b766-1df1-43af-b60e-3f6777c25bd2)

![Screenshot_3](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/f65445b7-27b0-4454-8f57-64a5c29bbe68)

### Paso 3: Hacer deploy al proyecto
![Screenshot_4](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/29cd2e5c-3cfc-4885-be54-5b6b79ccaef8)
## En el CMD o Terminal de Visual Studio Code
```bash
npm install
truffle compile
truffle migrate
npm start
```
### Paso 4 (Opcional): Test Unitarios..
Utilizamos el modulo "Mocha" cómo pruebas unitarias..
```bash
npm test
```
![Screenshot_6](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/4da7543f-e3cb-4501-a320-74032675313f)

## Nota:
Al hacer estos pasos correctamente, tendra que ir al navegador y al `localhost:3000` para darle interactividad al proyecto.






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
### En el CMD o Terminal de Visual Studio Code(comando por comando)
```bash
npm install
truffle compile
truffle migrate
npm start
```
### Paso 4 (Opcional): Test Unitarios..
Utilizamos el marco de prueba Mocha de JavaScript para programas de Node.js, que ofrece compatibilidad con navegadores, pruebas asincrónicas, informes de cobertura de pruebas
```bash
npm test
```
![Screenshot_6](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/4da7543f-e3cb-4501-a320-74032675313f)

## Nota:
Al hacer estos pasos correctamente, tendra que ir al navegador y al `localhost:3000` para darle interactividad al proyecto.

#### ¿Por qué usar la Blockchain para la autenticación de usuarios?
Se utiliza contratos inteligentes para almacenar y verificar las credenciales de los usuarios, asegurando que las operaciones sean descentralizadas y seguras. 
Cada usuario tiene una única wallet en la blockchain de Ganache, y las operaciones de registro e inicio de sesión se gestionan a través de estos contratos inteligentes.
**Conexión con Ganache:** Se utiliza Web3 para conectarte al nodo local de Ganache en HTTP://127.0.0.1:7545.
**Contratos Inteligentes:** Cargas el contrato inteligente (Auth) utilizando su ABI y dirección desplegada en la red configurada.
**Hash de Autenticación:** Calcula un hash único combinando el nombre de usuario, dirección de usuario, contraseña y correo.
**Hash de Credenciales:** Calcula los hashes individuales para username, email y password usando web3.utils.sha3.
**Verificación de Existencia:** Verifica si el nombre de usuario o correo ya existen en la blockchain mediante los métodos del contrato inteligente.
**Registro de Usuario:** Si no hay conflicto, registra al nuevo usuario en la blockchain llamando al método register del contrato inteligente y enviando la transacción desde la dirección qué nos proporciona Ganache

## Demo del Proyecto:
Por el deterioro y escasez de memoria y procesador de la computadora, va a 30 fps, sin embargo; En una computadora de mayor gama va perfectamente fluido.

[UniServicios - Demo.webm](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/18b69911-034c-42f9-82db-202ddb351f51)




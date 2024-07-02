# Proyecto Blockchain con MetaMask y Ganache como simulador de Billeteras para la Autenticación del Estudiante Digital

Este proyecto fue desarrollado por:
<ul>
  <li>Jhoselyn Farfán</li>
  <li>José Luna</li>
  <li>Keidys Machado</li>
  <li>Williams Suarez</li>
  <li>Ramsés Sotomayor</li>
  <li>Javier Pereira</li>
  <li>Raislyn Córdova</li>
  <li>Victor Nuñez</li>
</ul>

## Herramientas Utilizadas
<div style="display:flex; justify-content:center; align-items:center">
  <p>
    <b>MetaMask: </b><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png" alt="MetaMask" width="35" height="35">
  </p>
  <p>
    <b>Ganache: </b><img src="https://seeklogo.com/images/G/ganache-logo-1EB72084A8-seeklogo.com.png" alt="MetaMask" width="35" height="35">
  </p>
  <p>
    <b>NodeJS: </b><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png?20170401104355" alt="MetaMask" width="35" height="25">
  </p>
  <p>
    <b></b>
  </p>
</div>
Esto es una guía para configurar un entorno de desarrollo blockchain utilizando Metamask y Ganache. 
Aquí encontrarás instrucciones para la instalación y uso de estas herramientas, para así autenticar de manera privada y agil a los estudiantes

## Prerrequisitos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 10.0 o superior)
- [Git](https://git-scm.com/)
- [Ganache](https://github.com/trufflesuite/ganache-ui/releases/download/v2.7.1/Ganache-2.7.1-win-x64.appx)
- [MetaMask](https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn)

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
### En el CMD o Terminal de Visual Studio Code(comando por comando)
```bash
npm install
npm start
```
### Paso 4 (Opcional): Test Unitarios..
Utilizamos el marco de prueba Jest de JavaScript para programas de Node.js, que ofrece compatibilidad con navegadores, pruebas asincrónicas, informes de cobertura de pruebas
```bash
npm test
```
![agale](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/1776c99f-2255-469c-ae7e-304744ee7c7d)


## Nota:
Al hacer estos pasos correctamente, tendra que ir al navegador y al HTTP://localhost:3000 para darle interactividad al proyecto.

#### ¿Por qué usar la Blockchain para la autenticación de usuarios?
# Uso de Ganache con MetaMask

Este proyecto utiliza Ganache y MetaMask para el desarrollo y pruebas de contratos inteligentes en la blockchain de Ethereum. A continuación, se detallan las características y la configuración de estas herramientas.

## Características

### Ganache
Ganache es una blockchain personal que proporciona un entorno seguro y controlado para desarrollar y probar contratos inteligentes. Sus características principales son:

- **Blockchain Local**: Permite realizar pruebas sin interactuar con la red principal de Ethereum o redes de prueba públicas.
- **Control Total**: Permite modificar el estado de la blockchain, ajustar parámetros de minería y simular condiciones específicas de la red.
- **Interfaz Gráfica**: Facilita la visualización y gestión de bloques, transacciones, cuentas y contratos.
- **Configuración de Cuentas**: Proporciona cuentas con fondos ficticios para pruebas.
- **Registro de Eventos**: Ofrece un registro detallado de eventos, transacciones y llamadas a contratos.

### MetaMask
MetaMask es una billetera de criptomonedas y extensión de navegador que permite interactuar con la blockchain de Ethereum. Sus características incluyen:

- **Fácil Configuración**: Se instala como una extensión en navegadores como Chrome, Firefox y Brave.
- **Gestión de Cuentas**: Permite crear y gestionar múltiples cuentas de Ethereum.
- **Conexión a Redes**: Conexión a la red principal de Ethereum, redes de prueba y redes locales como Ganache.
- **Firma de Transacciones**: Permite firmar transacciones y llamadas a contratos inteligentes.
- **Integración con DApps**: Facilita la interacción con aplicaciones descentralizadas.

## Configuración de Ganache con MetaMask

Sigue estos pasos para configurar MetaMask para trabajar con Ganache:

### Paso 1: Iniciar Ganache

1. Descarga e instala Ganache desde [Truffle Suite](https://www.trufflesuite.com/ganache).
2. Abre Ganache y anota la URL RPC (por defecto, suele ser `http://127.0.0.1:7545`).

### Paso 2: Configurar MetaMask

1. Instala la extensión de MetaMask en tu navegador desde [MetaMask](https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn).
2. Abre MetaMask y selecciona "Custom RPC" en el menú de redes.
3. Ingresa la URL RPC de Ganache y proporciona un nombre para la red.
5. Guarda la configuración.

#### Video explicativo:
[Metamask add red.webm](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/4bb6948b-6cef-4f21-afca-c08a02cf8332)



### Paso 3: Importar Cuentas de Ganache a MetaMask
Ya cuando tengas la red Ganache activa, *SI* no te llegan a cargar las demas cuentas de Ganache, haz esto:
1. En Ganache, copia la clave privada de una de las cuentas disponibles.
3. En MetaMask, selecciona "Import Account" y pega la clave privada.

#### Video explicativo:
[Metamask fixed accounts.webm](https://github.com/UniServiciosTraductores/UniServicios/assets/159819990/6bd5038d-c359-47ba-85ba-08364f30db41)



## Demo del Proyecto:
Debido al deterioro y la escasez de memoria y procesador de la computadora actual, la aplicación funciona a 30 fps incluyendo la grabación en pantalla. Sin embargo, en una computadora de mayor gama, la aplicación se ejecuta de manera perfectamente fluida


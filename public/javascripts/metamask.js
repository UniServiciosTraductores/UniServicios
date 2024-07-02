const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
document.addEventListener('DOMContentLoaded', async () => {
    const checkMetaMask = async () => {
        if (typeof window.ethereum == 'undefined') {
            Swal.fire({
                title: "¿Tienes MetaMask?",
                text: "Asegúrate de tener MetaMask instalado en tus extensiones de navegador.",
                icon: "question",
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false
            });
            return null;
        }
        return true
    };


    const checkMetamaskBoolean = await checkMetaMask();
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (checkMetamaskBoolean === true) {
            try {

                console.log("Mostrando alerta de espera");
                Swal.fire({
                    title: "Por favor, espera",
                    text: "Procesando tu solicitud...",
                    icon: "info",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });



                // Captura los datos del formulario
                const formData = new FormData(registerForm);
                const username = formData.get('username');
                const email = formData.get('email');
                const password = formData.get('password');


                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const metaMaskAddress = accounts[0]

                const data = {
                    username: username,
                    email: email,
                    password: password,
                    metaMaskAddress: metaMaskAddress
                };
                // Envía los datos al backend

                // Envía los datos al backend
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                // Ocultar alerta de "Espera"
                Swal.close();

                if (response.ok) {
                    Swal.fire({
                        title: "Registro exitoso",
                        text: result.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    }).then(() => {
                        location = '/';
                    });

                } else {
                    Swal.fire({
                        title: "Hubo un problema",
                        text: result.error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }


            } catch (error) {
                // Ocultar alerta de "Espera" en caso de error
                console.log("Error en la solicitud", error);
                Swal.close();
                Swal.fire({
                    title: "Hubo un problema!",
                    text: "Rechazaste la conexión a tú cuenta de Metamask.",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2500
                });
            }

        }
    })
});


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        // Mostrar alerta de "Espera"
        Swal.fire({
            title: "Por favor, espera",
            text: "Procesando tu solicitud...",
            icon: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Captura los datos del formulario
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const metaMaskAddress = accounts[0];

        const data = {
            email: email,
            password: password,
            metaMaskAddress: metaMaskAddress,
        };

        // Envía los datos al backend
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Espera la respuesta y convierte a JSON
        const result = await response.json();
        // Ocultar alerta de "Espera"
        Swal.close();

        if (response.ok) {
            Swal.fire({
                title: "Inicio de sesión exitoso",
                icon: "success",
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                location = '/';
            });
        } else {
            Swal.fire({
                title: "Hubo un problema",
                text: result.error,
                icon: "error",
                showConfirmButton: false,
                timer: 2500
            });
        }
    } catch (error) {
        // Ocultar alerta de "Espera" en caso de error
        Swal.close();

        Swal.fire({
            title: "Hubo un problema",
            text: "Rechazaste la conexión a tu cuenta de Metamask.",
            icon: "error",
            showConfirmButton: false,
            timer: 2500
        });
    }
});




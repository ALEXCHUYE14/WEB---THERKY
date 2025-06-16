document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Menú Hamburguesa ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links li a'); // Para cerrar el menú al hacer clic en un enlace

    // Toggle menu visibility
    if (hamburgerMenu && navLinks) { // Aseguramos que los elementos existan antes de añadir listeners
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Para animar el icono de hamburguesa
        });
    }

    // Close menu when a navigation link is clicked (for mobile)
    if (navLinksList.length > 0) { // Aseguramos que haya enlaces antes de iterar
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerramos el menú si está abierto
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburgerMenu) {
                        hamburgerMenu.classList.remove('active');
                    }
                }
            });
        });
    }

    // --- Optional: Smooth scrolling for navigation links ---
    // Aseguramos que se seleccionen solo enlaces internos que apunten a IDs
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Obtenemos el ID del elemento al que apunta el enlace
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) { // Verificamos que el elemento de destino exista
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Lógica para el Formulario de WhatsApp ---
    const whatsappContactForm = document.getElementById('whatsappContactForm');
    const whatsappNumber = '968365943'; // Reemplaza con tu número de WhatsApp (ej: 51987654321)

    if (whatsappContactForm) { // Solo si el formulario existe en el HTML
        whatsappContactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío tradicional del formulario

            // Verificamos si los campos existen antes de intentar acceder a su valor
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value : 'Invitado';
            const email = emailInput ? emailInput.value : '';
            const message = messageInput ? messageInput.value : 'No se proporcionó mensaje.';

            // Construir el mensaje para WhatsApp
            let whatsappMessage = `Hola, soy ${name}.`;
            if (email) {
                whatsappMessage += ` Mi correo es: ${email}.`;
            }
            whatsappMessage += `\n\nMensaje: ${message}`;

            // Codificar el mensaje para la URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Construir la URL de WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Abrir WhatsApp en una nueva ventana/pestaña
            window.open(whatsappUrl, '_blank');

            // Opcional: Mostrar un mensaje al usuario o resetear el formulario
            alert('¡Serás redirigido a WhatsApp para enviar tu mensaje!');
            whatsappContactForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menu-toggle');
    const sections = document.querySelectorAll('main section, header .hero');

    // --- Menú de Navegación Pegajoso (Sticky Navbar) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.8)';
        }
    });

    // --- Cerrar menú móvil al hacer clic en un enlace ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
            }
        });
    });

    // --- Resaltado de Enlace Activo en Scroll (Scroll Spy) ---
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' }); // Activa cuando la sección está en el medio de la pantalla

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });


    // --- Efecto de aparición en Scroll (Scroll Reveal) ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar el elemento una vez que es visible
            }
        });
    }, {
        threshold: 0.1
    });

    // Para que el efecto funcione, necesitamos añadir la clase 'reveal' a los elementos
    // que queremos animar. Lo hacemos aquí para no tener que modificar el HTML.
    const elementsToAnimate = document.querySelectorAll('main section h2, main section p, .service-card, .portfolio-item, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- Lógica del Modal del Portafolio ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-button');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');

            modalImg.src = img.src;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.style.display = 'block';
        });
    });

    // Cierra el modal al hacer clic en el botón de cerrar
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cierra el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

// Añadimos el CSS para el efecto de revelado dinámicamente
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

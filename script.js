document.addEventListener('DOMContentLoaded', function() {

    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent.trim();
        heroTitle.innerHTML = '';
        heroTitle.classList.add('innovative-title');

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.transitionDelay = `${index * 0.03}s`;
            heroTitle.appendChild(span);
        });

        setTimeout(() => {
            heroTitle.classList.add('visible');
        }, 100);
    }


    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menu-toggle');
    const sections = document.querySelectorAll('main section, header .hero');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.8)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
            }
        });
    });

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
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });


    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

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

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Mini-Game Logic
    const rocketIcon = document.querySelector('.rocket-icon');
    const gameModal = document.getElementById('game-modal');
    const gameCloseButton = document.querySelector('.game-close-button');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    let playerX = gameCanvas.width / 2;
    let playerY = gameCanvas.height - 30;
    let playerSize = 20;
    let playerSpeed = 5;

    // Open game modal
    rocketIcon.addEventListener('click', () => {
        gameModal.classList.add('active');
        // Start game loop when modal opens
        gameLoop();
    });

    // Close game modal
    gameCloseButton.addEventListener('click', (event) => {
        event.stopPropagation(); 
        gameModal.classList.remove('active');
    });

    // Get reference to game modal content
    const gameModalContent = document.querySelector('.game-modal-content');
    gameModalContent.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });

    window.addEventListener('click', (event) => {
        if (event.target == gameModal) {
            gameModal.classList.remove('active');
        }
    });

    // Basic game loop (placeholder)
    function gameLoop() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 

        // Draw player (simple square)
        ctx.fillStyle = 'cyan';
        ctx.fillRect(playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);

        // Simulate some movement (e.g., player moving left and right)
        playerX += playerSpeed;
        if (playerX + playerSize / 2 > gameCanvas.width || playerX - playerSize / 2 < 0) {
            playerSpeed *= -1; 
        }

        requestAnimationFrame(gameLoop); 
    }
});
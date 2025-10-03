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

    // Mini-Game Initialization
    const rocketIcon = document.querySelector('.rocket-icon');
    const gameModal = document.getElementById('game-modal');
    const gameCloseButton = document.querySelector('.game-close-button');
    const gameCanvas = document.getElementById('gameCanvas');
    const startMenu = document.getElementById('start-menu');
    const shipSelection = document.getElementById('ship-selection');
    const playButton = document.getElementById('play-button');
    
    const game = new Game(gameCanvas);

    function showMenu() {
        startMenu.style.display = 'block';
        gameCanvas.style.display = 'none';
        if (game.audio.menu) game.audio.menu.play();
    }

    // Custom event listener in the game class to show menu
    game.canvas.addEventListener('showMenu', showMenu);

    rocketIcon.addEventListener('click', () => {
        gameModal.style.display = 'flex';
        showMenu();
    });

    gameCloseButton.addEventListener('click', () => {
        gameModal.style.display = 'none';
        game.stop();
    });

    shipSelection.addEventListener('click', (e) => {
        if (e.target.classList.contains('ship-option')) {
            for (let child of shipSelection.children) {
                child.classList.remove('selected');
            }
            e.target.classList.add('selected');
            game.playerShip = e.target.dataset.ship;
        }
    });

    playButton.addEventListener('click', () => {
        game.setupAudio();
        if (game.audioContext && game.audioContext.state === 'suspended') {
            game.audioContext.resume();
        }
        startMenu.style.display = 'none';
        gameCanvas.style.display = 'block';
        if (game.audio.menu) game.audio.menu.pause();
        game.init();
        game.start();
    });

    window.addEventListener('keydown', (e) => game.handleKeyDown(e));
    window.addEventListener('keyup', (e) => game.handleKeyUp(e));

    // Mobile Controls Logic
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    const shootBtn = document.getElementById('shoot-btn');

    // Use a map to track active touches
    const activeTouches = new Map();

    const handleTouchStart = (e) => {
        e.preventDefault();
        for (const touch of e.changedTouches) {
            if (touch.target === leftBtn) {
                game.keys['ArrowLeft'] = true;
                activeTouches.set(touch.identifier, 'left');
            } else if (touch.target === rightBtn) {
                game.keys['ArrowRight'] = true;
                activeTouches.set(touch.identifier, 'right');
            } else if (touch.target === upBtn) {
                game.keys['ArrowUp'] = true;
                activeTouches.set(touch.identifier, 'up');
            } else if (touch.target === downBtn) {
                game.keys['ArrowDown'] = true;
                activeTouches.set(touch.identifier, 'down');
            } else if (touch.target === shootBtn) {
                game.shoot();
            }
        }
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        for (const touch of e.changedTouches) {
            const control = activeTouches.get(touch.identifier);
            if (control === 'left') {
                game.keys['ArrowLeft'] = false;
            } else if (control === 'right') {
                game.keys['ArrowRight'] = false;
            } else if (control === 'up') {
                game.keys['ArrowUp'] = false;
            } else if (control === 'down') {
                game.keys['ArrowDown'] = false;
            }
            activeTouches.delete(touch.identifier);
        }
    };

    const controlsContainer = document.querySelector('.mobile-controls-container');
    controlsContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    controlsContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
    controlsContainer.addEventListener('touchcancel', handleTouchEnd, { passive: false });
});
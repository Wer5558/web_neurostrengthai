// ===== SCRIPTS.JS - ARCHIVO PRINCIPAL =====

// Variables globales
let isPageLoaded = false;
let preloaderHidden = false;

// Función principal de inicialización
function initPage() {
    console.log('Inicializando página...');
    
    // Inicializar todas las funcionalidades
    initPreloader();
    initMagicCursor();
    initHeader();
    initHeroAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initMobileMenu();
    initSmoothScrolling();
    initOverlappingGallery();
    initPinnedSections();
    initTextAnimations();
    initButtonEffects();
    initImageEffects(); // Nueva función para efectos de imágenes
    
    // Marcar página como cargada
    isPageLoaded = true;
    console.log('Página inicializada correctamente');
}

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader-wrap');
    const loadbar = document.querySelector('.loadbar');
    const percentage = document.getElementById('precent');
    
    if (!preloader) {
        console.warn('Preloader no encontrado');
        return;
    }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (loadbar) loadbar.style.width = progress + '%';
        if (percentage) percentage.textContent = Math.floor(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                hidePreloader();
            }, 500);
        }
    }, 100);
}

function hidePreloader() {
    const preloader = document.querySelector('.preloader-wrap');
    if (preloader && !preloaderHidden) {
        preloaderHidden = true;
        gsap.to(preloader, {
            opacity: 0,
            y: '-100%',
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.visibility = 'hidden';
                showPageContent();
            }
        });
    }
}

function showPageContent() {
    const mainContent = document.querySelector('#main');
    const header = document.querySelector('#header-container');
    
    if (mainContent) {
        gsap.to(mainContent, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
    
    if (header) {
        gsap.to(header, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// Magic Cursor
function initMagicCursor() {
    const cursor = document.getElementById('ball');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efectos hover
    const interactiveElements = document.querySelectorAll('a, button, .overlapping-image, .slide-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(2)`;
            cursor.style.borderColor = '#ff3e3e';
            cursor.style.background = 'rgba(255, 62, 62, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursor.style.borderColor = '#ffffff';
            cursor.style.background = 'transparent';
        });
    });
}

// Header
function initHeader() {
    const header = document.querySelector('header');
    const burger = document.getElementById('menu-burger');
    
    if (!header || !burger) return;
    
    // Cambiar fondo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(12, 12, 12, 0.95)';
        } else {
            header.style.backgroundColor = 'transparent';
        }
    });
    
    // Toggle menú móvil
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.opacity = nav.style.opacity === '1' ? '0' : '1';
        }
    });
}

// Hero Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.primary-font-title-hero');
    const heroSubtitle = document.querySelector('.hero-subtitle span');
    const heroFooter = document.querySelector('#hero-footer');
    const heroCaption = document.querySelector('#hero-caption');
    
    // Asegurar que el hero esté centrado perfectamente
    if (heroCaption) {
        gsap.set(heroCaption, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh'
        });
    }
    
    // Animación del contenedor principal del hero
    if (heroCaption) {
        gsap.fromTo(heroCaption,
            { 
                opacity: 0, 
                scale: 0.8,
                y: 50
            },
            { 
                opacity: 1, 
                scale: 1,
                y: 0,
                duration: 1.5,
                ease: 'back.out(1.7)',
                delay: 0.5
            }
        );
    }
    
    // Animación de las letras del título con efecto escalonado
    if (heroTitle) {
        const letters = heroTitle.querySelectorAll('span');
        
        // Configurar estado inicial
        gsap.set(letters, {
            opacity: 0,
            y: 100,
            scale: 0.5,
            rotationX: 90
        });
        
        // Animación escalonada de las letras
        gsap.to(letters, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            delay: 1.2
        });
        
        // Efecto de brillo después de que aparezcan las letras
        gsap.to(letters, {
            textShadow: '0 0 20px rgba(255, 62, 62, 0.8)',
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.out',
            delay: 3.5
        });
        
        // Efecto de pulso continuo para el título
        gsap.to(heroTitle, {
            scale: 1.02,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: 4
        });
    }
    
    // Animación del subtítulo
    if (heroSubtitle) {
        gsap.fromTo(heroSubtitle,
            { 
                opacity: 0, 
                y: 30,
                scale: 0.9
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                delay: 3.2
            }
        );
        
        // Efecto de brillo para el subtítulo
        gsap.to(heroSubtitle, {
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            duration: 0.5,
            ease: 'power2.out',
            delay: 4.2
        });
    }
    
    // Animación del footer
    if (heroFooter) {
        gsap.fromTo(heroFooter,
            { 
                opacity: 0, 
                y: 20,
                scale: 0.8
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: 3.8
            }
        );
        
        // Efecto de rebote para el botón de scroll
        const scrollButton = heroFooter.querySelector('.scroll-down');
        if (scrollButton) {
            gsap.to(scrollButton, {
                y: -10,
                duration: 1.5,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1,
                delay: 4.5
            });
        }
    }
    
    // Efecto de partículas de fondo (opcional)
    createHeroParticles();
}

// Función para crear partículas de fondo
function createHeroParticles() {
    const hero = document.querySelector('#hero');
    if (!hero) return;
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 62, 62, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        hero.appendChild(particle);
        
        // Animación de flotación
        gsap.to(particle, {
            y: -100,
            x: Math.random() * 200 - 100,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            ease: 'none',
            repeat: -1,
            delay: Math.random() * 2
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Configurar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animaciones para elementos con clase has-animation
    gsap.utils.toArray('.has-animation').forEach(element => {
        gsap.fromTo(element,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animaciones para elementos con clase has-opacity
    gsap.utils.toArray('.has-opacity span').forEach(span => {
        gsap.to(span, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: span,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animaciones para elementos con clase has-mask-fill
    gsap.utils.toArray('.has-mask-fill span').forEach(span => {
        gsap.to(span, {
            backgroundSize: '100% 100%',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: span,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Parallax para elementos con clase parallax-element
    gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
            y: (i, target) => -target.offsetHeight * 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Parallax para imágenes en scrolling-element
    gsap.utils.toArray('.scrolling-element img').forEach(img => {
        gsap.to(img, {
            y: (i, target) => -target.offsetHeight * 0.2,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const burger = document.getElementById('menu-burger');
    const nav = document.querySelector('nav');
    const menuItems = document.querySelectorAll('.menu-timeline');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        
        if (burger.classList.contains('active')) {
            gsap.to(nav, { opacity: 1, duration: 0.3 });
            gsap.fromTo(menuItems, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
            );
        } else {
            gsap.to(nav, { opacity: 0, duration: 0.3 });
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const mainContent = document.querySelector('#main-content');
            if (mainContent) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: mainContent, offsetY: 0 },
                    ease: 'power2.inOut'
                });
            }
        });
    }
    
    // Back to top button
    const backToTop = document.getElementById('backtotop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: 0 },
                ease: 'power2.inOut'
            });
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: target, offsetY: 0 },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// Overlapping Gallery
function initOverlappingGallery() {
    const galleryItems = document.querySelectorAll('.overlapping-image');
    
    galleryItems.forEach(item => {
        const largeImg = item.querySelector('.grid__item-img--large');
        const smallImg = item.querySelector('.grid__item-img');
        
        if (largeImg && smallImg) {
            item.addEventListener('mouseenter', () => {
                gsap.to(largeImg, {
                    opacity: 1,
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(largeImg, {
                    opacity: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });
}

// Pinned Sections
function initPinnedSections() {
    const pinnedSections = document.querySelectorAll('.pinned-section');
    
    pinnedSections.forEach(section => {
        const pinnedElement = section.querySelector('.pinned-element');
        const scrollingElement = section.querySelector('.scrolling-element');
        
        if (pinnedElement && scrollingElement) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                pin: pinnedElement,
                pinSpacing: false
            });
        }
    });
}

// Text Animations
function initTextAnimations() {
    // Animación para título en movimiento
    const movingTitle = document.querySelector('.title-moving-forward');
    if (movingTitle) {
        gsap.to(movingTitle, {
            x: '-50%',
            duration: 20,
            ease: 'none',
            repeat: -1,
            scrollTrigger: {
                trigger: movingTitle,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
    
    // Animación para email en page-nav
    const emailSpans = document.querySelectorAll('.next-hero-title span');
    if (emailSpans.length > 0) {
        gsap.fromTo(emailSpans,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: '.next-hero-title',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
}

// Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.button-border a, .slide-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Image Effects - Nueva función para efectos específicos de imágenes
function initImageEffects() {
    // Efectos de entrada para imágenes temáticas
    const images = document.querySelectorAll('.item-image, .grid__item-img, .scrolling-element img, .pinned-element img');
    
    images.forEach((img, index) => {
        // Animación de entrada escalonada
        gsap.fromTo(img,
            { opacity: 0, scale: 0.8, rotation: -5 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: img,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Efecto de brillo al hacer hover
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: 'brightness(1.2) contrast(1.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                filter: 'brightness(1) contrast(1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Efectos especiales para imágenes temáticas
    const serviceImages = document.querySelectorAll('[src*="01hero"]');
    const solutionImages = document.querySelectorAll('[src*="02hero"]');
    const contactImages = document.querySelectorAll('[src*="03hero"]');
    
    // Efecto especial para imágenes de servicios IA
    serviceImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: 'hue-rotate(10deg) brightness(1.1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                filter: 'hue-rotate(0deg) brightness(1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Efecto especial para imágenes de soluciones
    solutionImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: 'saturate(1.3) brightness(1.05)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                filter: 'saturate(1) brightness(1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
    
    // Efecto especial para imágenes de contacto
    contactImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: 'sepia(0.3) brightness(1.1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', () => {
            gsap.to(img, {
                filter: 'sepia(0) brightness(1)',
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando página...');
    
    // Verificar que GSAP esté disponible
    if (typeof gsap === 'undefined') {
        console.error('GSAP no está disponible');
        // Fallback: ocultar preloader sin animaciones
        setTimeout(() => {
            const preloader = document.querySelector('.preloader-wrap');
            if (preloader) {
                preloader.style.display = 'none';
            }
            const mainContent = document.querySelector('#main');
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
        }, 2000);
        return;
    }
    
    // Inicializar página
    initPage();
});

// Fallback para asegurar que la página se muestre
window.addEventListener('load', function() {
    console.log('Página completamente cargada');
    
    // Si después de 5 segundos la página no se ha inicializado, forzar la carga
    setTimeout(() => {
        if (!isPageLoaded) {
            console.warn('Forzando carga de página...');
            const preloader = document.querySelector('.preloader-wrap');
            if (preloader) {
                preloader.style.display = 'none';
            }
            const mainContent = document.querySelector('#main');
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
            const header = document.querySelector('#header-container');
            if (header) {
                header.style.opacity = '1';
            }
        }
    }, 5000);
});

// Manejar errores de carga de recursos
window.addEventListener('error', function(e) {
    console.error('Error de carga:', e.target);
    if (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT') {
        console.warn('Recurso falló al cargar:', e.target.src || e.target.href);
    }
}); 
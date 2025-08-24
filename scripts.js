// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Inicializar todas las funcionalidades
    initPreloader();
    initHeader();
    initHeroAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initMagicCursor();
    initMobileMenu();
    initSmoothScrolling();
    initOverlappingGallery();
    initPinnedSections();
    initTextAnimations();
    initButtonEffects();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader-wrap');
    const loadbar = document.querySelector('.loadbar');
    const percentage = document.getElementById('precent');
    
    if (preloader && loadbar && percentage) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            loadbar.style.width = progress + '%';
            percentage.textContent = Math.floor(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = 'visible';
                }, 500);
            }
        }, 100);
    }
}

// ===== HEADER Y NAVEGACIÓN =====
function initHeader() {
    const header = document.querySelector('.fullscreen-menu');
    const nav = document.querySelector('nav');
    const menuBurger = document.getElementById('menu-burger');
    let lastScrollTop = 0;
    
    // Efecto de header al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(12, 12, 12, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animación de entrada del header
    gsap.from('#header-container', {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
    });
    
    // Menú móvil
    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            menuBurger.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                // Animación de entrada del menú
                gsap.from('.flexnav li', {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    }
}

// ===== ANIMACIONES DEL HERO =====
function initHeroAnimations() {
    // Animación del título principal con efecto de escritura
    const heroTitle = document.querySelector('.hero-title');
    const titleSpans = heroTitle.querySelectorAll('span');
    
    // Timeline para la animación del título
    const titleTimeline = gsap.timeline();
    
    titleTimeline
        .from(titleSpans, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out'
        })
        .to(titleSpans, {
            color: '#ff3e3e',
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.inOut'
        }, '-=0.5');
    
    // Animación del subtítulo
    gsap.from('.hero-subtitle span', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: 'power2.out'
    });
    
    // Animación del footer del hero
    gsap.from('#hero-footer', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 3,
        ease: 'power2.out'
    });
    
    // Efecto parallax en el fondo del hero
    gsap.to('#hero-styles', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    // Animación de las imágenes superpuestas
    gsap.from('.overlapping-image', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.overlapping-gallery',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación del título principal
    gsap.from('.primary-font-title-hero', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.primary-font-title-hero',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación del texto con opacidad
    gsap.from('.has-opacity span', {
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.has-opacity',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación de los botones
    gsap.from('.button-box', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.button-box',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación de las secciones fijas
    gsap.from('.pinned-element', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.pinned-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.scrolling-element', {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.pinned-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación del título en movimiento
    gsap.from('.title-moving-forward', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.title-moving-outer',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación de la navegación de página
    gsap.from('.page-nav-caption', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#page-nav',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ===== EFECTOS PARALLAX =====
function initParallaxEffects() {
    // Efecto parallax en elementos de fondo
    gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Efecto parallax en imágenes
    gsap.utils.toArray('.scrolling-element img').forEach(img => {
        gsap.to(img, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });
}

// ===== CURSOR MÁGICO =====
function initMagicCursor() {
    const cursor = document.getElementById('ball');
    const cursorLoader = document.getElementById('ball-loader');
    
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animación suave del cursor
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Efectos hover en elementos interactivos
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
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const menuBurger = document.getElementById('menu-burger');
    const nav = document.querySelector('nav');
    
    if (menuBurger && nav) {
        menuBurger.addEventListener('click', () => {
            menuBurger.classList.toggle('active');
            nav.classList.toggle('active');
            
            if (nav.classList.contains('active')) {
                gsap.to(nav, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.from('.flexnav li', {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(nav, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: target, offsetY: 80 },
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Scroll suave para el indicador de scroll
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: '#main-content', offsetY: 80 },
                ease: 'power2.inOut'
            });
        });
    }
    
    // Scroll suave para el botón back to top
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
}

// ===== GALERÍA SUPERPUESTA =====
function initOverlappingGallery() {
    const overlappingImages = document.querySelectorAll('.overlapping-image');
    
    overlappingImages.forEach(image => {
        const largeImg = image.querySelector('.grid__item-img--large');
        const smallImg = image.querySelector('.item-image');
        
        if (largeImg && smallImg) {
            image.addEventListener('mouseenter', () => {
                gsap.to(largeImg, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            image.addEventListener('mouseleave', () => {
                gsap.to(largeImg, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });
}

// ===== SECCIONES FIJAS =====
function initPinnedSections() {
    const pinnedSections = document.querySelectorAll('.pinned-section');
    
    pinnedSections.forEach(section => {
        const pinnedElement = section.querySelector('.pinned-element');
        const scrollingElement = section.querySelector('.scrolling-element');
        
        if (pinnedElement && scrollingElement) {
            // Efecto parallax en elementos fijos
            gsap.to(pinnedElement, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
            
            // Efecto parallax en elementos de desplazamiento
            gsap.to(scrollingElement, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    });
}

// ===== ANIMACIONES DE TEXTO =====
function initTextAnimations() {
    // Animación de letras individuales en títulos
    document.querySelectorAll('.primary-font-title-hero').forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            title.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    });
    
    // Efecto de escritura en el hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -5,
                    scale: 1.1,
                    color: '#00d4ff',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            span.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    scale: 1,
                    color: '#ff3e3e',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // Animación del título en movimiento
    const movingTitle = document.querySelector('.title-moving-forward');
    if (movingTitle) {
        gsap.to(movingTitle, {
            x: '-100%',
            duration: 20,
            ease: 'none',
            repeat: -1,
            scrollTrigger: {
                trigger: movingTitle,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// ===== EFECTOS DE BOTONES =====
function initButtonEffects() {
    // Efecto hover en botones con animación de escala
    document.querySelectorAll('.button-border, .slide-link').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Efecto hover en elementos de navegación
    document.querySelectorAll('.flexnav a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, {
                color: '#ff3e3e',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            gsap.to(this, {
                color: '#ffffff',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Efecto hover en iconos
    document.querySelectorAll('.nav-icons a').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.1,
                color: '#ff3e3e',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        icon.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                color: '#ffffff',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar scroll events
const optimizedScrollHandler = debounce(() => {
    // Aquí van las funciones que se ejecutan en scroll
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== INICIALIZACIÓN ADICIONAL =====
window.addEventListener('load', function() {
    // Ocultar preloader después de que todo esté cargado
    const preloader = document.querySelector('.preloader-wrap');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }
    
    // Inicializar efectos adicionales
    initAdditionalEffects();
});

function initAdditionalEffects() {
    // Efectos de partículas en el fondo (opcional)
    // initParticleEffects();
    
    // Efectos de distorsión de imagen (opcional)
    // initImageDistortion();
    
    // Efectos de sonido (opcional)
    // initSoundEffects();
}

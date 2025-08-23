// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Inicializar todas las funcionalidades
    initHeader();
    initHeroAnimations();
    initScrollAnimations();
    initContactForm();
    initBackToTop();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffects();
});

// ===== HEADER Y NAVEGACIÓN =====
function initHeader() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    // Efecto de header al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(12, 12, 12, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(12, 12, 12, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animación de entrada del header
    gsap.from('.header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Animación de los elementos del header
    gsap.from('#logo', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
    });
    
    gsap.from('.nav-menu li', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.from('.button-wrap', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
    });
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
            color: '#e50914',
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.inOut'
        }, '-=0.5');
    
    // Animación del subtítulo
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 2,
        ease: 'power2.out'
    });
    
    // Animación de los botones
    gsap.from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 2.5,
        ease: 'power2.out'
    });
    
    // Animación del indicador de scroll
    gsap.from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 3,
        ease: 'power2.out'
    });
    
    // Efecto parallax en el fondo del hero
    gsap.to('.hero-bg-image', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    // Animación de las tarjetas de servicios
    gsap.from('.service-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación del título de sección
    gsap.from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación del subtítulo de sección
    gsap.from('.section-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación de la sección CTA
    gsap.from('.cta-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animación de los elementos de contacto
    gsap.from('.contact-item', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ===== EFECTOS PARALLAX =====
function initParallaxEffects() {
    // Efecto parallax en elementos de fondo
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.to(card, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Efecto parallax en iconos de servicios
    gsap.utils.toArray('.service-icon').forEach(icon => {
        gsap.to(icon, {
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: icon,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.nombre || !data.email || !data.mensaje) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Simular envío (aquí iría la lógica real de envío)
            showNotification('Enviando mensaje...', 'info');
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                contactForm.reset();
            }, 2000);
        });
        
        // Animación de los campos del formulario
        gsap.from('.form-group', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// ===== BOTÓN BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        // Scroll suave al hacer clic
        backToTopBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: 0 },
                ease: 'power2.inOut'
            });
        });
        
        // Animación del botón
        gsap.set(backToTopBtn, {
            opacity: 0,
            pointerEvents: 'none'
        });
    }
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const menuBurger = document.getElementById('menu-burger');
    const nav = document.querySelector('.nav');
    
    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            menuBurger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Animación del menú
            if (nav.classList.contains('active')) {
                gsap.to(nav, {
                    opacity: 1,
                    visibility: 'visible',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.from('.nav-menu li', {
                    y: -30,
                    opacity: 0,
                    duration: 0.4,
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
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: '#servicios', offsetY: 80 },
                ease: 'power2.inOut'
            });
        });
    }
}

// ===== EFECTOS HOVER =====
function initHoverEffects() {
    // Efecto hover en botones
    document.querySelectorAll('.btn').forEach(btn => {
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
    
    // Efecto hover en tarjetas de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== EFECTOS DE PARTÍCULAS (OPCIONAL) =====
function initParticleEffects() {
    // Crear canvas para partículas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configuración de partículas
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = '#e50914';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== INICIALIZAR EFECTOS ADICIONALES =====
document.addEventListener('DOMContentLoaded', function() {
    initHoverEffects();
    // initParticleEffects(); // Descomentar para activar partículas
});

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

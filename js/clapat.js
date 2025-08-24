// ===== CLAPAT.JS - FUNCIONALIDADES BÁSICAS =====

// Configuración global
window.clapat = {
    settings: {
        smoothScroll: true,
        parallax: true,
        cursor: true
    }
};

// Detectar características del navegador
function detectBrowserFeatures() {
    const features = {
        cssVars: window.CSS && window.CSS.supports && window.CSS.supports('--custom-property', 'value'),
        webgl: !!window.WebGLRenderingContext,
        touch: 'ontouchstart' in window
    };
    
    // Agregar clases al HTML según las características
    const html = document.documentElement;
    if (features.cssVars) html.classList.add('css-vars');
    if (features.webgl) html.classList.add('webgl');
    if (features.touch) html.classList.add('touch');
    
    return features;
}

// Inicializar funcionalidades básicas
function initClapat() {
    detectBrowserFeatures();
    
    // Configurar smooth scroll
    if (clapat.settings.smoothScroll) {
        initSmoothScroll();
    }
    
    // Configurar parallax
    if (clapat.settings.parallax) {
        initParallax();
    }
    
    // Configurar cursor personalizado
    if (clapat.settings.cursor) {
        initCustomCursor();
    }
}

// Smooth scroll básico
function initSmoothScroll() {
    // Implementación básica de smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax básico
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Cursor personalizado básico
function initCustomCursor() {
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
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initClapat); 
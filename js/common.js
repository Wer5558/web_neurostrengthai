// ===== COMMON.JS - FUNCIONALIDADES COMUNES =====

// Funciones comunes
window.common = {
    // Detectar si el dispositivo es móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Detectar si el dispositivo es tablet
    isTablet: function() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    },
    
    // Detectar si el dispositivo es desktop
    isDesktop: function() {
        return window.innerWidth > 1024;
    },
    
    // Obtener el viewport
    getViewport: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Event listeners comunes
document.addEventListener('DOMContentLoaded', function() {
    // Manejar resize de ventana
    const handleResize = common.debounce(function() {
        // Recalcular dimensiones y efectos
        if (window.gsap) {
            gsap.set('.parallax-element', { clearProps: 'transform' });
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Manejar orientación del dispositivo
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 100);
    });
    
    // Prevenir zoom en dispositivos móviles
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    });
}); 
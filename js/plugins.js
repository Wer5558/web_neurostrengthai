// ===== PLUGINS.JS - FUNCIONALIDADES ADICIONALES =====

// Configuración de plugins
window.plugins = {
    loaded: false,
    init: function() {
        this.loaded = true;
        this.initImageLoading();
        this.initScrollEffects();
        this.initHoverEffects();
    },
    
    // Carga de imágenes
    initImageLoading: function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    },
    
    // Efectos de scroll
    initScrollEffects: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.has-animation').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Efectos hover
    initHoverEffects: function() {
        document.querySelectorAll('.trigger-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    }
};

// Inicializar plugins cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    plugins.init();
}); 
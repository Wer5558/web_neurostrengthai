// ===== BUNDLE.JS - FUNCIONALIDADES ADICIONALES Y OPTIMIZACIONES =====

// Configuración global
window.bundle = {
    // Configuración de la aplicación
    config: {
        debug: false,
        performance: {
            enableLazyLoading: true,
            enableImageOptimization: true,
            enableScrollOptimization: true
        },
        animations: {
            enableParallax: true,
            enableHoverEffects: true,
            enablePageTransitions: true
        }
    },
    
    // Utilidades de rendimiento
    performance: {
        // Lazy loading de imágenes
        initLazyLoading: function() {
            if (!this.config.performance.enableLazyLoading) return;
            
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        },
        
        // Optimización de scroll
        initScrollOptimization: function() {
            if (!this.config.performance.enableScrollOptimization) return;
            
            let ticking = false;
            
            function updateScroll() {
                // Aquí irían las actualizaciones de scroll optimizadas
                ticking = false;
            }
            
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateScroll);
                    ticking = true;
                }
            }
            
            window.addEventListener('scroll', requestTick, { passive: true });
        }
    },
    
    // Utilidades de animación
    animations: {
        // Efectos de hover avanzados
        initAdvancedHoverEffects: function() {
            if (!this.config.animations.enableHoverEffects) return;
            
            const hoverElements = document.querySelectorAll('.hover-effect');
            
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    gsap.to(this, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                element.addEventListener('mouseleave', function() {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        },
        
        // Transiciones de página
        initPageTransitions: function() {
            if (!this.config.animations.enablePageTransitions) return;
            
            const links = document.querySelectorAll('a[data-type="page-transition"]');
            
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const target = this.getAttribute('href');
                    
                    // Animación de salida
                    gsap.to('body', {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            window.location.href = target;
                        }
                    });
                });
            });
        }
    },
    
    // Utilidades de UI
    ui: {
        // Tooltips personalizados
        initTooltips: function() {
            const tooltipElements = document.querySelectorAll('[data-tooltip]');
            
            tooltipElements.forEach(element => {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = element.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                element.addEventListener('mouseenter', function(e) {
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    tooltip.style.opacity = '1';
                });
                
                element.addEventListener('mouseleave', function() {
                    tooltip.style.opacity = '0';
                });
            });
        },
        
        // Modales personalizados
        initModals: function() {
            const modalTriggers = document.querySelectorAll('[data-modal]');
            
            modalTriggers.forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const modalId = this.getAttribute('data-modal');
                    const modal = document.getElementById(modalId);
                    
                    if (modal) {
                        modal.style.display = 'flex';
                        gsap.fromTo(modal, 
                            { opacity: 0, scale: 0.8 },
                            { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
                        );
                    }
                });
            });
            
            // Cerrar modales
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
                    const modal = e.target.classList.contains('modal') ? e.target : e.target.closest('.modal');
                    gsap.to(modal, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: 'back.in(1.7)',
                        onComplete: () => {
                            modal.style.display = 'none';
                        }
                    });
                }
            });
        }
    },
    
    // Utilidades de datos
    data: {
        // Analytics personalizado
        trackEvent: function(category, action, label = null) {
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    'event_category': category,
                    'event_label': label
                });
            }
            
            if (this.config.debug) {
                console.log('Event tracked:', { category, action, label });
            }
        },
        
        // Almacenamiento local
        setLocalStorage: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Could not save to localStorage:', e);
            }
        },
        
        getLocalStorage: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.warn('Could not read from localStorage:', e);
                return null;
            }
        }
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades de rendimiento
    bundle.performance.initLazyLoading();
    bundle.performance.initScrollOptimization();
    
    // Inicializar animaciones
    bundle.animations.initAdvancedHoverEffects();
    bundle.animations.initPageTransitions();
    
    // Inicializar UI
    bundle.ui.initTooltips();
    bundle.ui.initModals();
    
    // Tracking de eventos
    document.addEventListener('click', function(e) {
        const trackElement = e.target.closest('[data-track]');
        if (trackElement) {
            const category = trackElement.getAttribute('data-track-category') || 'interaction';
            const action = trackElement.getAttribute('data-track-action') || 'click';
            const label = trackElement.getAttribute('data-track-label');
            
            bundle.data.trackEvent(category, action, label);
        }
    });
});

// Estilos CSS para funcionalidades adicionales
const bundleStyles = `
<style>
/* Tooltips personalizados */
.custom-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    pointer-events: none;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.2s ease;
    white-space: nowrap;
}

.custom-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
}

/* Modales */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    transition: color 0.2s;
}

.modal-close:hover {
    color: #000;
}

/* Lazy loading */
.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

/* Hover effects */
.hover-effect {
    transition: transform 0.3s ease;
    cursor: pointer;
}

/* Responsive utilities */
@media (max-width: 768px) {
    .custom-tooltip {
        display: none;
    }
    
    .modal-content {
        width: 95%;
        padding: 20px;
    }
}
</style>
`;

// Insertar estilos
document.head.insertAdjacentHTML('beforeend', bundleStyles); 
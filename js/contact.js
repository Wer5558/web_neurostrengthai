// ===== CONTACT.JS - FUNCIONALIDADES DE CONTACTO =====

// Funciones de contacto
window.contact = {
    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validar teléfono
    validatePhone: function(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{9,}$/;
        return re.test(phone);
    },
    
    // Enviar formulario de contacto
    sendContactForm: function(formData) {
        // Simular envío de formulario
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Aquí iría la lógica real de envío
                console.log('Formulario enviado:', formData);
                resolve({ success: true, message: 'Mensaje enviado correctamente' });
            }, 1000);
        });
    },
    
    // Mostrar notificación
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        gsap.fromTo(notification, 
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            contact.closeNotification(notification);
        }, 5000);
        
        // Cerrar al hacer clic
        notification.querySelector('.notification-close').addEventListener('click', () => {
            contact.closeNotification(notification);
        });
    },
    
    // Cerrar notificación
    closeNotification: function(notification) {
        gsap.to(notification, {
            opacity: 0,
            y: -50,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }
        });
    }
};

// Inicializar funcionalidades de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Buscar formularios de contacto
    const contactForms = document.querySelectorAll('form[data-type="contact"]');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validar campos
            let isValid = true;
            const errors = [];
            
            if (!data.name || data.name.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
                isValid = false;
            }
            
            if (!data.email || !contact.validateEmail(data.email)) {
                errors.push('Por favor, introduce un email válido');
                isValid = false;
            }
            
            if (!data.message || data.message.trim().length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
                isValid = false;
            }
            
            if (!isValid) {
                contact.showNotification(errors.join('<br>'), 'error');
                return;
            }
            
            // Mostrar loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Enviar formulario
            contact.sendContactForm(data)
                .then(response => {
                    contact.showNotification(response.message, 'success');
                    form.reset();
                })
                .catch(error => {
                    contact.showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const field = this.name;
            const value = this.value.trim();
            
            // Remover clases de error previas
            this.classList.remove('error', 'success');
            
            // Validar según el tipo de campo
            if (field === 'email' && value && !contact.validateEmail(value)) {
                this.classList.add('error');
            } else if (field === 'phone' && value && !contact.validatePhone(value)) {
                this.classList.add('error');
            } else if (value) {
                this.classList.add('success');
            }
        });
    });
});

// Estilos CSS para notificaciones
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    overflow: hidden;
}

.notification-success {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
}

.notification-error {
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
}

.notification-content {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.notification-message {
    flex: 1;
    margin-right: 10px;
    line-height: 1.4;
}

.notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.notification-close:hover {
    opacity: 1;
}

input.error, textarea.error {
    border-color: #f44336 !important;
    box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
}

input.success, textarea.success {
    border-color: #4CAF50 !important;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2) !important;
}
</style>
`;

// Insertar estilos
document.head.insertAdjacentHTML('beforeend', notificationStyles); 
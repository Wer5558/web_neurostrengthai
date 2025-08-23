# NeuroStrengthAI - Página Web Profesional

Una página web moderna y profesional para **NeuroStrengthAI**, construida con HTML5, CSS3 y JavaScript, utilizando GSAP para animaciones avanzadas.

## 🚀 Características

### Diseño y UX
- **Diseño moderno y minimalista** con paleta de colores negro (#0c0c0c) y rojo (#e50914)
- **Completamente responsive** - optimizado para todos los dispositivos
- **Tipografía moderna** usando Poppins y Six Caps
- **Animaciones suaves** con GSAP y CSS transitions
- **Navegación fluida** con scroll suave y efectos parallax

### Secciones Implementadas
1. **Header fijo** con logo, menú de navegación y botón hamburguesa
2. **Hero Section** con título animado y call-to-action
3. **Sección de Servicios** con 6 tarjetas de servicios interactivas
4. **CTA Section** destacado para conversión
5. **Sección de Contacto** con formulario funcional
6. **Footer** completo con enlaces sociales y botón back-to-top

### Funcionalidades Técnicas
- **Animaciones GSAP** con ScrollTrigger para efectos al hacer scroll
- **Formulario de contacto** con validación y notificaciones
- **Navegación móvil** con menú hamburguesa
- **Efectos hover** en botones y tarjetas
- **Scroll suave** entre secciones
- **Botón back-to-top** con animación
- **Sistema de notificaciones** para feedback del usuario

## 📁 Estructura del Proyecto

```
paginaweb/
├── index.html          # Página principal
├── style.css           # Estilos CSS completos
├── scripts.js          # JavaScript con animaciones GSAP
├── README.md           # Este archivo
└── images/
    ├── logo.png        # Logo principal
    └── logo-white.png  # Logo para fondos oscuros
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript ES6+** - Funcionalidades interactivas
- **GSAP (GreenSock)** - Animaciones profesionales
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografías Poppins y Six Caps
- **AOS (Animate On Scroll)** - Animaciones adicionales

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

### Instalación Rápida
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador
3. ¡Listo! La página está funcionando

### Para Desarrollo
1. Clona o descarga el proyecto
2. Abre la carpeta en tu editor de código
3. Ejecuta en un servidor local (recomendado):
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

## 🎨 Personalización

### Colores
Los colores principales están definidos en variables CSS en `style.css`:
```css
:root {
    --primary-color: #e50914;    /* Rojo principal */
    --secondary-color: #0c0c0c;  /* Negro principal */
    --accent-color: #ff1a1a;     /* Rojo acento */
    /* ... más variables */
}
```

### Contenido
- **Títulos y textos**: Edita directamente en `index.html`
- **Servicios**: Modifica las tarjetas en la sección servicios
- **Información de contacto**: Actualiza en la sección contacto
- **Redes sociales**: Cambia los enlaces en el footer

### Logo
- Reemplaza `images/logo.png` y `images/logo-white.png` con tus logos
- Mantén las mismas dimensiones para mejor compatibilidad

## 📱 Responsive Design

La página está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Breakpoints CSS
```css
@media (max-width: 768px) { /* Tablet y Mobile */ }
@media (max-width: 480px) { /* Mobile pequeño */ }
```

## ⚡ Optimizaciones

### Performance
- **Lazy loading** para imágenes
- **Debounced scroll events** para mejor rendimiento
- **CSS optimizado** con variables y reutilización
- **JavaScript modular** con funciones específicas

### SEO
- **Meta tags** completos
- **Estructura semántica** HTML5
- **Alt text** en imágenes
- **Títulos descriptivos**

### Accesibilidad
- **Navegación por teclado** completa
- **Contraste de colores** adecuado
- **Textos alternativos** en imágenes
- **Estructura semántica** correcta

## 🔧 Funcionalidades JavaScript

### Animaciones GSAP
- **Hero animations**: Título con efecto de escritura
- **Scroll animations**: Elementos que aparecen al hacer scroll
- **Parallax effects**: Efectos de profundidad
- **Hover effects**: Interacciones en botones y tarjetas

### Interactividad
- **Formulario de contacto** con validación
- **Navegación móvil** con menú hamburguesa
- **Scroll suave** entre secciones
- **Sistema de notificaciones** para feedback

## 🎯 Call-to-Actions

La página incluye múltiples CTAs estratégicamente ubicados:
1. **Hero Section**: "Reserva una demo" y "Conoce nuestros servicios"
2. **CTA Section**: "Reserva una demo gratuita"
3. **Contacto**: Formulario de contacto directo

## 📞 Soporte y Contacto

Para soporte técnico o personalizaciones adicionales:
- **Email**: info@neurostrengthai.com
- **Teléfono**: +34 600 000 000

## 📄 Licencia

Este proyecto está diseñado específicamente para NeuroStrengthAI. Todos los derechos reservados.

---

**Desarrollado con ❤️ para NeuroStrengthAI** 
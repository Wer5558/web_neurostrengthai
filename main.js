document.addEventListener('DOMContentLoaded', () => {

  const cursorLight = document.querySelector('.cursor--light');
  const cursorDot = document.querySelector('.cursor--dot');
  let mouseX = 0, mouseY = 0, lightX = 0, lightY = 0, dotX = 0, dotY = 0;

  gsap.ticker.add(() => {
    lightX += (mouseX - lightX) * 0.2;
    lightY += (mouseY - lightY) * 0.2;
    dotX += (mouseX - dotX) * 0.7;
    dotY += (mouseY - dotY) * 0.7;
    cursorLight.style.transform = `translate(-50%, -50%) translate(${lightX}px, ${lightY}px)`;
    cursorDot.style.transform = `translate(-50%, -50%) translate(${dotX}px, ${dotY}px)`;
  });

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll('[data-cursor-scale], a, button').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cursorLight, { scale: 1.5, duration: 0.4, ease: 'power2.out' }));
      el.addEventListener('mouseleave', () => gsap.to(cursorLight, { scale: 1, duration: 0.4, ease: 'power2.out' }));
  });
  
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 1.5 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
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
      ctx.fillStyle = `rgba(220, 230, 240, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    // Dibujar líneas entre partículas cercanas
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(70, 123, 157, ${1 - dist / 100})`;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  gsap.registerPlugin(ScrollTrigger);
  
  const heroTl = gsap.timeline();
  heroTl.from('.hero-title .line', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out', stagger: 0.2 })
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power2.out' }, "-=1")
        .from('.scroll-indicator', { y: 20, opacity: 0, duration: 1, ease: 'power2.out' }, "-=0.5");
  
  const howTl = gsap.timeline({
      scrollTrigger: {
          trigger: '.how-sticky-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
      }
  });
  const steps = gsap.utils.toArray('.how-step');
  howTl.set(steps, { opacity: 0, y: 50 }); 
  
  howTl.to('#step1', { opacity: 1, y: 0, duration: 1 })
       .to('.how-visual .ring:nth-child(1)', { scale: 1.5, opacity: 0.2, duration: 1 }, "<")
       .to({}, {duration: 1}) 
       .to('#step1', { opacity: 0, y: -50, duration: 1 })
       .to('.how-visual .dot', { scale: 1.5, duration: 1}, "<")

       .to('#step2', { opacity: 1, y: 0, duration: 1 })
       .to('.how-visual .ring:nth-child(2)', { scale: 2.5, opacity: 0.1, duration: 1 }, "<")
       .to({}, {duration: 1}) 
       .to('#step2', { opacity: 0, y: -50, duration: 1 })
       .to('.how-visual .dot', { scale: 1, duration: 1 }, "<")

       .to('#step3', { opacity: 1, y: 0, duration: 1 })
       .to('.how-visual .ring:nth-child(3)', { scale: 3.5, opacity: 0.05, duration: 1 }, "<")
       .to({}, {duration: 1}); 

  gsap.from('.metric-card', {
      scrollTrigger: {
          trigger: '.results-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
  });
  
  gsap.utils.toArray('.metric-card .value').forEach(el => {
      const target = el.dataset.target;
      const originalText = el.innerText;
      const counter = { val: 0 };
      
      gsap.to(counter, {
          val: target,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
          },
          onUpdate: () => {
              if (originalText.includes('%')) {
                  el.textContent = `+${Math.round(counter.val)}%`;
              } else if (originalText.includes('x')) {
                  el.textContent = `${Math.round(counter.val)}x`;
              } else {
                  el.textContent = Math.round(counter.val);
              }
          }
      });
  });

  document.querySelectorAll('.metric-card').forEach(card => {
      card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--x', `${x}px`);
          card.style.setProperty('--y', `${y}px`);
      });
  });

  gsap.from('.panel-cta > .wrap > *', {
      scrollTrigger: {
          trigger: '.panel-cta',
          start: 'top 70%'
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'expo.out'
  });

});
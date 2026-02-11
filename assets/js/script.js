// Script para la navegación mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Efecto de scroll en el header
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Resaltar sección activa basado en scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Smooth scroll para enlaces ancla
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Efecto hover avanzado para el logo
    const logo = document.querySelector('.logo h2');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(10deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    }
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Efecto de partículas dinámicas en el header - Simplificado
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--primary-accent);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.4;
            animation: float-particle 4s ease-out forwards;
            z-index: 1;
        `;
        
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        particle.style.top = '80px';
        
        header.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
    
    // Crear partículas ocasionalmente - Menos frecuente
    setInterval(() => {
        if (Math.random() > 0.8) {
            createParticle();
        }
    }, 3000);
    
    // CSS para animación de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

import './style.css'
import { SimpleRouter } from './router.js';
// Configuración de rutas (movido a src/views/ para compatibilidad con Vite)
import { views } from './views/index.js';

// Importar GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) return;

  // Evitar duplicar listeners
  if (menuButton.dataset.bound === 'true') return;
  menuButton.dataset.bound = 'true';

  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
    
    if (isOpen) {
      // Cerrar menú
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    } else {
      // Abrir menú
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
    }
  });

  // Cerrar menú al hacer click en un enlace
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú al hacer click fuera (opcional)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// ========================================
// PARALLAX EFFECT con GSAP (solo HOME)
// ========================================

let parallaxTweens = []; // Array para guardar tweens y limpiarlos

function initParallax() {
  // Limpiar parallax anterior (kill tweens y ScrollTriggers)
  parallaxTweens.forEach(tween => tween.kill());
  parallaxTweens = [];
  ScrollTrigger.getAll().forEach(st => st.kill());

  // Verificar si el usuario prefiere movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('⚠️ Parallax desactivado: usuario prefiere movimiento reducido');
    return;
  }

  // Solo aplicar parallax en HOME (verificar si existe el contenedor snap)
  const snapContainer = document.querySelector('.snap-container');
  if (!snapContainer) {
    console.log('ℹ️ No se detectó .snap-container, parallax no aplicado');
    return;
  }

  // Seleccionar elementos con data-parallax dentro de HOME
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) {
    console.log('ℹ️ No se encontraron elementos [data-parallax]');
    return;
  }

  parallaxElements.forEach(element => {
    const speed = element.dataset.parallax; // "slow" | "mid" | "fast"
    
    // Definir multiplicadores de velocidad (valores más sutiles)
    const speedMap = {
      'slow': 0.15,  // Muy suave
      'mid': 0.25,   // Medio
      'fast': 0.35   // Más rápido pero aún sutil
    };
    
    const multiplier = speedMap[speed] || 0.2;

    // Crear tween de parallax
    const tween = gsap.to(element, {
      y: () => window.innerHeight * multiplier,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        scroller: snapContainer, // Usar .snap-container como scroller
        invalidateOnRefresh: true
      }
    });

    parallaxTweens.push(tween);
  });

  console.log(`✅ Parallax activado: ${parallaxElements.length} elementos animados`);
}

// ========================================
// SMOOTH SCROLL para enlaces internos
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Evitar duplicar listeners
    if (anchor.dataset.bound === 'true') return;
    anchor.dataset.bound = 'true';

    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Si es un enlace hash del router (#/, #/about, etc.), no hacer nada
      if (href.includes('/')) return;
      
      // Si es un ancla dentro de la página (#section), hacer scroll suave
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================================
// FORM HANDLER (sin backend)
// ========================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) {
    console.log('ℹ️ Formulario de contacto no encontrado en esta vista');
    return;
  }

  // Evitar duplicar listeners
  if (form.dataset.bound === 'true') {
    console.log('ℹ️ Formulario ya inicializado');
    return;
  }
  form.dataset.bound = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simular envío (sin backend real)
    console.log('📧 Datos del formulario:', data);
    
    // Crear mailto link como alternativa
    const mailtoLink = `mailto:tu@email.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Resetear formulario
    form.reset();
  });

  console.log('✅ Formulario de contacto inicializado');
}

// ========================================
// EVENTO route:mounted - Re-inicializar por vista
// ========================================

window.addEventListener('route:mounted', (event) => {
  const { path, routeId } = event.detail;
  
  console.log(`🔄 Ruta montada: ${path} (${routeId})`);

  // Re-inicializar funcionalidades específicas por vista
  initSmoothScroll(); // Siempre (anclas internas)
  
  // Solo en HOME: activar parallax Y scroll-snap
  if (path === '/' || routeId === 'view-home') {
    document.body.classList.add('snap-enabled'); // Activar scroll-snap
    initParallax();
  } else {
    document.body.classList.remove('snap-enabled'); // Desactivar scroll-snap
  }
  
  // Solo en CONTACT: inicializar formulario
  if (path === '/contact' || routeId === 'view-contact') {
    initContactForm();
  }
});

// ========================================
// INICIALIZACIÓN
// ========================================

// Inicializar router con hash routing para GitHub Pages
const router = new SimpleRouter(views);

// Inicializar funcionalidades globales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  
  // Nota: initParallax y initContactForm se ejecutan en route:mounted
  // No es necesario ejecutarlos aquí, el evento se dispara en load inicial
});

// Log de inicialización (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log('🚀 Portfolio SPA iniciado');
  console.log('BASE_URL:', import.meta.env.BASE_URL);
  console.log('Rutas disponibles:', Object.keys(views));
}
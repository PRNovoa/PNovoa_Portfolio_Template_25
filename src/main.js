import './style.css'
import { SimpleRouter } from './router.js';
// Configuración de rutas (movido a src/views/ para compatibilidad con Vite)
import { views } from './views/index.js';

// Importar sistema i18n
import { i18n, t } from './i18n/index.js';
import { initLanguageSelector } from './i18n/language-selector.js';

// Importar componente de modal de proyectos
import { ProjectModal } from './components/project-modal.js';

// Importar componentes de About
import { AboutCVModal } from './components/about-cv-modal.js';
import { initExperienceAccordion, destroyExperienceAccordion } from './components/experience-accordion.js';

// Importar GSAP y ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// ========================================
// INICIALIZACIÓN i18n
// ========================================

async function initI18n() {
  await i18n.init();
  
  // Insertar template del selector de idioma en el header
  const container = document.getElementById('language-selector-container');
  if (container) {
    // Cargar template del selector
    const response = await fetch(`${import.meta.env.BASE_URL}templates/language-selector.html`);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const template = doc.querySelector('template');
    
    if (template) {
      // Insertar el template en el documento
      document.body.appendChild(template);
      
      // Clonar y montar el contenido
      const clone = template.content.cloneNode(true);
      container.appendChild(clone);
      
      // Inicializar el componente
      initLanguageSelector();
    }
  }

  // Traducir elementos del header/footer que ya están en el DOM
  translateStaticContent();
  
  // Actualizar enlaces del nav con el idioma actual
  updateNavLinks();
}

function translateStaticContent() {
  // Traducir nav links
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  // Traducir aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    el.setAttribute('aria-label', t(key));
  });

  // Actualizar meta tags
  document.title = t('meta.title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = t('meta.description');
  }
}

/**
 * Actualiza solo los enlaces del nav principal con el idioma actual
 */
function updateNavLinks() {
  const currentLang = i18n.getLanguage();
  
  // Actualizar enlaces del nav desktop y mobile
  document.querySelectorAll('header a[href^="#/"], #mobile-menu a[href^="#/"]').forEach(link => {
    const href = link.getAttribute('href');
    
    // Extraer la ruta base sin idioma
    const pathMatch = href.match(/^#\/(?:es\/|en\/)?(.*)$/);
    if (pathMatch) {
      const basePath = pathMatch[1] || '';
      const newHref = basePath ? `#/${currentLang}/${basePath}` : `#/${currentLang}/`;
      link.setAttribute('href', newHref);
    }
  });
}

// Escuchar cambios de idioma para re-traducir header/footer Y actualizar nav links
window.addEventListener('language:changed', () => {
  translateStaticContent();
  updateNavLinks();
  
  // Traducir el contenido de la vista actual
  translateDynamicContent();
});

/**
 * Traduce el contenido dinámico de la vista actual (#app)
 */
function translateDynamicContent() {
  // Traducir elementos con data-i18n en #app
  document.querySelectorAll('#app [data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  // Traducir placeholders en #app
  document.querySelectorAll('#app [data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });

  // Traducir aria-labels en #app
  document.querySelectorAll('#app [data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    el.setAttribute('aria-label', t(key));
  });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

// Función global para cerrar el menú (exportada para usar en eventos)
window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('mobile-menu-button');
  
  if (mobileMenu && menuButton) {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
  }
};

function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuButton || !mobileMenu) {
    if (import.meta.env.DEV) console.warn('⚠️ No se encontró el menú móvil o el botón');
    return;
  }

  // Evitar duplicar listeners en el botón
  if (menuButton.dataset.bound === 'true') {
    if (import.meta.env.DEV) console.log('✅ Menú móvil ya inicializado');
    return;
  }
  menuButton.dataset.bound = 'true';

  if (import.meta.env.DEV) console.log('🔧 Inicializando menú móvil...');

  menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
    
    if (isOpen) {
      window.closeMobileMenu();
    } else {
      // Abrir menú
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
    }
  });

  // Usar delegación de eventos para los enlaces (funciona siempre, incluso tras updates)
  mobileMenu.addEventListener('click', (e) => {
    // Si se clickea en un enlace (o su hijo), cerrar menú
    const link = e.target.closest('a');
    if (link && link.hasAttribute('href')) {
      if (import.meta.env.DEV) console.log('📱 Click en enlace móvil, cerrando menú...');
      window.closeMobileMenu();
    }
    // Si se clickea en el fondo del menú, también cerrar
    else if (e.target === mobileMenu) {
      window.closeMobileMenu();
    }
  });

  // Cerrar menú en cada cambio de hash (navegación)
  window.addEventListener('hashchange', () => {
    window.closeMobileMenu();
  });

  if (import.meta.env.DEV) console.log('✅ Menú móvil inicializado correctamente');
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
    if (import.meta.env.DEV) console.log('⚠️ Parallax desactivado: usuario prefiere movimiento reducido');
    return;
  }

  // Solo aplicar parallax en HOME (verificar si existe el contenedor snap)
  const snapContainer = document.querySelector('.snap-container');
  if (!snapContainer) {
    if (import.meta.env.DEV) console.log('ℹ️ No se detectó .snap-container, parallax no aplicado');
    return;
  }

  // Seleccionar elementos con data-parallax dentro de HOME
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) {
    if (import.meta.env.DEV) console.log('ℹ️ No se encontraron elementos [data-parallax]');
    return;
  }

  // Configurar ScrollTrigger para usar el contenedor personalizado
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 150
  });

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

  // Forzar actualización de ScrollTrigger después de configurar todo
  ScrollTrigger.refresh();

  if (import.meta.env.DEV) console.log(`✅ Parallax activado: ${parallaxElements.length} elementos animados`);
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
    if (import.meta.env.DEV) console.log('ℹ️ Formulario de contacto no encontrado en esta vista');
    return;
  }

  // Evitar duplicar listeners
  if (form.dataset.bound === 'true') {
    if (import.meta.env.DEV) console.log('ℹ️ Formulario ya inicializado');
    return;
  }
  form.dataset.bound = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simular envío (sin backend real)
    if (import.meta.env.DEV) console.log('📧 Datos del formulario:', data);
    
    // Obtener email desde configuración i18n
    const contactEmail = i18n.t('config.personal.email') || 'tu@email.com';
    
    // Crear mailto link como alternativa
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Resetear formulario
    form.reset();
  });

  if (import.meta.env.DEV) console.log('✅ Formulario de contacto inicializado');
}

// ========================================
// EVENTO route:mounted - Re-inicializar por vista
// ========================================

let projectModal = null; // Variable global para el modal de proyectos
let aboutCVModal = null; // Variable global para el modal de CV

window.addEventListener('route:mounted', (event) => {
  const { path, routeId } = event.detail;
  
  if (import.meta.env.DEV) console.log(`🔄 Ruta montada: ${path} (${routeId})`);

  // Re-inicializar funcionalidades específicas por vista
  initSmoothScroll(); // Siempre (anclas internas)
  
  // Solo en HOME: activar parallax Y scroll-snap
  if (path === '/' || routeId === 'view-home') {
    document.body.classList.add('snap-enabled'); // Activar scroll-snap
    
    // Esperar a que el DOM se renderice completamente antes de inicializar parallax
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initParallax();
      });
    });
  } else {
    document.body.classList.remove('snap-enabled'); // Desactivar scroll-snap
  }
  
  // Solo en CONTACT: inicializar formulario
  if (path === '/contact' || routeId === 'view-contact') {
    initContactForm();
  }

  // Solo en ABOUT: inicializar CV modal y acordeones
  if (path === '/about' || routeId === 'view-about') {
    // Destruir instancia anterior si existe
    if (aboutCVModal) {
      aboutCVModal.destroy();
      aboutCVModal = null;
    }
    
    // Crear nueva instancia del modal de CV
    aboutCVModal = new AboutCVModal(i18n);
    aboutCVModal.init().catch(err => {
      console.error('Error al inicializar modal de CV:', err);
    });

    // Agregar evento a la tarjeta CV (toda la tarjeta es clickeable)
    const cvCard = document.getElementById('open-cv-modal');
    if (cvCard) {
      cvCard.addEventListener('click', () => {
        aboutCVModal.open();
      });
      
      // Soporte para teclado (Enter y Space)
      cvCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          aboutCVModal.open();
        }
      });
    }

    // Inicializar accordion de experiencia
    initExperienceAccordion();

    // Parallax para foto de bio
    const bioPhoto = document.querySelector('.bio-photo-parallax');
    if (bioPhoto) {
      gsap.to(bioPhoto, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: bioPhoto,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  } else {
    // Si cambiamos de vista, destruir el modal y acordeones
    if (aboutCVModal) {
      aboutCVModal.destroy();
      aboutCVModal = null;
    }
    destroyExperienceAccordion();
  }

  // Solo en PROJECTS: inicializar modal de proyectos
  if (path === '/projects' || routeId === 'view-projects') {
    // Destruir instancia anterior si existe
    if (projectModal) {
      projectModal.destroy();
      projectModal = null;
    }
    
    // Crear nueva instancia del modal
    projectModal = new ProjectModal(i18n);
    projectModal.init().catch(err => {
      console.error('Error al inicializar modal de proyectos:', err);
    });
  } else {
    // Si cambiamos de vista, destruir el modal
    if (projectModal) {
      projectModal.destroy();
      projectModal = null;
    }
  }
});

// ========================================
// INICIALIZACIÓN
// ========================================

(async function initApp() {
  // 1. Inicializar i18n ANTES del router
  await initI18n();

  // 2. Inicializar router con hash routing para GitHub Pages
  const router = new SimpleRouter(views);
  
  // 3. Ejecutar handleRoute inmediatamente (no esperar a 'load' que ya pasó)
  await router.handleRoute();

  // 4. Inicializar funcionalidades globales
  // Si el DOM ya está listo, ejecutar inmediatamente, sino esperar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMobileMenu();
    });
  } else {
    // DOM ya está listo, ejecutar inmediatamente
    initMobileMenu();
  }

  // Log de inicialización (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log('🚀 Portfolio SPA iniciado');
    console.log('🌐 Idioma:', i18n.getLanguage());
    console.log('BASE_URL:', import.meta.env.BASE_URL);
    console.log('Rutas disponibles:', Object.keys(views));
  }
})();
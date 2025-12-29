/**
 * SimpleRouter - Router SPA con hash routing + i18n para GitHub Pages
 * 
 * PLAN DE ROBUSTEZ (Validado con IA):
 * - Hash-based navigation (#/es/about, #/en/projects) compatible con hosting estático
 * - Soporte multiidioma con prefijo de idioma en URL
 * - Carga lazy de templates desde public/views con BASE_URL dinámico
 * - Cache de templates ya cargados para optimizar rendimiento
 * - Manejo robusto de errores 404
 * - Compatible con Vite base path dinámico (local y GitHub Pages)
 * - Evento route:mounted para re-inicializar componentes por vista
 * - Sincronización automática entre URL y sistema i18n
 */

import { i18n, t } from './i18n/index.js';
import { initRenderers } from './i18n/renderer.js';

export class SimpleRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentView = null;
    // CORRECCIÓN: Usar BASE_URL de Vite para rutas dinámicas
    this.BASE_URL = import.meta.env.BASE_URL;
    
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  async handleRoute() {
    let hash = window.location.hash.slice(1) || "/";
    
    // Extraer idioma de la URL (#/es/about → es, about)
    const langMatch = hash.match(/^\/(es|en)\//);
    let lang = i18n.getLanguage(); // idioma actual
    let path = hash;

    if (langMatch) {
      lang = langMatch[1];
      path = hash.replace(/^\/(es|en)/, ''); // quitar prefijo /es o /en
      
      // Sincronizar idioma si es diferente
      if (lang !== i18n.getLanguage()) {
        await i18n.setLanguage(lang);
      }
    } else {
      // Si no hay idioma en URL, añadirlo
      if (hash === '/') {
        window.location.hash = `#/${lang}/`;
        return;
      } else {
        // Para otras rutas sin idioma
        window.location.hash = `#/${lang}${hash}`;
        return;
      }
    }

    // Normalizar path
    if (!path || path === '/') {
      path = '/';
    }

    const route = this.routes[path] || this.routes[404];
    
    // Renderizar vista (siempre, incluso si es la misma, para actualizar traducciones)
    try {
      await this.renderView(route, path);
      this.updateActiveNav(`/${lang}${path}`);
      this.currentView = route;
    } catch (error) {
      console.error('Error rendering view:', error);
      // Si falla, intentar cargar vista 404
      if (route !== this.routes[404]) {
        await this.renderView(this.routes[404], '404');
      }
    }
  }

  async renderView(route, path) {
    const app = document.getElementById("app");
    app.textContent = "";

    // CORRECCIÓN: Construir URL completa con BASE_URL para GitHub Pages
    const fullTemplateUrl = route.templateUrl.startsWith('http') 
      ? route.templateUrl 
      : `${this.BASE_URL}${route.templateUrl}`;

    await ensureTemplateAvailable(route.templateId, fullTemplateUrl);

    const tpl = document.getElementById(route.templateId);
    if (!tpl) {
      app.innerHTML = '<div class="container mx-auto px-4 py-16 text-center"><h1 class="text-2xl font-bold text-red-600">Error: Plantilla no encontrada</h1></div>';
      return;
    }

    app.appendChild(tpl.content.cloneNode(true));
    
    // Traducir contenido dinámicamente
    this.translateContent();
    
    // Renderizar componentes dinámicos basados en config
    initRenderers();
    
    // Hook onMount para componentes interactivos
    if (typeof route.onMount === "function") {
      route.onMount(app);
    }

    // NUEVO: Disparar evento route:mounted después de renderizar
    // Esto permite que otros componentes se inicialicen por vista
    window.dispatchEvent(new CustomEvent("route:mounted", { 
      detail: { 
        path: path,
        routeId: route.templateId 
      } 
    }));
    
    // Scroll al top con smooth behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Traduce elementos con atributo data-i18n
   */
  translateContent() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });

    // Traducir elementos con data-config (valores de configuración)
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.dataset.config;
      const value = i18n.getConfig(`config.${key}`);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Traducir elementos con data-guide (valores guía/ejemplo)
    document.querySelectorAll('[data-guide]').forEach(el => {
      const key = el.dataset.guide;
      const value = t(key);
      if (value && value !== key) {
        el.textContent = value;
      }
    });

    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      el.placeholder = t(key);
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

    // Actualizar links internos con el idioma actual
    this.updateInternalLinks();
  }

  /**
   * Actualiza links internos con el prefijo de idioma correcto
   * SOLO en el contenido dinámico (#app), NO en el nav principal
   */
  updateInternalLinks() {
    const currentLang = i18n.getLanguage();
    
    // IMPORTANTE: Solo actualizar links dentro de #app (contenido dinámico)
    // NO tocar los enlaces del header/nav que se manejan por separado
    const app = document.getElementById('app');
    if (!app) return;
    
    app.querySelectorAll('a[href^="#/"]').forEach(link => {
      const href = link.getAttribute('href');
      const langMatch = href.match(/^#\/(es|en)\//);
      
      if (!langMatch) {
        // No tiene idioma → agregarlo
        const path = href.replace('#/', '');
        const newHref = path ? `#/${currentLang}/${path}` : `#/${currentLang}/`;
        link.setAttribute('href', newHref);
      }
      // Si ya tiene idioma, mantenerlo para permitir navegación correcta
    });
  }

  updateActiveNav(currentHash) {
    document.querySelectorAll('nav a[href^="#/"]').forEach((link) => {
      link.removeAttribute("aria-current");
      link.classList.remove('active'); // Por si se usan clases CSS
    });
    
    const activeLink = document.querySelector(`nav a[href="#${currentHash}"]`);
    if (activeLink) {
      activeLink.setAttribute("aria-current", "page");
      activeLink.classList.add('active');
    }
  }
}

// Cache global de templates cargados
const templateCache = new Set();

/**
 * Carga un template HTML si no está ya en el DOM
 * @param {string} templateId - ID del template
 * @param {string} templateUrl - URL completa del archivo HTML (con BASE_URL)
 */
async function ensureTemplateAvailable(templateId, templateUrl) {
  // Si ya está en el DOM, no hacer nada
  if (document.getElementById(templateId)) return;
  
  // Si ya intentamos cargarlo (aunque fallara), no reintentar
  if (templateCache.has(templateId)) return;

  try {
    const res = await fetch(templateUrl, { 
      credentials: "same-origin",
      cache: "default" // Usar cache del navegador
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${templateUrl}`);
    }
    
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const fetchedTemplate = doc.querySelector("template");
    
    if (!fetchedTemplate || !fetchedTemplate.id) {
      throw new Error(`No se encontró <template id="..."> en ${templateUrl}`);
    }
    
    document.body.appendChild(fetchedTemplate);
    templateCache.add(fetchedTemplate.id);
    
  } catch (error) {
    console.error(`Error cargando template ${templateId}:`, error);
    templateCache.add(templateId); // Marcar como intentado para no reintentar
    throw error; // Re-throw para que renderView lo maneje
  }
}
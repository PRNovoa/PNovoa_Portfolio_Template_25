/**
 * SimpleRouter - Router SPA con hash routing para GitHub Pages
 * 
 * PLAN DE ROBUSTEZ (Validado con IA):
 * - Hash-based navigation (#/about, #/projects) compatible con hosting estático
 * - Carga lazy de templates desde public/views con BASE_URL dinámico
 * - Cache de templates ya cargados para optimizar rendimiento
 * - Manejo robusto de errores 404
 * - Compatible con Vite base path dinámico (local y GitHub Pages)
 * - Evento route:mounted para re-inicializar componentes por vista
 */
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
    const hash = window.location.hash.slice(1) || "/";
    const route = this.routes[hash] || this.routes[404];
    
    if (route !== this.currentView) {
      try {
        await this.renderView(route, hash);
        this.updateActiveNav(hash);
        this.currentView = route;
      } catch (error) {
        console.error('Error rendering view:', error);
        // Si falla, intentar cargar vista 404
        if (route !== this.routes[404]) {
          await this.renderView(this.routes[404], '404');
        }
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

    // NUEVO: Disparar evento route:mounted después de renderizar
    // Esto permite que otros componentes se inicialicen por vista
    window.dispatchEvent(new CustomEvent("route:mounted", { 
      detail: { 
        path: path,
        routeId: route.templateId 
      } 
    }));
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
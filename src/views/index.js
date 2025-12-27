/**
 * Configuración de rutas del SPA
 * 
 * IMPORTANTE (Validado por plan de robustez con IA):
 * - templateUrl usa rutas relativas a public/ (sin prefijo "public/")
 * - El router añade BASE_URL automáticamente
 * - Compatible con Vite build: public/views/ → dist/views/
 * 
 * Para añadir una nueva ruta:
 * 1. Crea public/views/mi-vista.html con <template id="view-mi-vista">
 * 2. Añade aquí: '/mi-ruta': { templateId: 'view-mi-vista', templateUrl: 'views/mi-vista.html' }
 * 3. Añade enlace en nav: <a href="#/mi-ruta">Mi Ruta</a>
 */
export const views = {
  '/':        { templateId: 'view-home',     templateUrl: 'views/home.html' },
  '/about':   { templateId: 'view-about',    templateUrl: 'views/about.html' },
  '/projects':{ templateId: 'view-projects', templateUrl: 'views/proyectos.html' },
  '/contact': { templateId: 'view-contact',  templateUrl: 'views/contacto.html' },
  404:        { templateId: 'view-404',      templateUrl: 'views/404.html' },
};

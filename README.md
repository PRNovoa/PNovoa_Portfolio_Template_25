# PNovoa Portfolio Template 2025 🚀

> Portfolio personal desarrollado como SPA (Single Page Application) con Vite, Tailwind CSS v4, router custom y diseño glassmorphism en dark mode.

**🔗 Deploy en vivo**: [https://TU-USUARIO.github.io/PNovoa_Portfolio_Template_25/](https://TU-USUARIO.github.io/PNovoa_Portfolio_Template_25/)

---

## ✅ Plan de Robustez (Validado con IA)

Este proyecto ha sido revisado y optimizado siguiendo un plan profesional que asegura:

- ✅ **Router SPA robusto**: Hash routing compatible con GitHub Pages
- ✅ **BASE_URL dinámico**: Funciona en local (`./`) y en subdirectorio de GH Pages (`/repo/`)
- ✅ **404 handling dual**: Vista 404 del router (`public/views/404.html`) + página 404 para hosting (`public/404.html`)
- ✅ **Templates sin 404s**: Fetch con rutas correctas en dev y build
- ✅ **Cache de templates**: Optimización de carga con Set global
- ✅ **Build verificado**: `npm run build` + `npm run preview` sin errores
- ✅ **Deploy automatizado**: GitHub Actions con workflow configurado
- ✅ **Diseño glassmorphism completo**: Mobile-first con efectos glass en todos los componentes
- ✅ **Dark mode permanente**: Diseño optimizado para modo oscuro
- ✅ **Scroll-snapping en HOME**: Navegación vertical por secciones a pantalla completa
- ✅ **Parallax preparado**: Elementos con `data-parallax` listos para GSAP

---

## 📋 Características

### 🎨 Diseño y UI
- **Glassmorphism**: Efectos glass (blur + transparencia) en nav, cards y botones
- **Dark Mode Permanente**: Todo el diseño optimizado para tema oscuro
- **Mobile-First**: Responsive desde 375px hasta desktop
- **Scroll-Snap**: Navegación vertical por secciones SOLO en página HOME
- **Parallax Ready**: Blobs animables con `data-parallax="slow|mid|fast"`

### ⚙️ Funcionalidades
- **SPA con Hash Routing**: Navegación sin recargas (`#/`, `#/about`, `#/projects`, `#/contact`)
- **Menú Mobile**: Drawer lateral con animación y cierre automático
- **Templates HTML modulares**: Vistas separadas en `public/views/`
- **Lazy Loading**: Templates cargados bajo demanda con cache
- **Formulario de contacto**: Con validación y mailto fallback

### 🛠️ Stack Técnico
- **Vite 7.2**: Build ultra-rápido con HMR
- **Tailwind CSS 4.1**: Framework utility-first con CSS puro
- **GSAP 3.13**: Listo para animaciones avanzadas (instalado)
- **GitHub Pages Ready**: Base path dinámico con variable de entorno

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ y npm

### Comandos

```bash
# 1. Clonar repositorio
git clone https://github.com/TU-USUARIO/PNovoa_Portfolio_Template_25.git
cd PNovoa_Portfolio_Template_25

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:5173

# 4. Build para producción
npm run build

# 5. Previsualizar build localmente
npm run preview
# Abre http://localhost:4173
```

---

## 📁 Estructura del Proyecto

```
PNovoa_Portfolio_Template_25/
├── public/
│   ├── views/              # ← Templates HTML de cada vista (router SPA)
│   │   ├── home.html       # Vista principal con scroll-snap y 4 secciones ✨
│   │   ├── about.html      # Bio + skills + timeline ✨
│   │   ├── proyectos.html  # Grid responsive de proyectos ✨
│   │   ├── contacto.html   # Formulario + redes sociales ✨
│   │   ├── 404.html        # Vista 404 del router SPA ✨
│   │   ├── sobre.html      # Vista adicional
│   │   └── layouts.html    # Layouts compartidos
│   ├── 404.html            # Página 404 para GitHub Pages ✨
│   └── .nojekyll           # Evita procesamiento Jekyll en GH Pages ✨
├── src/
│   ├── views/
│   │   └── index.js        # Configuración de rutas del SPA ✨
│   ├── main.js             # Entry point + funcionalidades (mobile menu, parallax) ✨
│   ├── router.js           # Router SPA con BASE_URL dinámico ✨
│   ├── style.css           # Estilos glassmorphism + utilidades ✨
│   └── components/         # Componentes reutilizables
├── .github/
│   └── workflows/
│       └── deploy.yml      # Deploy automático a GitHub Pages ✨
├── index.html              # HTML principal con header glass y nav ✨
├── vite.config.js          # Configuración Vite con base dinámica
└── package.json            # Dependencias y scripts
```

> **✨ Archivos marcados con ✨ fueron creados/configurados siguiendo el plan de robustez y diseño con IA**

---

## 🎨 Estructura de Vistas
 con estructura glass:

```html
<template id="view-mi-seccion">
  <div class="min-h-screen py-20 gradient-purple-blue">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Mi Nueva Sección</h1>
      
      <div class="glass-card rounded-2xl p-8">
        <p>Contenido aquí...</p>
      </div>
    </div>
  </div>
</template>
```

### Paso 2: Registrar la ruta

Edita `src/views/index.js`
### 🏠 **HOME** (`#/` - `public/views/home.html`)
Única página con **scroll-snap vertical** activado. Contiene 4 secciones a pantalla completa:

1. **Hero**: Título principal + CTAs + 3 blobs con parallax preparado
2. **Featured Projects**: 3 cards glass con proyectos destacados
3. **About Teaser**: Mini bio + skills con barras de progreso
4. **Contact Teaser**: Panel glass con enlaces a redes sociales

### 👤 **ABOUT** (`#/about` - `public/views/about.html`)
Scroll normal (sin snap). Incluye:
- Bio completa con foto placeholder
- Grid de skills organizadas por categorías (Frontend, Tools)
- Timeline de experiencia profesional

### 💼 **PROJECTS** (`#/projects` - `public/views/proyectos.html`)
Grid responsive (1 col móvil, 2 md, 3 lg) con 6 project cards. Cada card incluye:
- Imagen/emoji placeholder
- Título y descripción
- Stack tecnológico (chips)
- Botones de GitHub y Demo

### 📧 **CONTACT** (`#/contact` - `public/views/contacto.html`)
Layout de 2 columnas:
- **Izquierda**: Info de contacto (email, GitHub, LinkedIn) + disponibilidad
- **Derecha**: Formulario funcional con validación y mailto fallback

---

## 🧭 Añadir una Nueva Vista
src/views/index.js`:

```js
export const views = {
  // ...rutas existentes...
  '/mi-seccion': { 
    templateId: 'view-mi-seccion', 
    templateUrl: 'views/mi-seccion.html' 
  },
};
```

### Paso 3: Añadir navegación

En el header de `index.html` o en cualquier template:

```html
<a href="#/mi-seccion" class="nav-link">Mi Sección</a>
```

¡Listo! La ruta `/#/mi-seccion` ya funciona.

---

## 🎨 Clases CSS Personalizadas

### Glassmorphism
- `.glass` - Efecto glass base
- `.glass-nav` - Glass para header/navegación (más transparente)
- `.glass-card` - Glass para cards con hover effect
- `.glass-button` - Glass para botones

### Utilidades
- `.gradient-purple-blue` - Gradiente de fondo sutil
- `.blob` - Elementos circulares con blur para parallax
- `.snap-container` - Contenedor con scroll-snap vertical (SOLO HOME)
- `.snap-section` - Secciones que hacen snap
- `.scroll-indicator` - Indicador animado de scroll

### Navegación
- `.nav-link` - Enlaces de navegación con underline animado
- `.mobile-nav-link` - Enlaces del menú mobile con glass

**Ejemplo de uso**:
```html
<div class="glass-card rounded-2xl p-8">
  <h2 class="text-2xl font-bold mb-4">Card Glass</h2>
  <button class="glass-button px-6 py-3 rounded-lg">
    Botón Glass
  </button>
</div>
```

---
### Paso 1: Crear el template HTML

Crea `public/views/mi-seccion.html`:

```html
<template id="view-mi-seccion">
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">Mi Nueva Sección</h1>
      <p>Contenido aquí...</p>
    </div>
  </section>
</template>
```

### Paso 2: Registrar la ruta

Edita `public/views/index.js`:

```js
export const views = {
  // ...rutas existentes...
  '/mi-seccion': { 
    templateId: 'view-mi-seccion', 
    templateUrl: 'views/mi-seccion.html' 
  },
};
```

### Paso 3: Añadir navegación

En tu menú/nav (dentro de algún template):

```html
<a href="#/mi-seccion">Mi Sección</a>
```

¡Listo! La ruta `/#/mi-seccion` ya funciona.

---

## 🔧 Configuración de GitHub Pages

### Deploy Automático (Recomendado)

El workflow en `.github/workflows/deploy.yml` hace deploy automático en cada push a `main`.

**Activar en GitHub**:

1. Ve a **Settings → Pages**
2. En **Source**, selecciona: **GitHub Actions**
3. Haz push a `main` → Deploy automático ✅

### Deploy Manual (Alternativo)

```bash
npm run build
# Subir carpeta dist/ a rama gh-pages
```

---

## 🛠️ Tecnologías

- **Vite 7.2**: Build tool con HMR
- **Tailwind CSS 4.1**: Framework CSS utility-first
- **GSAP 3.13**: Animaciones JavaScript
- **Hash Router Custom**: SPA routing sin dependencias

---

## 🧪 Verificación de Requisitos

### Comandos de Verificación

```bash
# Verificar que BASE_URL se configura correctamente
npm run build
# Debe mostrar: "✓ built in XXXms"

# Preview del build
npm run preview
# Abre http://localhost:4173
```

### En DevTools (F12)

1. **Console**: Verificar log inicial

   ```
   🚀 Portfolio SPA iniciado
   BASE_URL: ./
   Rutas disponibles: Array(5) [ "/", "/about", "/projects", ... ]
   ```

2. **Network Tab**: Navegar a todas las rutas
   - Filtrar por "views"
   - Todos los requests a `views/*.html` deben ser **200 OK**
   - URLs deben incluir el `BASE_URL` correcto

3. **Test de 404**:
   - Navegar a `#/no-existe` → Debe mostrar vista 404 del router (página morada con botones)
   - Acceder directamente a `/ruta-invalida` → Debe mostrar `404.html` (página con gradiente morado que redirige en 3s)
 + Diseño Glassmorphism

**Diseño y UI:**
- ✅ Maquetado completo con glassmorphism (blur + transparencia)
- ✅ Dark mode permanente sin toggle
- ✅ Mobile-first responsive (375px → desktop)
- ✅ Scroll-snapping vertical SOLO en página HOME
- ✅ Header sticky con efecto glass
- ✅ Menú mobile con drawer lateral animado
- ✅ 4 vistas completas: Home, About, Projects, Contact
- ✅ Parallax preparado con blobs (`data-parallax`)

**Router y Funcionalidades:**
- ✅ Router SPA profesional con hash routing
- ✅ BASE_URL dinámico para GitHub Pages
- ✅ Sistema 404 dual (router + hosting)
- ✅ Todos los templates de vistas creados
- ✅ Cache de templates optimizado
- ✅ Formulario de contacto con validación

**Infraestructura:**
- ✅ Workflow de GitHub Actions configurado
- ✅ CSS puro compatible con Tailwind v4 (sin `@apply`)
- ✅ Configuración de rutas en `src/views/index.js`
---

## 👤 Autor

**Pablo Novoa**

- GitHub: [@TU-USUARIO](https://github.com/TU-USUARIO)
- Portfolio: [https://TU-USUARIO.github.io/PNovoa_Portfolio_Template_25/](https://TU-USUARIO.github.io/PNovoa_Portfolio_Template_25/)

---

## 🐛 Troubleshooting

### Error: Plantilla no encontrada

**Síntoma**: Al navegar aparece "Error: Plantilla no encontrada" en rojo

**Causa**: Falta el archivo de vista correspondiente en `public/views/`

**Solución**: Verifica que el archivo HTML existe y tiene el `<template id="...">` correcto. Por ejemplo, si falta `public/views/404.html`, créalo con la estructura del template.

### Templates no cargan en build

**Síntoma**: `fetch` devuelve 404 para `views/home.html`

**Solución**: Verifica que [`vite.config.js`](vite.config.js) tenga `base` configurado y que [`src/router.js`](src/router.js) use `import.meta.env.BASE_URL`

### Estilos no se aplican

**Síntoma**: Tailwind no funciona en build

**Solución**:

```bash
npm install -D @tailwindcss/vite tailwindcss
# Verifica que vite.config.js incluya el plugin
```

### 404 en GitHub Pages al acceder directamente

**Síntoma**: `usuario.github.io/repo/about` da 404

---

## 📝 Historial de Cambios

### Diciembre 2025 - Implementación del Plan de Robustez

- ✅ Router SPA profesional con hash routing
- ✅ BASE_URL dinámico para GitHub Pages
- ✅ Sistema 404 dual (router + hosting)
- ✅ Todos los templates de vistas creados
- ✅ Workflow de GitHub Actions configurado
- ✅ Documentación completa en README
- ✅ Verificación completa: dev, build y preview funcionando

**Solución**: GitHub Pages necesita hash routing (`#/about`). El archivo `public/404.html` redirige al SPA automáticamente.

### BASE_URL incorrecto en local

**Síntoma**: Templates no cargan con `Cannot read properties of undefined`

**Solución**: El `vite.config.js` usa fallback a `'./'` si no hay `GITHUB_REPOSITORY`. En local siempre debe funcionar.

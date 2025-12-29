# PNovoa Portfolio Template 2025 🚀

> Portfolio universal desarrollado como SPA (Single Page Application) con Vite, Tailwind CSS v4, router custom y diseño glassmorphism en dark mode. **Personalizable para cualquier profesión** mediante archivos JSON.

**🔗 Deploy en vivo**: [https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/](https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/)

---

## 🎯 Portfolio Generalista

Este template está diseñado para ser usado por **cualquier profesional**, no solo desarrolladores:

- 💼 Diseñadores gráficos
- 📸 Fotógrafos
- ✍️ Escritores
- 🎨 Artistas
- 🏗️ Arquitectos
- 📊 Consultores
- 🎬 Videomakers
- ...y cualquier otro profesional

### 💡 Sistema de Guías Visuales

Todos los campos editables muestran tooltips con **mensajes de ayuda** al pasar el ratón, indicándote exactamente qué poner en cada sección.

---

## 🚀 Inicio Rápido

### 1. Clona y configura

```bash
git clone https://github.com/PRNovoa/PNovoa_Portfolio_Template_25.git
cd PNovoa_Portfolio_Template_25
npm install
npm run dev
```

### 2. Personaliza tu información

Edita los archivos JSON en `public/i18n/locales/`:

- **`es.json`**: Contenido en español
- **`en.json`**: Contenido en inglés

#### 📝 Datos Personales (`config.personal`)

```json
{
  "config": {
    "personal": {
      "name": "Tu Nombre Completo",
      "title": "Tu Profesión",
      "subtitle": "Tu Especialización",
      "email": "tu@email.com",
      "github_user": "tu-usuario",
      "github_url": "https://github.com/tu-usuario",
      "linkedin_name": "Tu Nombre",
      "linkedin_url": "https://linkedin.com/in/tu-usuario",
      "location": "Tu Ciudad, País"
    }
  }
}
```

#### 🎯 Habilidades (`config.skills`)

```json
{
  "config": {
    "skills": {
      "category1": {
        "name": "Habilidades Principales",
        "icon": "target",
        "items": [
          { "name": "Photoshop", "level": 95 },
          { "name": "Illustrator", "level": 90 },
          { "name": "Diseño UI", "level": 88 }
        ]
      },
      "category2": {
        "name": "Herramientas",
        "icon": "tool",
        "items": ["Figma", "Sketch", "InVision", "After Effects"]
      }
    }
  }
}
```

### 3. Personaliza textos

Modifica las secciones de textos en los JSON:

```json
{
  "home": {
    "hero": {
      "subtitle": "Diseñador Gráfico • Especialista en Branding",
      "description": "Creo identidades visuales memorables que conectan con tu audiencia"
    }
  },
  "about": {
    "intro": "Soy diseñador gráfico con 5 años de experiencia...",
    "text1": "Especializado en branding, diseño editorial y web...",
    "text2": "Mi enfoque combina creatividad con estrategia...",
    "text3": "Cuando no estoy diseñando, me gusta la fotografía..."
  }
}
```

### 4. Añade tus proyectos

```json
{
  "projects": {
    "project1": {
      "title": "Rediseño de Marca - Empresa X",
      "description": "Renovación completa de identidad corporativa incluyendo logo, colores y aplicaciones"
    }
  }
}
```

---

## 📚 Guía de Personalización Completa

### Iconos de Proyectos

Los proyectos usan iconos SVG configurables. Puedes elegir entre:

- `rocket` 🚀 - Proyectos innovadores/tecnología
- `briefcase` 💼 - Proyectos corporativos/negocios
- `palette` 🎨 - Proyectos creativos/diseño
- `shopping` 🛍️ - E-commerce/ventas
- `mobile` 📱 - Apps móviles
- `document` 📝 - Contenido/documentación
- `tool` 🛠️ - Herramientas/utilidades
- `target` 🎯 - Objetivos/estrategia

Configura el orden en `config.projects.icons`:

```json
{
  "config": {
    "projects": {
      "icons": ["palette", "briefcase", "mobile", "document", "target", "shopping"]
    }
  }
}
```

### Mensajes Guía

Los mensajes guía se muestran como tooltips cuando pasas el ratón sobre elementos con 💡. Para editarlos:

```json
{
  "guides": {
    "hero": {
      "name": "💡 Escribe tu nombre completo o nombre profesional",
      "subtitle": "💡 Tu especialización (ej: 'Diseñador de Interiores', 'Fotógrafo de Bodas')"
    }
  }
}
```

---

## 🌍 Ejemplos por Profesión

### Para Diseñadores Gráficos

```json
{
  "config": {
    "personal": {
      "title": "Diseñador Gráfico",
      "subtitle": "Branding & Identidad Visual"
    },
    "skills": {
      "category1": {
        "name": "Diseño",
        "items": [
          { "name": "Adobe Photoshop", "level": 95 },
          { "name": "Adobe Illustrator", "level": 92 },
          { "name": "InDesign", "level": 88 }
        ]
      }
    }
  }
}
```

### Para Fotógrafos

```json
{
  "config": {
    "personal": {
      "title": "Fotógrafo Profesional",
      "subtitle": "Retratos & Eventos"
    },
    "skills": {
      "category1": {
        "name": "Fotografía",
        "items": [
          { "name": "Retratos", "level": 95 },
          { "name": "Eventos", "level": 90 },
          { "name": "Edición", "level": 88 }
        ]
      },
      "category2": {
        "name": "Equipo",
        "items": ["Canon EOS R5", "Lentes 24-70mm", "Lightroom", "Photoshop"]
      }
    }
  }
}
```

### Para Arquitectos

```json
{
  "config": {
    "personal": {
      "title": "Arquitecto",
      "subtitle": "Diseño Residencial & Comercial"
    },
    "skills": {
      "category1": {
        "name": "Diseño Arquitectónico",
        "items": [
          { "name": "AutoCAD", "level": 95 },
          { "name": "Revit", "level": 90 },
          { "name": "SketchUp", "level": 88 }
        ]
      }
    }
  }
}
```

---

## ✅ Plan de Robustez (Validado con IA)

Este proyecto ha sido revisado y optimizado siguiendo un plan profesional que asegura:

- ✅ **Router SPA robusto**: Hash routing compatible con GitHub Pages
- ✅ **BASE_URL dinámico**: Funciona en local (`./`) y en subdirectorio de GH Pages (`/repo/`)
- ✅ **404 handling**: Vista 404 del router (`public/views/404.html`) con estilo vaporwave
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
git clone https://github.com/PRNovoa/PNovoa_Portfolio_Template_25.git
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

```text
PNovoa_Portfolio_Template_25/
├── public/
│   ├── views/              # ← Templates HTML de cada vista (router SPA)
│   │   ├── home.html       # Vista principal con scroll-snap y 4 secciones ✨
│   │   ├── about.html      # Bio + skills + timeline ✨
│   │   ├── proyectos.html  # Grid responsive de proyectos ✨
│   │   ├── contacto.html   # Formulario + redes sociales ✨
│   │   └── 404.html        # Vista 404 del router SPA ✨
│   ├── i18n/               # ← Sistema de internacionalización
│   │   ├── icons.json      # Iconos SVG centralizados ✨
│   │   └── locales/
│   │       ├── es.json     # Contenido en español
│   │       └── en.json     # Contenido en inglés
│   └── .nojekyll           # Evita procesamiento Jekyll en GH Pages ✨
├── src/
│   ├── views/
│   │   └── index.js        # Configuración de rutas del SPA ✨
│   ├── i18n/
│   │   ├── index.js        # Sistema i18n con carga de iconos ✨
│   │   ├── language-selector.js
│   │   └── renderer.js
│   ├── components/         # Componentes reutilizables
│   │   ├── project-modal.js
│   │   ├── about-cv-modal.js
│   │   └── experience-accordion.js
│   ├── main.js             # Entry point + funcionalidades ✨
│   ├── router.js           # Router SPA con BASE_URL dinámico ✨
│   └── style.css           # Estilos glassmorphism + utilidades ✨
├── docs/
│   ├── plan1.md            # Plan inicial
│   ├── plan2.md            # Plan de mejoras
│   └── plan3.md            # Auditoría y optimizaciones ✨
├── .github/
│   └── workflows/
│       └── deploy.yml      # Deploy automático a GitHub Pages ✨
├── index.html              # HTML principal con header glass y nav ✨
├── vite.config.js          # Configuración Vite con base dinámica
├── GUIA_PERSONALIZACION.md # Guía rápida para personalizar
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

   ```text
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

- Diseño Glassmorphism

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
- ✅ Vista 404 del router
- ✅ Todos los templates de vistas creados
- ✅ Cache de templates optimizado
- ✅ Formulario de contacto con validación
- ✅ Iconos SVG externalizados

**Infraestructura:**

- ✅ Workflow de GitHub Actions configurado
- ✅ CSS puro compatible con Tailwind v4 (sin `@apply`)
- ✅ Configuración de rutas en `src/views/index.js`

---

## 👤 Autor

### Pablo Novoa

- GitHub: [@PRNovoa](https://github.com/PRNovoa)
- Portfolio: [https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/](https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/)

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

**Solución**: GitHub Pages necesita hash routing (`#/about`). Usa siempre URLs con hash como `#/about`.

### v1.0.0 - Diciembre 2025 - Release Inicial

**Auditoría y Optimizaciones (Plan 3):**
- ✅ Eliminado código no utilizado (`counter.js`)
- ✅ Consolidada página 404 (una sola versión con estilo vaporwave)
- ✅ Iconos SVG externalizados a `public/i18n/icons.json`
- ✅ Rutas de modales corregidas para producción (BASE_URL)
- ✅ Console.log envueltos en DEV checks
- ✅ Email dinámico desde configuración i18n
- ✅ Filtros no funcionales eliminados
- ✅ Cobertura i18n completada en home

**Implementación del Plan de Robustez:**
- ✅ Router SPA profesional con hash routing
- ✅ BASE_URL dinámico para GitHub Pages
- ✅ Todos los templates de vistas creados
- ✅ Workflow de GitHub Actions configurado
- ✅ Documentación completa en README
- ✅ Verificación completa: dev, build y preview funcionando

**Solución**: GitHub Pages necesita hash routing (`#/about`). El archivo `public/404.html` redirige al SPA automáticamente.

### BASE_URL incorrecto en local

**Síntoma**: Templates no cargan con `Cannot read properties of undefined`

**Solución**: El `vite.config.js` usa fallback a `'./'` si no hay `GITHUB_REPOSITORY`. En local siempre debe funcionar.

---
---

# 🌐 English Version

## PNovoa Portfolio Template 2025 🚀

> Personal portfolio built as a SPA (Single Page Application) with Vite, Tailwind CSS v4, custom router and glassmorphism design in dark mode.

**🔗 Live Deploy**: [https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/](https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/)

---

## ✅ Robustness Plan (AI Validated)

This project has been reviewed and optimized following a professional plan that ensures:

- ✅ **Robust SPA Router**: Hash routing compatible with GitHub Pages
- ✅ **Dynamic BASE_URL**: Works locally (`./`) and in GH Pages subdirectory (`/repo/`)
- ✅ **404 handling**: Router 404 view (`public/views/404.html`) with vaporwave styling
- ✅ **Templates without 404s**: Fetch with correct paths in dev and build
- ✅ **Template cache**: Load optimization with global Set
- ✅ **Verified build**: `npm run build` + `npm run preview` without errors
- ✅ **Automated deploy**: GitHub Actions with configured workflow
- ✅ **Complete glassmorphism design**: Mobile-first with glass effects on all components
- ✅ **Permanent dark mode**: Design optimized for dark theme
- ✅ **Scroll-snapping on HOME**: Vertical navigation by full-screen sections
- ✅ **Parallax ready**: Elements with `data-parallax` ready for GSAP

---

## 📋 Features

### 🎨 Design and UI

- **Glassmorphism**: Glass effects (blur + transparency) on nav, cards and buttons
- **Permanent Dark Mode**: Entire design optimized for dark theme
- **Mobile-First**: Responsive from 375px to desktop
- **Scroll-Snap**: Vertical section navigation ONLY on HOME page
- **Parallax Ready**: Animatable blobs with `data-parallax="slow|mid|fast"`

### ⚙️ Functionality

- **SPA with Hash Routing**: Navigation without reloads (`#/`, `#/about`, `#/projects`, `#/contact`)
- **Mobile Menu**: Side drawer with animation and auto-close
- **Modular HTML templates**: Separate views in `public/views/`
- **Lazy Loading**: Templates loaded on demand with cache
- **Contact form**: With validation and mailto fallback

### 🛠️ Tech Stack

- **Vite 7.2**: Ultra-fast build with HMR
- **Tailwind CSS 4.1**: Utility-first framework with pure CSS
- **GSAP 3.13**: Ready for advanced animations (installed)
- **GitHub Pages Ready**: Dynamic base path with environment variable

---

## 🚀 Installation and Development

### Prerequisites

- Node.js 18+ and npm

### Commands

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USER/PNovoa_Portfolio_Template_25.git
cd PNovoa_Portfolio_Template_25

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Opens http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview build locally
npm run preview
# Opens http://localhost:4173
```

---

## 📁 Project Structure

```text
PNovoa_Portfolio_Template_25/
├── public/
│   ├── views/              # ← HTML templates for each view (SPA router)
│   │   ├── home.html       # Main view with scroll-snap and 4 sections ✨
│   │   ├── about.html      # Bio + skills + timeline ✨
│   │   ├── proyectos.html  # Responsive projects grid ✨
│   │   ├── contacto.html   # Form + social links ✨
│   │   └── 404.html        # SPA router 404 view ✨
│   ├── i18n/               # ← Internationalization system
│   │   ├── icons.json      # Centralized SVG icons ✨
│   │   └── locales/
│   │       ├── es.json     # Spanish content
│   │       └── en.json     # English content
│   └── .nojekyll           # Prevents Jekyll processing on GH Pages ✨
├── src/
│   ├── views/
│   │   └── index.js        # SPA routes configuration ✨
│   ├── i18n/
│   │   ├── index.js        # i18n system with icon loading ✨
│   │   ├── language-selector.js
│   │   └── renderer.js
│   ├── components/         # Reusable components
│   │   ├── project-modal.js
│   │   ├── about-cv-modal.js
│   │   └── experience-accordion.js
│   ├── main.js             # Entry point + features ✨
│   ├── router.js           # SPA router with dynamic BASE_URL ✨
│   └── style.css           # Glassmorphism styles + utilities ✨
├── docs/
│   ├── plan1.md            # Initial plan
│   ├── plan2.md            # Improvements plan
│   └── plan3.md            # Audit and optimizations ✨
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automatic deploy to GitHub Pages ✨
├── index.html              # Main HTML with glass header and nav ✨
├── vite.config.js          # Vite config with dynamic base
├── GUIA_PERSONALIZACION.md # Quick customization guide (Spanish)
└── package.json            # Dependencies and scripts
```

> **✨ Files marked with ✨ were created/configured following the robustness and design plan with AI**

---

## 🎨 Views Structure

### 🏠 **HOME** (`#/` - `public/views/home.html`)

Only page with **vertical scroll-snap** enabled. Contains 4 full-screen sections:

1. **Hero**: Main title + CTAs + 3 blobs with parallax ready
2. **Featured Projects**: 3 glass cards with featured projects
3. **About Teaser**: Mini bio + skills with progress bars
4. **Contact Teaser**: Glass panel with social links

### 👤 **ABOUT** (`#/about` - `public/views/about.html`)

Normal scroll (no snap). Includes:

- Complete bio with placeholder photo
- Skills grid organized by categories (Frontend, Tools)
- Professional experience timeline

### 💼 **PROJECTS** (`#/projects` - `public/views/proyectos.html`)

Responsive grid (1 col mobile, 2 md, 3 lg) with 6 project cards. Each card includes:

- Image/emoji placeholder
- Title and description
- Tech stack (chips)
- GitHub and Demo buttons

### 📧 **CONTACT** (`#/contact` - `public/views/contacto.html`)

2-column layout:

- **Left**: Contact info (email, GitHub, LinkedIn) + availability
- **Right**: Functional form with validation and mailto fallback

---

## 🧭 Adding a New View

### Step 1: Create the HTML template

Create `public/views/my-section.html` with glass structure:

```html
<template id="view-my-section">
  <div class="min-h-screen py-20 gradient-purple-blue">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">My New Section</h1>
      
      <div class="glass-card rounded-2xl p-8">
        <p>Content here...</p>
      </div>
    </div>
  </div>
</template>
```

### Step 2: Register the route

Edit `src/views/index.js`:

```js
export const views = {
  // ...existing routes...
  '/my-section': { 
    templateId: 'view-my-section', 
    templateUrl: 'views/my-section.html' 
  },
};
```

### Step 3: Add navigation

In the header of `index.html` or in any template:

```html
<a href="#/my-section" class="nav-link">My Section</a>
```

Done! The route `/#/my-section` now works.

---

## 🎨 Custom CSS Classes

### Glassmorphism

- `.glass` - Base glass effect
- `.glass-nav` - Glass for header/navigation (more transparent)
- `.glass-card` - Glass for cards with hover effect
- `.glass-button` - Glass for buttons

### Utilities

- `.gradient-purple-blue` - Subtle background gradient
- `.blob` - Circular blurred elements for parallax
- `.snap-container` - Container with vertical scroll-snap (HOME ONLY)
- `.snap-section` - Sections that snap
- `.scroll-indicator` - Animated scroll indicator

### Navigation

- `.nav-link` - Nav links with animated underline
- `.mobile-nav-link` - Mobile menu links with glass

**Usage example**:

```html
<div class="glass-card rounded-2xl p-8">
  <h2 class="text-2xl font-bold mb-4">Glass Card</h2>
  <button class="glass-button px-6 py-3 rounded-lg">
    Glass Button
  </button>
</div>
```

---

## 🔧 GitHub Pages Configuration

### Automatic Deploy (Recommended)

The workflow in `.github/workflows/deploy.yml` does automatic deploy on each push to `main`.

**Activate on GitHub**:

1. Go to **Settings → Pages**
2. In **Source**, select: **GitHub Actions**
3. Push to `main` → Automatic deploy ✅

### Manual Deploy (Alternative)

```bash
npm run build
# Upload dist/ folder to gh-pages branch
```

---

## 🛠️ Technologies

- **Vite 7.2**: Build tool with HMR
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **GSAP 3.13**: JavaScript animations
- **Custom Hash Router**: SPA routing without dependencies

---

## 🧪 Requirements Verification

### Verification Commands

```bash
# Verify BASE_URL is configured correctly
npm run build
# Should show: "✓ built in XXXms"

# Preview the build
npm run preview
# Opens http://localhost:4173
```

### In DevTools (F12)

1. **Console**: Verify initial log

   ```text
   🚀 Portfolio SPA iniciado
   BASE_URL: ./
   Rutas disponibles: Array(5) [ "/", "/about", "/projects", ... ]
   ```

2. **Network Tab**: Navigate to all routes
   - Filter by "views"
   - All requests to `views/*.html` must be **200 OK**
   - URLs must include the correct `BASE_URL`

3. **404 Test**:
   - Navigate to `#/non-existent` → Should show router 404 view (purple page with buttons)

---

## ✅ Completed Requirements

**Design and UI:**

- ✅ Complete markup with glassmorphism (blur + transparency)
- ✅ Permanent dark mode without toggle
- ✅ Mobile-first responsive (375px → desktop)
- ✅ Vertical scroll-snapping ONLY on HOME page
- ✅ Sticky header with glass effect
- ✅ Mobile menu with animated side drawer
- ✅ 4 complete views: Home, About, Projects, Contact
- ✅ Parallax ready with blobs (`data-parallax`)

**Router and Functionality:**

- ✅ Professional SPA router with hash routing
- ✅ Dynamic BASE_URL for GitHub Pages
- ✅ Router 404 view
- ✅ All view templates created
- ✅ Optimized template cache
- ✅ Contact form with validation
- ✅ Externalized SVG icons

**Infrastructure:**

- ✅ GitHub Actions workflow configured
- ✅ Pure CSS compatible with Tailwind v4 (no `@apply`)
- ✅ Routes configuration in `src/views/index.js`

---

## 👤 Author

### Pablo Novoa

- GitHub: [@PRNovoa](https://github.com/PRNovoa)
- Portfolio: [https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/](https://PRNovoa.github.io/PNovoa_Portfolio_Template_25/)

---

## 🐛 Troubleshooting

### Error: Template not found

**Symptom**: When navigating shows "Error: Plantilla no encontrada" in red

**Cause**: Missing view file in `public/views/`

**Solution**: Verify that the HTML file exists and has the correct `<template id="...">`. For example, if `public/views/404.html` is missing, create it with the template structure.

### Templates don't load in build

**Symptom**: `fetch` returns 404 for `views/home.html`

**Solution**: Verify that `vite.config.js` has `base` configured and that `src/router.js` uses `import.meta.env.BASE_URL`

### Styles not applying

**Symptom**: Tailwind doesn't work in build

**Solution**:

```bash
npm install -D @tailwindcss/vite tailwindcss
# Verify that vite.config.js includes the plugin
```

### 404 on GitHub Pages when accessing directly

**Symptom**: `user.github.io/repo/about` gives 404

**Solution**: GitHub Pages requires hash routing (`#/about`). Always use URLs with hash like `#/about`.

### Incorrect BASE_URL locally

**Symptom**: Templates don't load with `Cannot read properties of undefined`

**Solution**: The `vite.config.js` uses fallback to `'./'` if there's no `GITHUB_REPOSITORY`. Locally it should always work.

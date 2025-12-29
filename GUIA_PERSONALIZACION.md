# 📋 GUÍA DE PERSONALIZACIÓN RÁPIDA

## ✅ Características del Portfolio

Tu portfolio es **100% generalista** y puede ser usado por cualquier profesional. Incluye:

### 1. **Sistema de Configuración JSON**

- Todos los datos personales viven en `public/i18n/locales/es.json` y `en.json`
- Sección `config.personal` para nombre, email, redes sociales, ubicación
- Sección `config.skills` para habilidades con niveles y categorías
- Iconos SVG centralizados en `public/i18n/icons.json`

### 2. **Sistema de Mensajes Guía**

- Tooltips visuales con 💡 que aparecen al pasar el ratón
- Mensajes de ayuda en cada campo editable
- Sección `guides` en los JSON con instrucciones

### 3. **Validación Automática**

- Emails validados automáticamente
- URLs verificadas antes de usarse
- Console.log solo visible en modo desarrollo

### 4. **Iconos SVG Dinámicos**

- 8 iconos disponibles para proyectos (externalizados en `icons.json`)
- Configurables desde los archivos de locale

---

## 🚀 Cómo Personalizar (5 Pasos)

### Paso 1: Información Personal

Abre `public/i18n/locales/es.json` y edita:

```json
{
  "config": {
    "personal": {
      "name": "María García",
      "title": "Diseñadora Gráfica",
      "subtitle": "Branding & Identidad Visual",
      "email": "maria@miportfolio.com",
      "github_user": "mariagarcia",
      "github_url": "https://github.com/mariagarcia",
      "linkedin_name": "María García",
      "linkedin_url": "https://linkedin.com/in/mariagarcia",
      "location": "Barcelona, España"
    }
  }
}
```

### Paso 2: Habilidades

Personaliza tus habilidades:

```json
{
  "config": {
    "skills": {
      "category1": {
        "name": "Diseño",
        "icon": "palette",
        "items": [
          { "name": "Photoshop", "level": 95 },
          { "name": "Illustrator", "level": 92 },
          { "name": "InDesign", "level": 88 },
          { "name": "Figma", "level": 85 }
        ]
      },
      "category2": {
        "name": "Herramientas",
        "icon": "tool",
        "items": [
          "Adobe Creative Suite",
          "Sketch",
          "Procreate",
          "After Effects",
          "Cinema 4D"
        ]
      }
    }
  }
}
```

### Paso 3: Textos de Presentación

Modifica los textos principales:

```json
{
  "home": {
    "hero": {
      "subtitle": "Diseñadora Gráfica • Especialista en Branding",
      "description": "Creo identidades visuales únicas que conectan marcas con personas"
    }
  },
  "about": {
    "subtitle": "Diseñadora gráfica apasionada por crear experiencias visuales memorables",
    "intro": "Soy diseñadora gráfica con 5 años de experiencia en branding, diseño editorial y digital. Me especializo en crear identidades visuales que cuentan historias.",
    "text1": "Mi enfoque combina investigación, estrategia y creatividad para desarrollar soluciones de diseño que resuelven problemas reales y conectan emocionalmente con las audiencias.",
    "text2": "Dominio de Adobe Creative Suite, Figma y herramientas de prototipado. Experiencia en proyectos desde startups hasta marcas consolidadas.",
    "text3": "Cuando no estoy diseñando, me gusta explorar nuevas tendencias visuales, fotografía urbana y colaborar en proyectos de diseño social."
  }
}
```

### Paso 4: Proyectos

Añade tus proyectos:

```json
{
  "projects": {
    "project1": {
      "title": "Rediseño Marca Café Luna",
      "description": "Renovación completa de identidad visual incluyendo logo, paleta de colores, packaging y aplicaciones digitales. Resultado: +40% en reconocimiento de marca."
    },
    "project2": {
      "title": "Catálogo Editorial Moda 2024",
      "description": "Diseño editorial para catálogo de 80 páginas combinando fotografía de producto, tipografía experimental y layouts dinámicos."
    }
  }
}
```

### Paso 5: Experiencia

Actualiza tu trayectoria:

```json
{
  "about": {
    "experience": {
      "job1": {
        "title": "Diseñadora Gráfica Senior",
        "period": "2022 - Presente",
        "company": "Estudio Creativo XYZ",
        "description": "Liderazgo en proyectos de branding para clientes nacionales e internacionales. Gestión de equipo de 3 diseñadores junior. Desarrollo de sistema de diseño corporativo."
      },
      "job2": {
        "title": "Diseñadora Gráfica",
        "period": "2019 - 2022",
        "company": "Agencia Digital ABC",
        "description": "Diseño de identidades visuales, piezas digitales y print. Colaboración directa con equipos de marketing y desarrollo. +50 proyectos completados."
      },
      "job3": {
        "title": "Grado en Diseño Gráfico",
        "period": "2015 - 2019",
        "company": "Universidad de Diseño",
        "description": "Especialización en Branding e Identidad Visual. Proyecto fin de grado: Sistema de wayfinding para museo contemporáneo. Matrícula de honor."
      }
    }
  }
}
```

---

## 🎨 Iconos Disponibles

Puedes elegir entre estos iconos para tus proyectos:

| Icono | Nombre | Uso Recomendado |
|-------|--------|-----------------|
| 🚀 | `rocket` | Proyectos innovadores, tech, startups |
| 💼 | `briefcase` | Proyectos corporativos, negocios |
| 🎨 | `palette` | Proyectos creativos, diseño, arte |
| 🛍️ | `shopping` | E-commerce, retail, ventas |
| 📱 | `mobile` | Apps móviles, UI/UX |
| 📝 | `document` | Contenido, editorial, documentación |
| 🛠️ | `tool` | Herramientas, utilidades, software |
| 🎯 | `target` | Estrategia, objetivos, marketing |

Configúralos en `config.projects.icons`:

```json
{
  "config": {
    "projects": {
      "icons": ["palette", "briefcase", "document", "palette", "shopping", "target"]
    }
  }
}
```

---

## 💡 Tips de Personalización

### Para Fotógrafos
- Usa iconos `mobile`, `palette`, `target`
- Habilidades: Tipos de fotografía que dominas (Retratos, Eventos, Producto)
- Herramientas: Cámaras y software de edición

### Para Arquitectos
- Usa iconos `briefcase`, `document`, `target`
- Habilidades: Software de diseño (AutoCAD, Revit, SketchUp)
- Proyectos: Obras realizadas con métricas (m², presupuesto)

### Para Escritores
- Usa iconos `document`, `palette`, `briefcase`
- Habilidades: Géneros que dominas (Narrativa, Ensayo, Copywriting)
- Proyectos: Publicaciones, artículos, libros

### Para Consultores
- Usa iconos `target`, `briefcase`, `document`
- Habilidades: Áreas de consultoría y metodologías
- Proyectos: Casos de éxito con resultados cuantificables

---

## 🌍 Multiidioma

El portfolio soporta español e inglés. Para activar:

1. Edita ambos archivos: `es.json` y `en.json`
2. Mantén la misma estructura en ambos
3. El usuario podrá cambiar idioma desde el selector en el menú

---

## ✅ Checklist de Personalización

- [ ] Actualizar `config.personal` con tus datos
- [ ] Configurar `config.skills` con tus habilidades
- [ ] Personalizar textos del hero (home.hero)
- [ ] Escribir tu bio (about.intro, text1, text2, text3)
- [ ] Añadir tus 3 proyectos destacados (home.project1-3)
- [ ] Completar página de proyectos (projects.project1-6)
- [ ] Actualizar experiencia laboral (about.experience)
- [ ] Configurar iconos de proyectos
- [ ] Revisar tooltips de ayuda (guides)
- [ ] Traducir al inglés (en.json)
- [ ] Probar en móvil y desktop
- [ ] Actualizar meta tags (meta.title, meta.description)

---

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Deploy a GitHub Pages
npm run deploy
```

---

## 🆘 Soporte

Si tienes dudas:

1. Pasa el ratón sobre elementos con 💡 para ver mensajes de ayuda
2. Revisa la consola del navegador (F12) para ver errores de validación
3. Consulta los ejemplos en este documento
4. Revisa el README.md completo del proyecto

---

¡Tu portfolio está listo para brillar! 🌟

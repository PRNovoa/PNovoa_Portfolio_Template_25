# Guía para Añadir un Nuevo Idioma

## Pasos

1. **Crear archivo JSON**: Copia `es.json` como `fr.json` (ejemplo francés)
2. **Traducir todas las claves**: Mantén la misma estructura jerárquica
3. **Actualizar `index.js`**: Añadir `'fr'` a `SUPPORTED_LANGS`
4. **Añadir opción al selector**: En `language-selector.html`:

```html
<button data-lang="fr" class="lang-option ...">
  <span>🇫🇷 Français</span>
  <svg class="lang-check hidden">...</svg>
</button>
```

5. **Actualizar rutas**: El router detectará automáticamente `#/fr/about`
6. **Actualizar docs**: Añadir FR a la lista de idiomas soportados

## Validación

```bash
# Verificar que el JSON es válido
node -e "console.log(JSON.parse(require('fs').readFileSync('src/i18n/locales/fr.json')))"

# Comprobar claves faltantes (script futuro)
npm run i18n:check
```

## Estructura de Claves

Todas las traducciones deben mantener la misma estructura de claves:

```json
{
  "meta": { ... },
  "nav": { ... },
  "footer": { ... },
  "home": { ... },
  "about": { ... },
  "projects": { ... },
  "contact": { ... },
  "error_404": { ... },
  "language_selector": { ... }
}
```

## Testing

1. Iniciar servidor de desarrollo: `npm run dev`
2. Navegar a `#/fr/home`
3. Verificar que todo el contenido se traduce correctamente
4. Probar el selector de idioma
5. Verificar persistencia en localStorage

/**
 * Sistema de Internacionalización (i18n)
 * 
 * Características:
 * - Detección automática de idioma del navegador
 * - Persistencia en localStorage
 * - Lazy loading de traducciones
 * - Fallback a español si falta traducción
 * - Evento 'language:changed' para re-renderizar componentes
 */

const STORAGE_KEY = 'portfolio_lang';
const DEFAULT_LANG = 'es';
const SUPPORTED_LANGS = ['es', 'en'];

class I18n {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.translations = {};
    this.icons = {};
    this.cache = new Map();
  }

  /**
   * Detecta el idioma del usuario
   * Prioridad: localStorage > URL > navegador > default
   */
  detectLanguage() {
    // 1. Desde localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }

    // 2. Desde URL hash (#/es/about)
    const hash = window.location.hash;
    const langMatch = hash.match(/^#\/(es|en)\//);
    if (langMatch) {
      return langMatch[1];
    }

    // 3. Desde navegador
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }

    // 4. Fallback
    return DEFAULT_LANG;
  }

  /**
   * Carga las traducciones de un idioma
   */
  async loadTranslations(lang) {
    if (this.cache.has(lang)) {
      return this.cache.get(lang);
    }

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}i18n/locales/${lang}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const translations = await response.json();
      this.cache.set(lang, translations);
      return translations;
    } catch (error) {
      console.error(`Error cargando traducciones ${lang}:`, error);
      
      // Fallback a español
      if (lang !== DEFAULT_LANG) {
        return this.loadTranslations(DEFAULT_LANG);
      }
      return {};
    }
  }

  /**
   * Obtiene una traducción por clave
   * @param {string} key - Clave en formato "section.subsection.key"
   * @param {object} vars - Variables para interpolación
   */
  t(key, vars = {}) {
    // Si no hay traducciones cargadas todavía, retornar la clave sin warning
    if (!this.translations || Object.keys(this.translations).length === 0) {
      return key;
    }

    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Desactivado: warnings de traducción
        // Solo útil durante desarrollo de nuevas secciones
        return key;
      }
    }

    // Interpolación de variables {variable}
    if (typeof value === 'string' && Object.keys(vars).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, varName) => {
        return vars[varName] !== undefined ? vars[varName] : match;
      });
    }

    return value;
  }

  /**
   * Cambia el idioma actual
   */
  async setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.error(`Idioma no soportado: ${lang}`);
      return;
    }

    this.currentLang = lang;
    this.translations = await this.loadTranslations(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // Actualizar HTML lang attribute
    document.documentElement.lang = lang;

    // Aplicar todas las traducciones y configuraciones
    this.applyTranslations();
    this.applyPlaceholders();
    this.applyConfig();
    this.applyGuides();

    // Emitir evento para que componentes se re-rendericen
    window.dispatchEvent(new CustomEvent('language:changed', { 
      detail: { lang, translations: this.translations }
    }));
  }

  /**
   * Carga los iconos SVG desde archivo externo
   */
  async loadIcons() {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}i18n/icons.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.icons = await response.json();
    } catch (error) {
      console.error('Error cargando iconos:', error);
      this.icons = {};
    }
  }

  /**
   * Inicializa el sistema i18n
   */
  async init() {
    // Cargar iconos (solo una vez, no dependen del idioma)
    await this.loadIcons();
    
    this.translations = await this.loadTranslations(this.currentLang);
    document.documentElement.lang = this.currentLang;
    
    // Aplicar traducciones iniciales
    this.applyTranslations();
    this.applyPlaceholders();
    this.applyConfig();
    this.applyGuides();
    
    return this;
  }

  /**
   * Obtiene el idioma actual
   */
  getLanguage() {
    return this.currentLang;
  }

  /**
   * Obtiene los idiomas soportados
   */
  getSupportedLanguages() {
    return SUPPORTED_LANGS;
  }

  /**
   * Obtiene un valor de configuración
   * @param {string} key - Clave en formato "config.personal.name"
   */
  getConfig(key) {
    return this.t(key);
  }

  /**
   * Obtiene un mensaje guía
   * @param {string} key - Clave en formato "guides.hero.name"
   */
  getGuide(key) {
    return this.t(key);
  }

  /**
   * Obtiene un icono SVG desde el archivo externo
   * @param {string} iconName - Nombre del icono
   */
  getIcon(iconName) {
    return this.icons[iconName] || '';
  }

  /**
   * Aplica traducciones a elementos con data-i18n
   */
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (typeof translation === 'string') {
        element.textContent = translation;
      }
    });
  }

  /**
   * Aplica placeholders traducidos
   */
  applyPlaceholders() {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const placeholder = this.t(key);
      
      if (typeof placeholder === 'string') {
        element.setAttribute('placeholder', placeholder);
      }
    });
  }

  /**
   * Aplica configuración personal a elementos con data-config
   */
  applyConfig() {
    document.querySelectorAll('[data-config]').forEach(element => {
      const key = element.getAttribute('data-config');
      const value = this.getConfig(`config.${key}`);
      
      // Validar según el tipo de dato
      const validatedValue = this.validateConfigValue(key, value);
      
      if (typeof validatedValue === 'string') {
        // Si el elemento es un enlace, actualizar href
        if (element.tagName === 'A' && key.includes('_url')) {
          element.href = validatedValue;
        } else {
          element.textContent = validatedValue;
        }
      }
    });
  }

  /**
   * Valida valores de configuración
   */
  validateConfigValue(key, value) {
    // Validar email
    if (key.includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        console.warn(`Invalid email format: ${value}`);
        return 'your@email.com';
      }
    }

    // Validar URL
    if (key.includes('_url')) {
      try {
        new URL(value);
        return value;
      } catch {
        console.warn(`Invalid URL format: ${value}`);
        return key.includes('github') ? 'https://github.com' : 'https://linkedin.com';
      }
    }

    return value;
  }

  /**
   * Renderiza lista de skills desde config
   * @param {string} categoryKey - 'category1' o 'category2'
   * @param {HTMLElement} container - Contenedor donde renderizar
   */
  renderSkillsList(categoryKey, container) {
    const category = this.getConfig(`config.skills.${categoryKey}`);
    
    if (!category) {
      console.warn(`Skills category not found: ${categoryKey}`);
      return;
    }

    // Limpiar contenedor
    container.innerHTML = '';

    // Renderizar items
    if (Array.isArray(category.items)) {
      category.items.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'px-4 py-2 glass-button rounded-full text-sm font-medium';
        chip.style.cssText = 'color: #FFE66D; border-color: rgba(255, 230, 109, 0.3);';
        
        // Si el item es un objeto con level (para barras de progreso)
        if (typeof item === 'object' && item.name) {
          chip.textContent = item.name;
          chip.setAttribute('data-level', item.level || 0);
        } else {
          chip.textContent = item;
        }
        
        container.appendChild(chip);
      });
    }
  }

  /**
   * Renderiza barras de progreso de skills
   * @param {string} categoryKey - 'category1' o 'category2'
   * @param {HTMLElement} container - Contenedor donde renderizar
   */
  renderSkillBars(categoryKey, container) {
    const category = this.getConfig(`config.skills.${categoryKey}`);
    
    if (!category || !Array.isArray(category.items)) {
      console.warn(`Skills category not found or invalid: ${categoryKey}`);
      return;
    }

    container.innerHTML = '';

    category.items.forEach((item, index) => {
      if (typeof item === 'object' && item.name && item.level) {
        const colors = ['#FF71CE', '#B967FF', '#01CDFE', '#FFE66D'];
        const color = colors[index % colors.length];
        
        const skillDiv = document.createElement('div');
        skillDiv.innerHTML = `
          <div class="flex justify-between mb-2">
            <span class="font-medium" style="color: #F7F3FF;">${item.name}</span>
            <span style="color: ${color};">${item.level}%</span>
          </div>
          <div class="h-2 rounded-full overflow-hidden" style="background: #271B57;">
            <div class="h-full rounded-full" style="width: ${item.level}%; background: linear-gradient(to right, ${color}, ${this.shiftColor(color)}); box-shadow: 0 0 15px ${color}80;"></div>
          </div>
        `;
        container.appendChild(skillDiv);
      }
    });
  }

  /**
   * Utilidad para cambiar ligeramente un color
   */
  shiftColor(color) {
    const colorMap = {
      '#FF71CE': '#B967FF',
      '#B967FF': '#FF71CE',
      '#01CDFE': '#B967FF',
      '#FFE66D': '#01CDFE'
    };
    return colorMap[color] || color;
  }

  /**
   * Renderiza icono SVG en un elemento
   * @param {string} iconName - Nombre del icono
   * @param {HTMLElement} container - Contenedor donde renderizar
   * @param {string} className - Clases CSS opcionales
   */
  renderIcon(iconName, container, className = 'w-16 h-16') {
    const iconSvg = this.getIcon(iconName);
    
    if (iconSvg) {
      const wrapper = document.createElement('div');
      wrapper.className = className;
      wrapper.innerHTML = iconSvg;
      container.innerHTML = '';
      container.appendChild(wrapper.firstElementChild);
    }
  }

  /**
   * Aplica mensajes guía como tooltips
   */
  applyGuides() {
    document.querySelectorAll('[data-guide]').forEach(element => {
      const guideKey = element.getAttribute('data-guide');
      const guideText = this.getGuide(guideKey);
      
      if (typeof guideText === 'string') {
        element.setAttribute('title', guideText);
        element.classList.add('has-guide');
      }
    });
  }
}

// Instancia singleton
export const i18n = new I18n();

// Exportar función helper para usar en templates
export const t = (key, vars) => i18n.t(key, vars);

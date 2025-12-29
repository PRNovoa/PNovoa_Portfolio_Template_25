/**
 * Renderer para componentes dinámicos del portfolio
 * Renderiza elementos que dependen de config y datos del JSON
 */

import { i18n } from './index.js';

/**
 * Renderiza los iconos de proyectos
 */
export function renderProjectIcons() {
  const projectCards = document.querySelectorAll('[data-project-icon]');
  const icons = i18n.getConfig('config.projects.icons');
  
  if (!Array.isArray(icons)) return;
  
  projectCards.forEach((card, index) => {
    const iconName = icons[index % icons.length];
    const iconContainer = card.querySelector('[data-icon-container]');
    
    if (iconContainer) {
      i18n.renderIcon(iconName, iconContainer, 'text-white w-16 h-16');
    }
  });
}

/**
 * Renderiza skills en about teaser (home)
 */
export function renderHomeSkillBars() {
  const container = document.querySelector('[data-skills-home]');
  if (!container) return;
  
  i18n.renderSkillBars('category1', container);
}

/**
 * Renderiza skills categories en about page
 */
export function renderAboutSkills() {
  // Category 1
  const cat1Container = document.querySelector('[data-skills-category="category1"]');
  if (cat1Container) {
    const category = i18n.getConfig('config.skills.category1');
    
    // Actualizar título
    const titleEl = cat1Container.querySelector('[data-category-title]');
    if (titleEl) {
      titleEl.textContent = category.name;
    }
    
    // Renderizar icono
    const iconEl = cat1Container.querySelector('[data-category-icon]');
    if (iconEl && category.icon) {
      i18n.renderIcon(category.icon, iconEl, 'w-8 h-8');
    }
    
    // Renderizar items
    const itemsEl = cat1Container.querySelector('[data-category-items]');
    if (itemsEl) {
      i18n.renderSkillsList('category1', itemsEl);
    }
  }
  
  // Category 2
  const cat2Container = document.querySelector('[data-skills-category="category2"]');
  if (cat2Container) {
    const category = i18n.getConfig('config.skills.category2');
    
    // Actualizar título
    const titleEl = cat2Container.querySelector('[data-category-title]');
    if (titleEl) {
      titleEl.textContent = category.name;
    }
    
    // Renderizar icono
    const iconEl = cat2Container.querySelector('[data-category-icon]');
    if (iconEl && category.icon) {
      i18n.renderIcon(category.icon, iconEl, 'w-8 h-8');
    }
    
    // Renderizar items
    const itemsEl = cat2Container.querySelector('[data-category-items]');
    if (itemsEl) {
      i18n.renderSkillsList('category2', itemsEl);
    }
  }
}

/**
 * Renderiza información personal en contacto
 */
export function renderContactInfo() {
  // Email
  const emailLinks = document.querySelectorAll('[data-contact="email"]');
  const email = i18n.getConfig('config.personal.email');
  emailLinks.forEach(link => {
    link.href = `mailto:${email}`;
    if (!link.querySelector('svg')) {
      link.textContent = email;
    }
  });
  
  // GitHub
  const githubLinks = document.querySelectorAll('[data-contact="github"]');
  const githubUrl = i18n.getConfig('config.personal.github_url');
  const githubUser = i18n.getConfig('config.personal.github_user');
  githubLinks.forEach(link => {
    link.href = githubUrl;
    if (!link.querySelector('svg')) {
      link.textContent = githubUser;
    }
  });
  
  // LinkedIn
  const linkedinLinks = document.querySelectorAll('[data-contact="linkedin"]');
  const linkedinUrl = i18n.getConfig('config.personal.linkedin_url');
  const linkedinName = i18n.getConfig('config.personal.linkedin_name');
  linkedinLinks.forEach(link => {
    link.href = linkedinUrl;
    if (!link.querySelector('svg')) {
      link.textContent = linkedinName;
    }
  });
  
  // Location
  const locationEls = document.querySelectorAll('[data-contact="location"]');
  const location = i18n.getConfig('config.personal.location');
  locationEls.forEach(el => {
    el.textContent = location;
  });
}

/**
 * Inicializa todos los renderers en la página actual
 */
export function initRenderers() {
  renderProjectIcons();
  renderHomeSkillBars();
  renderAboutSkills();
  renderContactInfo();
}

// Auto-inicializar cuando cambia el idioma
if (typeof window !== 'undefined') {
  window.addEventListener('language:changed', () => {
    initRenderers();
  });
}

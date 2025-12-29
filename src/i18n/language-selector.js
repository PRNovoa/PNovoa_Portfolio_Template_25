import { i18n } from './index.js';

/**
 * Componente Selector de Idioma
 * Se inicializa automáticamente cuando se monta en el DOM
 */
export function initLanguageSelector() {
  const button = document.getElementById('lang-selector-button');
  const menu = document.getElementById('lang-selector-menu');
  const label = document.getElementById('lang-selector-label');
  const options = document.querySelectorAll('.lang-option');

  if (!button || !menu || !label) return;

  // Evitar duplicar listeners
  if (button.dataset.bound === 'true') return;
  button.dataset.bound = 'true';

  // Actualizar estado inicial
  updateSelector();

  // Toggle del menú
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !menu.classList.contains('hidden');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cambiar idioma
  options.forEach(option => {
    option.addEventListener('click', async (e) => {
      e.stopPropagation();
      const lang = option.dataset.lang;
      
      if (lang !== i18n.getLanguage()) {
        await i18n.setLanguage(lang);
        updateSelector();
        
        // Actualizar URL (mantener vista actual)
        const currentPath = window.location.hash.replace(/^#\/(es|en)\//, '');
        window.location.hash = `#/${lang}/${currentPath || ''}`;
      }
      
      closeMenu();
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', () => {
    closeMenu();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Actualizar cuando cambie el idioma
  window.addEventListener('language:changed', () => {
    updateSelector();
  });

  function openMenu() {
    menu.classList.remove('hidden');
    button.setAttribute('aria-expanded', 'true');
    // Focus en el primer elemento del menú
    const firstOption = menu.querySelector('.lang-option');
    if (firstOption) {
      firstOption.focus();
    }
  }

  function closeMenu() {
    menu.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
  }

  function updateSelector() {
    const currentLang = i18n.getLanguage();
    label.textContent = currentLang.toUpperCase();

    // Actualizar checks
    options.forEach(option => {
      const check = option.querySelector('.lang-check');
      if (option.dataset.lang === currentLang) {
        check.classList.remove('hidden');
      } else {
        check.classList.add('hidden');
      }
    });
  }
}

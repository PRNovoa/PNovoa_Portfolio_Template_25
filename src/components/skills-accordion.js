import { gsap } from 'gsap';

export function initSkillsAccordion() {
  const skillsSections = document.querySelectorAll('.skills-accordion-item');
  
  if (skillsSections.length === 0) return;

  skillsSections.forEach(section => {
    const header = section.querySelector('.accordion-header');
    const content = section.querySelector('.accordion-content');
    const icon = section.querySelector('.accordion-icon');
    
    if (!header || !content) return;

    // Set initial state - expanded on desktop, collapsed on mobile
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      gsap.set(content, { height: 'auto', opacity: 1 });
      header.setAttribute('aria-expanded', 'true');
      section.classList.add('accordion-open');
      if (icon) {
        gsap.set(icon, { rotation: 180 });
      }
    } else {
      gsap.set(content, { height: 0, opacity: 0 });
      header.setAttribute('aria-expanded', 'false');
      section.classList.remove('accordion-open');
      if (icon) {
        gsap.set(icon, { rotation: 0 });
      }
    }

    // Click handler
    header.addEventListener('click', () => {
      const isOpen = section.classList.contains('accordion-open');
      
      if (isOpen) {
        // Close
        gsap.to(content, { 
          height: 0, 
          opacity: 0, 
          duration: 0.3,
          ease: 'power2.inOut'
        });
        if (icon) {
          gsap.to(icon, { rotation: 0, duration: 0.3 });
        }
        header.setAttribute('aria-expanded', 'false');
        section.classList.remove('accordion-open');
      } else {
        // Open
        gsap.set(content, { height: 'auto' });
        const height = content.offsetHeight;
        gsap.from(content, { 
          height: 0, 
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(content, { opacity: 1, duration: 0.3 });
        
        if (icon) {
          gsap.to(icon, { rotation: 180, duration: 0.3 });
        }
        header.setAttribute('aria-expanded', 'true');
        section.classList.add('accordion-open');

        // Stagger animation for badges
        const badges = content.querySelectorAll('.tech-badge, .glass-button');
        gsap.fromTo(badges,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(2)',
            delay: 0.1
          }
        );
      }
    });

    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Add expand/collapse all functionality
  const expandAllBtn = document.querySelector('[data-action="expand-all-skills"]');
  const collapseAllBtn = document.querySelector('[data-action="collapse-all-skills"]');

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      skillsSections.forEach(section => {
        const header = section.querySelector('.accordion-header');
        if (!section.classList.contains('accordion-open')) {
          header.click();
        }
      });
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      skillsSections.forEach(section => {
        const header = section.querySelector('.accordion-header');
        if (section.classList.contains('accordion-open')) {
          header.click();
        }
      });
    });
  }
}

export function destroySkillsAccordion() {
  const skillsSections = document.querySelectorAll('.skills-accordion-item');
  skillsSections.forEach(section => {
    const header = section.querySelector('.accordion-header');
    if (header) {
      header.replaceWith(header.cloneNode(true));
    }
  });
}

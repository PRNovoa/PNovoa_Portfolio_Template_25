import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initExperienceAccordion() {
  const experienceItems = document.querySelectorAll('.experience-accordion-item');
  const timeline = document.querySelector('.experience-timeline-line');
  
  if (experienceItems.length === 0) return;

  // Animate timeline line on scroll
  if (timeline) {
    gsap.fromTo(timeline,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timeline.parentElement,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      }
    );
  }

  experienceItems.forEach((item, index) => {
    const header = item.querySelector('.experience-header');
    const content = item.querySelector('.experience-content');
    const icon = item.querySelector('.accordion-icon');
    const marker = item.querySelector('.experience-marker');
    
    if (!header || !content) return;

    // Set initial state - first item open, rest closed
    if (index === 0) {
      gsap.set(content, { height: 'auto', opacity: 1 });
      header.setAttribute('aria-expanded', 'true');
      item.classList.add('accordion-open');
      if (icon) {
        gsap.set(icon, { rotation: 180 });
      }
    } else {
      gsap.set(content, { height: 0, opacity: 0 });
      header.setAttribute('aria-expanded', 'false');
      item.classList.remove('accordion-open');
      if (icon) {
        gsap.set(icon, { rotation: 0 });
      }
    }

    // Animate marker on scroll
    if (marker) {
      gsap.fromTo(marker,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Pulse animation
      gsap.to(marker, {
        boxShadow: '0 0 20px rgba(255, 113, 206, 0.8), 0 0 40px rgba(1, 205, 254, 0.6)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Click handler - accordion mode (only one open at a time)
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('accordion-open');
      
      if (isOpen) {
        // Close this item
        closeItem(item, content, icon, header);
      } else {
        // Close all other items
        experienceItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
            const otherContent = otherItem.querySelector('.experience-content');
            const otherIcon = otherItem.querySelector('.accordion-icon');
            const otherHeader = otherItem.querySelector('.experience-header');
            closeItem(otherItem, otherContent, otherIcon, otherHeader);
          }
        });
        
        // Open this item
        openItem(item, content, icon, header);
      }
    });

    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });

    // Animate item entrance on scroll
    gsap.fromTo(item,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true
        },
        delay: index * 0.15
      }
    );
  });
}

function openItem(item, content, icon, header) {
  // Measure the natural height
  gsap.set(content, { height: 'auto' });
  const height = content.offsetHeight;
  gsap.set(content, { height: 0 });
  
  // Animate open
  const tl = gsap.timeline();
  
  tl.to(content, { 
    height: height, 
    duration: 0.4,
    ease: 'power2.out'
  })
  .to(content, {
    opacity: 1,
    duration: 0.3
  }, '-=0.2');
  
  if (icon) {
    tl.to(icon, { rotation: 180, duration: 0.3 }, 0);
  }
  
  // Stagger animation for content elements
  const company = content.querySelector('.experience-company');
  const description = content.querySelector('.experience-description');
  
  tl.fromTo([company, description],
    { opacity: 0, y: -10 },
    { 
      opacity: 1, 
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out'
    },
    '-=0.2'
  );
  
  header.setAttribute('aria-expanded', 'true');
  item.classList.add('accordion-open');
  
  // Enhanced glow for open item
  gsap.to(item, {
    boxShadow: '0 0 30px rgba(255, 113, 206, 0.5), 0 0 50px rgba(1, 205, 254, 0.3)',
    duration: 0.3
  });
}

function closeItem(item, content, icon, header) {
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
  item.classList.remove('accordion-open');
  
  // Reset glow
  gsap.to(item, {
    boxShadow: '',
    duration: 0.3
  });
}

export function destroyExperienceAccordion() {
  const experienceItems = document.querySelectorAll('.experience-accordion-item');
  experienceItems.forEach(item => {
    const header = item.querySelector('.experience-header');
    if (header) {
      header.replaceWith(header.cloneNode(true));
    }
  });
  
  // Kill ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && trigger.vars.trigger && 
        (trigger.vars.trigger.classList?.contains('experience-timeline-line') ||
         trigger.vars.trigger.classList?.contains('experience-accordion-item') ||
         trigger.vars.trigger.classList?.contains('experience-marker'))) {
      trigger.kill();
    }
  });
}

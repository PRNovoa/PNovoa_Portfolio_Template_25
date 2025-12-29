import { gsap } from 'gsap';

export class AboutCVModal {
  constructor(i18n) {
    this.i18n = i18n;
    this.modal = null;
    this.overlay = null;
    this.content = null;
    this.timeline = null;
    this.isOpen = false;
    
    // Bind methods
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  async init() {
    // Load template
    const response = await fetch(`${import.meta.env.BASE_URL}templates/about-cv-modal.html`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#about-cv-modal-template');
    
    if (!template) {
      console.error('About CV modal template not found');
      return;
    }

    // Clone and append to body
    this.modal = template.content.cloneNode(true).firstElementChild;
    document.body.appendChild(this.modal);

    // Get references
    this.overlay = this.modal;
    this.content = this.modal.querySelector('.modal-content');
    this.closeBtn = this.modal.querySelector('.modal-close');

    // Setup event listeners
    this.setupEventListeners();

    // Initially hide
    gsap.set(this.modal, { display: 'none' });
  }

  setupEventListeners() {
    // Close button
    this.closeBtn?.addEventListener('click', this.handleClose);
    
    // Click outside
    this.overlay?.addEventListener('click', this.handleOverlayClick);
    
    // Escape key
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleClose() {
    this.close();
  }

  handleOverlayClick(e) {
    if (e.target === this.overlay) {
      this.close();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;

    // Apply i18n translations
    this.i18n.applyTranslations();

    // Prevent body scroll using position fixed
    this.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add('modal-open');

    // Create animation timeline with vaporwave effects
    this.timeline = gsap.timeline();

    this.timeline
      .set(this.modal, { display: 'flex' })
      // Overlay fade with neon glow
      .fromTo(
        this.overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      // Content entrance with glitch effect
      .fromTo(
        this.content,
        { 
          scale: 0.7,
          opacity: 0,
          y: 100,
          rotationX: -15,
          filter: 'hue-rotate(180deg) blur(10px)'
        },
        { 
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'hue-rotate(0deg) blur(0px)',
          duration: 0.6,
          ease: 'back.out(2)'
        },
        '-=0.2'
      )
      // Glitch effect
      .to(this.content, {
        x: -5,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        ease: 'none'
      }, '-=0.1')
    // Animate sections with stagger (only if they exist)
    const modalSections = this.modal.querySelectorAll('.modal-section');
    if (modalSections.length > 0) {
      this.timeline.fromTo(
        modalSections,
        {
          opacity: 0,
          x: -30,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.3'
      );
    }

    // Animate timeline items
    const timelineItems = this.modal.querySelectorAll('.cv-timeline-item');
    if (timelineItems.length > 0) {
      gsap.fromTo(
        timelineItems,
        {
          opacity: 0,
          x: -20
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.5
        }
      );

      // Animate timeline markers
      const timelineMarkers = this.modal.querySelectorAll('.cv-timeline-marker');
      if (timelineMarkers.length > 0) {
        gsap.fromTo(
          timelineMarkers,
          {
            scale: 0
          },
          {
            scale: 1,
            duration: 0.3,
            stagger: 0.15,
            ease: 'back.out(3)',
            delay: 0.6
          }
        );
      }
    }

    // Animate certification items (only if they exist)
    const certItems = this.modal.querySelectorAll('.cv-cert-item');
    if (certItems.length > 0) {
      gsap.fromTo(
        certItems,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(3)',
          delay: 0.7
        }
      );
    }

    // Pulsing photo effect (only if photo container exists)
    const photoContainer = this.modal.querySelector('.cv-photo-container');
    if (photoContainer) {
      gsap.to(photoContainer, {
        boxShadow: '0 0 30px rgba(255, 113, 206, 0.8), 0 0 60px rgba(1, 205, 254, 0.6)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Focus management
    this.content.focus();
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Restore body scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('modal-open');
    window.scrollTo(0, this.scrollY);

    // Reverse animation with glitch out effect
    const closeTimeline = gsap.timeline({
      onComplete: () => {
        gsap.set(this.modal, { display: 'none' });
      }
    });

    closeTimeline
      // Glitch effect
      .to(this.content, {
        x: 5,
        duration: 0.05,
        repeat: 2,
        yoyo: true,
        ease: 'none'
      })
      // Fade out with distortion
      .to(this.content, {
        scale: 0.8,
        opacity: 0,
        y: -50,
        rotationX: 15,
        filter: 'hue-rotate(180deg) blur(10px)',
        duration: 0.4,
        ease: 'power2.in'
      }, '-=0.05')
      .to(this.overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2');
  }

  destroy() {
    // Remove event listeners
    this.closeBtn?.removeEventListener('click', this.handleClose);
    this.overlay?.removeEventListener('click', this.handleOverlayClick);
    document.removeEventListener('keydown', this.handleKeyDown);

    // Kill timeline
    if (this.timeline) {
      this.timeline.kill();
    }

    // Remove modal from DOM
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }

    // Restore body scroll
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('modal-open');
    if (this.scrollY !== undefined) {
      window.scrollTo(0, this.scrollY);
    }
  }
}

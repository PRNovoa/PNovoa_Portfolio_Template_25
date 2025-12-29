import { gsap } from 'gsap';

export class ProjectModal {
  constructor(i18n) {
    this.i18n = i18n;
    this.modal = null;
    this.overlay = null;
    this.content = null;
    this.timeline = null;
    this.currentProjectId = null;
    this.isOpen = false;
    
    // Bind methods
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  async init() {
    // Load template
    const response = await fetch(`${import.meta.env.BASE_URL}templates/project-modal.html`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const template = doc.querySelector('#project-modal-template');
    
    if (!template) {
      console.error('Project modal template not found');
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
    
    // Setup project cards click listeners
    this.setupProjectCards();

    // Initially hide
    gsap.set(this.modal, { display: 'none' });
  }

  setupEventListeners() {
    // Close button
    this.closeBtn?.addEventListener('click', this.handleClose);

    // Overlay click
    this.overlay?.addEventListener('click', this.handleOverlayClick);

    // Escape key
    document.addEventListener('keydown', this.handleKeyDown);
  }
  
  setupProjectCards() {
    // Use event delegation on the projects container
    const projectsContainer = document.querySelector('.grid');
    
    if (projectsContainer) {
      projectsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('[data-project-id]');
        if (card) {
          e.preventDefault();
          const projectId = card.dataset.projectId;
          if (import.meta.env.DEV) console.log('📦 Opening project modal:', projectId);
          this.open(projectId);
        }
      });
      
      if (import.meta.env.DEV) console.log('✅ Project cards listeners attached');
    } else {
      if (import.meta.env.DEV) console.warn('⚠️ Projects container not found');
    }
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

  handleClose(e) {
    e?.preventDefault();
    this.close();
  }

  async open(projectId) {
    if (this.isOpen) return;

    this.currentProjectId = projectId;
    this.isOpen = true;

    // Load project data
    this.loadProjectData(projectId);

    // Prevent body scroll using position fixed
    this.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add('modal-open');

    // Create animation timeline with vaporwave effects
    this.timeline = gsap.timeline();

    // Add scanline effect
    this.content.classList.add('modal-scanlines');

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
      // Neon border glow animation
      .to(this.content, {
        boxShadow: '0 0 20px rgba(255, 113, 206, 0.8), 0 0 40px rgba(1, 205, 254, 0.6), 0 0 60px rgba(185, 103, 255, 0.4)',
        duration: 0.3,
        ease: 'power2.inOut'
      }, '-=0.2')
      // Animate sections with stagger
      .fromTo(
        this.modal.querySelectorAll('.modal-section'),
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

    // Animate tech badges
    gsap.fromTo(
      this.modal.querySelectorAll('.modal-tech-badge'),
      {
        scale: 0,
        opacity: 0,
        rotation: -180
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(3)',
        delay: 0.6
      }
    );

    // Pulsing neon effect on title
    gsap.to(this.modal.querySelector('.modal-title'), {
      textShadow: '0 0 10px rgba(255, 113, 206, 0.8), 0 0 20px rgba(1, 205, 254, 0.6), 0 0 30px rgba(185, 103, 255, 0.4)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

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

    // Remove scanline effect
    this.content.classList.remove('modal-scanlines');

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

  loadProjectData(projectId) {
    const projectData = this.i18n.t(`projects.detailed.${projectId}`);
    
    if (!projectData) {
      console.error(`Project data not found for: ${projectId}`);
      return;
    }

    // Set title
    const titleEl = this.modal.querySelector('.modal-title');
    titleEl.textContent = this.i18n.t(`projects.${projectId}.title`);
    titleEl.setAttribute('data-i18n', `projects.${projectId}.title`);

    // Set image with descriptive alt text for accessibility
    const imgEl = this.modal.querySelector('.modal-image');
    const projectTitle = this.i18n.t(`projects.${projectId}.title`);
    imgEl.src = projectData.image;
    imgEl.alt = `${this.i18n.t('projects.modal.image_alt_prefix') || 'Captura de pantalla del proyecto'}: ${projectTitle}`;

    // Set full description
    const descEl = this.modal.querySelector('.modal-description');
    descEl.textContent = projectData.fullDescription;
    descEl.setAttribute('data-i18n', `projects.detailed.${projectId}.fullDescription`);

    // Set challenge
    const challengeEl = this.modal.querySelectorAll('.modal-text')[0];
    challengeEl.textContent = projectData.challenge;
    challengeEl.setAttribute('data-i18n', `projects.detailed.${projectId}.challenge`);

    // Set solution
    const solutionEl = this.modal.querySelectorAll('.modal-text')[1];
    solutionEl.textContent = projectData.solution;
    solutionEl.setAttribute('data-i18n', `projects.detailed.${projectId}.solution`);

    // Set results
    const resultsEl = this.modal.querySelectorAll('.modal-text')[2];
    resultsEl.textContent = projectData.results;
    resultsEl.setAttribute('data-i18n', `projects.detailed.${projectId}.results`);

    // Render technologies
    this.renderTechnologies(projectData.technologies);

    // Render features
    this.renderFeatures(projectData.features);

    // Update action buttons
    this.updateActionButtons(projectId);

    // Re-translate modal content only
    this.translateModalContent();
  }

  translateModalContent() {
    // Translate elements with data-i18n inside modal only
    this.modal.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.i18n.t(key);
      
      if (typeof translation === 'string') {
        element.textContent = translation;
      }
    });
  }

  renderTechnologies(technologies) {
    const container = this.modal.querySelector('#modal-technologies');
    container.innerHTML = '';

    technologies.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'modal-tech-badge';
      badge.textContent = tech;
      container.appendChild(badge);
    });
  }

  renderFeatures(features) {
    const container = this.modal.querySelector('#modal-features');
    container.innerHTML = '';

    features.forEach(feature => {
      const li = document.createElement('li');
      li.className = 'modal-feature-item';
      li.textContent = feature;
      container.appendChild(li);
    });
  }

  updateActionButtons(projectId) {
    const githubBtn = this.modal.querySelector('.modal-btn-secondary');
    const demoBtn = this.modal.querySelector('.modal-btn-primary');

    // These URLs should be customized per project
    // For now, using placeholder URLs from the original cards
    githubBtn.href = `https://github.com/tu-usuario/${projectId}`;
    demoBtn.href = `https://${projectId}.demo`;
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

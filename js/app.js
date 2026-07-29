/**
 * Light Theme Case Study Drawer & Logic (No Yellow)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderWorks('all');
  renderCommissions();
  renderServices();
  renderProcess();
  setupFilterTabs();
  setupModal();
  setupForm();
  setupHamburger();
  setupScrollReveal();
});

function renderWorks(category = 'all') {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  const filtered = category === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === category);

  container.innerHTML = filtered.map(project => `
    <article class="agency-card" data-category="${project.category}">
      <div class="card-media-wrap">
        <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" />
        <span class="card-cat-badge">${project.categoryLabel}</span>
      </div>
      <div class="card-info">
        <h3>${project.title}</h3>
        <p>${project.shortDesc || project.description}</p>
        <div class="card-meta-tags">
          ${project.tags ? project.tags.map(t => `<span class="meta-chip">${t}</span>`).join('') : ''}
        </div>
        <div class="card-action-bar">
          <button class="case-btn" onclick="openCaseStudy('${project.id}')">
            View Case Study →
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCommissions() {
  const container = document.getElementById('commissions-grid');
  if (!container || typeof commissionWorks === 'undefined') return;

  container.innerHTML = commissionWorks.map(item => `
    <div class="commission-item" onclick="openCommissionLightbox('${item.image}', '${item.title.replace(/'/g, "\\'")}')">
      <div class="commission-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div class="commission-info">
        <span class="commission-type ${item.type.toLowerCase()}">${item.type}</span>
        <h4>${item.title}</h4>
      </div>
    </div>
  `).join('');
}

function openCommissionLightbox(image, title) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center;">
      <h3 style="font-family: var(--font-display); margin-bottom: 1.5rem; color: var(--text-dark);">${title}</h3>
      <img src="${image}" alt="${title}" style="width: 100%; border-radius: 12px; object-fit: contain; max-height: 70vh;" />
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function setupFilterTabs() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      renderWorks(cat);
    });
  });
}

function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || typeof servicePackages === 'undefined') return;

  container.innerHTML = servicePackages.map(s => `
    <div class="service-card">
      <div class="icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <ul class="service-list">
        ${s.deliverables.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderProcess() {
  const container = document.getElementById('process-grid');
  if (!container || typeof workflowSteps === 'undefined') return;

  container.innerHTML = workflowSteps.map(step => `
    <div class="process-step">
      <span class="process-num">${step.number}</span>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    </div>
  `).join('');
}

function setupModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

function openCaseStudy(id) {
  const project = portfolioProjects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  const imagesHtml = (project.images && project.images.length > 0) 
    ? project.images.map(img => `
        <div class="gallery-item">
          <img src="${img}" alt="${project.title}" loading="lazy" />
        </div>
      `).join('')
    : `
        <div class="gallery-item" style="grid-column: 1 / -1;">
          <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" />
        </div>
      `;

  modalBody.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <span class="uppercase-track">${project.categoryLabel} • ${project.year || '2025 - 2026'}</span>
      <h2 style="font-size: 2.2rem; margin: 0.4rem 0; font-family: var(--font-display); color: var(--text-dark);">${project.title}</h2>
      <p style="color: var(--text-body); font-size: 1.05rem;">${project.subtitle || project.shortDesc}</p>
    </div>

    <!-- Image Gallery -->
    <div class="gallery-grid">
      ${imagesHtml}
    </div>

    <!-- Light Case Metadata Bar -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; margin-bottom: 2rem;">
      <div style="background: #F8FAFC; padding: 1.2rem; border-radius: 8px; border: 1px solid var(--border-line);">
        <span style="font-size: 0.72rem; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; display: block; margin-bottom: 4px;">CLIENT / ORGANIZATION</span>
        <strong style="color: var(--text-dark); font-size: 0.95rem;">${project.clientName || 'Private Client'}</strong>
      </div>
      <div style="background: #F8FAFC; padding: 1.2rem; border-radius: 8px; border: 1px solid var(--border-line);">
        <span style="font-size: 0.72rem; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; display: block; margin-bottom: 4px;">PROJECT ROLE</span>
        <strong style="color: var(--text-dark); font-size: 0.95rem;">${project.role || 'Lead Graphic Designer & Video Editor'}</strong>
      </div>
      <div style="background: #F8FAFC; padding: 1.2rem; border-radius: 8px; border: 1px solid var(--border-line);">
        <span style="font-size: 0.72rem; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; display: block; margin-bottom: 4px;">TOOLS & SOFTWARE</span>
        <strong style="color: var(--text-dark); font-size: 0.95rem;">${(project.details?.tools || project.details?.software || ['Photoshop']).join(', ')}</strong>
      </div>
    </div>

    <!-- Strategy -->
    ${project.details?.challenge ? `
      <div style="margin-bottom: 2rem; background: #F1F5F9; padding: 1.5rem; border-radius: 10px; border-left: 4px solid var(--accent-blue);">
        <h4 style="font-size: 1rem; color: var(--accent-blue); margin-bottom: 0.5rem; font-family: var(--font-display); font-weight: 700;">Objective & Execution Strategy</h4>
        <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 1rem; line-height: 1.6;">${project.details.challenge}</p>
        <p style="font-size: 0.92rem; color: var(--text-dark); line-height: 1.6; font-weight: 500;">${project.details.solution}</p>
      </div>
    ` : ''}

    <div style="display: flex; justify-content: flex-end; border-top: 1px solid var(--border-line); padding-top: 1.5rem;">
      <a href="#contact" onclick="closeModal()" class="btn-pill" style="background: var(--accent-primary); color: #FFFFFF;">Commission Similar Project →</a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function setupForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Form handled by formsubmit.co directly in HTML
  // No JS intercept needed
}

function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }
}

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.agency-card, .service-card, .process-step, .commission-item, .section-head, .hero-stats-bar, .contact-grid').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

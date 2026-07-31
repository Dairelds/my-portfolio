/**
 * Hallmark JS Logic (Specimen / Editorial)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderWorks('all');
  renderServices();
  renderCommissions();
  setupFilterTabs();
  setupModal();
});

function renderWorks(category = 'all') {
  const container = document.getElementById('project-list');
  if (!container || typeof portfolioProjects === 'undefined') return;

  const filtered = category === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === category);

  container.innerHTML = filtered.map(project => {
    // Generate up to 3 preview images
    const previewImgs = project.images ? project.images.slice(0, 3) : [project.thumbnail];
    const previewHtml = previewImgs.map(img => `<img src="${img}" loading="lazy" onerror="this.style.display='none'" />`).join('');

    return `
      <article class="project-item" data-category="${project.category}" onclick="openCaseStudy('${project.id}')">
        <h3 class="project-title">${project.title}</h3>
        <div class="project-meta">${project.categoryLabel} &mdash; ${project.year || '2026'}</div>
        <div class="project-grid-preview">
          ${previewHtml}
        </div>
      </article>
    `;
  }).join('');
}

function setupFilterTabs() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      
      const container = document.getElementById('project-list');
      container.style.opacity = '0';
      
      setTimeout(() => {
        renderWorks(cat);
        container.style.opacity = '1';
      }, 150);
    });
  });
}

function setupModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    
    // Esc key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

function openCaseStudy(id) {
  const project = portfolioProjects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  
  // Populate text
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-desc').textContent = project.details?.challenge || project.shortDesc || project.description;
  document.getElementById('modal-client').textContent = project.clientName || 'Private Client';
  document.getElementById('modal-role').textContent = project.role || 'Visual Designer';
  document.getElementById('modal-year').textContent = project.year || '2026';
  
  const tools = project.details?.tools || project.details?.software || ['Design tools'];
  document.getElementById('modal-tools').textContent = tools.join(', ');

  // Populate gallery
  const gallery = document.getElementById('modal-gallery');
  const images = (project.images && project.images.length > 0) ? project.images : [project.thumbnail];
  
  gallery.innerHTML = images.map(img => `
    <img src="${img}" alt="${project.title} detail" loading="lazy" onerror="this.style.display='none'" />
  `).join('');

  // Show
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

function renderServices() {
  const container = document.getElementById('services-list');
  if (!container || typeof servicePackages === 'undefined') return;

  container.innerHTML = servicePackages.map(s => `
    <div style="border-top: 1px solid var(--color-rule); padding-top: var(--space-md);">
      <h3 style="font-family: var(--font-display); font-size: var(--text-lg); margin-bottom: var(--space-xs);">${s.icon} ${s.title}</h3>
      <p style="font-size: var(--text-sm); margin-bottom: var(--space-sm); color: var(--color-ink);">${s.description}</p>
      <ul style="list-style: none; padding: 0;">
        ${s.deliverables.map(d => `<li style="font-family: var(--font-outlier); font-size: var(--text-xs); text-transform: uppercase; margin-bottom: 4px; color: var(--color-neutral);">&mdash; ${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderCommissions() {
  const container = document.getElementById('commissions-list');
  if (!container || typeof commissionWorks === 'undefined') return;

  container.innerHTML = commissionWorks.map(item => `
    <div style="cursor: pointer; transition: opacity var(--dur-short); border: 1px solid var(--color-rule);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1" onclick="openCommissionLightbox('${item.image}', '${item.title.replace(/'/g, "\\'")}')">
      <img src="${item.image}" alt="${item.title}" loading="lazy" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.style.display='none'" />
      <div style="padding: var(--space-xs); font-family: var(--font-outlier); font-size: var(--text-xs); text-transform: uppercase; display: flex; justify-content: space-between;">
        <span style="color: var(--color-ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: var(--space-xs);">${item.title}</span>
        <span style="color: var(--color-neutral);">${item.type}</span>
      </div>
    </div>
  `).join('');
}

function openCommissionLightbox(image, title) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = 'Commission / Freebie Design';
  document.getElementById('modal-client').textContent = 'Various Clients';
  document.getElementById('modal-role').textContent = 'Designer';
  document.getElementById('modal-year').textContent = '2024–2026';
  document.getElementById('modal-tools').textContent = 'Various';

  const gallery = document.getElementById('modal-gallery');
  gallery.innerHTML = `<img src="${image}" alt="${title}" style="grid-column: 1 / -1; width: 100%; border: 1px solid var(--color-rule);" />`;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}


const data = getSiteData();
data.partnerships = data.partnerships || structuredClone(defaultSiteData.partnerships);
const message = document.querySelector('#admin-message');
const companyForm = document.querySelector('#company-form');
const conferenceForm = document.querySelector('#conference-form');
const eventsList = document.querySelector('#admin-events');
const galleryEvent = document.querySelector('#gallery-event');
const galleryUpload = document.querySelector('#gallery-upload');
const galleryPreview = document.querySelector('#gallery-preview');
const pageContentForm = document.querySelector('#page-content-form');
const contentPage = document.querySelector('#content-page');
const partnershipForm = document.querySelector('#partnership-form');
const partnershipList = document.querySelector('#partnership-list');
const pageSectionsBody = document.querySelector('#page-sections-body');

const pageEditorKinds = { about: 'blocks', sponsors: 'blocks', general: 'accordion', home: 'home' };

function makeSectionId() {
  return `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function ensurePageData(pageKey) {
  data.pages = data.pages || {};
  if (!data.pages[pageKey]) {
    data.pages[pageKey] = structuredClone(defaultSiteData.pages?.[pageKey]) || { kind: pageEditorKinds[pageKey], sections: [] };
  }
  return data.pages[pageKey];
}

function blockCardSkeleton(index, total) {
  return `<article class="page-section-item" data-index="${index}">
    <div class="page-section-head"><strong>Section ${index + 1}</strong><div class="event-actions"><button type="button" data-move-up ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-move-down ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-remove>Delete</button></div></div>
    <div class="field"><label>Style</label><select data-field="variant"><option value="">Standard</option><option value="opening">Opening</option><option value="vision">Highlight</option><option value="closing">Closing</option></select></div>
    <div class="field"><label>Kicker / label</label><input data-field="kicker"></div>
    <div class="field"><label>Heading</label><input data-field="heading"></div>
    <div class="field"><label>Body (leave a blank line between paragraphs, wrap **text** for bold)</label><textarea data-field="body" rows="4"></textarea></div>
    <div class="field"><label>List style</label><select data-field="listStyle"><option value="none">No list</option><option value="topic">Bullet list</option><option value="definition">Term + description</option></select></div>
    <div class="field"><label>List items (one per line; for Term + description use "Term :: description")</label><textarea data-field="listItems" rows="4"></textarea></div>
    <div class="field"><label>Extra text after the list (optional)</label><textarea data-field="bodyAfter" rows="2"></textarea></div>
  </article>`;
}

function accordionCardSkeleton(index, total) {
  return `<article class="page-section-item" data-index="${index}">
    <div class="page-section-head"><strong>Item ${index + 1}</strong><div class="event-actions"><button type="button" data-move-up ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-move-down ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-remove>Delete</button></div></div>
    <div class="field"><label>Title</label><input data-field="heading"></div>
    <div class="field"><label>Content — start a line with # for a sub-heading, - for a bullet point, leave a blank line between paragraphs, and wrap **text** for bold</label><textarea data-field="body" rows="10"></textarea></div>
  </article>`;
}

function homeCardSkeleton(index, total) {
  return `<article class="page-section-item" data-index="${index}">
    <div class="page-section-head"><strong>Card ${index + 1}</strong><div class="event-actions"><button type="button" data-move-up ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-move-down ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-remove>Delete</button></div></div>
    <div class="field"><label>Number</label><input data-field="number"></div>
    <div class="field"><label>Title</label><input data-field="title"></div>
    <div class="field"><label>Description</label><input data-field="text"></div>
    <div class="field"><label>Link (page file)</label><input data-field="href"></div>
  </article>`;
}

function fillSectionCard(card, kind, item) {
  card.dataset.id = item.id || '';
  const set = (field, value) => { const el = card.querySelector(`[data-field="${field}"]`); if (el) el.value = value == null ? '' : value; };
  if (kind === 'accordion') {
    set('heading', item.heading);
    set('body', item.body);
    return;
  }
  if (kind === 'home') {
    set('number', item.number);
    set('title', item.title);
    set('text', item.text);
    set('href', item.href);
    return;
  }
  set('variant', item.variant || '');
  set('kicker', item.kicker);
  set('heading', item.heading);
  set('body', item.body);
  set('listStyle', item.listStyle || 'none');
  set('listItems', Array.isArray(item.listItems) ? item.listItems.join('\n') : (item.listItems || ''));
  set('bodyAfter', item.bodyAfter);
  if (item.signoff || item.button) {
    const extra = document.createElement('div');
    extra.className = 'page-section-extra';
    let html = '';
    if (item.signoff) html += `<div class="field"><label>Sign-off — bold line</label><input data-field="signoff-strong"></div><div class="field"><label>Sign-off — middle line</label><input data-field="signoff-span"></div><div class="field"><label>Sign-off — closing line</label><input data-field="signoff-b"></div>`;
    if (item.button) html += `<div class="field"><label>Button label</label><input data-field="button-label"></div><div class="field"><label>Button link</label><input data-field="button-href"></div>`;
    extra.innerHTML = html;
    card.append(extra);
    if (item.signoff) {
      card.querySelector('[data-field="signoff-strong"]').value = item.signoff.strong || '';
      card.querySelector('[data-field="signoff-span"]').value = item.signoff.span || '';
      card.querySelector('[data-field="signoff-b"]').value = item.signoff.b || '';
    }
    if (item.button) {
      card.querySelector('[data-field="button-label"]').value = item.button.label || '';
      card.querySelector('[data-field="button-href"]').value = item.button.href || '';
    }
  }
}

function collectPageItems(kind) {
  return [...pageSectionsBody.querySelectorAll('.page-section-item')].map((card) => {
    const get = (field) => card.querySelector(`[data-field="${field}"]`);
    const value = (field) => (get(field) ? get(field).value : '');
    if (kind === 'accordion') return { id: card.dataset.id || makeSectionId(), heading: value('heading'), body: value('body') };
    if (kind === 'home') return { id: card.dataset.id || makeSectionId(), number: value('number'), title: value('title'), text: value('text'), href: value('href') };
    const block = { id: card.dataset.id || makeSectionId(), variant: value('variant'), kicker: value('kicker'), heading: value('heading'), body: value('body'), listStyle: value('listStyle'), listItems: value('listItems').split('\n').map((line) => line.trim()).filter(Boolean), bodyAfter: value('bodyAfter') };
    if (get('signoff-strong')) block.signoff = { strong: value('signoff-strong'), span: value('signoff-span'), b: value('signoff-b') };
    if (get('button-label')) block.button = { label: value('button-label'), href: value('button-href') };
    return block;
  });
}

function getPageItemsRef(page, kind) {
  if (kind === 'home') { page.directory = page.directory || []; return page.directory; }
  page.sections = page.sections || [];
  return page.sections;
}

function newPageItem(kind) {
  if (kind === 'accordion') return { id: makeSectionId(), heading: '', body: '' };
  if (kind === 'home') return { id: makeSectionId(), number: '', title: '', text: '', href: '' };
  return { id: makeSectionId(), variant: '', kicker: '', heading: '', body: '', listStyle: 'none', listItems: [], bodyAfter: '' };
}

function persistPageItems(pageKey, kind, items) {
  const page = ensurePageData(pageKey);
  if (kind === 'home') page.directory = items;
  else page.sections = items;
  saveSiteData(data);
}

function renderPageSections() {
  const pageKey = contentPage.value;
  const kind = pageEditorKinds[pageKey];
  const notes = {
    conferences: 'The conference cards on this page are managed in the Conferences tab.',
    gallery: 'Gallery images are managed in the Media / Gallery tab.',
    contact: 'The contact form and details are managed in the Website Information tab.'
  };
  if (!kind) {
    pageSectionsBody.innerHTML = `<p class="muted">${escapeHtml(notes[pageKey] || 'This page only has the label, heading and introduction above.')}</p>`;
    return;
  }
  const page = ensurePageData(pageKey);
  const items = getPageItemsRef(page, kind);
  const labels = { blocks: 'content section', accordion: 'item', home: 'card' };
  const skeletonFor = { blocks: blockCardSkeleton, accordion: accordionCardSkeleton, home: homeCardSkeleton }[kind];
  pageSectionsBody.innerHTML = `<div class="page-sections-head"><h2>Page sections</h2><button class="button button-ghost" type="button" id="add-page-section">Add ${labels[kind]}</button></div><div id="page-sections-list">${items.map((item, index) => skeletonFor(index, items.length)).join('') || `<p class="muted">No ${labels[kind]}s yet. Use "Add ${labels[kind]}".</p>`}</div><button class="button button-lime" type="button" id="save-page-sections">Save page sections <span>↗</span></button>`;
  const cards = [...pageSectionsBody.querySelectorAll('.page-section-item')];
  cards.forEach((card, index) => fillSectionCard(card, kind, items[index]));

  cards.forEach((card, index) => {
    card.querySelector('[data-move-up]')?.addEventListener('click', () => {
      const current = collectPageItems(kind);
      [current[index - 1], current[index]] = [current[index], current[index - 1]];
      persistPageItems(pageKey, kind, current);
      renderPageSections();
    });
    card.querySelector('[data-move-down]')?.addEventListener('click', () => {
      const current = collectPageItems(kind);
      [current[index + 1], current[index]] = [current[index], current[index + 1]];
      persistPageItems(pageKey, kind, current);
      renderPageSections();
    });
    card.querySelector('[data-remove]')?.addEventListener('click', () => {
      const current = collectPageItems(kind);
      current.splice(index, 1);
      persistPageItems(pageKey, kind, current);
      renderPageSections();
      showMessage('Section removed.');
    });
  });

  pageSectionsBody.querySelector('#add-page-section')?.addEventListener('click', () => {
    const current = collectPageItems(kind);
    current.push(newPageItem(kind));
    persistPageItems(pageKey, kind, current);
    renderPageSections();
  });
  pageSectionsBody.querySelector('#save-page-sections')?.addEventListener('click', () => {
    persistPageItems(pageKey, kind, collectPageItems(kind));
    showMessage('Page sections saved.');
  });
}

function bindAdminViews() {
  const tabs = document.querySelectorAll('[data-admin-view]');
  const views = document.querySelectorAll('.admin-view');
  const showView = (viewId) => {
    views.forEach((view) => view.classList.toggle('is-active', view.id === viewId));
    tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.adminView === viewId));
  };
  tabs.forEach((tab) => tab.addEventListener('click', (event) => {
    event.preventDefault();
    showView(tab.dataset.adminView);
    window.history.replaceState(null, '', `#${tab.dataset.adminView}`);
  }));
  showView(window.location.hash.slice(1) || 'content-view');
}

function resetPartnershipForm() {
  partnershipForm.reset();
  document.querySelector('#partnership-id').value = '';
  document.querySelector('#partnership-submit-label').textContent = 'Add Package';
}

function renderPartnerships() {
  const partnerships = data.partnerships || [];
  partnershipList.innerHTML = partnerships.length ? partnerships.map((partner) => `<article class="admin-event"><div><strong>${escapeHtml(partner.name)}</strong><small>${escapeHtml(partner.type)} · ${escapeHtml(partner.price)} · ${escapeHtml(partner.title)}</small></div><div class="event-actions"><button type="button" data-partner-edit="${escapeHtml(partner.id)}">Edit</button><button class="delete" type="button" data-partner-delete="${escapeHtml(partner.id)}">Delete</button></div></article>`).join('') : '<p class="muted">No sponsors or exhibitors added yet.</p>';
  partnershipList.querySelectorAll('[data-partner-edit]').forEach((button) => button.addEventListener('click', () => {
    const partner = partnerships.find((item) => item.id === button.dataset.partnerEdit);
    if (!partner) return;
    document.querySelector('#partnership-id').value = partner.id;
    document.querySelector('#partnership-type').value = partner.type;
    document.querySelector('#partnership-name').value = partner.name;
    document.querySelector('#partnership-price').value = partner.price;
    document.querySelector('#partnership-title').value = partner.title;
    document.querySelector('#partnership-description').value = partner.description;
    document.querySelector('#partnership-benefits').value = partner.benefits;
    document.querySelector('#partnership-submit-label').textContent = 'Update Package';
    partnershipForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  partnershipList.querySelectorAll('[data-partner-delete]').forEach((button) => button.addEventListener('click', () => {
    data.partnerships = data.partnerships.filter((item) => item.id !== button.dataset.partnerDelete);
    saveSiteData(data);
    renderPartnerships();
    showMessage('Sponsor or exhibitor removed.');
  }));
}

function fillPageContentForm() {
  const content = getPageContent(contentPage.value);
  document.querySelector('#content-eyebrow').value = content.eyebrow || '';
  document.querySelector('#content-title').value = content.title || '';
  document.querySelector('#content-text').value = content.text || '';
}

function renderInquiries() {
  const inquiries = data.inquiries || [];
  const card = document.querySelector('#inquiry-manager') || document.createElement('section');
  card.id = 'inquiry-manager';
  card.className = 'admin-card inquiry-manager';
  card.innerHTML = `<h2>Contact Enquiries</h2>${inquiries.length ? `<div class="inquiry-list">${inquiries.map((inquiry) => `<article class="inquiry"><div><strong>${escapeHtml(inquiry.subject)}</strong><small>${escapeHtml(inquiry.name)} · ${escapeHtml(inquiry.email)} · ${escapeHtml(inquiry.phone || 'No phone provided')} · ${escapeHtml(inquiry.date)}</small></div><p>${escapeHtml(inquiry.message)}</p><button type="button" data-inquiry-delete="${inquiry.id}">Delete</button></article>`).join('')}</div>` : '<p class="muted">No contact enquiries yet.</p>'}`;
  if (!card.parentElement) document.querySelector('.admin-page').append(card);
  card.querySelectorAll('[data-inquiry-delete]').forEach((button) => button.addEventListener('click', () => {
    data.inquiries = data.inquiries.filter((inquiry) => String(inquiry.id) !== button.dataset.inquiryDelete);
    saveSiteData(data);
    renderInquiries();
    showMessage('Enquiry deleted.');
  }));
}

function showMessage(text) {
  message.textContent = text;
  message.classList.add('show');
  window.setTimeout(() => message.classList.remove('show'), 2600);
}

function fillCompanyForm() {
  document.querySelector('#about-title').value = data.about.title;
  document.querySelector('#about-text').value = data.about.text;
  document.querySelector('#email').value = data.contact.email;
  document.querySelector('#phone').value = data.contact.phone;
  document.querySelector('#location').value = data.contact.location;
}

function resetConferenceForm() {
  conferenceForm.reset();
  document.querySelector('#conference-id').value = '';
  document.querySelector('#conference-submit-label').textContent = 'Add Conference';
}

function renderEvents() {
  const sections = [
    { status: 'upcoming', label: 'Upcoming Conferences' },
    { status: 'previous', label: 'Previous Held Conferences' }
  ];

  eventsList.innerHTML = sections.map(({ status, label }) => {
    const conferenceItems = data.conferences.filter((event) => event.status === status);
    return `<div class="admin-event-group"><h3>${label}</h3>${conferenceItems.length ? conferenceItems.map((event) => `<div class="admin-event"><div><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.date)} · ${escapeHtml(event.status)} · ${event.images.length} gallery image(s)</small></div><div class="event-actions"><button data-edit="${event.id}" type="button">Edit</button><button data-gallery="${event.id}" type="button">Manage Gallery</button><button class="delete" data-delete="${event.id}" type="button">Delete</button></div></div>`).join('') : '<p class="muted">No conferences in this section yet.</p>'}</div>`;
  }).join('');

  const upcomingCount = data.conferences.filter((event) => event.status === 'upcoming').length;
  const previousCount = data.conferences.filter((event) => event.status === 'previous').length;
  const totalCount = data.conferences.length;

  const totalEl = document.querySelector('#admin-total-conferences');
  const upcomingEl = document.querySelector('#admin-upcoming-count');
  const previousEl = document.querySelector('#admin-previous-count');
  const upcomingLabel = document.querySelector('#admin-upcoming-label');
  const previousLabel = document.querySelector('#admin-previous-label');

  if (totalEl) totalEl.textContent = String(totalCount);
  if (upcomingEl) upcomingEl.textContent = String(upcomingCount);
  if (previousEl) previousEl.textContent = String(previousCount);
  if (upcomingLabel) upcomingLabel.textContent = `${upcomingCount} active`;
  if (previousLabel) previousLabel.textContent = `${previousCount} archived`;

  eventsList.querySelectorAll('[data-edit]').forEach((button) => button.addEventListener('click', () => editConference(button.dataset.edit)));
  eventsList.querySelectorAll('[data-gallery]').forEach((button) => button.addEventListener('click', () => { galleryEvent.value = button.dataset.gallery; renderGalleryPreview(); galleryUpload.focus(); }));
  eventsList.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', () => deleteConference(button.dataset.delete)));
  galleryEvent.innerHTML = data.conferences.map((event) => `<option value="${event.id}">${escapeHtml(event.title)}</option>`).join('');
  renderGalleryPreview();
}

function editConference(id) {
  const event = data.conferences.find((item) => item.id === id);
  if (!event) return;
  document.querySelector('#conference-id').value = event.id;
  document.querySelector('#conference-title').value = event.title;
  document.querySelector('#conference-date').value = event.date;
  document.querySelector('#conference-status').value = event.status;
  document.querySelector('#conference-description').value = event.description;
  document.querySelector('#conference-location').value = event.location;
  document.querySelector('#conference-theme').value = event.theme;
  document.querySelector('#conference-submit-label').textContent = 'Update Conference';
  conferenceForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteConference(id) {
  const index = data.conferences.findIndex((item) => item.id === id);
  if (index < 0) return;
  data.conferences.splice(index, 1);
  saveSiteData(data);
  renderEvents();
  showMessage('Conference deleted.');
}

function renderGalleryPreview() {
  const event = data.conferences.find((item) => item.id === galleryEvent.value);
  galleryPreview.innerHTML = event?.images.length ? event.images.map((image, index) => `<figure><img src="${image.data}" alt="${escapeHtml(image.name)}"><button type="button" data-image-index="${index}" aria-label="Remove image">×</button></figure>`).join('') : '<p class="muted">No images uploaded for this event yet.</p>';
  galleryPreview.querySelectorAll('[data-image-index]').forEach((button) => button.addEventListener('click', () => {
    event.images.splice(Number(button.dataset.imageIndex), 1);
    saveSiteData(data);
    renderGalleryPreview();
    renderEvents();
    showMessage('Gallery image removed.');
  }));
}

companyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  data.about.title = document.querySelector('#about-title').value;
  data.about.text = document.querySelector('#about-text').value;
  data.contact.email = document.querySelector('#email').value;
  data.contact.phone = document.querySelector('#phone').value;
  data.contact.location = document.querySelector('#location').value;
  saveSiteData(data);
  showMessage('Company details saved.');
});

pageContentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  data.pageContent = data.pageContent || {};
  data.pageContent[contentPage.value] = {
    eyebrow: document.querySelector('#content-eyebrow').value,
    title: document.querySelector('#content-title').value,
    text: document.querySelector('#content-text').value
  };
  saveSiteData(data);
  showMessage('Page content saved.');
});

partnershipForm.addEventListener('submit', (event) => {
  event.preventDefault();
  data.partnerships = data.partnerships || [];
  const idField = document.querySelector('#partnership-id');
  const values = { type: document.querySelector('#partnership-type').value, name: document.querySelector('#partnership-name').value, price: document.querySelector('#partnership-price').value, title: document.querySelector('#partnership-title').value, description: document.querySelector('#partnership-description').value, benefits: document.querySelector('#partnership-benefits').value };
  if (idField.value) {
    const saved = data.partnerships.find((item) => item.id === idField.value);
    Object.assign(saved, values);
    showMessage('Sponsor or exhibitor updated.');
  } else {
    const slug = values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    data.partnerships.push({ ...values, id: `${slug}-${Date.now()}` });
    showMessage('Sponsor or exhibitor added.');
  }
  saveSiteData(data);
  resetPartnershipForm();
  renderPartnerships();
});

conferenceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const idField = document.querySelector('#conference-id');
  const values = { title: document.querySelector('#conference-title').value, date: document.querySelector('#conference-date').value, status: document.querySelector('#conference-status').value, description: document.querySelector('#conference-description').value, location: document.querySelector('#conference-location').value, theme: document.querySelector('#conference-theme').value };
  if (idField.value) {
    const saved = data.conferences.find((item) => item.id === idField.value);
    Object.assign(saved, values);
    showMessage('Conference updated.');
  } else {
    data.conferences.push({ ...values, id: `${values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`, images: [] });
    showMessage('Conference added.');
  }
  saveSiteData(data);
  resetConferenceForm();
  renderEvents();
});

document.querySelector('#cancel-edit').addEventListener('click', resetConferenceForm);
document.querySelector('#partnership-clear').addEventListener('click', resetPartnershipForm);
contentPage.addEventListener('change', () => { fillPageContentForm(); renderPageSections(); });
galleryEvent.addEventListener('change', renderGalleryPreview);
galleryUpload.addEventListener('change', (event) => {
  const conference = data.conferences.find((item) => item.id === galleryEvent.value);
  if (!conference) return;
  Array.from(event.target.files).forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener('error', () => showMessage(`Could not read ${file.name}.`));
    reader.addEventListener('load', () => {
      const image = new Image();
      image.addEventListener('error', () => showMessage(`Could not process ${file.name}.`));
      image.addEventListener('load', () => {
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        const galleryImage = { name: file.name, data: canvas.toDataURL('image/jpeg', 0.82) };
        conference.images.push(galleryImage);
        try {
          saveSiteData(data);
          renderGalleryPreview();
          renderEvents();
          showMessage('Gallery image uploaded.');
        } catch (error) {
          conference.images.pop();
          showMessage('Image is too large to save. Try a smaller image.');
        }
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
  event.target.value = '';
});

fillCompanyForm();
fillPageContentForm();
renderPageSections();
renderEvents();
renderInquiries();
renderPartnerships();
bindAdminViews();

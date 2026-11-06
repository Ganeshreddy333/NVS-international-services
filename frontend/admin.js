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
const partnershipCmsForm = document.querySelector('#partnership-cms-form');
const partnershipCategoriesEditor = document.querySelector('#partnership-categories-editor');
const partnershipExtraImagesEditor = document.querySelector('#partnership-extra-images-editor');
const partnershipTextOrderEditor = document.querySelector('#partnership-text-order-editor');
const pageSectionsBody = document.querySelector('#page-sections-body');
const recruitmentForm = document.querySelector('#recruitment-form');
const recruitmentList = document.querySelector('#recruitment-list');
const recruitmentPreview = document.querySelector('#recruitment-preview');
data.recruitment = Array.isArray(data.recruitment) ? data.recruitment : [];

const pageEditorKinds = { about: 'blocks', sponsors: 'blocks', general: 'accordion', home: 'home' };
const partnershipTextLabels = {
  introHeading: 'Intro heading',
  introSubheading: 'Intro subheading',
  introDescription: 'Introductory description',
  supportingText: 'Supporting text'
};
let richEditorId = 0;

function partnershipId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function newPartnershipDraft() {
  const categories = [
    'Our Sponsors',
    'Our Exhibitors',
    'Our University & Academic Partners',
    'Our Research & Institutional Partners',
    'Our Media & Supporting Partners'
  ];
  return {
    eyebrow: 'PARTNERSHIP / 13',
    title: 'OUR SPONSORS, EXHIBITORS & PARTNERS',
    introHeading: 'Recognizing Our Valued Partners',
    introSubheading: '',
    textOrder: Object.keys(partnershipTextLabels),
    introDescription: 'NVS International Services appreciates the organizations and institutions that support our conferences and contribute to scientific exchange, academic collaboration, professional development, and technological innovation.\n\nWe value our relationships with companies, universities, research institutions, publishers, professional associations, and industry partners.',
    supportingText: '',
    categories: categories.map((name, index) => ({
      id: partnershipId('category'),
      name,
      description: '',
      displayOrder: index,
      published: false,
      partners: []
    })),
    images: []
  };
}

function ensurePartnershipSection() {
  if (!data.partnershipSection || typeof data.partnershipSection !== 'object') {
    data.partnershipSection = { draft: newPartnershipDraft(), published: null };
  }
  if (!data.partnershipSection.draft || typeof data.partnershipSection.draft !== 'object') {
    data.partnershipSection.draft = newPartnershipDraft();
  }
  const draft = data.partnershipSection.draft;
  draft.categories = Array.isArray(draft.categories) ? draft.categories : [];
  draft.images = Array.isArray(draft.images) ? draft.images : [];
  const existingTextOrder = Array.isArray(draft.textOrder) ? draft.textOrder : [];
  const validTextOrder = [...new Set(existingTextOrder.filter((key) => Object.hasOwn(partnershipTextLabels, key)))];
  draft.textOrder = [
    ...validTextOrder,
    ...Object.keys(partnershipTextLabels).filter((key) => !validTextOrder.includes(key))
  ];
  return data.partnershipSection;
}

function renderPartnershipPartner(partner, index, total) {
  const image = safeImageUrl(partner.image || '');
  return `<article class="partnership-entry-editor" data-partnership-entry="${escapeHtml(partner.id)}">
    <div class="partnership-editor-title"><span>Partner ${index + 1}</span><div class="partnership-editor-actions"><button type="button" data-partner-action="up" ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-partner-action="down" ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-partner-action="remove">Remove</button></div></div>
    ${image ? `<img class="partnership-upload-preview" src="${escapeHtml(image)}" alt="">` : '<p class="muted">No logo uploaded.</p>'}
    <div class="field"><label>Partner name</label><input data-partner-field="name" value="${escapeHtml(partner.name || '')}"></div>
    <div class="field"><label>Description</label><textarea data-partner-field="description" rows="2">${escapeHtml(partner.description || '')}</textarea></div>
    <div class="field"><label>Website URL (optional)</label><input type="url" inputmode="url" placeholder="https://example.org" data-partner-field="websiteUrl" value="${escapeHtml(partner.websiteUrl || '')}"></div>
    <div class="field"><label>Replace logo</label><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-partner-replace></div>
    <label class="partnership-checkbox"><input type="checkbox" data-partner-field="published" ${partner.published ? 'checked' : ''}> Publish this partner</label>
  </article>`;
}

function renderPartnershipCategory(category, index, total) {
  const partners = Array.isArray(category.partners) ? category.partners : [];
  return `<article class="partnership-category-editor" data-partnership-category="${escapeHtml(category.id)}">
    <div class="partnership-editor-title"><strong>Category ${index + 1}</strong><div class="partnership-editor-actions"><button type="button" data-category-action="up" ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-category-action="down" ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-category-action="remove">Remove</button></div></div>
    <div class="partnership-editor-grid">
      <div class="field"><label>Category heading</label><input data-category-field="name" value="${escapeHtml(category.name || '')}"></div>
      <div class="field"><label>Category description</label><input data-category-field="description" value="${escapeHtml(category.description || '')}"></div>
    </div>
    <label class="partnership-checkbox"><input type="checkbox" data-category-field="published" ${category.published ? 'checked' : ''}> Publish this category</label>
    <div class="partnership-editor-heading"><strong>Partner entries</strong><div class="partnership-editor-actions"><label class="button button-ghost partnership-file-button" for="upload-${escapeHtml(category.id)}">Upload logos</label><input class="partnership-file-input" id="upload-${escapeHtml(category.id)}" type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple data-partner-upload><button type="button" data-category-action="add-partner">Add partner</button></div></div>
    <div>${partners.map((partner, partnerIndex) => renderPartnershipPartner(partner, partnerIndex, partners.length)).join('') || '<p class="muted">No partners added yet.</p>'}</div>
  </article>`;
}

function renderPartnershipCms() {
  const section = ensurePartnershipSection();
  const draft = section.draft;
  const fields = ['eyebrow', 'title', 'introHeading', 'introSubheading', 'introDescription', 'supportingText'];
  fields.forEach((key) => {
    const field = partnershipCmsForm.querySelector(`[data-partnership-field="${key}"]`);
    if (field) field.value = draft[key] || '';
  });
  partnershipTextOrderEditor.innerHTML = draft.textOrder.map((key, index) => `<div class="partnership-text-order-item" data-text-order-item="${key}"><strong>${escapeHtml(partnershipTextLabels[key])}</strong><div class="partnership-editor-actions"><button type="button" data-text-order-action="up" ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-text-order-action="down" ${index === draft.textOrder.length - 1 ? 'disabled' : ''}>Move down</button></div></div>`).join('');
  partnershipCategoriesEditor.innerHTML = draft.categories.map((category, index) => renderPartnershipCategory(category, index, draft.categories.length)).join('')
    || '<p class="muted">No categories yet. Add one to get started.</p>';
  partnershipExtraImagesEditor.innerHTML = draft.images.map((image, index) => {
    const src = safeImageUrl(image.image || '');
    return `<article class="partnership-image-editor" data-partnership-image="${escapeHtml(image.id)}">${src ? `<img class="partnership-upload-preview" src="${escapeHtml(src)}" alt="">` : ''}<div class="field"><label>Image description</label><input data-image-field="name" value="${escapeHtml(image.name || '')}"></div><label class="partnership-checkbox"><input type="checkbox" data-image-field="published" ${image.published ? 'checked' : ''}> Publish this image</label><div class="partnership-editor-actions"><button type="button" data-image-action="up" ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-image-action="down" ${index === draft.images.length - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-image-action="remove">Remove</button></div></article>`;
  }).join('') || '<p class="muted">No additional images uploaded.</p>';
  const status = document.querySelector('#partnership-publish-status');
  if (status) status.textContent = section.published ? 'A published version is live. Draft edits will not be public until published.' : 'The card is unpublished and hidden from public visitors.';
}

function collectPartnershipDraft() {
  const section = ensurePartnershipSection();
  const draft = { ...section.draft };
  ['eyebrow', 'title', 'introHeading', 'introSubheading', 'introDescription', 'supportingText'].forEach((key) => {
    draft[key] = partnershipCmsForm.querySelector(`[data-partnership-field="${key}"]`).value;
  });
  draft.textOrder = [...partnershipTextOrderEditor.querySelectorAll('[data-text-order-item]')].map((item) => item.dataset.textOrderItem);
  draft.categories = [...partnershipCategoriesEditor.querySelectorAll('[data-partnership-category]')].map((card, categoryIndex) => {
    const prior = section.draft.categories.find((category) => category.id === card.dataset.partnershipCategory);
    return {
      id: card.dataset.partnershipCategory,
      name: card.querySelector('[data-category-field="name"]').value,
      description: card.querySelector('[data-category-field="description"]').value,
      displayOrder: categoryIndex,
      published: card.querySelector('[data-category-field="published"]').checked,
      partners: [...card.querySelectorAll('[data-partnership-entry]')].map((partnerCard, partnerIndex) => ({
        id: partnerCard.dataset.partnershipEntry,
        name: partnerCard.querySelector('[data-partner-field="name"]').value,
        image: prior?.partners?.find((partner) => partner.id === partnerCard.dataset.partnershipEntry)?.image || '',
        description: partnerCard.querySelector('[data-partner-field="description"]').value,
        websiteUrl: partnerCard.querySelector('[data-partner-field="websiteUrl"]').value.trim(),
        displayOrder: partnerIndex,
        published: partnerCard.querySelector('[data-partner-field="published"]').checked
      }))
    };
  });
  draft.images = [...partnershipExtraImagesEditor.querySelectorAll('[data-partnership-image]')].map((card, index) => {
    const image = section.draft.images.find((item) => item.id === card.dataset.partnershipImage);
    return {
      id: card.dataset.partnershipImage,
      image: image?.image || '',
      name: card.querySelector('[data-image-field="name"]').value,
      published: card.querySelector('[data-image-field="published"]').checked,
      displayOrder: index
    };
  });
  section.draft = draft;
  return draft;
}

function syncRichEditors() {
  if (window.tinymce) tinymce.triggerSave();
}

function validateRichEditors(form) {
  syncRichEditors();
  for (const field of form.querySelectorAll('textarea.rich-editor')) {
    if ((field.required || field.dataset.richRequired === 'true') && !field.value.trim()) {
      showMessage('Please complete all required rich-text fields.');
      window.tinymce?.get(field.id)?.focus();
      return false;
    }
  }
  return true;
}

function setRichEditorValue(selector, value) {
  const field = document.querySelector(selector);
  if (!field) return;
  const editor = window.tinymce?.get(field.id);
  if (editor) editor.setContent(value || '');
  else field.value = value || '';
}

function initRichEditors(root = document) {
  if (!window.tinymce) return;
  root.querySelectorAll('textarea.rich-editor').forEach((field) => {
    if (!field.id) field.id = `nvs-rich-editor-${++richEditorId}`;
    if (tinymce.get(field.id)) return;
    if (field.required) {
      field.dataset.richRequired = 'true';
      field.required = false;
    }
    tinymce.init({
      target: field,
      menubar: false,
      branding: false,
      promotion: false,
      height: 240,
      plugins: 'lists link image',
      toolbar: 'undo redo | blocks | bold italic | bullist numlist | link image',
      images_upload_handler: async (blobInfo) => {
        const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type });
        const result = await NVS_API.uploadImage(file);
        return result.location;
      }
    });
  });
}

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
    <div class="field"><label>Body</label><textarea class="rich-editor" data-field="body" rows="4"></textarea></div>
    <div class="field"><label>List style</label><select data-field="listStyle"><option value="none">No list</option><option value="topic">Bullet list</option><option value="definition">Term + description</option></select></div>
    <div class="field"><label>List items (one per line; for Term + description use "Term :: description")</label><textarea data-field="listItems" rows="4"></textarea></div>
    <div class="field"><label>Extra text after the list (optional)</label><textarea class="rich-editor" data-field="bodyAfter" rows="2"></textarea></div>
  </article>`;
}

function accordionCardSkeleton(index, total) {
  return `<article class="page-section-item" data-index="${index}">
    <div class="page-section-head"><strong>Topic ${index + 1}</strong><div class="event-actions"><button type="button" data-topic-preview>Preview</button><button type="button" data-move-up ${index === 0 ? 'disabled' : ''}>Move up</button><button type="button" data-move-down ${index === total - 1 ? 'disabled' : ''}>Move down</button><button class="delete" type="button" data-remove>Delete</button></div></div>
    <div class="field"><label>Title</label><input data-field="heading"></div>
    <div class="field"><label>Topic description (optional)</label><textarea data-field="description" rows="2"></textarea></div>
    <div class="field"><label>Content</label><textarea class="rich-editor" data-field="body" rows="10"></textarea></div>
    <div class="field"><label>Supporting resource links (optional, one URL per line)</label><textarea data-field="resources" rows="3" placeholder="https://example.org/document.pdf"></textarea><small>Use the image button in Content to upload and embed supporting images.</small></div>
    <div class="field"><label>Publication status</label><select data-field="status"><option value="draft">Draft — hidden from visitors</option><option value="published">Published — visible to visitors</option></select></div>
    <div class="recruitment-preview" data-topic-preview-output hidden></div>
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
    set('description', item.description);
    set('body', item.body);
    set('resources', Array.isArray(item.resources) ? item.resources.join('\n') : '');
    set('status', item.status || 'published');
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
  syncRichEditors();
  return [...pageSectionsBody.querySelectorAll('.page-section-item')].map((card) => {
    const get = (field) => card.querySelector(`[data-field="${field}"]`);
    const value = (field) => (get(field) ? get(field).value : '');
    if (kind === 'accordion') return {
      id: card.dataset.id || makeSectionId(),
      heading: value('heading'),
      description: value('description'),
      body: value('body'),
      resources: value('resources').split('\n').map((link) => link.trim()).filter(Boolean),
      status: value('status') || 'draft'
    };
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
  if (kind === 'accordion') return { id: makeSectionId(), heading: '', description: '', body: '', resources: [], status: 'draft' };
  if (kind === 'home') return { id: makeSectionId(), number: '', title: '', text: '', href: '' };
  return { id: makeSectionId(), variant: '', kicker: '', heading: '', body: '', listStyle: 'none', listItems: [], bodyAfter: '' };
}

function persistPageItems(pageKey, kind, items, successMessage = '') {
  const page = ensurePageData(pageKey);
  if (kind === 'home') page.directory = items;
  else page.sections = items;
  saveAdminData(successMessage);
}

function renderPageSections() {
  pageSectionsBody.querySelectorAll('textarea.rich-editor').forEach((field) => window.tinymce?.get(field.id)?.remove());
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
  initRichEditors(pageSectionsBody);

  cards.forEach((card, index) => {
    card.querySelector('[data-topic-preview]')?.addEventListener('click', () => {
      syncRichEditors();
      const item = collectPageItems(kind)[index];
      const preview = card.querySelector('[data-topic-preview-output]');
      if (!item.heading || (!item.description && !item.body && !item.resources.length)) {
        showMessage('Add a title and topic content before previewing.');
        return;
      }
      preview.innerHTML = renderAccordion([{ ...item, status: 'published' }]);
      preview.hidden = false;
    });
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
      persistPageItems(pageKey, kind, current, 'Section removed.');
      renderPageSections();
    });
  });

  pageSectionsBody.querySelector('#add-page-section')?.addEventListener('click', () => {
    const current = collectPageItems(kind);
    current.push(newPageItem(kind));
    persistPageItems(pageKey, kind, current);
    renderPageSections();
  });
  pageSectionsBody.querySelector('#save-page-sections')?.addEventListener('click', () => {
    persistPageItems(pageKey, kind, collectPageItems(kind), 'Page sections saved.');
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
    if (tab.dataset.adminView === 'settings-view') loadAuditLog();
  }));
  document.querySelector('[data-general-manager]')?.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('[data-admin-view="content-view"]')?.click();
    contentPage.value = 'general';
    fillPageContentForm();
    renderPageSections();
  });
  showView(window.location.hash.slice(1) || 'content-view');
  if (window.location.hash === '#settings-view') loadAuditLog();
}

function resetPartnershipForm() {
  partnershipForm.reset();
  setRichEditorValue('#partnership-description', '');
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
    setRichEditorValue('#partnership-description', partner.description);
    document.querySelector('#partnership-benefits').value = partner.benefits;
    document.querySelector('#partnership-submit-label').textContent = 'Update Package';
    partnershipForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  partnershipList.querySelectorAll('[data-partner-delete]').forEach((button) => button.addEventListener('click', () => {
    data.partnerships = data.partnerships.filter((item) => item.id !== button.dataset.partnerDelete);
    saveAdminData('Sponsor or exhibitor removed.');
    renderPartnerships();
  }));
}

function movePartnershipItem(items, index, direction) {
  const destination = index + direction;
  if (destination < 0 || destination >= items.length) return;
  [items[index], items[destination]] = [items[destination], items[index]];
}

async function uploadPartnershipImages(files, categoryId = '', partnerId = '', additional = false) {
  const section = ensurePartnershipSection();
  const draft = section.draft;
  const category = draft.categories.find((item) => item.id === categoryId);
  const partner = category?.partners.find((item) => item.id === partnerId);
  let uploaded = 0;
  for (const file of files) {
    try {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        throw new Error('Choose a JPEG, PNG, GIF, or WebP image.');
      }
      if (file.size < 1 || file.size > 5 * 1024 * 1024) {
        throw new Error('Images must be no larger than 5 MB.');
      }
      const result = await NVS_API.uploadImage(file);
      const name = file.name.replace(/\.[^.]+$/, '');
      if (additional) {
        draft.images.push({
          id: partnershipId('image'),
          image: result.location,
          name,
          published: false,
          displayOrder: draft.images.length
        });
      } else if (partner) {
        partner.image = result.location;
      } else if (category) {
        category.partners.push({
          id: partnershipId('partner'),
          name,
          image: result.location,
          description: '',
          websiteUrl: '',
          displayOrder: category.partners.length,
          published: false
        });
      }
      uploaded += 1;
    } catch (error) {
      showMessage(`Could not upload ${file.name}: ${error.message}`);
    }
  }
  renderPartnershipCms();
  if (uploaded) showMessage(`${uploaded} partnership image${uploaded === 1 ? '' : 's'} uploaded to the draft.`);
}

function handlePartnershipEditorClick(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const draft = collectPartnershipDraft();

  if (button.id === 'partnership-add-category') {
    draft.categories.push({
      id: partnershipId('category'),
      name: 'New category',
      description: '',
      displayOrder: draft.categories.length,
      published: false,
      partners: []
    });
    renderPartnershipCms();
    return;
  }
  const textOrderItem = button.closest('[data-text-order-item]');
  const textOrderAction = button.dataset.textOrderAction;
  if (textOrderItem && textOrderAction) {
    const index = draft.textOrder.indexOf(textOrderItem.dataset.textOrderItem);
    movePartnershipItem(draft.textOrder, index, textOrderAction === 'up' ? -1 : 1);
    renderPartnershipCms();
    return;
  }
  const categoryCard = button.closest('[data-partnership-category]');
  const categoryAction = button.dataset.categoryAction;
  if (categoryCard && categoryAction) {
    const index = draft.categories.findIndex((item) => item.id === categoryCard.dataset.partnershipCategory);
    if (categoryAction === 'remove') draft.categories.splice(index, 1);
    if (categoryAction === 'up' || categoryAction === 'down') movePartnershipItem(draft.categories, index, categoryAction === 'up' ? -1 : 1);
    if (categoryAction === 'add-partner') {
      const category = draft.categories[index];
      category.partners.push({ id: partnershipId('partner'), name: '', image: '', description: '', websiteUrl: '', displayOrder: category.partners.length, published: false });
    }
    renderPartnershipCms();
    return;
  }
  const partnerCard = button.closest('[data-partnership-entry]');
  const partnerAction = button.dataset.partnerAction;
  if (partnerCard && partnerAction) {
    const category = draft.categories.find((item) => item.partners.some((partner) => partner.id === partnerCard.dataset.partnershipEntry));
    if (!category) return;
    const index = category.partners.findIndex((partner) => partner.id === partnerCard.dataset.partnershipEntry);
    if (partnerAction === 'remove') category.partners.splice(index, 1);
    if (partnerAction === 'up' || partnerAction === 'down') movePartnershipItem(category.partners, index, partnerAction === 'up' ? -1 : 1);
    renderPartnershipCms();
    return;
  }
  const imageCard = button.closest('[data-partnership-image]');
  const imageAction = button.dataset.imageAction;
  if (imageCard && imageAction) {
    const index = draft.images.findIndex((image) => image.id === imageCard.dataset.partnershipImage);
    if (imageAction === 'remove') draft.images.splice(index, 1);
    if (imageAction === 'up' || imageAction === 'down') movePartnershipItem(draft.images, index, imageAction === 'up' ? -1 : 1);
    renderPartnershipCms();
  }
}

partnershipCmsForm.addEventListener('click', handlePartnershipEditorClick);
partnershipCmsForm.addEventListener('change', async (event) => {
  const input = event.target;
  if (input.matches('[data-partner-upload]')) {
    const categoryId = input.closest('[data-partnership-category]')?.dataset.partnershipCategory || '';
    const files = Array.from(input.files || []);
    if (files.length) {
      collectPartnershipDraft();
      await uploadPartnershipImages(files, categoryId);
    }
    input.value = '';
  } else if (input.matches('[data-partner-replace]')) {
    const categoryId = input.closest('[data-partnership-category]')?.dataset.partnershipCategory || '';
    const partnerId = input.closest('[data-partnership-entry]')?.dataset.partnershipEntry || '';
    if (input.files?.[0]) {
      collectPartnershipDraft();
      await uploadPartnershipImages([input.files[0]], categoryId, partnerId);
    }
  } else if (input.id === 'partnership-extra-upload') {
    const files = Array.from(input.files || []);
    if (files.length) {
      collectPartnershipDraft();
      await uploadPartnershipImages(files, '', '', true);
    }
    input.value = '';
  }
});

document.querySelector('#partnership-preview-button').addEventListener('click', () => {
  const draft = collectPartnershipDraft();
  const previewWrap = document.querySelector('#partnership-preview-wrap');
  document.querySelector('#partnership-preview').innerHTML = `<div class="partners-page">${renderPartnershipSection(draft, true)}</div>`
    || '<p class="muted">Add partnership content to preview the card.</p>';
  previewWrap.hidden = false;
});

partnershipCmsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const draft = collectPartnershipDraft();
  const action = event.submitter?.value || 'draft';
  if (action === 'publish') {
    data.partnershipSection.published = structuredClone(draft);
  }
  const saved = await saveAdminData(action === 'publish' ? 'Partnership card published.' : 'Partnership draft saved.');
  if (saved) {
    document.querySelector('#partnership-publish-status').textContent = action === 'publish'
      ? 'Published. The public homepage now reflects this content.'
      : data.partnershipSection.published
        ? 'Draft saved. The previously published version remains live.'
        : 'Draft saved. The card remains hidden from public visitors.';
  }
});

document.querySelector('#partnership-unpublish-button').addEventListener('click', async () => {
  collectPartnershipDraft();
  data.partnershipSection.published = null;
  const saved = await saveAdminData('Partnership card unpublished and hidden from visitors.');
  if (saved) renderPartnershipCms();
});

function fillPageContentForm() {
  const content = getPageContent(contentPage.value);
  document.querySelector('#content-eyebrow').value = content.eyebrow || '';
  document.querySelector('#content-title').value = content.title || '';
  setRichEditorValue('#content-text', content.text);
}

function formatInquiryDate(inquiry) {
  if (inquiry.date) return inquiry.date;
  if (inquiry.created_at) {
    const parsed = new Date(inquiry.created_at);
    return Number.isNaN(parsed.getTime()) ? String(inquiry.created_at) : parsed.toLocaleString();
  }
  return '';
}

function renderInquiries() {
  const card = document.querySelector('#inquiry-manager') || document.createElement('section');
  card.id = 'inquiry-manager';
  card.className = 'admin-card inquiry-manager';
  if (!card.parentElement) document.querySelector('.admin-page').append(card);

  const paint = (inquiries, fromServer) => {
    card.innerHTML = `<h2>Contact Enquiries</h2>${inquiries.length ? `<div class="inquiry-list">${inquiries.map((inquiry) => `<article class="inquiry"><div><strong>${escapeHtml(inquiry.subject)}</strong><small>${escapeHtml(inquiry.name)} · ${escapeHtml(inquiry.email)} · ${escapeHtml(inquiry.phone || 'No phone provided')} · ${escapeHtml(formatInquiryDate(inquiry))}</small></div><p>${escapeHtml(inquiry.message)}</p><button type="button" data-inquiry-delete="${inquiry.id}">Delete</button></article>`).join('')}</div>` : '<p class="muted">No contact enquiries yet.</p>'}`;
    card.querySelectorAll('[data-inquiry-delete]').forEach((button) => button.addEventListener('click', () => {
      const id = button.dataset.inquiryDelete;
      if (fromServer && window.NVS_API && NVS_API.deleteInquiry) {
        NVS_API.deleteInquiry(id).then(() => { renderInquiries(); showMessage('Enquiry deleted.'); }).catch(() => showMessage('Could not delete enquiry on the server.'));
      } else {
        data.inquiries = (data.inquiries || []).filter((inquiry) => String(inquiry.id) !== id);
        saveAdminData('Enquiry deleted.');
        renderInquiries();
      }
    }));
  };

  if (window.NVS_API && NVS_API.listInquiries && NVS_API.hasToken()) {
    NVS_API.listInquiries().then((rows) => paint(rows, true)).catch((error) => {
      card.innerHTML = '<h2>Contact Enquiries</h2><p class="muted">Could not load contact enquiries from the server. Please sign in again or retry.</p>';
      showMessage(`Could not load enquiries: ${error.message}`);
    });
  } else {
    paint(data.inquiries || [], false);
  }
}

async function loadAuditLog() {
  const container = document.querySelector('#admin-audit-log');
  if (!container || !window.NVS_API || !NVS_API.hasToken()) return;

  container.innerHTML = '<p class="muted">Loading activity…</p>';
  try {
    const entries = await NVS_API.listAuditLog();
    container.innerHTML = entries.length ? entries.map((entry) => {
      const changes = entry.changes || {};
      return `<article class="admin-event"><div><strong>${escapeHtml(entry.action)}</strong><small>${escapeHtml(entry.admin_username)} · ${escapeHtml(new Date(entry.created_at).toLocaleString())} · ${escapeHtml(Object.keys(changes).join(', '))}</small><details><summary>View before/after values</summary><pre>${escapeHtml(JSON.stringify(changes, null, 2))}</pre></details></div></article>`;
    }).join('') : '<p class="muted">No admin content changes have been recorded yet.</p>';
  } catch (error) {
    container.innerHTML = '<p class="muted">Could not load admin activity.</p>';
    showMessage(`Could not load admin activity: ${error.message}`);
  }
}

function showMessage(text) {
  message.textContent = text;
  message.classList.add('show');
  window.setTimeout(() => message.classList.remove('show'), 2600);
}

function saveAdminData(successMessage = '') {
  return Promise.resolve().then(() => saveSiteData(data)).then((result) => {
    if (result === 'server') {
      if (successMessage) showMessage(successMessage);
      return true;
    }
    if (result === 'local') {
      showMessage('Changes are saved in this browser only. Sign in to sync them to the website.');
    } else {
      showMessage('Changes are saved in this browser, but server sync failed. Sign in again and retry.');
    }
    return false;
  }).catch((error) => {
    showMessage(`Could not save changes: ${error.message}`);
    return false;
  });
}

function fillCompanyForm() {
  document.querySelector('#about-title').value = data.about.title;
  setRichEditorValue('#about-text', data.about.text);
  document.querySelector('#email').value = data.contact.email;
  document.querySelector('#phone').value = data.contact.phone;
  document.querySelector('#location').value = data.contact.location;
  document.querySelector('#whatsapp-number').value = data.websiteInformation.whatsappNumber || '9391720171';
  document.querySelector('#linkedin-url').value = data.websiteInformation.linkedinUrl || '';
}

function resetConferenceForm() {
  conferenceForm.reset();
  setRichEditorValue('#conference-description', '');
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

function recruitmentFields() {
  return ['id', 'title', 'department', 'location', 'employmentType', 'vacancies', 'salary', 'deadline', 'applicationUrl', 'applicationEmail', 'description', 'responsibilities', 'qualifications', 'experience', 'skills', 'applicationInstructions'];
}

function recruitmentFormValues() {
  const values = {};
  recruitmentFields().forEach((key) => {
    const field = recruitmentForm.querySelector(`[data-recruitment-field="${key}"]`);
    values[key] = key === 'vacancies' ? Number(field.value) : field.value.trim();
  });
  return values;
}

function renderRecruitmentPreview() {
  const listing = recruitmentFormValues();
  if (!listing.title) {
    showMessage('Enter a job title before previewing this vacancy.');
    return;
  }
  const paragraphs = (value) => String(value || '').split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean).map((text) => `<p>${escapeHtml(text)}</p>`).join('');
  const bullets = (value) => {
    const lines = String(value || '').split(/\n+/).map((text) => text.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
    return lines.length ? `<ul>${lines.map((text) => `<li>${escapeHtml(text)}</li>`).join('')}</ul>` : '';
  };
  const applicationUrl = /^https?:\/\//i.test(listing.applicationUrl) ? `<a class="button button-lime" href="${escapeHtml(listing.applicationUrl)}" target="_blank" rel="noopener noreferrer">Apply Now ↗</a>` : '';
  const applicationEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(listing.applicationEmail) ? `<a class="careers-apply-email" href="mailto:${escapeHtml(listing.applicationEmail)}">Email ${escapeHtml(listing.applicationEmail)}</a>` : '';
  recruitmentPreview.innerHTML = `<article class="careers-opening-card"><header class="careers-opening-header"><div><p class="careers-kicker">${escapeHtml(listing.department)}</p><h3>${escapeHtml(listing.title)}</h3></div><span class="careers-opening-type">${escapeHtml(listing.employmentType)}</span></header><div class="careers-opening-meta">${[listing.location, listing.employmentType, `${listing.vacancies || 1} vacancy${listing.vacancies === 1 ? '' : 'ies'}`, listing.deadline || 'Open until filled', listing.salary].filter(Boolean).map((text) => `<span>${escapeHtml(text)}</span>`).join('')}</div>${paragraphs(listing.description)}${listing.responsibilities ? `<section class="careers-opening-detail"><h4>Responsibilities</h4>${bullets(listing.responsibilities)}</section>` : ''}${listing.qualifications ? `<section class="careers-opening-detail"><h4>Required qualifications</h4>${bullets(listing.qualifications)}</section>` : ''}${listing.experience ? `<section class="careers-opening-detail"><h4>Experience</h4>${paragraphs(listing.experience)}</section>` : ''}${listing.skills ? `<section class="careers-opening-detail"><h4>Skills</h4>${bullets(listing.skills)}</section>` : ''}${listing.applicationInstructions ? `<section class="careers-opening-detail"><h4>How to apply</h4>${paragraphs(listing.applicationInstructions)}</section>` : ''}<div class="careers-opening-actions">${applicationUrl}${applicationEmail}${!applicationUrl && !applicationEmail ? '<p class="muted">Add an application URL or email before publishing.</p>' : ''}</div></article>`;
  recruitmentPreview.hidden = false;
  recruitmentPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearRecruitmentForm() {
  recruitmentForm.reset();
  recruitmentForm.querySelector('[data-recruitment-field="id"]').value = '';
  recruitmentForm.querySelector('[data-recruitment-field="vacancies"]').value = '1';
  recruitmentPreview.hidden = true;
}

function editRecruitment(id) {
  const listing = data.recruitment.find((item) => item.id === id);
  if (!listing) return;
  recruitmentFields().forEach((key) => {
    const field = recruitmentForm.querySelector(`[data-recruitment-field="${key}"]`);
    field.value = listing[key] ?? (key === 'vacancies' ? '1' : '');
  });
  recruitmentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRecruitmentManager() {
  const today = new Date().toISOString().slice(0, 10);
  recruitmentList.innerHTML = data.recruitment.length ? data.recruitment
    .slice()
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))
    .map((listing) => {
      const expired = listing.status === 'published' && listing.deadline && listing.deadline < today;
      const status = expired ? 'Expired' : listing.status === 'published' ? 'Published' : 'Draft';
      return `<article class="recruitment-admin-item"><div><h4>${escapeHtml(listing.title)}<span class="recruitment-status">${status}</span></h4><p>${escapeHtml([listing.department, listing.location, listing.employmentType, listing.deadline ? `Deadline ${listing.deadline}` : 'No deadline'].filter(Boolean).join(' · '))}</p></div><div class="recruitment-admin-actions"><button type="button" data-recruitment-action="edit" data-recruitment-id="${escapeHtml(listing.id)}">Edit</button><button type="button" data-recruitment-action="${listing.status === 'published' ? 'unpublish' : 'publish'}" data-recruitment-id="${escapeHtml(listing.id)}">${listing.status === 'published' ? 'Unpublish' : 'Publish'}</button><button class="delete" type="button" data-recruitment-action="delete" data-recruitment-id="${escapeHtml(listing.id)}">Delete</button></div></article>`;
    }).join('') : '<p class="recruitment-admin-empty">No vacancies have been added yet.</p>';
  recruitmentList.querySelectorAll('[data-recruitment-action]').forEach((button) => button.addEventListener('click', async () => {
    const listing = data.recruitment.find((item) => item.id === button.dataset.recruitmentId);
    if (!listing) return;
    const action = button.dataset.recruitmentAction;
    if (action === 'edit') {
      editRecruitment(listing.id);
      return;
    }
    if (action === 'publish' && !listing.applicationUrl && !listing.applicationEmail) {
      showMessage('Add an application URL or email address before publishing a vacancy.');
      editRecruitment(listing.id);
      return;
    }
    if (action === 'delete') {
      data.recruitment = data.recruitment.filter((item) => item.id !== listing.id);
      clearRecruitmentForm();
      await saveAdminData('Recruitment listing deleted.');
    } else {
      listing.status = action === 'publish' ? 'published' : 'draft';
      listing.updatedAt = new Date().toISOString();
      await saveAdminData(action === 'publish' ? 'Recruitment listing published.' : 'Recruitment listing unpublished.');
    }
    renderRecruitmentManager();
  }));
}

function editConference(id) {
  const event = data.conferences.find((item) => item.id === id);
  if (!event) return;
  document.querySelector('#conference-id').value = event.id;
  document.querySelector('#conference-title').value = event.title;
  document.querySelector('#conference-date').value = event.date;
  document.querySelector('#conference-status').value = event.status;
  setRichEditorValue('#conference-description', event.description);
  document.querySelector('#conference-location').value = event.location;
  document.querySelector('#conference-theme').value = event.theme;
  document.querySelector('#conference-submit-label').textContent = 'Update Conference';
  conferenceForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteConference(id) {
  const index = data.conferences.findIndex((item) => item.id === id);
  if (index < 0) return;
  data.conferences.splice(index, 1);
  saveAdminData('Conference deleted.');
  renderEvents();
}

function renderGalleryPreview() {
  const event = data.conferences.find((item) => item.id === galleryEvent.value);
  galleryPreview.innerHTML = event?.images.length ? event.images.map((image, index) => `<figure><img src="${safeImageUrl(image.data)}" alt="${escapeHtml(image.name)}"><button type="button" data-image-index="${index}" aria-label="Remove image">×</button></figure>`).join('') : '<p class="muted">No images uploaded for this event yet.</p>';
  galleryPreview.querySelectorAll('[data-image-index]').forEach((button) => button.addEventListener('click', () => {
    event.images.splice(Number(button.dataset.imageIndex), 1);
    saveAdminData('Gallery image removed.');
    renderGalleryPreview();
    renderEvents();
  }));
}

companyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateRichEditors(companyForm)) return;
  data.about.title = document.querySelector('#about-title').value;
  data.about.text = document.querySelector('#about-text').value;
  data.contact.email = document.querySelector('#email').value;
  data.contact.phone = document.querySelector('#phone').value;
  data.contact.location = document.querySelector('#location').value;
  data.websiteInformation = data.websiteInformation || {};
  data.websiteInformation.whatsappNumber = document.querySelector('#whatsapp-number').value.trim();
  data.websiteInformation.linkedinUrl = document.querySelector('#linkedin-url').value.trim();
  saveAdminData('Company details saved.');
});

recruitmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!recruitmentForm.reportValidity()) return;
  const values = recruitmentFormValues();
  const action = event.submitter?.value === 'publish' ? 'published' : 'draft';
  if (action === 'published' && !values.applicationUrl && !values.applicationEmail) {
    showMessage('Add an application URL or email address before publishing a vacancy.');
    return;
  }
  const existing = values.id ? data.recruitment.find((item) => item.id === values.id) : null;
  const now = new Date().toISOString();
  const listing = {
    ...values,
    id: existing?.id || partnershipId('vacancy'),
    status: action,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (existing) {
    data.recruitment[data.recruitment.indexOf(existing)] = listing;
  } else {
    data.recruitment.push(listing);
  }
  const saved = await saveAdminData(existing
    ? action === 'published' ? 'Recruitment listing updated and published.' : 'Recruitment listing saved as a draft.'
    : action === 'published' ? 'Recruitment listing published.' : 'Recruitment listing saved as a draft.');
  if (saved) clearRecruitmentForm();
  renderRecruitmentManager();
});

document.querySelector('#recruitment-preview-button').addEventListener('click', renderRecruitmentPreview);
document.querySelector('#recruitment-clear-button').addEventListener('click', clearRecruitmentForm);

pageContentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateRichEditors(pageContentForm)) return;
  data.pageContent = data.pageContent || {};
  data.pageContent[contentPage.value] = {
    eyebrow: document.querySelector('#content-eyebrow').value,
    title: document.querySelector('#content-title').value,
    text: document.querySelector('#content-text').value
  };
  saveAdminData('Page content saved.');
});

partnershipForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateRichEditors(partnershipForm)) return;
  data.partnerships = data.partnerships || [];
  const idField = document.querySelector('#partnership-id');
  const values = { type: document.querySelector('#partnership-type').value, name: document.querySelector('#partnership-name').value, price: document.querySelector('#partnership-price').value, title: document.querySelector('#partnership-title').value, description: document.querySelector('#partnership-description').value, benefits: document.querySelector('#partnership-benefits').value };
  let successMessage;
  if (idField.value) {
    const saved = data.partnerships.find((item) => item.id === idField.value);
    Object.assign(saved, values);
    successMessage = 'Sponsor or exhibitor updated.';
  } else {
    const slug = values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    data.partnerships.push({ ...values, id: `${slug}-${Date.now()}` });
    successMessage = 'Sponsor or exhibitor added.';
  }
  saveAdminData(successMessage);
  resetPartnershipForm();
  renderPartnerships();
});

conferenceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateRichEditors(conferenceForm)) return;
  const idField = document.querySelector('#conference-id');
  const values = { title: document.querySelector('#conference-title').value, date: document.querySelector('#conference-date').value, status: document.querySelector('#conference-status').value, description: document.querySelector('#conference-description').value, location: document.querySelector('#conference-location').value, theme: document.querySelector('#conference-theme').value };
  let successMessage;
  if (idField.value) {
    const saved = data.conferences.find((item) => item.id === idField.value);
    Object.assign(saved, values);
    successMessage = 'Conference updated.';
  } else {
    data.conferences.push({ ...values, id: `${values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now()}`, images: [] });
    successMessage = 'Conference added.';
  }
  saveAdminData(successMessage);
  resetConferenceForm();
  renderEvents();
});

document.querySelector('#cancel-edit').addEventListener('click', resetConferenceForm);
document.querySelector('#partnership-clear').addEventListener('click', resetPartnershipForm);
document.querySelector('#refresh-audit-log').addEventListener('click', loadAuditLog);
contentPage.addEventListener('change', () => { fillPageContentForm(); renderPageSections(); });
galleryEvent.addEventListener('change', renderGalleryPreview);
galleryUpload.addEventListener('change', async (event) => {
  const conference = data.conferences.find((item) => item.id === galleryEvent.value);
  if (!conference) return;
  for (const file of Array.from(event.target.files)) {
    try {
      if (file.size > 25 * 1024 * 1024) throw new Error('Choose an image smaller than 25 MB.');
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.addEventListener('error', () => reject(new Error(`Could not process ${file.name}.`)), { once: true });
        image.addEventListener('load', resolve, { once: true });
        image.src = objectUrl;
      });
      URL.revokeObjectURL(objectUrl);
      const blob = await new Promise((resolve, reject) => {
        const maxDimension = 1600;
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) return reject(new Error(`Could not process ${file.name}.`));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error(`Could not process ${file.name}.`)), 'image/jpeg', 0.82);
      });
      const storedImage = await NVS_API.uploadImage(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
      conference.images.push({ name: file.name, data: storedImage.location });
      if (!await saveAdminData('Gallery image uploaded.')) break;
      renderGalleryPreview();
      renderEvents();
    } catch (error) {
      showMessage(`Could not upload ${file.name}: ${error.message}`);
    }
  }
  event.target.value = '';
});

fillCompanyForm();
fillPageContentForm();
renderPageSections();
renderEvents();
renderRecruitmentManager();
renderInquiries();
renderPartnerships();
renderPartnershipCms();
bindAdminViews();
initRichEditors();
if (window.NVS_ADMIN_CONTENT_ERROR) showMessage(`Could not load saved admin content: ${window.NVS_ADMIN_CONTENT_ERROR}`);

// After a successful login the API token exists, so reload enquiries from the server.
window.addEventListener('admin-authenticated', async () => {
  renderInquiries();
  if (window.location.hash === '#settings-view') loadAuditLog();
  try {
    await NVS_API.loadAdminContent();
    if (NVS_API.getContentSnapshot()) {
      const latest = getSiteData();
      Object.keys(data).forEach((key) => delete data[key]);
      Object.assign(data, latest);
      data.partnerships = Array.isArray(data.partnerships) ? data.partnerships : [];
      data.recruitment = Array.isArray(data.recruitment) ? data.recruitment : [];
      renderPartnerships();
      renderPartnershipCms();
      renderEvents();
      renderRecruitmentManager();
      renderPageSections();
      fillCompanyForm();
      fillPageContentForm();
    }
  } catch (error) {
    showMessage(`Could not load saved admin content: ${error.message}`);
  }
});

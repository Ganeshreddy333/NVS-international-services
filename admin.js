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
const websiteInformationFields = document.querySelector('#website-information-fields');
const partnershipForm = document.querySelector('#partnership-form');
const partnershipList = document.querySelector('#partnership-list');

function renderWebsiteInformation() {
  const information = getWebsiteInformation();
  websiteInformationFields.innerHTML = Object.entries(information).map(([key, section]) => `<article class="website-information-item"><div class="website-information-heading"><strong>${escapeHtml(key.replace(/([A-Z])/g, ' $1'))}</strong><button class="button button-ghost website-information-save" type="button" data-information-key="${escapeHtml(key)}">Save</button></div><div class="field"><label for="information-title-${escapeHtml(key)}">Heading</label><input id="information-title-${escapeHtml(key)}" data-information-title="${escapeHtml(key)}" value="${escapeHtml(section.title || '')}"></div><div class="field"><label for="information-text-${escapeHtml(key)}">Text or list items</label><textarea id="information-text-${escapeHtml(key)}" data-information-text="${escapeHtml(key)}">${escapeHtml(section.text || section.items || '')}</textarea></div></article>`).join('');
  websiteInformationFields.querySelectorAll('.website-information-save').forEach((button) => button.addEventListener('click', () => {
    const key = button.dataset.informationKey;
    data.websiteInformation = data.websiteInformation || {};
    data.websiteInformation[key] = {
      title: document.querySelector(`[data-information-title="${CSS.escape(key)}"]`).value,
      text: document.querySelector(`[data-information-text="${CSS.escape(key)}"]`).value
    };
    saveSiteData(data);
    showMessage(`${key} information saved.`);
  }));
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
contentPage.addEventListener('change', fillPageContentForm);
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
renderWebsiteInformation();
renderEvents();
renderInquiries();
renderPartnerships();
bindAdminViews();

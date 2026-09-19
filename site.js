const defaultSiteData = {
  about: {
    title: 'Connecting Knowledge, People & Expertise Across the Globe',
    text: 'Keep your existing About paragraph here.'
  },
  contact: {
    email: 'nvsinternstional.office@gmail.com',
    phone: '+91 9505811873',
    location: 'Dilshuknagar, Hyderabad, India'
  },
  pageContent: {
    home: { eyebrow: 'NVS INTERNATIONAL SERVICES / GLOBAL SCIENTIFIC EXCELLENCE', title: 'Empowering Scientific Innovation & Global Collaboration.', text: 'Connecting researchers, academicians, industry professionals, and institutions through premier international conferences, scientific events, and global knowledge-sharing platforms.' },
    about: { eyebrow: 'ABOUT US', title: 'Connecting Knowledge, People & Expertise Across the Globe', text: 'Keep your existing About paragraph here.' },
    conferences: { eyebrow: 'UPCOMING CONFERENCES', title: 'Explore Our Upcoming Conferences', text: 'Explore our upcoming international conferences, bringing together researchers, academics, scientists, engineers, industry professionals, innovators, and scientific communities from around the world.' },
    sponsors: { eyebrow: 'SPONSORS & EXHIBITORS', title: 'Partner With NVS International Services', text: 'NVS International Services welcomes companies, organizations, institutions, technology providers, publishers, manufacturers, laboratories, and professional associations to partner with our international scientific conferences.' },
    exhibitors: { eyebrow: 'EXHIBITION OPPORTUNITY', title: 'Showcase Your Organization, Products & Innovations', text: 'The Exhibitor package is designed for organizations that want to directly showcase their products, technologies, services, equipment, publications, or solutions to an international scientific and professional audience.' },
    gallery: { eyebrow: 'GALLERY', title: 'Gallery', text: 'Gallery' },
    general: { eyebrow: 'GENERAL INFORMATION', title: 'Information for every participant.', text: 'Terms & Conditions, Cancellation & Refund Policy, FAQs, and Privacy Policy.' },
    contact: { eyebrow: 'CONTACT', title: 'Get in Touch', text: 'Connect With NVS International Services' }
  },
  websiteInformation: {
    about: { title: 'About NVS International Services', text: 'Connecting Knowledge, People & Expertise Across the Globe' },
    purpose: { title: 'Advancing Global Scientific Connections', text: 'Use the six existing points under this section.' },
    expertise: { title: 'Connecting Science, Research & Industry', items: 'International Conferences & Scientific Meetings\nAcademic & Research Events\nWorkshops, Seminars & Symposiums\nProfessional Networking & Knowledge Exchange\nConference Promotion & Global Outreach\nSpeaker & Participant Engagement\nAcademic Collaboration & Research Networking' },
    community: { title: 'Bringing the Global Scientific Community Together', items: 'Engineering\nMaterials Science\nLife Sciences\nMedicine\nTechnology\nEnvironmental Sciences\nData Science' },
    mission: { title: 'Building Platforms for Meaningful Scientific Exchange', text: 'Creating a Connected Global Research Ecosystem\nProfessionalism. Transparency. Quality. Collaboration.' },
    reach: { title: 'Connecting Science Across Borders', items: '250+ Annual Events\n2,000+ Speakers\n150+ Countries\n70+ Attendees' },
    why: { title: 'Why NVS International Services?', items: 'Designed for Conferences of All Scales\nTrusted by Researchers Worldwide\nSupports Emerging Technologies & Advanced Disciplines\nEncourages Networking, Collaboration & Discovery\nUser-Friendly Platforms with Efficient Event Management' },
    services: { title: 'We Deliver Professional Scientific Event Solutions', items: 'Event Creation\nGlobal Promotion\nWorldwide Event Reach\nRegistration Management\nAudience Targeting\nKnowledge Hub' },
    partnerships: { title: 'Partner With NVS International Services', text: 'Our Sponsorship & Exhibition Program provides a professional platform to strengthen brand visibility, showcase innovations, connect with researchers and industry professionals, and build meaningful global relationships.' },
    sponsorships: { title: 'Sponsorship Opportunities', items: 'PLATINUM SPONSOR - EUR 5,000\nGOLD SPONSOR - EUR 4,000\nSILVER SPONSOR - EUR 3,000\nADVERTISING SPONSOR - EUR 1,000' },
    exhibition: { title: 'Showcase Your Organization, Products & Innovations', text: 'The Exhibitor package is designed for organizations that want to directly showcase their products, technologies, services, equipment, publications, or solutions to an international scientific and professional audience.' },
    conferenceProgram: { title: 'Explore Our Upcoming Conferences', items: 'Renewable Energy 2027 - March 3–4, 2027\nMaterials Science 2027 - March 10–12, 2027\nNanotechnology 2027 - April 2027\nBiotechnology 2027 - May 2027\nArtificial Intelligence 2027 - June 2027\nEnvironmental Science 2027 - September 2027\nEngineering 2027 - October 2027\nHealthcare & Medical Sciences 2027 - November 2027' },
    policies: { title: 'General Information', items: 'Terms & Conditions\nCancellation & Refund Policy\nFrequently Asked Questions (FAQs)\nPrivacy Policy' },
    finalCta: { title: 'Be Part of the Global Scientific Community', text: 'Discover upcoming conferences, connect with experts, share your research, and explore new opportunities for scientific collaboration.' },
    footer: { title: 'Stay Updated', text: 'Subscribe to receive conference news, program updates, and announcements directly in your inbox.' }
  },
  inquiries: [],
  partnerships: [
    { id: 'platinum-sponsor', type: 'sponsor', name: 'PLATINUM SPONSOR', price: 'EUR 5,000', title: 'Exclusive Premium Partnership', description: 'The Platinum Sponsorship package provides the highest level of visibility and recognition across the conference ecosystem.', benefits: 'Logo placement on the conference website\nRecognition as an official sponsor\nPromotional materials\nSocial media recognition\nOpportunity to connect with researchers and professionals' },
    { id: 'gold-sponsor', type: 'sponsor', name: 'GOLD SPONSOR', price: 'EUR 4,000', title: 'Premium Visibility & Strategic Brand Exposure', description: 'The Gold Sponsorship package provides strong brand exposure and direct engagement with the international conference community.', benefits: 'Logo placement on the conference website\nRecognition as an official sponsor\nPromotional materials\nSocial media recognition\nOpportunity to connect with researchers and professionals' },
    { id: 'silver-sponsor', type: 'sponsor', name: 'SILVER SPONSOR', price: 'EUR 3,000', title: 'Professional Visibility & Brand Recognition', description: 'The Silver Sponsorship package is designed for organizations seeking professional visibility and recognition within the conference community.', benefits: 'Logo placement on the conference website\nRecognition as an official sponsor\nPromotional materials\nSocial media recognition\nOpportunity to connect with researchers and professionals' },
    { id: 'advertising-sponsor', type: 'sponsor', name: 'ADVERTISING SPONSOR', price: 'EUR 1,000', title: 'Targeted Brand Promotion', description: 'The Advertising Sponsorship package provides an affordable way for organizations to promote their brand, products, services, publications, or upcoming initiatives.', benefits: 'Logo placement on the conference website\nDigital advertisement placement\nSocial media recognition\nAdvertising certificate' },
    { id: 'exhibitor', type: 'exhibitor', name: 'EXHIBITOR', price: 'EUR 3,000', title: 'Showcase Your Organization, Products & Innovations', description: 'The Exhibitor package is designed for organizations that want to directly showcase their products, technologies, services, equipment, publications, or solutions.', benefits: 'Company logo on the conference website\nDedicated exhibitor listing\nCompany profile and description\nDigital exhibition presence\nOpportunity to showcase products and services\nExhibitor certificate' }
  ],
  conferences: [
    { id: 'renewable-energy-2027', status: 'upcoming', date: 'March 3–4, 2027', title: 'Renewable Energy 2027', description: 'World Conference on Renewable Energy & Sustainable Energy', location: 'Virtual Conference | Live Online', theme: 'Advancing Sustainable Energy Futures: Innovation, Integration, and Global Impact', images: [] },
    { id: 'materials-science-2027', status: 'upcoming', date: 'March 10–12, 2027', title: 'Materials Science 2027', description: 'International Conference on Advanced Materials Science and Engineering', location: 'Berlin, Germany', theme: 'Innovations and Breakthroughs in Materials Science and Engineering', images: [] },
    { id: 'nanotechnology-2027', status: 'upcoming', date: 'April 2027', title: 'Nanotechnology 2027', description: 'International Conference on Nanotechnology & Nanomaterials', location: 'Amsterdam, Netherlands', theme: 'Exploring the Frontiers of Nanoscale Science and Technology', images: [] },
    { id: 'biotechnology-2027', status: 'upcoming', date: 'May 2027', title: 'Biotechnology 2027', description: 'International Conference on Biotechnology & Life Sciences', location: 'Europe', theme: 'Innovations in Biotechnology for a Sustainable Future', images: [] },
    { id: 'artificial-intelligence-2027', status: 'upcoming', date: 'June 2027', title: 'Artificial Intelligence 2027', description: 'International Conference on Artificial Intelligence, Data Science & Emerging Technologies', location: 'Europe', theme: 'Intelligent Technologies Transforming Science, Industry & Society', images: [] },
    { id: 'environmental-science-2027', status: 'upcoming', date: 'September 2027', title: 'Environmental Science 2027', description: 'International Conference on Environmental Science & Sustainable Technologies', location: 'Europe', theme: 'Innovative Solutions for a Sustainable and Resilient Future', images: [] },
    { id: 'engineering-2027', status: 'upcoming', date: 'October 2027', title: 'Engineering 2027', description: 'International Conference on Engineering, Technology & Innovation', location: 'Europe', theme: 'Engineering Innovation for the Next Generation', images: [] },
    { id: 'healthcare-medical-sciences-2027', status: 'upcoming', date: 'November 2027', title: 'Healthcare & Medical Sciences 2027', description: 'International Conference on Healthcare, Medical & Biomedical Sciences', location: 'Europe', theme: 'Advancing Healthcare Through Science, Technology & Innovation', images: [] }
  ]
};

function getSiteData() {
  try {
    const savedData = JSON.parse(localStorage.getItem('nvs-site-data'));
    const baseData = structuredClone(defaultSiteData);
    if (!savedData) return baseData;

    const mergedData = {
      ...baseData,
      ...savedData,
      about: { ...baseData.about, ...(savedData.about || {}) },
      contact: { ...baseData.contact, ...(savedData.contact || {}) },
      pageContent: { ...baseData.pageContent, ...(savedData.pageContent || {}) },
      websiteInformation: { ...baseData.websiteInformation, ...(savedData.websiteInformation || {}) },
      partnerships: Array.isArray(savedData.partnerships) ? savedData.partnerships : structuredClone(baseData.partnerships),
      conferences: Array.isArray(savedData.conferences) && savedData.conferences.length ? savedData.conferences.map((conference) => ({ ...conference, images: Array.isArray(conference.images) ? conference.images : [] })) : structuredClone(baseData.conferences),
      inquiries: Array.isArray(savedData.inquiries) ? savedData.inquiries : []
    };

    if (savedData.about?.text === 'NVS International Services is an organization supporting international conferences, scientific events, academic networking, professional engagement, and global knowledge exchange.') {
      mergedData.about.text = baseData.about.text;
      saveSiteData(mergedData);
    }
    return mergedData;
  } catch (error) {
    return structuredClone(defaultSiteData);
  }
}

function getWebsiteInformation() {
  return { ...(defaultSiteData.websiteInformation || {}), ...(getSiteData().websiteInformation || {}) };
}

function getPartnerships() {
  return getSiteData().partnerships || structuredClone(defaultSiteData.partnerships);
}

function saveSiteData(data) {
  localStorage.setItem('nvs-site-data', JSON.stringify(data));
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderHeader(activePage = '') {
  const links = [
    ['index.html', 'Home', 'home'],
    ['about.html', 'About Us', 'about'],
    ['conferences.html', 'Conferences', 'conferences'],
    ['sponsors.html', 'Sponsors', 'sponsors'],
    ['exhibitors.html', 'Exhibitors', 'exhibitors'],
    ['gallery.html', 'Gallery', 'gallery'],
    ['general-information.html', 'General Information', 'general'],
    ['contact.html', 'Contact Us', 'contact']
  ];
  return `<header class="site-header"><a class="brand" href="index.html"><img class="brand-logo" src="logo.svg" alt="NVS International Services"><span class="brand-name">NVS International<br>Services</span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button><nav class="main-nav">${links.map(([href, label, key]) => `<a class="${key === activePage ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</nav></header>`;
}

function renderFooter() {
  return `<footer class="site-footer"><div class="footer-columns"><div class="footer-company"><img class="footer-logo" src="logo.svg" alt="NVS International Services"><p>Empowering Scientific Innovation & Global Collaboration</p><strong>ORGANIZED BY NVS INTERNATIONAL SERVICES</strong></div><div class="footer-links"><h3>QUICK LINKS</h3><a href="about.html">About Us</a><a href="conferences.html">Upcoming Conferences</a><a href="sponsors.html">Sponsors & Exhibitors</a><a href="contact.html">Contact Us</a></div><div class="footer-contact"><h3>CONTACT INFO</h3><a href="mailto:${escapeHtml(getSiteData().contact.email)}">${escapeHtml(getSiteData().contact.email)}</a><a href="tel:${escapeHtml(getSiteData().contact.phone)}">${escapeHtml(getSiteData().contact.phone)}</a><span>${escapeHtml(getSiteData().contact.location)}</span></div></div><div class="footer-bottom"><span>© 2026 NVS International Services. All rights reserved.</span><span>NVS INTERNATIONAL SERVICES</span></div></footer>`;
}

function renderShell(page, activePage, content) {
  document.body.innerHTML = `${renderHeader(activePage)}<main class="inner-page ${page}">${content}</main>${renderFooter()}`;
  bindNavigation();
  if (page === 'partners-page') window.addEventListener('storage', () => window.location.reload());
}

function bindNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => mainNav.classList.remove('open')));
}

function conferenceCard(conference) {
  return `<article class="conference-card ${conference.status === 'previous' ? 'previous-card' : ''}"><div class="date"><b>${escapeHtml(conference.date.split(' ')[0])}</b><span>${escapeHtml(conference.date.split(' ').slice(1).join(' '))}</span></div><div class="conference-info"><p class="tag">${escapeHtml(conference.location)}</p><h3>${escapeHtml(conference.title)}</h3><p>${escapeHtml(conference.description)}</p><p class="theme"><b>Theme:</b> ${escapeHtml(conference.theme)}</p><a class="text-link" href="gallery.html#${escapeHtml(conference.id)}">Event Gallery <span>↗</span></a></div><a class="circle-link" href="gallery.html#${escapeHtml(conference.id)}" aria-label="Open ${escapeHtml(conference.title)} gallery">↗</a></article>`;
}

function renderConferences(status) {
  const conferences = getSiteData().conferences.filter((conference) => conference.status === status);
  return conferences.length ? conferences.map(conferenceCard).join('') : `<div class="empty-state"><p>No ${status} conferences have been added yet.</p></div>`;
}

function getPageContent(pageKey, fallback = {}) {
  return { ...(defaultSiteData.pageContent?.[pageKey] || {}), ...fallback, ...(getSiteData().pageContent?.[pageKey] || {}) };
}

function pageIntro(pageKey, number, eyebrow, title, text) {
  const content = getPageContent(pageKey, { eyebrow, title, text });
  return `<section class="page-hero section-dark"><div class="section-label light-label">${number} / ${escapeHtml(content.eyebrow)}</div><div class="page-hero-copy"><h1>${escapeHtml(content.title)}</h1><p>${escapeHtml(content.text)}</p></div></section>`;
}

function renderGallery() {
  window.__galleryAutoScrollTimers?.forEach((timer) => window.clearInterval(timer));
  window.__galleryAutoScrollTimers = [];
  window.__galleryAutoScrollGeneration = (window.__galleryAutoScrollGeneration || 0) + 1;
  const galleryGeneration = window.__galleryAutoScrollGeneration;
  const conferences = getSiteData().conferences;
  const blocks = conferences.map((conference) => {
    const images = Array.isArray(conference.images) ? conference.images : [];
    const gallery = images.length ? `<div class="gallery-side"><div class="gallery-slider-shell"><button class="gallery-control" type="button" data-gallery-previous="${escapeHtml(conference.id)}" aria-label="Previous images">←</button><div class="gallery-grid" data-gallery-track="${escapeHtml(conference.id)}">${images.map((image, index) => `<figure><button class="gallery-image-button" type="button" data-gallery-event="${escapeHtml(conference.id)}" data-gallery-index="${index}" aria-label="Open ${escapeHtml(image.name || 'Gallery image')}"><img src="${image.data}" alt="${escapeHtml(image.name)}"></button></figure>`).join('')}</div><button class="gallery-control" type="button" data-gallery-next="${escapeHtml(conference.id)}" aria-label="Next images">→</button></div><div class="gallery-dots" data-gallery-dots="${escapeHtml(conference.id)}" aria-label="Gallery position"></div></div>` : '';
    return `<section class="gallery-event${gallery ? ' has-images' : ''}" id="${escapeHtml(conference.id)}"><div class="gallery-event-heading"><p class="tag">${escapeHtml(conference.date)} / ${escapeHtml(conference.status)}</p><div class="gallery-title-row"><h2>${escapeHtml(conference.title)}</h2><span class="gallery-title-separator" aria-hidden="true">|</span><p>${escapeHtml(conference.description)}</p></div></div>${gallery}</section>`;
  }).join('');
  renderShell('gallery-page', 'gallery', `${pageIntro('gallery', '06', 'GALLERY', 'Gallery', 'Gallery')}${blocks}<div class="image-lightbox" id="image-lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery image" aria-hidden="true"><div class="lightbox-overlay-click" aria-hidden="true"></div><button class="lightbox-close" type="button" aria-label="Close expanded image">×</button><div class="lightbox-meta" id="lightbox-counter" aria-live="polite">1 / 1</div><button class="lightbox-nav lightbox-previous" type="button" aria-label="Previous image">←</button><img id="lightbox-image" alt=""><button class="lightbox-nav lightbox-next" type="button" aria-label="Next image">→</button></div>`);
  const lightbox = document.querySelector('#image-lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCounter = document.querySelector('#lightbox-counter');
  const lightboxPrevious = document.querySelector('.lightbox-previous');
  const lightboxNext = document.querySelector('.lightbox-next');
  let lightboxEvent = null;
  let lightboxIndex = 0;
  const getImages = () => conferences.find((conference) => conference.id === lightboxEvent)?.images || [];
  const showLightboxImage = () => {
    const images = getImages();
    if (!images.length) return;
    lightboxIndex = (lightboxIndex + images.length) % images.length;
    lightbox.classList.toggle('has-multiple', images.length > 1);
    lightboxImage.src = images[lightboxIndex].data;
    lightboxImage.alt = images[lightboxIndex].name || '';
    if (lightboxCounter) lightboxCounter.textContent = `${lightboxIndex + 1} / ${images.length}`;
  };
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('has-multiple');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    lightboxCounter.textContent = '1 / 1';
    document.body.classList.remove('lightbox-open');
  };
  const moveGallery = (eventId, direction) => {
    const track = document.querySelector(`[data-gallery-track="${CSS.escape(eventId)}"]`);
    if (!track) return;
    const slideDistance = Math.max(track.clientWidth * 0.8, 220);
    track.scrollTo({ left: Math.min(Math.max(track.scrollLeft + direction * slideDistance, 0), track.scrollWidth - track.clientWidth), behavior: 'smooth' });
  };
  const updateGalleryControls = (eventId) => {
    const track = document.querySelector(`[data-gallery-track="${CSS.escape(eventId)}"]`);
    const prev = document.querySelector(`[data-gallery-previous="${CSS.escape(eventId)}"]`);
    const next = document.querySelector(`[data-gallery-next="${CSS.escape(eventId)}"]`);
    if (!track || !prev || !next) return;
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    prev.disabled = atStart;
    next.disabled = atEnd;
    prev.classList.toggle('is-hidden', atStart);
    next.classList.toggle('is-hidden', atEnd);
  };
  const updateGalleryDots = (eventId) => {
    const track = document.querySelector(`[data-gallery-track="${CSS.escape(eventId)}"]`);
    const dots = document.querySelector(`[data-gallery-dots="${CSS.escape(eventId)}"]`);
    if (!track || !dots) return;
    const pageCount = Math.max(1, Math.ceil(track.scrollWidth / Math.max(track.clientWidth, 1)));
    if (dots.children.length !== pageCount) dots.innerHTML = Array.from({ length: pageCount }, (_, index) => `<button type="button" data-gallery-page="${index}" aria-label="Show gallery page ${index + 1}"></button>`).join('');
    const page = Math.min(pageCount - 1, Math.max(0, Math.round(track.scrollLeft / Math.max(track.clientWidth, 1))));
    dots.querySelectorAll('button').forEach((dot, index) => dot.classList.toggle('active', index === page));
    dots.querySelectorAll('[data-gallery-page]').forEach((dot) => dot.addEventListener('click', () => {
      track.scrollTo({ left: Number(dot.dataset.galleryPage) * track.clientWidth, behavior: 'smooth' });
    }));
    updateGalleryControls(eventId);
  };
  document.querySelectorAll('[data-gallery-track]').forEach((track) => {
    const eventId = track.dataset.galleryTrack;
    const handleScroll = () => updateGalleryDots(eventId);
    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }, { passive: false });
    let dragStartX = 0;
    let dragStartScroll = 0;
    track.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target.closest('.gallery-image-button')) return;
      dragStartX = event.clientX;
      dragStartScroll = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
    });
    track.addEventListener('pointermove', (event) => {
      if (!track.hasPointerCapture(event.pointerId)) return;
      const distance = event.clientX - dragStartX;
      if (Math.abs(distance) > 4) track.classList.add('is-dragging');
      track.scrollLeft = dragStartScroll - distance;
    });
    track.addEventListener('pointerup', (event) => {
      track.releasePointerCapture(event.pointerId);
      track.classList.remove('is-dragging');
    });
    track.addEventListener('pointercancel', () => {
      track.classList.remove('is-dragging');
    });
    window.addEventListener('resize', handleScroll);
    updateGalleryDots(eventId);
    const advanceGallery = () => {
      if (galleryGeneration !== window.__galleryAutoScrollGeneration) return;
      if (!track.classList.contains('is-dragging') && track.scrollWidth > track.clientWidth + 2) {
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        track.classList.add('is-auto-scrolling');
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = atEnd ? 0 : track.scrollLeft + 2;
        updateGalleryDots(eventId);
      }
    };
    const autoScrollTimer = window.setInterval(advanceGallery, 80);
    let lastAutoScroll = 0;
    const autoScroll = (timestamp) => {
      if (galleryGeneration !== window.__galleryAutoScrollGeneration) return;
      if (timestamp - lastAutoScroll >= 80) {
        advanceGallery();
        lastAutoScroll = timestamp;
      }
      const frame = window.requestAnimationFrame(autoScroll);
      track.dataset.galleryAutoScrollFrame = String(frame);
    };
    const firstAutoScrollFrame = window.requestAnimationFrame(autoScroll);
    track.dataset.galleryAutoScrollTimer = String(autoScrollTimer);
    window.__galleryAutoScrollTimers.push(autoScrollTimer);
    track.dataset.galleryAutoScrollFrame = String(firstAutoScrollFrame);
  });
  document.querySelectorAll('[data-gallery-previous]').forEach((button) => button.addEventListener('click', () => moveGallery(button.dataset.galleryPrevious, -1)));
  document.querySelectorAll('[data-gallery-next]').forEach((button) => button.addEventListener('click', () => moveGallery(button.dataset.galleryNext, 1)));
  document.querySelectorAll('[data-gallery-event]').forEach((button) => button.addEventListener('click', () => {
    lightboxEvent = button.dataset.galleryEvent;
    lightboxIndex = Number(button.dataset.galleryIndex);
    showLightboxImage();
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightboxPrevious.addEventListener('click', () => { lightboxIndex -= 1; showLightboxImage(); });
  lightboxNext.addEventListener('click', () => { lightboxIndex += 1; showLightboxImage(); });
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox || event.target.classList.contains('lightbox-overlay-click')) closeLightbox(); });
  let lightboxTouchStartX = 0;
  lightbox.addEventListener('touchstart', (event) => {
    lightboxTouchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });
  lightbox.addEventListener('touchend', (event) => {
    const distance = (event.changedTouches[0]?.clientX || 0) - lightboxTouchStartX;
    if (Math.abs(distance) < 45) return;
    lightboxIndex += distance < 0 ? 1 : -1;
    showLightboxImage();
  }, { passive: true });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') { lightboxIndex -= 1; showLightboxImage(); }
    if (event.key === 'ArrowRight') { lightboxIndex += 1; showLightboxImage(); }
  });
}

function startPage() {
  const page = document.body.dataset.page;
  if (page === 'gallery') {
    renderGallery();
    window.addEventListener('storage', (event) => {
      if (event.key === 'nvs-site-data') renderGallery();
    });
  }
  if (page === 'about') {
    const data = getSiteData();
    renderShell('about-page', 'about', `${pageIntro('about', '01', 'ABOUT US', 'Connecting Knowledge, People & Expertise Across the Globe', data.about.text)}<section class="page-section section-light"><div class="section-label">02 / OUR PURPOSE</div><div class="split-heading"><h2>Advancing Global Scientific Connections</h2><p>Use the six existing points under this section.</p></div></section>`);
  }
  if (page === 'conferences') {
    renderShell('conferences-page', 'conferences', `${pageIntro('conferences', '02', 'UPCOMING CONFERENCES', 'Explore Our Upcoming Conferences', 'Explore our upcoming international conferences, bringing together researchers, academics, scientists, engineers, industry professionals, innovators, and scientific communities from around the world.') }<section class="page-section section-paper"><div class="conference-tabs"><a class="tab active" href="#upcoming">Upcoming Conferences</a><a class="tab" href="#previous">Previous Held Conferences</a></div><div id="upcoming" class="conference-panel"><h2>Upcoming Conferences</h2><div class="conference-list">${renderConferences('upcoming')}</div></div><div id="previous" class="conference-panel is-hidden"><h2>Previous Held Conferences</h2><div class="conference-list">${renderConferences('previous')}</div></div></section>`);
    const conferenceTabs = document.querySelectorAll('.conference-tabs .tab');
    const conferencePanels = document.querySelectorAll('.conference-panel');
    const showConferencePanel = (panelId) => {
      conferencePanels.forEach((panel) => panel.classList.toggle('is-hidden', panel.id !== panelId));
      conferenceTabs.forEach((tab) => tab.classList.toggle('active', tab.getAttribute('href') === `#${panelId}`));
    };
    conferenceTabs.forEach((tab) => tab.addEventListener('click', (event) => {
      event.preventDefault();
      const panelId = tab.getAttribute('href').slice(1);
      window.history.replaceState(null, '', `#${panelId}`);
      showConferencePanel(panelId);
    }));
    showConferencePanel(window.location.hash === '#previous' ? 'previous' : 'upcoming');
  }
  if (page === 'sponsors') renderShell('partners-page', 'sponsors', `${pageIntro('sponsors', '03', 'SPONSORS & EXHIBITORS', 'Partner With NVS International Services', 'NVS International Services welcomes companies, organizations, institutions, technology providers, publishers, manufacturers, laboratories, and professional associations to partner with our international scientific conferences.') }<section class="page-section section-dark"><div class="package-grid">${getPartnerships().filter((partner) => partner.type === 'sponsor').map(partnerCard).join('')}</div></section>`);
  if (page === 'exhibitors') renderShell('partners-page', 'exhibitors', `${pageIntro('exhibitors', '04', 'EXHIBITION OPPORTUNITY', 'Showcase Your Organization, Products & Innovations', 'The Exhibitor package is designed for organizations that want to directly showcase their products, technologies, services, equipment, publications, or solutions to an international scientific and professional audience.') }<section class="page-section section-dark"><div class="package-grid">${getPartnerships().filter((partner) => partner.type === 'exhibitor').map(partnerCard).join('')}</div></section>`);
  if (page === 'general') renderGeneralPage();
  if (page === 'contact') {
    const data = getSiteData();
    const query = new URLSearchParams(window.location.search);
    const partnerName = query.get('partner') || '';
    const partnerSubject = partnerName ? `${partnerName} Enquiry` : '';
    const partnerMessage = partnerName ? `I am interested in the ${partnerName} package.` : '';
    renderShell('contact-page', 'contact', `${pageIntro('contact', '08', 'CONTACT', 'Get in Touch', 'Connect With NVS International Services') }<section class="page-section section-lime"><div class="contact-layout"><div><h2>Connect With NVS International Services</h2><div class="contact-details"><a href="mailto:${escapeHtml(data.contact.email)}"><span>EMAIL</span>${escapeHtml(data.contact.email)}</a><a href="tel:${escapeHtml(data.contact.phone)}"><span>PHONE</span>${escapeHtml(data.contact.phone)}</a><div><span>LOCATION</span>${escapeHtml(data.contact.location)}</div></div></div><form class="contact-form" id="contact-form"><div class="field"><label for="visitor-name">Your name</label><input id="visitor-name" name="name" required></div><div class="field"><label for="visitor-email">Email address</label><input id="visitor-email" name="email" type="email" required></div><div class="field"><label for="visitor-phone">Phone number</label><input id="visitor-phone" name="phone" type="tel" required></div><div class="field"><label for="visitor-subject">Subject</label><input id="visitor-subject" name="subject" value="${escapeHtml(partnerSubject)}" required></div><div class="field"><label for="visitor-message">Message</label><textarea id="visitor-message" name="message" required>${escapeHtml(partnerMessage)}</textarea></div><button class="button button-lime" type="submit">Send Enquiry <span>↗</span></button><p class="form-status" aria-live="polite"></p></form></div></section>`);
    document.querySelector('#contact-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const updatedData = getSiteData();
      updatedData.inquiries = updatedData.inquiries || [];
      updatedData.inquiries.unshift({ id: Date.now(), name: form.get('name'), email: form.get('email'), phone: form.get('phone'), subject: form.get('subject'), message: form.get('message'), date: new Date().toLocaleString() });
      saveSiteData(updatedData);
      event.currentTarget.reset();
      document.querySelector('.form-status').textContent = 'Thank you. Your enquiry has been received.';
    });
  }
}

function packageCard(label, price, title, text) {
  return `<article class="package"><div class="package-top"><span>${label}</span><strong>${price}</strong></div><h2>${title}</h2><p>${text}</p><ul><li>Logo placement on the conference website</li><li>Recognition as an official sponsor</li><li>Promotional materials</li><li>Social media recognition</li><li>Opportunity to connect with researchers and professionals</li></ul><a class="text-link" href="mailto:nvsinternstional.office@gmail.com?subject=${encodeURIComponent(label)} Enquiry">Become a ${label.toLowerCase()} <span>↗</span></a></article>`;
}

function partnerCard(partner) {
  const benefits = String(partner.benefits || '').split('\n').filter(Boolean).map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join('');
  return `<article class="package"><div class="package-top"><span>${escapeHtml(partner.name)}</span><strong>${escapeHtml(partner.price)}</strong></div><h2>${escapeHtml(partner.title)}</h2><p>${escapeHtml(partner.description)}</p><ul>${benefits}</ul><a class="text-link" href="contact.html?partner=${encodeURIComponent(partner.name)}">Become a ${escapeHtml(partner.name.toLowerCase())} <span>↗</span></a></article>`;
}

function renderGeneralPage() {
  renderShell('general-page', 'general', `${pageIntro('general', '07', 'GENERAL INFORMATION', 'Information for every participant.', 'Terms & Conditions, Cancellation & Refund Policy, FAQs, and Privacy Policy.') }<section class="page-section section-light"><div class="accordion">${generalDetails()}</div></section>`);
  document.querySelectorAll('details').forEach((detail) => detail.addEventListener('toggle', () => { if (detail.open) document.querySelectorAll('details[open]').forEach((other) => { if (other !== detail) other.removeAttribute('open'); }); }));
}

function generalDetails() {
  return `<details><summary>Terms & Conditions <span>+</span></summary><div class="details-body"><p>By accessing the NVS International Services website, submitting an abstract, registering for a conference, or participating in any event organized by NVS International Services, you acknowledge that you have read and agreed to these Terms & Conditions.</p><p>Registration is required for participation. Participants are responsible for accurate information, applicable fees, presentations, travel, accommodation, visa, meals, insurance, and personal expenses unless specifically stated otherwise. Abstracts are subject to the applicable review process; submission does not guarantee acceptance or publication.</p><p>Conference dates, speakers, sessions, venues, and schedules may be modified due to organizational, technical, or unforeseen circumstances. All participants are expected to maintain professional and respectful conduct.</p></div></details><details><summary>Cancellation & Refund Policy <span>+</span></summary><div class="details-body"><p>Participants who wish to cancel their registration should submit a written cancellation request. Unless otherwise stated for a specific conference, the general refund structure may apply:</p><p><b>More than 60 days:</b> 60% &nbsp; <b>60-40 days:</b> 50% &nbsp; <b>40-30 days:</b> 25% &nbsp; <b>30 days or less:</b> No Refund &nbsp; <b>No-show:</b> No Refund</p><p>Administrative, processing, bank, payment gateway, customized, promotional, and utilized services may be non-refundable. Approved refunds are generally processed through the applicable payment method.</p></div></details><details><summary>Frequently Asked Questions <span>+</span></summary><div class="details-body"><p><b>Who can participate?</b> Researchers, scientists, professors, academicians, engineers, industry professionals, students, research scholars, technology experts, institutions, and other relevant professionals.</p><p><b>How can I submit an abstract?</b> Visit the relevant conference website and select the Abstract Submission option. Follow the submission guidelines for the respective conference.</p><p><b>What presentation formats are available?</b> Oral presentations, poster presentations, keynote lectures, invited presentations, workshops, industry sessions, and panel discussions may be available depending on the conference.</p><p><b>Can I attend without presenting?</b> Yes. Where available, participants may register under the Delegate/Listener category.</p></div></details><details><summary>Privacy Policy <span>+</span></summary><div class="details-body"><p>NVS International Services respects the privacy of visitors, participants, speakers, sponsors, exhibitors, authors, and other users of its websites. Information may include name, email, phone, organization, professional designation, country, research interests, abstract and presentation information, registration information, payment-related information, and communication preferences.</p><p>Information may be used to process registrations, manage abstract submissions, communicate updates, coordinate participation, issue certificates, support enquiries, and improve services. NVS International Services does not sell personal information as a commercial mailing list.</p><p>For privacy questions, contact nvsinternstional.office@gmail.com.</p></div></details>`;
}

if (document.body.dataset.page) startPage();

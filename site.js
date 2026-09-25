const defaultSiteData = {
  about: {
    title: 'About NVS International Services',
    text: 'NVS International Services is an international scientific conference and event organization based in Hyderabad, India, creating professional platforms for research exchange and collaboration.'
  },
  contact: {
    email: 'nvsinternstional.office@gmail.com',
    phone: '+91 9505811873',
    location: 'Dilshuknagar, Hyderabad, India'
  },
  pageContent: {
    home: { eyebrow: 'NVS INTERNATIONAL SERVICES / GLOBAL SCIENTIFIC EXCELLENCE', title: 'Empowering Scientific Innovation & Global Collaboration.', text: 'Connecting researchers, academicians, industry professionals, and institutions through premier international conferences, scientific events, and global knowledge-sharing platforms.' },
    about: { eyebrow: 'ABOUT US', title: 'About NVS International Services', text: 'Connecting scientific communities through knowledge, research and collaboration.' },
    conferences: { eyebrow: 'UPCOMING CONFERENCES', title: 'Explore Our Upcoming Conferences', text: 'Explore our upcoming international conferences, bringing together researchers, academics, scientists, engineers, industry professionals, innovators, and scientific communities from around the world.' },
    sponsors: { eyebrow: 'PARTNER WITH NVS', title: 'Sponsor and Exhibitor', text: 'Sponsor · Exhibit · Connect · Engage' },
    exhibitors: { eyebrow: 'PARTNER WITH NVS', title: 'Sponsor and Exhibitor', text: 'Sponsor · Exhibit · Connect · Engage' },
    gallery: { eyebrow: 'GALLERY', title: 'Gallery', text: 'Gallery' },
    general: { eyebrow: 'GENERAL INFORMATION', title: 'General Information', text: 'Guidelines, policies, publication details, and participant support.' },
    contact: { eyebrow: 'CONTACT', title: 'Get in Touch', text: 'Connect With NVS International Services' }
  },
  websiteInformation: {
    about: { title: 'About NVS International Services', text: 'Connecting scientific communities through knowledge, research and collaboration.' },
    purpose: { title: 'Our Purpose', text: 'We create professional and accessible platforms for the global scientific community to communicate research, exchange knowledge and build opportunities for collaboration.' },
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
  ],
  pages: {
    about: { kind: 'blocks', sections: [
      { id: 'a1', variant: 'opening', kicker: 'CONNECTING SCIENTIFIC COMMUNITIES', heading: 'Knowledge, research and collaboration across borders.', body: "**NVS International Services** is an international scientific conference and event organization based in Hyderabad, India, focused on creating professional platforms for the exchange of scientific knowledge, research findings, technical developments and professional expertise.\n\nWe organize and coordinate international conferences, scientific meetings, academic programs, workshops, technical sessions, research presentations and industry-oriented events across scientific, engineering, technological, healthcare and interdisciplinary fields. Our events bring together researchers, scientists, academicians, professors, industry professionals, research scholars, students, entrepreneurs, technology experts and representatives of universities and research institutions.\n\nParticipants can present their work, discuss current developments, exchange ideas, establish professional connections and explore areas of common research interest." },
      { id: 'a2', kicker: '01 / WHO WE ARE', heading: 'Professional platforms for scientific exchange.', body: "NVS International Services was established to support communication and interaction within the international scientific and professional community. Research continues to develop through new discoveries, technologies, methodologies and applications. We believe well-organized scientific events help researchers and professionals understand developments beyond their own institutions and areas of specialization.\n\nOur work focuses on conference programs that bring people together across areas of expertise while maintaining a clear scientific and professional focus. We work with researchers, academic professionals, scientific contributors, institutions and industry representatives to develop programs that reflect current research interests and emerging areas of science and technology." },
      { id: 'a3', kicker: '02 / WHAT WE DO', heading: 'Scientific events, planned around their communities.', body: "We support the planning, coordination and management of international scientific events. Depending on each event's theme and objectives, our work may include:", listStyle: 'definition', listItems: ["International scientific conferences :: Programs built around a defined theme, scientific scope and relevant areas of emerging research.", "Research presentations :: Keynote, plenary, invited, oral and poster presentations that share research findings and professional expertise.", "Workshops and technical sessions :: Focused discussion of research areas, technologies, methodologies and practical applications.", "Academic and professional networking :: Opportunities to meet, exchange ideas and establish professional relationships across institutions and countries.", "Industry participation :: Presentations, exhibitions, demonstrations and sponsorship programs for relevant organizations."] },
      { id: 'a4', kicker: '03 / RESEARCH AREAS', heading: 'Interdisciplinary by design.', body: "Our conferences cover a range of disciplines. The scientific scope of each event is developed according to its specific theme and objectives, bringing established research areas into conversation with emerging topics.", listStyle: 'topic', listItems: ["Materials Science and Engineering", "Nanotechnology and Nanoscience", "Advanced Materials", "Polymer Science and Composite Materials", "Energy Materials and Technologies", "Artificial Intelligence and Materials Informatics", "Engineering and Applied Sciences", "Chemical and Process Engineering", "Environmental and Sustainable Technologies", "Biotechnology and Life Sciences", "Healthcare and Medical Sciences", "Physics and Chemistry", "Computational Science and Modelling", "Emerging Technologies", "Interdisciplinary Research"] },
      { id: 'a5', kicker: '04 / SPEAKERS AND PARTICIPANTS', heading: 'A platform for researchers at every career stage.', body: "We welcome researchers and professionals who wish to share their work with an international audience. Depending on the conference program, contributors may participate as keynote speakers, plenary speakers, invited speakers, oral presenters, poster presenters, session contributors, workshop speakers or delegates.\n\nPresentations may include research findings, methodologies, technologies, case studies, recent developments and professional perspectives relevant to the event. Our objective is to provide a structured environment where contributions can be presented and discussed with professionals working in related areas.\n\nWe also encourage research scholars, postgraduate and doctoral students, early-career scientists and young professionals to take part. Presenting research, receiving questions and feedback, learning about current developments and meeting experienced researchers can help emerging researchers build confidence and professional networks." },
      { id: 'a6', kicker: '05 / ACADEMIA AND INDUSTRY', heading: 'Connecting research with application.', body: "Scientific and technological development often involves collaboration between universities, research institutions, laboratories and industry. Our conferences aim to support that interaction. Industry professionals can present relevant technologies, research activities, applications, products and services, while universities and research institutions can share their work and identify common interests.\n\nThrough exhibitions, presentations, technical sessions and networking activities, we seek to encourage communication across the scientific and technological community." },
      { id: 'a7', kicker: '06 / INTERNATIONAL PARTICIPATION', heading: 'Ideas and expertise from around the world.', body: "NVS International Services aims to create conferences with participation from researchers and professionals across countries and regions. International participation helps attendees learn about work being conducted in different institutions and geographical areas, and build connections beyond their local research communities.\n\nDepending on the scientific scope of each conference, participants may come from universities, research centers, laboratories, industry, government and private organizations, academic institutions and independent research groups." },
      { id: 'a8', kicker: '07 / CONFERENCE PROGRAM', heading: "A program shaped by each event's scope.", body: "Each program is developed according to its theme, scientific scope and expected areas of participation. Depending on the event, it may include:", listStyle: 'topic', listItems: ["Opening and welcome sessions", "Keynote presentations and plenary lectures", "Invited presentations and oral technical sessions", "Poster presentations and special scientific sessions", "Workshops and panel discussions", "Industry presentations", "Networking, closing and concluding sessions"], bodyAfter: "The structure may vary from one conference to another so that the scientific content remains relevant to the specific event." },
      { id: 'a9', kicker: '08 / ABSTRACTS AND PRESENTATIONS', heading: 'Clear information throughout the process.', body: "Researchers interested in participating as speakers can submit abstracts describing their research, recent findings, technical developments or professional expertise. Submissions are reviewed for relevance to the scientific scope of the respective conference and may be considered for different presentation formats according to the program.\n\nAccepted contributors may be invited to participate through keynote, plenary, invited, oral or poster presentations, depending on the contribution and the scientific program. Our conference team shares relevant information about abstract submission, presentation format, registration, program scheduling and participation requirements." },
      { id: 'a10', kicker: '09 / COLLABORATION AND EXHIBITIONS', heading: 'Connections that can continue beyond the event.', body: "Conference participation can help researchers identify potential collaborators, discuss shared interests, exchange technical knowledge and explore future academic or professional interaction. Meaningful collaboration often begins with an exchange of ideas between people working on related challenges; we aim to create an environment where those conversations can happen.\n\nSelected conferences may also offer exhibition and sponsorship opportunities for organizations engaging with the scientific community. Exhibitors may introduce technologies, research capabilities, scientific instruments, laboratory solutions, engineering services, software and computational tools, publications, educational services and other research-related products." },
      { id: 'a11', kicker: '10 / OUR APPROACH', heading: 'Professional planning and clear communication.', body: "We focus on professional planning, clear communication, relevant scientific content and organized conference coordination. From the initial announcement and abstract submission process through the scientific program and event coordination, we aim to provide participants with clear information at each stage.", listStyle: 'topic', listItems: ["Scientific programs and speaker invitations", "Abstract submissions and presentation schedules", "Registration and conference materials", "Speaker profiles and participant communication", "Exhibition and sponsorship arrangements", "Venue and event logistics", "Online and hybrid participation"], bodyAfter: "Specific arrangements vary according to the nature and location of each conference. We recognize the time and effort participants invest in scientific events, and aim to communicate requirements, schedules, registration details and event arrangements in a timely and professional manner." },
      { id: 'a12', variant: 'vision', kicker: 'OUR VISION', heading: 'Scientific communication without borders.', body: "Our vision is to develop international platforms that connect scientific communities, encourage knowledge exchange and support professional interaction across disciplines and geographical boundaries. We aim to contribute to a global environment where researchers, academicians, industry professionals, students and institutions can communicate their work and learn from developments around the world." },
      { id: 'a13', kicker: 'OUR MISSION', heading: 'Events that make room for discovery and exchange.', body: "Our mission is to organize and coordinate professional scientific events that:", listStyle: 'topic', listItems: ["Encourage research communication and knowledge exchange", "Provide platforms for scientific presentations", "Support interaction between academia and industry", "Encourage interdisciplinary discussions", "Connect researchers from different countries", "Provide opportunities for students and early-career researchers", "Support professional networking", "Highlight emerging areas of science and technology", "Create opportunities for future academic and professional collaboration"] },
      { id: 'a14', variant: 'closing', kicker: 'LOOKING AHEAD', heading: 'Connecting researchers. Sharing knowledge.', body: "Science and technology continue to develop through collaboration, communication and the exchange of knowledge. NVS International Services aims to grow as an international conference and scientific event organization by developing programs that respond to emerging research areas and the changing needs of the global scientific community.\n\nWe look forward to working with researchers, scientists, academicians, universities, research institutions, industry professionals, students, technology organizations and scientific communities from around the world.", signoff: { strong: 'NVS International Services', span: 'International Conferences · Scientific Events · Research Exchange · Academic Networking · Industry Engagement', b: 'Connecting researchers. Sharing knowledge. Supporting scientific collaboration.' } }
    ] },
    sponsors: { kind: 'blocks', sections: [
      { id: 's1', variant: 'opening', kicker: 'PARTNER WITH NVS INTERNATIONAL SERVICES', heading: 'Connect with the global scientific community.', body: "NVS International Services welcomes **companies, research organizations, academic institutions, technology providers, scientific publishers, laboratories, professional organizations and other relevant organizations** to collaborate through sponsorship and exhibition opportunities at our international scientific conferences and events.\n\nOur conferences bring together researchers, scientists, academicians, industry professionals, research scholars, students and institutional representatives from different countries and professional backgrounds. By partnering with NVS International Services, organizations can present their work, connect with relevant professionals, increase visibility within the scientific community and build meaningful professional relationships." },
      { id: 's2', kicker: '01 / WHY PARTNER WITH NVS?', heading: 'Reach people advancing research and innovation.', body: "Scientific conferences provide a direct environment for organizations to communicate with researchers and professionals involved in research, technology development, education, innovation and industry applications. Partnership can provide opportunities to:", listStyle: 'topic', listItems: ["Present your organization to an international scientific audience", "Showcase products, technologies, services and research capabilities", "Connect with researchers, academicians and industry professionals", "Develop professional and institutional relationships", "Increase visibility within relevant scientific communities", "Introduce new technologies, solutions and services", "Support scientific and academic events", "Participate in technical discussions and networking activities", "Build connections with universities and research institutions", "Explore potential research and industry collaborations"] },
      { id: 's3', kicker: '02 / SPONSORSHIP OPPORTUNITIES', heading: 'Support the conference and build visibility.', body: "Sponsorship opportunities are available for organizations interested in supporting our conferences and gaining visibility throughout the event. Packages can be designed according to the **conference theme, expected audience, event format and level of participation**.\n\nDepending on the selected package, sponsor opportunities may include:", listStyle: 'definition', listItems: ["Conference branding :: Recognition through selected conference materials, event communications, digital platforms and other appropriate conference-related materials.", "Website visibility :: Organization name, logo, company description and website information on the official conference website, depending on the package.", "Conference materials :: Sponsor information in selected digital programs, brochures, banners or other event-related communications.", "Presentation opportunities :: An opportunity to introduce organizational activities, technologies, research capabilities or services to conference participants.", "Exhibition space :: An option to combine sponsorship with an exhibition presence and showcase products, technologies, services, publications or research activities.", "Networking :: Opportunities to interact with researchers, academicians, industry professionals, students and institutional representatives."] },
      { id: 's4', kicker: '03 / EXHIBITION OPPORTUNITIES', heading: 'Showcase work, products and capabilities.', body: "Exhibition opportunities are available for organizations that wish to present products, technologies, services, research activities or institutional capabilities to conference participants. Exhibitions may be relevant to organizations working in:", listStyle: 'topic', listItems: ["Scientific instruments and equipment", "Laboratory technologies", "Research and testing services", "Advanced materials", "Nanotechnology", "Engineering technologies", "Software and computational solutions", "Artificial intelligence and data technologies", "Biotechnology and life sciences", "Healthcare technologies", "Energy and environmental technologies", "Scientific publications", "Educational and training services", "Research support services", "Technical and professional services"], bodyAfter: "Specific exhibition opportunities may vary depending on the conference." },
      { id: 's5', kicker: '04 / WHAT EXHIBITORS CAN SHOWCASE', heading: 'Make your work tangible to participants.', body: "", listStyle: 'definition', listItems: ["Products :: Scientific, technical, laboratory, engineering or research-related products.", "Technologies :: New technologies, platforms, systems and technical solutions.", "Services :: Research, testing, consulting, software, laboratory, educational or professional services.", "Research capabilities :: Institutional research activities, facilities, projects and areas of expertise.", "Publications :: Scientific journals, books, databases, educational resources and other publications.", "Projects and innovations :: Research projects, technologies, applications and innovation initiatives."] },
      { id: 's6', kicker: '05 / BENEFITS OF EXHIBITING', heading: 'Engage directly with conference participants.', body: "An exhibition presence creates an opportunity to communicate your organization's work in a professional scientific environment. Depending on the event and exhibition arrangement, exhibitors may benefit from:", listStyle: 'topic', listItems: ["Direct interaction with conference participants", "Organization and product visibility", "Opportunities to demonstrate technologies and services", "Professional networking", "Interaction with researchers and academic institutions", "Potential research and industry connections", "Access to a multidisciplinary professional audience", "Opportunities to discuss future collaborations"] },
      { id: 's7', kicker: '06 / WHO CAN PARTNER?', heading: 'Organizations across science, education and industry.', body: "", listStyle: 'definition', listItems: ["Companies :: Technology and engineering companies, scientific solution providers, manufacturers and service organizations.", "Research organizations :: Research centers, laboratories, scientific organizations and technology development institutions.", "Universities and academic institutions :: Universities, colleges, academic departments, research centers and educational organizations.", "Scientific publishers :: Academic publishers, scientific journals, database providers and research communication organizations.", "Technology providers :: Developers of software, instruments, computational tools, laboratory technologies, AI solutions and other scientific technologies.", "Professional organizations :: Scientific societies, professional associations, networks and organizations supporting research and education."] },
      { id: 's8', kicker: '07 / SPONSORSHIP LEVELS', heading: 'Options for different goals and levels of participation.', body: "Opportunities may be structured into different levels to accommodate organizations with different requirements and objectives. Benefits are agreed with the NVS conference team and depend on the specific event and package.", listStyle: 'definition', listItems: ["Platinum / Premium Sponsor :: Designed for broader visibility and a strong conference presence. Possible benefits include prominent recognition, logo placement, website visibility, event recognition, exhibition opportunity, an organization profile, promotional material display where applicable, networking and other agreed benefits.", "Gold Sponsor :: For organizations seeking meaningful visibility and participation. Possible benefits include sponsor recognition, logo placement, website listing, exhibition opportunity, recognition in selected materials and networking.", "Silver Sponsor :: For organizations seeking a focused conference presence, with possible sponsor recognition, logo placement on selected materials, website listing, conference recognition and networking.", "Supporting Partner :: Organizations may participate as supporting partners, subject to conference requirements and agreed arrangements."], bodyAfter: "The exact benefits and deliverables for each sponsorship level can be discussed with the NVS conference team." },
      { id: 's9', kicker: '08 / EXHIBITION PACKAGES', heading: 'Arrangements tailored to the event.', body: "Exhibition arrangements can be customized according to organizational requirements and the conference venue. Packages may include:", listStyle: 'topic', listItems: ["Exhibition space", "Organization name and logo display", "Table or display area, where applicable", "Listing in selected conference materials", "Website recognition and exhibitor profile", "Display of brochures and promotional materials", "Access to conference networking activities, subject to registration terms"], bodyAfter: "Available formats and facilities may differ for each conference." },
      { id: 's10', kicker: '09 / DIGITAL AND ONLINE PARTICIPATION', heading: 'Visibility for virtual and hybrid events.', body: "For conferences offering virtual or hybrid participation, selected sponsors and exhibitors may be offered digital visibility opportunities, such as website recognition, a digital organization profile, logo placement, digital promotional materials, online presentation opportunities, a virtual exhibition or organization showcase, and inclusion in selected digital conference materials. Availability depends on the specific conference format." },
      { id: 's11', kicker: '10 / CUSTOMIZE YOUR PARTNERSHIP', heading: "Start with your organization's goals.", body: "Organizations may prioritize brand visibility, technology demonstrations, research networking, industry connections or institutional collaboration. NVS International Services can discuss customized arrangements based on:", listStyle: 'topic', listItems: ["Conference theme", "Expected audience", "Organization profile", "Target research community", "Desired level of visibility", "Exhibition requirements", "Presentation requirements", "Digital or physical participation"], bodyAfter: "Our team can work with organizations to identify an arrangement appropriate for the specific conference." },
      { id: 's12', kicker: '11 / PARTNERING WITH NVS CONFERENCES', heading: 'Support scientific communication and knowledge exchange.', body: "By supporting an NVS International Services conference, organizations contribute to an environment that encourages scientific communication, professional interaction and knowledge exchange. Sponsorship and exhibition participation provide a platform to engage with researchers and professionals while supporting the development of scientific and academic events.\n\nWe welcome organizations interested in establishing a professional relationship with NVS International Services and participating in our upcoming conferences." },
      { id: 's13', variant: 'closing', kicker: 'BECOME A SPONSOR OR EXHIBITOR', heading: 'Tell us how you would like to participate.', body: "If your organization is interested in sponsoring or exhibiting at an upcoming NVS International Services conference, please contact our team and provide:", listStyle: 'topic', listItems: ["Organization name", "Contact person and designation", "Email address and phone number", "Website", "Conference or event of interest", "Type of participation: sponsorship, exhibition or both"], bodyAfter: "Our team will provide relevant sponsorship or exhibition details and discuss the available options with you.", signoff: { strong: 'Partner With NVS International Services', span: 'Sponsor. Exhibit. Connect. Share. Collaborate.', b: 'Connecting Scientific Communities Through Knowledge, Research and Collaboration.' }, button: { label: 'Contact Our Team', href: 'contact.html?subject=Sponsor%20or%20Exhibitor%20Enquiry' } }
    ] },
    general: { kind: 'accordion', sections: [
      { id: 'g1', heading: 'Abstract Submission & Speaker Guidelines', body: `# Abstract Submission
NVS International Services welcomes researchers, academicians, scientists, industry professionals, research scholars, and students to submit abstracts for consideration in our conferences and scientific events.
Abstracts should be relevant to the scientific scope and themes of the respective conference. Authors are encouraged to present original research, recent findings, technical developments, methodologies, case studies, innovations, or professional perspectives relevant to the conference.
# Abstract Requirements
An abstract should generally include:
- Title of the presentation
- Name of the author(s)
- Affiliation and institution
- Country
- Email address of the presenting author
- Clear description of the research or presentation
- Key findings, methodology, or relevant information where applicable
Authors should ensure that all submitted information is accurate and that they have the necessary rights to present the submitted work.
# Abstract Review
Submitted abstracts may be reviewed by the conference scientific or organizing team for relevance to the conference scope and program.
Following review, an abstract may be considered for:
- Keynote Presentation
- Plenary Presentation
- Invited Presentation
- Oral Presentation
- Poster Presentation
The final presentation category is determined by the conference organizers according to the scientific program.
# Speaker Guidelines
Accepted speakers are requested to provide the information required for the preparation of the conference program, which may include:
- Final presentation title
- Short professional biography
- Recent profile photograph
- Abstract
- Affiliation and designation
- Presentation format
- Presentation file, where requested
Speakers should complete the applicable registration process within the specified timeline.
Presentation titles and abstracts should be finalized before the conference program is published.
Speakers are requested to adhere to their assigned presentation date and time. Any request for changes should be communicated to the conference team as early as possible.` },
      { id: 'g2', heading: 'Visa & Invitation Letter', body: `# Visa Information for Conference Participants
International participants attending NVS International Services conferences are responsible for obtaining the appropriate visa or travel authorization required for their destination country.
Visa requirements vary depending on the participant's nationality, country of residence, destination, purpose of travel, and duration of stay.
Participants should always check the latest requirements through the official government, embassy, consulate, or immigration website of the country they intend to visit.
NVS International Services may provide an official conference invitation letter or participation confirmation to eligible participants where applicable. However, the final decision regarding visa issuance rests solely with the relevant embassy, consulate, or immigration authority.
We strongly recommend that participants begin checking visa requirements well in advance of their planned travel.
# Europe
# Schengen Visa
For short visits to the Schengen Area, certain non-EU nationals require a Schengen visa. The European Commission states that applications should generally be submitted to the consulate of the country that is the main destination of the trip.
Official Schengen Visa Information:
[European Commission – Applying for a Schengen Visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en)
EU Immigration Information:
[EU Immigration Portal](https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal_en)
# European Countries – Official Resources
For country-specific requirements, participants should use the official government or embassy website of their destination:
- [Germany – Federal Foreign Office](https://www.auswaertiges-amt.de/en)
- [France – France Visas](https://france-visas.gouv.fr/)
- [Netherlands – Netherlands Worldwide](https://www.netherlandsworldwide.nl/)
- [Italy – Ministry of Foreign Affairs](https://www.esteri.it/en/)
- [Spain – Ministry of Foreign Affairs](https://www.exteriores.gob.es/en/)
- [Belgium – Foreign Affairs](https://diplomatie.belgium.be/en)
- [Austria – Foreign Ministry](https://www.bmeia.gv.at/en/)
- [Switzerland – State Secretariat for Migration](https://www.sem.admin.ch/sem/en/home.html)
- Sweden – Government / Migration Information
- [Denmark – Ministry of Foreign Affairs](https://um.dk/en)
- [Finland – Ministry for Foreign Affairs](https://um.fi/frontpage)
- [Norway – Norwegian Directorate of Immigration](https://www.udi.no/en/)
- Portugal – Ministry of Foreign Affairs
- [Greece – Ministry of Foreign Affairs](https://www.mfa.gr/en/)
Important: Participants should verify the exact application procedure with the destination country's official authority before applying. EU countries do not all use an identical national application process.
# United Kingdom
The United Kingdom has its own visa system and is not part of the Schengen visa system.
Participants travelling to the UK should check the official UK government visa requirements based on their nationality and purpose of travel.
Official UK Visa Information:
[UK Government – Check UK Visa Requirements](https://www.gov.uk/check-uk-visa)
# North America
# United States
Participants travelling to the United States should check the appropriate visa category and application requirements through the official U.S. government website.
Official U.S. Visa Information:
[U.S. Department of State – Travel](https://travel.state.gov/content/travel.html)
# Canada
Participants travelling to Canada should check whether they require a visitor visa or an Electronic Travel Authorization (eTA).
Official Canada Immigration & Visa Information:
[Government of Canada – Immigration and Citizenship](https://www.canada.ca/en/services/immigration-citizenship.html)
# Mexico
Official Mexico Visa Information:
[Government of Mexico – Foreign Affairs](https://www.gob.mx/sre)
# Asia
# Japan
Participants travelling to Japan should check visa requirements through the Japanese Ministry of Foreign Affairs or the Japanese embassy/consulate responsible for their country of residence.
Official Japan Visa Information:
[Ministry of Foreign Affairs of Japan – Visa Information](https://www.mofa.go.jp/j_info/visit/visa/index.html)
# Singapore
Visa requirements depend on the travel document held by the participant. Singapore's Immigration & Checkpoints Authority provides country-specific information and application procedures.
Official Singapore Visa Information:
[Singapore Immigration & Checkpoints Authority – Visa Requirements](https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements)
# South Korea
Official Korea Visa Information:
[Korea Visa Portal](https://www.visa.go.kr/)
# China
Official China Visa Information:
[Chinese Ministry of Foreign Affairs](https://www.mfa.gov.cn/eng/)
# India
International participants travelling to India should check the official Indian visa and immigration information before travel.
Official India Visa Information:
[Government of India – Indian Visa Online](https://indianvisaonline.gov.in/)
# Middle East
# United Arab Emirates
Participants travelling to the UAE should check the applicable entry and visa requirements through the official UAE government resources.
Official UAE Government Portal:
[UAE Government – Entry & Visa Information](https://u.ae/en/information-and-services/visa-and-emirates-id)
# Saudi Arabia
Official Saudi Visa Information:
[Saudi Arabia – Official Visa Platform](https://visa.visitsaudi.com/)
# Qatar
Official Qatar Visa Information:
[Qatar Government Portal](https://portal.www.gov.qa/)
# Oceania
# Australia
Participants travelling to Australia should check the appropriate visa category and application requirements through the Australian Department of Home Affairs.
Official Australia Visa Information:
[Australian Department of Home Affairs – Visas](https://immi.homeaffairs.gov.au/visas)
# New Zealand
Official New Zealand Visa Information:
[Immigration New Zealand – Visas](https://www.immigration.govt.nz/)
# Africa
Visa requirements for African destinations vary by nationality and destination country.
Participants should consult the official immigration or foreign affairs website of the country they intend to visit.
For conference travel, participants should verify:
- Visa requirement
- Visa category
- Application procedure
- Required documents
- Application fee
- Processing time
- Appointment requirements
- Passport validity
- Entry requirements
# Documents Commonly Required
Depending on the destination and individual circumstances, visa applications may request documents such as:
- Valid passport
- Completed visa application form
- Recent passport photograph
- Conference invitation letter
- Conference registration confirmation
- Proof of accommodation
- Travel itinerary
- Proof of financial means
- Travel or medical insurance where required
- Employment or institutional confirmation
- Bank statements or other financial documents
- Additional supporting documents requested by the relevant authority
The exact requirements are determined by the destination country's immigration authority.
# Conference Invitation Letter
Eligible conference participants may request an official invitation letter after completing the applicable conference requirements.
The invitation letter may include:
- Participant's name
- Institution/organization
- Conference name
- Conference dates
- Conference location
- Participation category
- Presentation information, where applicable
The invitation letter is provided for conference and visa-support purposes where applicable.
**An invitation letter does not guarantee visa approval.**
# Important Visa Notice
Visa requirements and immigration procedures can change without prior notice.
Participants should always verify the latest information directly with the relevant government, embassy, consulate, or immigration authority before submitting an application.
NVS International Services does not make visa decisions and cannot guarantee visa approval, processing time, entry permission, or immigration clearance.
Participants are responsible for ensuring that they hold the correct travel documents and permissions before travelling.` },
      { id: 'g3', heading: 'Publication Information', body: `NVS International Services is committed to supporting the dissemination of scientific knowledge and providing appropriate publication opportunities for research presented at its conferences. Publication arrangements may vary depending on the individual conference, scientific scope, conference program, and agreements established with relevant publication partners.
Participants are encouraged to carefully review the publication information provided for their specific conference before submitting their work.
# Conference Abstract Publication
Accepted abstracts may be considered for inclusion in the official conference materials, depending on the publication plan of the respective conference.
These materials may include:
- Conference Abstract Book
- Digital Abstract Collection
- Conference Proceedings
- Conference Program
- Official Conference Website
- Online Conference Repository
- Other conference-related scientific materials
The publication format and availability may differ between conferences.
Where applicable, accepted abstracts may be published with information such as:
- Presentation title
- Author name(s)
- Institutional affiliation
- Country
- Abstract text
- Keywords
- Presentation category
Participants should ensure that all information submitted for publication is accurate and appropriately formatted.
# Conference Proceedings
For conferences where proceedings are planned, accepted and registered presentations may be considered for inclusion in the conference proceedings.
The proceedings may contain selected abstracts, extended abstracts, research summaries, technical contributions, or full papers, depending on the specific conference publication format.
Information regarding:
- Submission format
- Manuscript requirements
- Word/page limits
- Formatting guidelines
- Submission deadlines
- Review procedures
- Publication schedule
will be communicated to participants when applicable.
Submission of an abstract does not automatically mean that a full paper will be included in the proceedings.
# Full Paper Submission
Some conferences may provide an option for authors to submit a full research paper following abstract acceptance.
Where full-paper submission is available, authors may be requested to provide a complete manuscript containing appropriate sections such as:
- Title
- Author information
- Abstract
- Keywords
- Introduction
- Methodology
- Results
- Discussion
- Conclusion
- References
- Figures and Tables, where applicable
The exact manuscript structure will depend on the requirements of the individual conference or publication partner.
Authors must follow the specific submission instructions provided by the conference organizing team.
# Peer Review and Editorial Assessment
Where a formal review process is applicable, submitted manuscripts may undergo editorial or peer review before publication.
The review process may consider:
- Relevance to the conference scope
- Scientific or technical quality
- Originality
- Clarity of presentation
- Methodology
- Supporting evidence
- References and citations
- Overall suitability for publication
The review process and acceptance criteria may vary depending on the publication arrangement.
Abstract acceptance for presentation should not be interpreted as automatic acceptance of a full manuscript for publication.
# Journal Publication Opportunities
Depending on the individual conference, selected papers may be considered for publication through relevant academic journals or special issues.
Where such arrangements are available, eligible authors may receive information regarding:
- Participating journals
- Manuscript submission procedures
- Journal-specific requirements
- Review procedures
- Publication timelines
- Submission deadlines
Journal publication remains subject to the independent editorial policies and review procedures of the respective journal.
**Participation in an NVS International Services conference does not automatically guarantee publication in a journal.**
# Indexing Information
Where conference proceedings or journal publication involves an indexing service, the relevant information will be communicated only when the arrangement has been formally confirmed.
Indexing status may depend on the individual journal or publication platform and may be subject to its own evaluation, acceptance, and indexing policies.
NVS International Services does not guarantee indexing in any particular database unless such status has been formally confirmed for the specific publication.
Participants should independently verify current indexing information through the official website of the relevant journal or indexing organization.
# Publication Ethics
Authors are expected to follow recognized standards of academic and publication ethics.
Submitted work should:
- Be original or appropriately authorized
- Accurately represent the research
- Properly acknowledge sources
- Include appropriate citations
- Avoid plagiarism
- Avoid duplicate or simultaneous publication where prohibited
- Clearly identify all contributing authors
- Obtain necessary permissions for third-party material
- Disclose relevant conflicts of interest where applicable
Any concerns regarding plagiarism, duplicate publication, fabricated data, falsified information, or other forms of academic misconduct may be reviewed by the appropriate editorial or organizing authority.
# Originality and Plagiarism
Authors are responsible for ensuring the originality and integrity of their submissions.
Any material obtained from other sources must be appropriately cited and acknowledged.
Where plagiarism or substantial duplication is identified, the submission may be:
- Returned to the author for clarification
- Rejected from publication
- Removed from conference publication materials
- Referred for further review where appropriate
Authors should carefully review their manuscripts before submission.
# Copyright and Author Rights
Authors remain responsible for the intellectual property rights associated with their submitted work.
By submitting an abstract, paper, photograph, presentation, or other material for conference publication, authors may be asked to provide permission for the material to be reproduced or distributed as part of official conference activities.
Any specific copyright transfer, publishing license, or publication agreement will be communicated separately where applicable.
Authors should not submit material that contains confidential information or copyrighted content for which they do not have the necessary permission.
# Figures, Tables, Images and Third-Party Materials
Authors are responsible for obtaining appropriate permission for the use of:
- Photographs
- Figures
- Tables
- Charts
- Illustrations
- Previously published material
- Third-party datasets
- Other copyrighted content
All third-party material should be properly credited.
NVS International Services is not responsible for copyright or intellectual property disputes arising from materials submitted by authors.
# Author Responsibilities
Authors are responsible for:
- Providing accurate author and affiliation information
- Ensuring the originality of their work
- Following submission guidelines
- Meeting applicable deadlines
- Checking the final version of their submission
- Obtaining required permissions
- Properly acknowledging sources
- Responding to editorial or review queries
- Ensuring that all listed authors have approved the submission
Changes to authorship after submission may require approval and supporting confirmation from the relevant authors.
# Corrections and Updates
If an author identifies an important error in published conference material, the author should contact the organizing or publication team as soon as possible.
Depending on the nature of the issue, an appropriate correction, clarification, or update may be considered.
Corrections to published material remain subject to the applicable publication process.
# Publication Schedule
Publication timelines may vary depending on the conference and publication arrangement.
Conference materials may be made available:
- Before the conference
- During the conference
- Shortly after the conference
- Following completion of the relevant review or editorial process
Authors will be informed of important publication deadlines and requirements where applicable.
Publication timelines may change due to editorial review, technical processing, publisher requirements, or other administrative circumstances.
# Conference Website and Online Publication
Selected conference information may be displayed on the official conference website, including:
- Speaker names
- Presentation titles
- Author affiliations
- Abstracts
- Professional photographs
- Short biographies
- Conference program information
Participants should inform the organizing team in advance if there are specific publication or display considerations that need to be addressed, where applicable.
# Publication Fees
Where publication involves a separate publisher, journal, proceedings service, or special issue, applicable publication charges may be determined by the respective publication provider.
Any applicable publication fee, article processing charge, or additional publishing cost will be communicated separately.
Conference registration fees and publication charges are not necessarily the same and should not be considered interchangeable unless specifically stated.
# Important Note on Journal and Indexing Claims
NVS International Services aims to provide clear and accurate publication information to participants.
However, publication in a particular journal, acceptance by a publisher, or indexing in a specific database cannot be guaranteed unless the relevant arrangement has been officially confirmed.
Participants should be cautious of unofficial claims regarding guaranteed publication, guaranteed indexing, or guaranteed acceptance.
The final decision regarding publication, peer review, journal acceptance, and indexing rests with the respective publisher, journal, editorial board, or indexing organization.
# Publication for Conference Participants
Participation in a conference may provide researchers with opportunities to share their work and, where applicable, have their research considered for publication through the conference's designated publication channels.
However, conference presentation and publication are separate processes unless explicitly stated otherwise.
An accepted presentation does not automatically mean that the corresponding research paper will be published.
# For Authors
Authors interested in publication should carefully review the publication instructions provided for their specific conference and submit all required materials within the announced deadlines.
For publication-related enquiries, participants may contact the NVS International Services team with:
Name:
Conference Name:
Abstract/Paper ID:
Institution:
Country:
Presentation Title:
Publication Enquiry:
Our team will provide the applicable publication information based on the conference and its available publication arrangements.
# Important Disclaimer
**Publication opportunities, proceedings, journal collaborations, peer-review arrangements, publication fees, and indexing information may vary from one conference to another. Participants should refer to the official information provided for their specific conference. Any publication or indexing arrangement is subject to the policies, review procedures, and final decisions of the respective publisher, journal, editorial board, or indexing organization.**` },
      { id: 'g4', heading: 'Terms & Conditions', body: `Welcome to NVS International Services. These Terms & Conditions apply to the use of our website and participation in conferences, scientific meetings, workshops, exhibitions, and other events organized or coordinated by NVS International Services.
By accessing our website, submitting an abstract, registering for a conference, accepting a speaker invitation, or participating in an event, you agree to the applicable terms and conditions described below.
# 1. Conference Registration
Registration is required for participation in an NVS International Services conference unless otherwise stated.
Registration categories, fees, deadlines, and participation benefits may vary depending on the individual conference.
Submission of an abstract or acceptance as a speaker does not automatically constitute completed registration. Participation is confirmed only after the applicable registration requirements have been completed.
# 2. Abstract Submission
Participants are responsible for ensuring that all information submitted during abstract submission is accurate and complete.
Submitted abstracts should be relevant to the scientific scope of the conference and should represent original work or appropriately acknowledged material.
Abstract acceptance is subject to the review and approval process applicable to the respective conference.
# 3. Speaker Participation
Accepted speakers are expected to provide the information requested by the organizing team, which may include:
- Presentation title
- Abstract
- Short professional biography
- Recent photograph
- Institutional affiliation
- Presentation materials
Speakers should follow the assigned presentation schedule and inform the organizing team as early as possible if they are unable to participate.
# 4. Conference Program
NVS International Services makes reasonable efforts to maintain the published conference program. However, speakers, sessions, timings, venues, and other program details may change due to unforeseen circumstances or organizational requirements.
Any significant changes will be communicated through official conference channels where possible.
# 5. Registration Fees & Payments
Participants are responsible for paying the applicable registration fee within the stated deadline.
Payments should be made only through the official payment methods provided by NVS International Services or the respective conference website.
Participants should retain their payment confirmation or receipt for future reference.
NVS International Services will not request confidential banking information such as passwords, PINs, CVV numbers, or OTPs through email.
# 6. Cancellation & Refunds
Cancellation and refund requests are subject to the cancellation policy applicable to the respective conference.
Refund eligibility, applicable percentages, deadlines, administrative charges, and processing procedures may vary between conferences.
Participants should review the specific cancellation and refund policy before completing registration.
# 7. Transfer & Substitution
Transfer or substitution of a registered participant may be permitted in certain circumstances and is subject to prior approval from the organizing team.
Any proposed substitute participant may be required to provide relevant professional, institutional, and presentation information.
A transfer or substitution is considered valid only after written confirmation from NVS International Services.
# 8. Visa & Invitation Letters
International participants are responsible for determining and fulfilling the visa and immigration requirements of the destination country.
Where applicable, NVS International Services may provide an official conference invitation or participation confirmation letter to eligible participants.
An invitation letter does not guarantee visa approval or entry into the destination country. Visa decisions are made solely by the relevant embassy, consulate, immigration authority, or government department.
Participants are responsible for visa applications, applicable fees, travel documents, insurance, and other immigration requirements.
# 9. Travel & Accommodation
Unless specifically stated otherwise in writing, participants are responsible for their own:
- Flights
- Accommodation
- Local transportation
- Visa expenses
- Travel insurance
- Meals
- Personal expenses
Participants should make travel arrangements only after reviewing the latest conference information.
# 10. Publication
Depending on the individual conference, accepted abstracts or papers may be considered for publication in conference materials, proceedings, journals, special issues, or other publication channels.
Publication arrangements vary by conference.
**Conference participation or abstract acceptance does not automatically guarantee journal publication or indexing in any particular database.**
Any publication or indexing arrangement will be subject to the policies and final decisions of the relevant publisher, journal, or editorial organization.
# 11. Intellectual Property
Authors and participants remain responsible for the intellectual property rights associated with their submitted materials.
Participants must ensure that they have the necessary rights or permissions to use any third-party:
- Images
- Figures
- Tables
- Text
- Data
- Videos
- Other copyrighted materials
NVS International Services does not claim ownership of participants' research unless specifically agreed in writing.
# 12. Professional Conduct
All participants are expected to maintain a respectful and professional environment.
Harassment, discrimination, intimidation, abusive behaviour, disruptive conduct, or other inappropriate behaviour will not be accepted.
The organizers may take appropriate action if a participant's conduct negatively affects the safety, professionalism, or operation of an event.
# 13. Photography & Recording
Conference events may be photographed or recorded for legitimate conference-related purposes, including documentation, website content, reports, and promotional materials.
Participants should respect the privacy and intellectual property rights of other participants when taking photographs, recording presentations, or sharing conference content.
# 14. Website Information
NVS International Services makes reasonable efforts to maintain accurate and updated information on its websites.
However, conference dates, venues, speakers, programs, fees, publication arrangements, and other details may be changed when necessary.
Participants should always refer to the latest official conference communication before making important travel or financial arrangements.
# 15. Third-Party Websites
The NVS International Services website may contain links to external websites such as government portals, visa websites, hotels, publishers, transportation providers, and partner organizations.
These websites are independently operated by third parties. NVS International Services is not responsible for their content, availability, security, policies, or services.
# 16. Privacy
Participant information may be collected and used for legitimate conference-related purposes, including registration, communication, abstract processing, speaker coordination, certificates, visa documentation, and conference administration.
Personal information will be handled in accordance with the applicable Privacy Policy of NVS International Services.
# 17. Unforeseen Circumstances
Conference arrangements may be affected by circumstances beyond the reasonable control of the organizers, including natural disasters, public health situations, government restrictions, travel disruptions, venue issues, technical failures, severe weather, or other unforeseen circumstances.
Where necessary, NVS International Services may modify, postpone, relocate, or change the format of an event and will communicate significant changes where reasonably possible.
# 18. Changes to Terms & Conditions
NVS International Services may update these Terms & Conditions when necessary to reflect changes in conference operations, legal requirements, administrative procedures, or services.
The latest version published on the official website will apply to future participation and activities.
# 19. Conference-Specific Terms
These Terms & Conditions provide general guidance for NVS International Services.
Individual conferences may have additional terms relating to registration, fees, refunds, publication, accommodation, visa support, sponsorship, exhibition, presentations, and participation.
Where a conference-specific policy differs from these general Terms & Conditions, the specific policy published for that conference will apply.
# 20. Contact Us
For questions regarding these Terms & Conditions, registration, abstracts, speakers, payments, publication, visa documentation, or other conference matters, participants may contact the NVS International Services team through the official contact details provided on the relevant conference website.
Important: Participants are encouraged to review the specific conference information, registration terms, cancellation policy, and other applicable guidelines before completing registration or making payment.` },
      { id: 'g5', heading: 'Cancellation & Refund Policy', body: `NVS International Services understands that participants may sometimes need to cancel their conference participation due to personal, professional, institutional, travel, or other circumstances. This Cancellation & Refund Policy explains the general conditions applicable to registration cancellations and refund requests.
Participants are advised to carefully review this policy before completing registration and payment. The specific cancellation terms published for an individual conference will take precedence where applicable.
# 1. General Cancellation Policy
A participant who has completed conference registration may request cancellation by contacting the NVS International Services organizing team through the official contact details provided for the respective conference.
All cancellation requests should be submitted in writing by email and should include relevant registration and payment information where applicable.
The date on which the written cancellation request is received by the organizing team will generally be considered the cancellation date.
# 2. Refund Schedule
Unless a different policy is specifically stated for an individual conference, the following general refund structure will apply:
The following general refund structure applies unless a different policy is stated for a specific conference:
- **More than 60 days before the conference:** 60% of the eligible registration fee
- **50-40 days before the conference:** 50% of the eligible registration fee
- **40-30 days before the conference:** 30% of the eligible registration fee
- **Less than 30 days before the conference:** No refund
Please note: The applicable cancellation period will be determined based on the date the cancellation request is officially received by NVS International Services and the scheduled start date of the respective conference.
# 3. More Than 60 Days Before the Conference
For cancellation requests received more than 60 days before the conference, the participant may be eligible to receive a refund of 60% of the eligible registration fee.
The remaining amount may cover administrative, payment processing, banking, transaction, or other applicable charges.
# 4. Cancellation between 50 and 40 Days
For cancellation requests received between 50 and 40 days before the conference, the participant may be eligible for a refund of 50% of the eligible registration fee.
Any applicable transaction, banking, administrative, or processing charges may be deducted.
# 5. Cancellation Between 40 and 30 Days
For cancellation requests received between 40 and 30 days before the conference, the participant may be eligible for a refund of 30% of the eligible registration fee.
The remaining amount may include applicable administrative, transaction, banking, or processing charges.
# 6. Cancellation Less Than 30 Days Before the Conference
For cancellation requests received less than 30 days before the conference, registration fees are generally non-refundable.
This is because significant arrangements related to the conference program, venue, materials, services, and administration may already have been finalized.
Participants may contact the organizing team if they wish to discuss a transfer or substitution option, where permitted under the applicable conference policy.
# 7. No-Show Policy
If a registered participant does not attend the conference and does not provide an approved cancellation or substitution request in advance, the registration fee will generally be non-refundable.
Failure to attend due to personal, professional, travel, visa, accommodation, or other circumstances does not automatically create an entitlement to a refund.
Where applicable, participants may request a certificate or other participation-related documentation according to the conference policy.
# 8. Visa Rejection or Travel Documentation Issues
Participants are responsible for obtaining the appropriate visa and travel documents required to attend the conference.
Visa approval is determined solely by the relevant embassy, consulate, or immigration authority.
**Visa refusal does not automatically guarantee a full refund.**
Participants whose visa application has been refused should contact the organizing team as soon as possible and provide relevant documentation if they wish to request consideration under the applicable cancellation policy.
Any refund will be determined according to the conference-specific cancellation terms and the date on which the cancellation request is received.
# 9. Accommodation Cancellation
Where accommodation is booked separately from conference registration, accommodation cancellation may be subject to different terms.
Hotel or accommodation charges may be governed by:
- Hotel cancellation policies
- Booking conditions
- Payment terms
- Conference accommodation agreements
Participants should review the applicable accommodation terms before making payment.
Conference registration refunds and accommodation refunds are treated separately unless specifically stated otherwise.
# 10. Registration Transfer
Instead of cancelling their participation, registered participants may request a transfer to another eligible participant, subject to approval.
A transfer request should be submitted in advance and may require:
- Original participant details
- Substitute participant details
- Institutional information
- Presentation information
- Written confirmation from the original participant
The transfer is not valid until written approval is provided by the organizing team.
# 11. Speaker Substitution
If an accepted speaker is unable to attend, they may request permission for another qualified person to present the accepted work.
The proposed substitute may be required to provide:
- Full name
- Professional designation
- Institution
- Country
- Email address
- Biography
- Presentation details
Approval of a substitute speaker remains at the discretion of the conference organizing team.
Speaker substitution does not automatically result in a refund.
# 12. Refund Processing
Once a refund has been approved, the refund will generally be processed through the applicable payment method or another suitable method determined by the organizing team.
Refund processing time may depend on:
- Payment provider
- Bank processing
- International transaction procedures
- Currency conversion
- Administrative processing
Participants should allow reasonable time for the refunded amount to appear in their account.
# 13. Bank and Transaction Charges
Banking, payment gateway, international transaction, currency conversion, administrative, or other applicable charges may be deducted from the refundable amount where applicable.
The amount received by the participant may therefore differ from the original amount paid.
# 14. Currency Conversion
Where registration fees are paid in a foreign currency or processed through an international payment provider, the amount credited during a refund may be affected by exchange-rate fluctuations and transaction charges.
NVS International Services cannot guarantee that the exact amount originally charged in the participant's local currency will be returned.
# 15. Duplicate or Accidental Payments
If a participant accidentally makes more than one payment for the same registration, they should contact the organizing team as soon as possible with proof of the duplicate transaction.
After verification, an eligible duplicate payment may be considered for refund after deduction of applicable transaction or processing charges.
# 16. Unsuccessful or Failed Transactions
If a payment appears to have failed but the amount has been debited from the participant's account, participants should contact the organizing team and provide:
- Transaction reference
- Date of payment
- Amount
- Payment method
- Bank/payment confirmation, where available
The organizing team may verify the transaction with the relevant payment provider before taking further action.
Participants should avoid making repeated payments until the status of the original transaction has been clarified.
# 17. Conference Postponement
If a conference is postponed to a new date, registered participants may be provided with options according to the circumstances and the specific conference policy.
Possible arrangements may include:
- Transfer of registration to the revised conference date
- Participation in the rescheduled event
- Alternative participation arrangements
- Other options communicated by the organizing team
The applicable arrangement will be communicated to registered participants following confirmation of the revised event details.
# 18. Conference Cancellation by the Organizer
If NVS International Services is required to cancel a conference, the organizing team will communicate the available options to registered participants.
Depending on the circumstances, arrangements may include:
- Rescheduling the conference
- Transferring registration
- Alternative participation options
- Refund consideration according to the applicable conference policy
The organizers will make reasonable efforts to provide an appropriate solution based on the circumstances.
# 19. Non-Refundable Services
Certain services or expenses may be non-refundable once arrangements have been confirmed or services have been provided.
These may include, where applicable:
- Administrative charges
- Payment processing charges
- Bank charges
- Accommodation charges
- Publication-related services
- Visa documentation processing
- Special event arrangements
- Customized services
- Other third-party services
Participants will be informed of applicable non-refundable charges where relevant.
# 20. Refund Eligibility
Refund eligibility is determined according to the cancellation policy applicable to the specific conference.
Factors that may be considered include:
- Date of cancellation request
- Registration category
- Amount paid
- Services already provided
- Applicable conference policy
- Payment processing charges
- Special arrangements agreed with the participant
The organizing team will review eligible requests according to the published terms.
# 21. Special Registration Discounts
Where a participant has registered using:
- Early-bird pricing
- Promotional pricing
- Special discount
- Institutional discount
- Group discount
- Speaker discount
- Other negotiated pricing
the refund will generally be calculated based on the amount actually paid and the applicable cancellation policy.
Special discounts are not automatically transferable to another participant unless specifically approved.
# 22. Complimentary or Sponsored Participation
Participants receiving complimentary, sponsored, waived, or specially supported registration may be subject to different cancellation or substitution conditions.
Any applicable terms will be communicated directly to the participant.
# 23. Abstract Withdrawal
Withdrawal of an abstract or presentation does not automatically qualify for a registration refund.
If a participant wishes to withdraw an abstract and cancel participation, they should contact the organizing team and follow the applicable cancellation policy.
# 24. Publication and Cancellation
Where an abstract or paper has already been processed for publication or included in official conference materials, cancellation of registration may not automatically result in removal of the published material.
Requests concerning publication or removal will be reviewed according to the applicable publication policy and the stage of publication processing.
# 25. Certificate and Cancellation
Certificates are generally issued according to the participant's actual participation and the applicable conference policy.
Cancellation before the event does not normally qualify the participant for a participation certificate unless specifically approved by the organizing team.
# Important Notice
The refund percentages and conditions stated on this page represent the general Cancellation & Refund Policy of NVS International Services.
Individual conferences may have different refund conditions based on their venue, registration structure, service providers, publication arrangements, or other organizational requirements.
**Where a conference-specific Cancellation & Refund Policy is published, that policy will take precedence over this general policy.**
Participants should carefully review the cancellation terms applicable to their specific conference before making payment.
# Contact Us
For questions regarding cancellation, refund eligibility, payment status, registration transfer, or substitution, participants may contact the NVS International Services organizing team through the official contact details provided on the respective conference website.
Participants are encouraged to review all applicable conference policies before completing registration and making payment.` },
      { id: 'g6', heading: 'Code of Professional Conduct', body: `NVS International Services is committed to maintaining a professional, respectful, inclusive, and academically constructive environment across its conferences, scientific meetings, workshops, exhibitions, and related activities.
All participants, including speakers, delegates, researchers, students, sponsors, exhibitors, committee members, organizers, and guests, are expected to conduct themselves professionally and respectfully throughout their participation.
This Code of Professional Conduct outlines the general standards expected from everyone involved in NVS International Services events.
# 1. Professional and Respectful Behaviour
All participants are expected to communicate and interact with others in a professional and respectful manner.
Participants should:
- Treat others with courtesy and respect
- Maintain professional communication
- Respect different academic and professional perspectives
- Listen to others without inappropriate interruption
- Maintain appropriate behaviour during presentations and discussions
- Follow reasonable instructions provided by conference organizers and venue staff
# 2. Respectful Academic Environment
NVS International Services encourages open discussion, exchange of ideas, and constructive academic interaction.
Participants are encouraged to:
- Share knowledge responsibly
- Respect differing research perspectives
- Provide constructive feedback
- Avoid personal attacks or inappropriate criticism
- Give appropriate credit to the work of others
- Respect intellectual and academic contributions
Disagreement regarding research, methodology, findings, or professional opinions should be handled respectfully and constructively.
# 3. Harassment and Discrimination
NVS International Services does not support harassment, discrimination, intimidation, or threatening behaviour at its events.
Participants should not engage in inappropriate conduct based on characteristics such as:
- Gender
- Age
- Nationality
- Race or ethnic background
- Disability
- Professional background
- Academic status
- Institutional affiliation
- Any other protected or personal characteristic
Everyone attending an event is expected to contribute to a professional and respectful environment.
# 4. Inappropriate Behaviour
Participants must not engage in behaviour that disrupts the conference or negatively affects other participants.
Examples may include:
- Threatening behaviour
- Intimidation
- Abusive communication
- Persistent unwanted contact
- Harassment
- Deliberate disruption of sessions
- Aggressive behaviour
- Unwelcome or inappropriate conduct
- Damage to conference or venue property
The organizers may take appropriate action when such behaviour is reported or observed.
# 5. Communication and Correspondence
Participants are expected to maintain professional standards when communicating with:
- Conference organizers
- Speakers
- Committee members
- Other participants
- Sponsors
- Exhibitors
- Venue staff
Emails, messages, telephone conversations, and other communications related to the conference should remain respectful and relevant.
Abusive, threatening, or inappropriate communication may result in further action by the organizing team.
# 6. Conference Presentations
Speakers and presenters are expected to maintain professional standards during their presentations.
Presentations should:
- Be relevant to the assigned topic
- Respect academic and professional standards
- Properly acknowledge sources
- Avoid unauthorized copyrighted content
- Avoid offensive or inappropriate material
- Be delivered within the assigned presentation time
- Follow instructions provided by session chairs and organizers
Speakers should respect questions and comments from other participants during discussions.
# 7. Academic Integrity
Participants are expected to maintain appropriate standards of academic and professional integrity.
Authors and presenters should ensure that their work does not contain:
- Plagiarism
- Fabricated information
- Falsified data
- Misleading claims
- Unauthorized use of another person's work
- Improper attribution
- Unapproved confidential information
Sources and contributions should be appropriately acknowledged.
# 8. Intellectual Property
Participants must respect the intellectual property rights of other researchers, speakers, institutions, publishers, sponsors, and organizations.
Participants should not reproduce, distribute, publish, or commercially use another person's presentation, research material, photograph, recording, or other content without appropriate permission.
Where third-party materials are used in presentations or publications, the necessary permissions and acknowledgements should be obtained.
# 9. Photography, Video and Recording
Participants may encounter photography or recording during conference activities.
Participants should respect the privacy, intellectual property, and preferences of other attendees when taking photographs, recording presentations, or sharing conference content.
Recording or distributing a presentation without appropriate permission may not be permitted.
# 10. Confidentiality
Participants may encounter unpublished research, preliminary findings, technical information, or other information shared for academic discussion.
Participants should respect the confidentiality of information that is clearly identified as confidential or not intended for public distribution.
Unpublished research should not be reproduced, distributed, or used without appropriate authorization.
# 11. Use of Conference Facilities
Participants are expected to use conference venues, equipment, exhibition areas, and other facilities responsibly.
Participants should:
- Follow venue rules
- Respect equipment and property
- Maintain cleanliness
- Follow safety instructions
- Avoid unauthorized access to restricted areas
Any damage caused intentionally or through inappropriate conduct may be addressed according to the applicable venue or event procedures.
# 12. Sponsors and Exhibitors
Sponsors and exhibitors are expected to maintain professional standards when interacting with conference participants.
Promotional activities should:
- Remain relevant to the event
- Respect other exhibitors
- Follow venue requirements
- Avoid misleading information
- Maintain professional communication
Exhibitors and sponsors must comply with any additional terms communicated by the conference organizers.
# 13. Online and Virtual Participation
Where an event includes virtual participation, the same professional standards apply to online attendees.
Participants should:
- Use appropriate names and profile information
- Maintain respectful communication
- Avoid disruptive behaviour
- Follow session instructions
- Avoid unauthorized recording or distribution
- Use professional language in chat and discussion areas
The organizers may remove participants from virtual sessions if their behaviour significantly disrupts the event.
# 14. Safety and Security
Participants should follow reasonable safety and security instructions provided by the conference organizers or venue.
Any participant who becomes aware of a serious safety concern should inform the organizing team or appropriate venue personnel as soon as possible.
Emergency situations should be reported to the relevant local emergency services where appropriate.
# 15. Reporting Concerns
Participants who experience or witness inappropriate conduct are encouraged to inform the NVS International Services organizing team.
Reports should, where possible, include:
- Date and approximate time
- Location or session
- Description of the incident
- Names of individuals involved, if known
- Relevant supporting information
Participants may provide information confidentially where appropriate.
# 16. Review of Reported Conduct
NVS International Services may review concerns relating to participant conduct based on the information available.
Depending on the circumstances, the organizing team may:
- Request additional information
- Speak with individuals involved
- Consult relevant conference or venue personnel
- Take appropriate administrative action
The approach taken will depend on the nature and circumstances of the reported issue.
# 17. Possible Actions
Where inappropriate conduct is established or presents a significant concern, NVS International Services may take appropriate action, which may include:
- Verbal or written warning
- Request to stop inappropriate behaviour
- Removal from a session
- Restriction from certain conference activities
- Removal from the conference venue
- Cancellation of participation
- Refusal of future participation
Any action will depend on the circumstances and seriousness of the conduct.
# 18. No Retaliation
Participants should not be subjected to retaliation for raising a genuine concern about inappropriate conduct or for cooperating with a conduct-related review.
Reports should be made honestly and responsibly.
Knowingly providing false information or making malicious complaints may also be subject to appropriate review.
# 19. Professional Responsibility
Participation in an NVS International Services event is subject to maintaining appropriate professional standards.
Participants are responsible for ensuring that their conduct does not negatively affect:
- Other participants
- Speakers
- Researchers
- Organizers
- Sponsors
- Exhibitors
- Venue staff
- The professional environment of the conference
# 20. Conference-Specific Requirements
Individual conferences may have additional conduct requirements based on:
- Venue policies
- Local regulations
- Institutional requirements
- Event format
- Security arrangements
- Specific conference activities
Participants are expected to follow any additional requirements communicated for the relevant event.
# Important Notice
This Code of Professional Conduct represents the general conduct standards of NVS International Services.
The purpose of this policy is to support a professional, respectful, and constructive environment for scientific and professional exchange.
**Participation in an NVS International Services event indicates acceptance of these general standards and a commitment to respectful professional conduct.**
Where a conference-specific Code of Conduct or venue policy applies, the specific requirements of that conference or venue will also apply.` },
      { id: 'g7', heading: 'Privacy Policy', body: `# Last Updated: [Insert Date]
NVS International Services respects the privacy of visitors, participants, speakers, researchers, sponsors, exhibitors, and other individuals who interact with our website, conferences, events, and related services.
This Privacy Policy explains what information we may collect, how we use it, how it may be shared, and the choices available to individuals when using the NVS International Services website and participating in our events.
By using our website or submitting information to us, you acknowledge the practices described in this Privacy Policy.
# 1. Information We Collect
Depending on how you interact with NVS International Services, we may collect information such as:
# Personal Information
- Full name
- Email address
- Telephone or mobile number
- Country
- City or location
- Institution or organization
- Professional designation
- Department or research area
- Professional biography
- Profile photograph
- Website or professional profile information, where provided
# Conference Information
For conference-related activities, we may collect:
- Abstract title
- Abstract content
- Presentation title
- Presentation category
- Author information
- Co-author information
- Speaker information
- Registration details
- Participation preferences
- Certificate details
- Accommodation information, where applicable
- Visa invitation requirements, where applicable
# Payment and Transaction Information
When a participant makes a registration or other payment, we may receive information necessary to confirm the transaction, such as:
- Payment reference
- Transaction ID
- Payment date
- Amount paid
- Registration category
- Payment status
**NVS International Services does not request or intentionally collect confidential payment credentials such as card PINs, CVV numbers, passwords, or OTPs through email.**
Payment processing may be handled by third-party payment providers, which may have their own privacy policies and security practices.
# 2. Information Collected Through the Website
When you visit our website, certain technical information may be collected automatically depending on the website configuration and services being used.
This may include:
- IP address
- Browser type
- Device type
- Operating system
- Pages visited
- Date and time of access
- Referring website
- General website usage information
This information may be used to maintain website functionality, improve user experience, understand website usage, and address technical or security issues.
# 3. Information You Provide Voluntarily
You may provide personal information when you:
- Submit an abstract
- Register for a conference
- Apply to participate as a speaker
- Accept a conference invitation
- Contact our organizing team
- Request a visa invitation letter
- Request accommodation information
- Apply for sponsorship or exhibition
- Subscribe to conference updates
- Submit a contact form
- Request certificates or other conference services
You are responsible for ensuring that the information you provide is accurate and up to date.
# 4. How We Use Your Information
NVS International Services may use collected information for legitimate conference and organizational purposes, including:
- Processing registrations
- Managing conference participation
- Reviewing abstract submissions
- Coordinating speakers
- Preparing conference programs
- Communicating with participants
- Issuing certificates
- Preparing invitation letters
- Supporting visa documentation
- Managing payments and transaction records
- Coordinating accommodation where applicable
- Managing sponsorship and exhibition enquiries
- Providing conference updates
- Responding to enquiries
- Maintaining administrative records
- Improving website functionality
- Maintaining website security
- Managing event-related services
# 5. Speaker and Author Information
For accepted speakers and presenters, certain information may be published as part of the official conference program.
Depending on the conference, this may include:
- Name
- Professional designation
- Institution
- Country
- Presentation title
- Abstract
- Professional biography
- Profile photograph
Such information may appear on:
- Official conference website
- Conference program
- Abstract book
- Conference proceedings
- Digital conference materials
- Promotional or informational conference materials
Participants who have concerns about publicly displaying specific information should contact the organizing team.
# 6. Abstracts and Research Information
Abstracts and research information submitted for conference participation may be used for legitimate conference-related purposes.
Depending on the conference, submitted abstracts may be included in:
- Abstract books
- Conference proceedings
- Conference websites
- Digital conference materials
- Scientific programs
- Other official conference publications
Authors are responsible for ensuring that they have the necessary rights and permissions to submit their content.
# 7. Visa and Invitation Letter Information
Participants requesting an official conference invitation or participation confirmation letter may be required to provide additional information necessary for preparing the document.
This information may include:
- Full name
- Passport-related information, where necessary
- Nationality
- Institution
- Country of residence
- Conference information
- Registration details
Such information will be used for the relevant conference and documentation process.
NVS International Services does not determine visa eligibility or visa approval. Visa decisions are made by the relevant government authorities.
# 8. Payment Information
Registration payments may be processed through third-party payment providers.
Depending on the payment method used, the payment provider may independently collect and process financial information according to its own privacy policy and terms.
NVS International Services may retain transaction-related information necessary for:
- Registration verification
- Payment reconciliation
- Refund processing
- Accounting
- Administrative records
- Responding to payment enquiries
Participants should review the privacy policy of the payment provider they use.
# 9. Sharing of Information
NVS International Services does not intend to sell personal information to third parties.
Information may be shared when reasonably necessary for legitimate conference or operational purposes, including with:
- Conference service providers
- Payment processing providers
- Accommodation or venue partners
- Publication partners
- Technology or website service providers
- Event support providers
- Government or immigration authorities where legally required
- Professional advisers or service providers where necessary
Information will only be shared as appropriate for the relevant purpose or where required or permitted by applicable law.
# 10. Third-Party Services
Our website or conference services may use third-party platforms for functions such as:
- Payment processing
- Website hosting
- Email communication
- Registration
- Online meetings
- Publication
- Analytics
- Accommodation
- Other conference-related services
These third parties may process information according to their own terms and privacy policies.
NVS International Services encourages users to review the privacy policies of third-party services before providing information through those platforms.
# 11. Cookies and Similar Technologies
Our website may use cookies or similar technologies depending on the services and tools implemented on the website.
Cookies may help with:
- Website functionality
- User preferences
- Security
- Website performance
- Analytics
- Understanding website usage
Users may be able to manage cookies through their browser settings.
Disabling certain cookies may affect some website functionality.
# 12. Email Communication
NVS International Services may use the email address provided by a participant to communicate information related to:
- Registration
- Abstract submission
- Speaker participation
- Conference schedules
- Payment status
- Visa documentation
- Certificates
- Program updates
- Important conference announcements
Where appropriate, users may also receive information about upcoming conferences or related activities.
Participants may contact us if they no longer wish to receive non-essential communications.
# 13. Data Security
NVS International Services takes reasonable measures to protect personal information against unauthorized access, misuse, loss, alteration, or disclosure.
However, no website, online communication system, or electronic storage method can be guaranteed to be completely secure.
Participants should take reasonable precautions when submitting personal information online and should avoid sending confidential credentials through email.
# 14. Data Retention
Personal information may be retained for as long as reasonably necessary for:
- Conference administration
- Registration records
- Financial and accounting purposes
- Publication records
- Certificate verification
- Legal or regulatory requirements
- Resolving disputes
- Maintaining appropriate organizational records
The retention period may vary depending on the type of information and the purpose for which it was collected.
# 15. Data Accuracy
Participants are responsible for providing accurate information.
If any information provided to NVS International Services is incorrect, outdated, or incomplete, participants may contact the organizing team to request an appropriate correction.
# 16. Your Privacy Choices
Depending on applicable law and circumstances, you may have rights relating to your personal information, including the ability to:
- Request access to certain personal information
- Request correction of inaccurate information
- Ask questions about how information is used
- Request deletion where applicable
- Withdraw certain communications
- Raise concerns regarding the handling of personal information
Some information may need to be retained where required for legitimate administrative, legal, accounting, or regulatory purposes.
# 17. Children's Privacy
NVS International Services conferences and services are primarily intended for researchers, professionals, academicians, students, and other participants who are eligible to participate in the relevant event.
We do not knowingly seek to collect personal information from children for purposes unrelated to legitimate conference participation.
If you believe that personal information belonging to a child has been provided to us unnecessarily, please contact us so that the matter can be reviewed.
# 18. International Participants
NVS International Services may receive participants and enquiries from different countries.
As a result, personal information may be processed or transferred across countries where necessary for legitimate conference operations, payment processing, website services, publication, or other related activities.
Where applicable, information will be handled in accordance with relevant legal requirements and contractual or operational safeguards.
# 19. Links to Other Websites
Our website may contain links to external websites, including:
- Government websites
- Visa portals
- Hotels
- Airlines or transportation services
- Universities
- Research organizations
- Publishers
- Sponsors
- Exhibitors
- Payment providers
NVS International Services is not responsible for the privacy practices or content of external websites.
Users should review the privacy policies of third-party websites before providing personal information.
# 20. Social Media and Public Platforms
NVS International Services may maintain or use social media and other public communication platforms for conference-related communication and promotion.
Information voluntarily shared by participants on public platforms may be visible to others according to the privacy settings and policies of those platforms.
Participants should avoid posting confidential research, personal information, payment information, or other sensitive information on public platforms.
# 21. Photography and Event Recording
Conference events may include photography, video recording, or other forms of event documentation.
Images or recordings may be used for legitimate purposes such as:
- Conference reports
- Website content
- Event documentation
- Social media
- Promotional materials
- Future conference information
Participants who have specific concerns regarding photography or recording should contact the organizing team.
# 22. Research and Intellectual Property
Submitting research to an NVS International Services conference does not transfer ownership of the research to NVS International Services unless expressly agreed in writing.
Authors remain responsible for:
- Originality of their work
- Copyright compliance
- Appropriate citations
- Permissions for third-party content
- Confidentiality requirements
- Intellectual property rights
For further information, participants should also review the applicable Intellectual Property Policy and Publication Information.
# 23. Changes to This Privacy Policy
NVS International Services may update this Privacy Policy from time to time to reflect:
- Changes in services
- Website functionality
- Conference operations
- Legal or regulatory requirements
- Data protection practices
- Third-party service changes
The updated version will be published on the website where appropriate.
Participants are encouraged to review this page periodically.
# 24. Contact Us
If you have questions, concerns, or requests relating to this Privacy Policy or the handling of your personal information, please contact NVS International Services through the official contact details provided on our website.
When contacting us, please provide sufficient information to help us understand your request, such as:
Name:
Email Address:
Conference Name:
Registration/Abstract ID, if applicable:
Nature of Request:
We will review privacy-related enquiries and respond as appropriate.
# Important Notice
This Privacy Policy provides general information about how NVS International Services may collect, use, store, and share information in connection with its website, conferences, and related services.
**Specific conferences, payment providers, publication partners, registration platforms, or other third-party services may have additional privacy terms that apply to their respective services.**
By using the NVS International Services website or participating in our conferences and events, you acknowledge that you have read and understood this Privacy Policy.` },
      { id: 'g8', heading: 'Frequently Asked Questions', body: `# 1. Who can participate in NVS International Services conferences?
Researchers, scientists, academicians, professors, research scholars, students, industry professionals, engineers, healthcare professionals, and other professionals related to the conference field can participate.
# 2. Can I attend the conference without presenting a paper?
Yes. Participants may register as delegates without presenting a paper, subject to the registration options available for the specific conference.
# 3. How can I submit an abstract?
Abstracts can be submitted through the official submission system or the submission method provided on the respective conference website. Authors should follow the abstract guidelines and deadlines specified for the conference.
# 4. How can I participate as a speaker?
Researchers and professionals may participate as speakers by submitting an abstract or by responding to an official invitation from the conference organizing team. Speaker categories may include Keynote, Plenary, Invited, Oral, and Poster presentations.
# 5. Does abstract acceptance mean my registration is confirmed?
No. Abstract acceptance and conference registration are separate processes. Accepted participants must complete the applicable registration requirements to confirm their participation.
# 6. Can I change my presentation title after submitting my abstract?
Title changes may be possible before the final conference program is prepared. Participants should contact the organizing team as early as possible for any required changes.
# 7. Does NVS provide a visa invitation letter?
Eligible international participants may request an official conference invitation or participation confirmation letter, subject to the requirements of the respective conference.
# 8. Does the invitation letter guarantee visa approval?
No. An invitation letter does not guarantee visa approval or entry into the destination country. Visa decisions are made solely by the relevant embassy, consulate, or immigration authority.
# 9. Does NVS provide flight tickets or accommodation?
Unless specifically stated otherwise, participants are responsible for their own flights and accommodation. Any available accommodation arrangements or special packages will be communicated for the respective conference.
# 10. Will my abstract or paper be published?
Depending on the conference, accepted abstracts may be included in conference materials or proceedings. Selected papers may also be considered for journal publication where applicable. Publication and indexing are subject to the policies and review procedures of the respective publisher or journal.
# 11. Can I cancel my registration?
Yes. Cancellation requests are subject to the Cancellation & Refund Policy applicable to the respective conference. Refund eligibility depends on the timing of the cancellation and the applicable conference terms.
# 12. Can I transfer my registration to another person?
A registration transfer or speaker substitution may be possible with prior approval from the organizing team. The proposed participant may need to provide relevant professional and registration details.
# 13. Are virtual participation options available?
Some conferences may offer virtual or hybrid participation. Availability depends on the specific conference and will be stated on the official conference website.
# 14. How can I become a sponsor or exhibitor?
Organizations interested in sponsorship or exhibition opportunities can contact the NVS International Services team through the official conference contact details.
# 15. How can I contact NVS International Services?
For enquiries regarding registration, abstracts, speakers, payments, visa letters, publication, accommodation, sponsorship, exhibition, or general conference information, please contact the organizing team through the official contact details provided on the respective conference website.
# Important Note
Conference dates, fees, deadlines, registration categories, publication arrangements, visa documentation, refund conditions, and participation options may vary between conferences.
Please refer to the official website and latest communication for your specific conference for the most accurate information.` },
      { id: 'g9', heading: 'Important Participant Information', body: `NVS International Services welcomes researchers, academicians, students, industry professionals, speakers, delegates, sponsors, exhibitors, and other participants to its conferences and events.
To ensure a smooth conference experience, participants are requested to review the following information carefully before completing registration and making travel arrangements.
# 1. Conference Information
Participants should regularly check the official conference website and email communications for the latest information regarding:
- Conference dates
- Venue
- Scientific program
- Presentation schedule
- Registration deadlines
- Speaker information
- Abstract submission
- Accommodation
- Visa requirements
- Other important announcements
Conference schedules and arrangements may be updated when necessary.
# 2. Registration Confirmation
Participants should ensure that their registration has been successfully completed and confirmed before making final travel arrangements.
Abstract acceptance, speaker invitation, or submission of an abstract does not automatically mean that registration is complete.
# 3. Abstract & Presentation
Accepted speakers and presenters should submit their required presentation information within the announced deadlines.
Participants may be requested to provide:
- Final presentation title
- Abstract
- Short biography
- Recent photograph
- Institutional affiliation
- Presentation file, where applicable
Speakers should follow the assigned presentation date, time, and format.
# 4. Visa & Travel Documents
International participants are responsible for checking the visa and entry requirements of the destination country.
Participants should apply through the appropriate official government, embassy, consulate, or immigration authority.
Where applicable, NVS International Services may provide an official invitation or participation confirmation letter.
**An invitation letter does not guarantee visa approval or entry into the destination country.**
Participants are responsible for ensuring that their passport, visa, insurance, and other required travel documents are valid before travelling.
# 5. Flights & Accommodation
Unless specifically stated otherwise, participants are responsible for arranging and paying for their own:
- Flights
- Accommodation
- Local transportation
- Travel insurance
- Meals
- Personal expenses
Where recommended hotels or accommodation options are available, details will be communicated through the official conference channels.
# 6. Payment
Participants should make registration payments only through the official payment channels provided by NVS International Services or the respective conference website.
Participants should retain their payment receipt or transaction confirmation.
**Never share passwords, card PINs, CVV numbers, OTPs, or online banking credentials through email or unofficial communication channels.**
# 7. Cancellation & Refund
Cancellation and refund requests are subject to the Cancellation & Refund Policy applicable to the respective conference.
Participants should carefully review the applicable cancellation terms before completing registration and payment.
# 8. Transfer & Substitution
If a registered participant or speaker is unable to attend, they may contact the organizing team to request a registration transfer or speaker substitution.
Such changes require prior approval and are not automatically accepted.
# 9. Publication
Depending on the conference, accepted abstracts or papers may be included in conference materials, proceedings, or other publication opportunities.
**Conference participation or abstract acceptance does not automatically guarantee journal publication or indexing.**
Publication is subject to the applicable editorial and review procedures.
# 10. Certificates
Eligible participants may receive certificates according to their participation category and the specific conference policy.
Participants should ensure that their name and other registration details are correct before certificates are finalized.
# 11. Conference Program Changes
The organizing team makes reasonable efforts to maintain the published program. However, changes to speakers, sessions, presentation timings, venue, or other program details may occasionally be necessary.
Participants should check the latest official program before attending.
# 12. Professional Conduct
All participants are expected to maintain respectful and professional behaviour throughout the event.
Participants should respect:
- Other attendees
- Speakers
- Researchers
- Organizers
- Sponsors
- Exhibitors
- Venue staff
- Intellectual property and confidential information
Harassment, discrimination, intimidation, abusive communication, or disruptive behaviour is not acceptable.
# 13. Photography & Recording
Conference activities may be photographed or recorded for legitimate conference-related purposes such as event documentation, website updates, reports, and promotional materials.
Participants should respect the privacy and intellectual property rights of other attendees when taking photographs or recording presentations.
# 14. Personal Information
Information provided during registration, abstract submission, speaker participation, or other conference activities may be used for legitimate conference administration and communication.
Participants should review the Privacy Policy for further information about the collection and use of personal information.
# 15. Official Communication
Participants should rely on the official NVS International Services website and authorized communication channels for conference information.
If you receive an unexpected payment request or other suspicious communication claiming to represent NVS International Services, verify it with the official conference contact before taking any action.
# 16. Contact & Support
For assistance with:
- Registration
- Abstract submission
- Speaker participation
- Payment
- Visa invitation letters
- Accommodation
- Presentation
- Publication
- Certificates
- Sponsorship
- Exhibition
- General conference information
participants may contact the organizing team through the official contact details provided on the respective conference website.
# Important Note
**Conference dates, venues, fees, deadlines, programs, publication arrangements, visa requirements, refund conditions, and participation options may vary between individual conferences.**
Participants are advised to review the latest official conference information before making registration, payment, travel, accommodation, or visa arrangements.` },
      { id: 'g10', heading: 'Contact & Support', body: `NVS International Services is committed to providing clear and timely support to participants, speakers, researchers, delegates, sponsors, exhibitors, and other conference stakeholders.
Our team can assist with conference-related enquiries, registration, abstract submission, speaker participation, payments, visa documentation, publication information, and other event-related matters.
# How We Can Help
Participants may contact us regarding:
- Conference registration
- Abstract submission
- Abstract acceptance
- Keynote and plenary participation
- Oral and poster presentations
- Speaker confirmation
- Registration payments
- Payment confirmation
- Visa invitation letters
- Conference venue and travel information
- Accommodation information
- Certificates
- Publication and proceedings
- Cancellation and refund enquiries
- Transfer and substitution requests
- Sponsorship opportunities
- Exhibition opportunities
- Virtual participation
- General conference information
# For Conference Enquiries
To help us respond efficiently, please include the following information in your enquiry:
Full Name:
Conference Name:
Institution/Organization:
Country:
Registration or Abstract ID:
Subject:
Details of Your Enquiry:
Providing these details helps our team identify your conference record and respond more efficiently.
# Speaker & Abstract Support
Speakers and authors may contact us for assistance with:
- Abstract submission
- Abstract corrections
- Presentation titles
- Speaker profile information
- Biography and photograph submission
- Presentation requirements
- Session scheduling
- Speaker confirmation
- Presentation format
Please mention your abstract or registration reference, where available.
# Registration & Payment Support
For registration or payment-related enquiries, please provide the relevant transaction or registration information.
If a payment has been deducted but your registration has not been confirmed, please share the available payment reference or transaction details so that the status can be checked.
**Please do not send passwords, card PINs, CVV numbers, OTPs, or online banking credentials by email.**
# Visa & Invitation Letter Support
International participants who require an official conference invitation or participation confirmation letter may contact the organizing team after completing the applicable conference requirements.
Please note that NVS International Services can provide conference-related documentation where applicable, but visa approval is determined solely by the relevant embassy, consulate, or immigration authority.
# Publication Support
For enquiries related to abstracts, proceedings, journal opportunities, publication requirements, or publication status, participants should mention their conference and abstract/paper details.
Publication arrangements may differ between conferences.
# Sponsorship & Exhibition
Organizations interested in becoming sponsors or exhibitors can contact the NVS International Services team for information regarding:
- Sponsorship packages
- Exhibition opportunities
- Branding options
- Promotional opportunities
- Exhibition requirements
- Partnership arrangements
# Response Time
We aim to respond to conference-related enquiries as promptly as reasonably possible.
Response times may vary depending on the nature of the enquiry, conference schedule, weekends, public holidays, or the need to obtain information from relevant departments or service providers.
# Official Communication
For your security, participants should rely on the official NVS International Services website and authorized contact details for conference-related information.
If you receive any unusual payment request or communication claiming to represent NVS International Services, please verify it with the official organizing team before making any payment or sharing personal information.
# Contact Information
# Contact Information
**NVS International Services**
Email: nvsinternstional.office@gmail.com
Phone: +91 9505811873
Location: Dilshuknagar, Hyderabad, Telangana, India
For a specific conference, participants should also refer to the official conference website and conference-specific contact details, as contact information may vary between events.
# We’re Here to Help
Whether you need assistance with registration, abstracts, speakers, payments, visa documentation, publication, accommodation, sponsorship, exhibition, or general conference information, the NVS International Services team is available to assist with your enquiry.` },
    ] },
    home: { kind: 'home', directory: [
      { id: 'h1', number: '01', title: 'About Us', text: 'About NVS International Services', href: 'about.html' },
      { id: 'h2', number: '02', title: 'Upcoming Conferences', text: 'Explore Our Upcoming Conferences', href: 'conferences.html' },
      { id: 'h3', number: '03', title: 'Sponsors & Exhibitors', text: 'Partner With NVS International Services', href: 'sponsors.html' },
      { id: 'h4', number: '04', title: 'Gallery', text: 'Gallery', href: 'gallery.html' },
      { id: 'h5', number: '05', title: 'General Information', text: 'Terms & Conditions', href: 'general-information.html' },
      { id: 'h6', number: '06', title: 'Contact Us', text: 'Connect With NVS International Services', href: 'contact.html' }
    ] }
  }
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
      pages: mergePages(baseData.pages, savedData.pages),
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

function mergePages(basePages, savedPages) {
  const merged = structuredClone(basePages || {});
  const saved = savedPages || {};
  Object.keys(saved).forEach((key) => {
    merged[key] = { ...(merged[key] || {}), ...saved[key] };
  });
  return merged;
}

function getPageConfig(pageKey) {
  return getSiteData().pages?.[pageKey] || structuredClone(defaultSiteData.pages?.[pageKey] || {});
}

function renderInline(text = '') {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function renderParagraphs(body = '') {
  return String(body).split(/\n\s*\n/).map((para) => para.trim()).filter(Boolean).map((para) => `<p>${renderInline(para)}</p>`).join('');
}

function renderList(listStyle, items = []) {
  const rows = Array.isArray(items) ? items.filter((item) => String(item).trim()) : [];
  if (!rows.length || !listStyle || listStyle === 'none') return '';
  if (listStyle === 'definition') {
    return `<ul class="about-list">${rows.map((item) => {
      const [term, ...rest] = String(item).split('::');
      const description = rest.join('::').trim();
      return `<li><strong>${renderInline(term.trim())}</strong>${description ? `<span>${renderInline(description)}</span>` : ''}</li>`;
    }).join('')}</ul>`;
  }
  return `<ul class="about-topic-list">${rows.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`;
}

function renderBlock(block = {}) {
  const variantClass = { opening: ' about-opening', vision: ' about-vision', closing: ' about-closing' }[block.variant] || '';
  let html = `<article class="about-block${variantClass}">`;
  if (block.kicker) html += `<p class="about-kicker">${renderInline(block.kicker)}</p>`;
  if (block.heading) html += `<h2>${renderInline(block.heading)}</h2>`;
  html += renderParagraphs(block.body);
  html += renderList(block.listStyle, block.listItems);
  html += renderParagraphs(block.bodyAfter);
  if (block.signoff) html += `<p class="about-signoff"><strong>${renderInline(block.signoff.strong)}</strong><span>${renderInline(block.signoff.span)}</span><b>${renderInline(block.signoff.b)}</b></p>`;
  if (block.button) html += `<p><a class="button button-lime" href="${escapeHtml(block.button.href)}">${renderInline(block.button.label)} <span>↗</span></a></p>`;
  return `${html}</article>`;
}

function renderBlocks(sections = []) {
  return (Array.isArray(sections) ? sections : []).map(renderBlock).join('');
}

function renderRichBody(body = '') {
  const lines = String(body).split('\n');
  let html = '';
  let bullets = [];
  const flush = () => {
    if (bullets.length) {
      html += `<ul class="details-list">${bullets.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`;
      bullets = [];
    }
  };
  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) { flush(); return; }
    if (line.startsWith('- ')) { bullets.push(line.slice(2).trim()); return; }
    flush();
    if (line.startsWith('# ')) {
      html += `<h3 class="details-subheading">${renderInline(line.slice(2).trim())}</h3>`;
    } else {
      html += `<p>${renderInline(line)}</p>`;
    }
  });
  flush();
  return html;
}

function renderAccordion(sections = []) {
  return (Array.isArray(sections) ? sections : []).map((item) => `<details><summary>${renderInline(item.heading)} <span>+</span></summary><div class="details-body">${renderRichBody(item.body)}</div></details>`).join('');
}

function renderHeader(activePage = '') {
  const links = [
    ['index.html', 'Home', 'home'],
    ['about.html', 'About Us', 'about'],
    ['conferences.html', 'Conferences', 'conferences'],
    ['sponsors.html', 'Sponsor & Exhibit', 'sponsors'],
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

function aboutPageContent() {
  return `<section class="about-content section-light">${renderBlocks(getPageConfig('about').sections)}</section>`;
}

function partnershipPageContent() {
  return `${pageIntro('sponsors', '03', 'PARTNER WITH NVS', 'Sponsor and Exhibitor', 'Sponsor · Exhibit · Connect · Engage')}
  <section class="partnership-content about-content section-light">${renderBlocks(getPageConfig('sponsors').sections)}</section>
  <section class="page-section section-dark"><div class="section-label light-label">CURRENT PARTNERSHIP PACKAGES</div><div class="package-grid">${getPartnerships().map(partnerCard).join('')}</div></section>`;
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
    renderShell('about-page', 'about', `${pageIntro('about', '01', 'ABOUT US', 'About NVS International Services', 'Connecting scientific communities through knowledge, research and collaboration.')}${aboutPageContent()}`);
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
  if (page === 'sponsors' || page === 'exhibitors') renderShell('partners-page', 'sponsors', partnershipPageContent());
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
  renderShell('general-page', 'general', `${pageIntro('general', '07', 'GENERAL INFORMATION', 'General Information', 'Guidelines, policies, publication details, and participant support.') }<section class="page-section section-light"><div class="accordion">${generalDetails()}</div></section>`);
  document.querySelectorAll('details').forEach((detail) => detail.addEventListener('toggle', () => { if (detail.open) document.querySelectorAll('details[open]').forEach((other) => { if (other !== detail) other.removeAttribute('open'); }); }));
}

function generalDetails() {
  return renderAccordion(getPageConfig('general').sections);
}

if (document.body.dataset.page) startPage();

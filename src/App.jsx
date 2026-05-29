import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FileText,
  Filter,
  Github,
  GraduationCap,
  Gauge,
  HardDrive,
  Image as ImageIcon,
  Layers3,
  Lock,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Network,
  Palette,
  Phone,
  RadioTower,
  RefreshCw,
  Rocket,
  Router,
  Search,
  Server,
  Send,
  Shield,
  ShieldCheck,
  Shuffle,
  Smartphone,
  Sparkles,
  Wrench,
  Workflow,
  X,
} from 'lucide-react';
import {
  achievements,
  capabilityModes,
  certifications,
  education,
  experiences,
  hardwareQueue,
  infraFocus,
  infraTickets,
  profile,
  projects,
  proofPoints,
  skillGroups,
  sourceAudit,
  stridezScreens,
} from './data.js';

const CinematicInfraScene = React.lazy(() => import('./CinematicInfraScene.jsx'));

const sections = ['home', 'stridez', 'experience', 'dashboard', 'projects', 'skills', 'resume', 'contact'];
const sectionLabels = {
  dashboard: 'infra lab',
  stridez: 'stridez',
};
const projectFilters = [
  'All',
  'Featured',
  ...Array.from(new Set(projects.map((project) => project.category))),
];
const welcomeSessionKey = 'kaazhim_welcome_seen_v2';
const toronto2014VideoId = '-YlFWMXxgtg';

function App() {
  const [activeMode, setActiveMode] = useState(capabilityModes[0].id);
  const [activeExperience, setActiveExperience] = useState(0);
  const [activeInfra, setActiveInfra] = useState(infraFocus[0].id);
  const [activeStridezScreen, setActiveStridezScreen] = useState(stridezScreens[0].id);
  const [dashboardMode, setDashboardMode] = useState('live');
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [readiness, setReadiness] = useState(76);
  const [projectFilter, setProjectFilter] = useState('Featured');
  const [selectedProject, setSelectedProject] = useState(projects.find((project) => project.featured) ?? projects[0]);
  const [projectQuery, setProjectQuery] = useState('');
  const [modalProject, setModalProject] = useState(null);
  const [modalTab, setModalTab] = useState('story');
  const [funMode, setFunMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [portraitStyle, setPortraitStyle] = useState({});
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealReady, setRevealReady] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === 'undefined') return true;

    try {
      const params = new URLSearchParams(window.location.search);
      return params.has('welcome') || window.sessionStorage.getItem(welcomeSessionKey) !== '1';
    } catch {
      return true;
    }
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const mode = capabilityModes.find((item) => item.id === activeMode) ?? capabilityModes[0];
  const currentInfra = infraFocus.find((item) => item.id === activeInfra) ?? infraFocus[0];
  const readinessScore = Math.min(99, Math.round((currentInfra.score * 0.62) + (readiness * 0.28) + resolvedTickets.length * 2.4));
  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), []);
  const filteredProjects = useMemo(() => {
    const query = projectQuery.trim().toLowerCase();
    const base = query
      ? projects
      : projectFilter === 'All'
        ? projects
        : projectFilter === 'Featured'
          ? featuredProjects
          : projects.filter((project) => project.category === projectFilter);

    if (!query) return base;

    return base.filter((project) =>
      [project.title, project.summary, project.category, project.type, project.role, project.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [featuredProjects, projectFilter, projectQuery]);

  useEffect(() => {
    if (!filteredProjects.includes(selectedProject)) {
      setSelectedProject(filteredProjects[0] ?? projects[0]);
    }
  }, [filteredProjects, selectedProject]);

  useEffect(() => {
    if (!window.location.hash) return undefined;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      let current = 'home';
      for (const id of sections) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointerMove = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll(
        [
          '.section-heading',
          '.clean-art-card',
          '.stridez-copy-panel',
          '.stridez-phone-stage',
          '.stridez-dimension-card',
          '.wow-panel',
          '.wow-orbit-stage',
          '.timeline-card',
          '.experience-detail',
          '.certification-card',
          '.infra-dashboard',
          '.featured-chip',
          '.project-card',
          '.project-detail',
          '.skill-card',
          '.education-panel',
          '.contact-form',
        ].join(','),
      ),
    );

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((target, index) => {
      target.classList.add('reveal-target');
      target.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 55, 275)}ms`);
      if (reducedMotion) target.classList.add('is-revealed');
    });
    setRevealReady(true);

    if (reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalProject) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setModalProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalProject]);

  useEffect(() => {
    if (!showWelcome) return undefined;

    document.body.classList.add('boot-lock');
    return () => document.body.classList.remove('boot-lock');
  }, [showWelcome]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submitContact = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${contactForm.name || 'Visitor'}`);
    const body = encodeURIComponent(
      [`Name: ${contactForm.name}`, `Email: ${contactForm.email}`, '', contactForm.message]
        .filter(Boolean)
        .join('\n'),
    );
    setContactStatus('Email draft prepared');
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const burst = () => {
    const pieces = Array.from({ length: 22 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: 38 + Math.random() * 24,
      delay: Math.random() * 0.18,
      spin: Math.random() > 0.5 ? 1 : -1,
    }));

    setConfetti(pieces);
    window.setTimeout(() => setConfetti([]), 1100);
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setModalProject(project);
    setModalTab('visuals');
    burst();
  };

  const shuffleProject = () => {
    const pool = filteredProjects.length ? filteredProjects : projects;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setSelectedProject(next);
    burst();
  };

  const toggleFunMode = () => {
    setFunMode((current) => !current);
    burst();
  };

  const runDiagnostic = () => {
    setDashboardMode((current) => (current === 'live' ? 'diagnostic' : current === 'diagnostic' ? 'hardening' : 'live'));
    setReadiness((current) => Math.min(96, current + 3));
    setActiveInfra((current) => {
      const currentIndex = infraFocus.findIndex((item) => item.id === current);
      return infraFocus[(currentIndex + 1) % infraFocus.length].id;
    });
    burst();
  };

  const toggleTicket = (ticketId) => {
    setResolvedTickets((current) =>
      current.includes(ticketId) ? current.filter((id) => id !== ticketId) : [...current, ticketId],
    );
  };

  const handlePortraitMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPortraitStyle({
      '--tilt-x': `${(-y * 8).toFixed(2)}deg`,
      '--tilt-y': `${(x * 8).toFixed(2)}deg`,
    });
  };

  const closeWelcome = useCallback(() => {
    try {
      window.sessionStorage.setItem(welcomeSessionKey, '1');
    } catch {
      // Session storage can be unavailable in strict browser privacy modes.
    }
    setShowWelcome(false);
  }, []);

  return (
    <div className={`app-shell ${funMode ? 'fun-mode' : ''} ${revealReady ? 'reveal-ready' : ''}`}>
      <Confetti pieces={confetti} />
      {showWelcome && <WelcomePage onEnter={closeWelcome} />}
      <div className="wow-spotlight" aria-hidden="true" />
      <div className="scroll-meter" style={{ width: `${scrollProgress}%` }} />
      <Header activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <section className="hero ink-band" id="home">
          {!showWelcome && (
            <>
              <HeroMotionField activeInfra={activeInfra} dashboardMode={dashboardMode} />
              <SectionMotionBackdrop variant="hero" />
              <CinematicScene
                activeFocus={activeInfra}
                className="hero-cinematic-backdrop"
                mode={dashboardMode}
                priority
                variant="hero"
              />
            </>
          )}
          <HeroCommandRail
            activeInfra={activeInfra}
            currentInfra={currentInfra}
            dashboardMode={dashboardMode}
            onDiagnostic={runDiagnostic}
            onSelectInfra={setActiveInfra}
          />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <MapPin size={18} />
                {profile.location}
              </p>
              <h1>{profile.name}</h1>
              <p className="hero-title">{profile.title}</p>
              <p className="hero-summary">{profile.summary}</p>
              <p className="hero-pitch">{profile.pitch}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  <BriefcaseBusiness size={18} />
                  View Case Studies
                </a>
                <a className="button button-light" href={profile.resume} download>
                  <Download size={18} />
                  Download Resume
                </a>
                <a className="button button-line" href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={18} />
                  GitHub
                </a>
                <a className="button button-cinema" href="#dashboard">
                  <Rocket size={18} />
                  Launch 3D Lab
                </a>
              </div>
              <div className="hero-signal-strip" aria-label="Cinematic infrastructure signal">
                <span>3D infra core online</span>
                <strong>{dashboardMode === 'live' ? 'Live orbit' : dashboardMode === 'diagnostic' ? 'Diagnostic scan' : 'Hardening sweep'}</strong>
                <small>{currentInfra.label} focus</small>
              </div>
              <HeroStatusDock currentInfra={currentInfra} dashboardMode={dashboardMode} readinessScore={readinessScore} />
              <HeroLiveConsole
                currentInfra={currentInfra}
                dashboardMode={dashboardMode}
                onDiagnostic={runDiagnostic}
                readinessScore={readinessScore}
              />
            </div>

            <div
              className="hero-visual"
              aria-label="Kaazhim real project showcase photo and portfolio snapshot"
              onMouseMove={handlePortraitMove}
              onMouseLeave={() => setPortraitStyle({})}
            >
              <div className="visual-label">
                <BadgeCheck size={18} />
                Real photo. Real projects.
              </div>
              <div className="portrait-stage" style={portraitStyle}>
                <div className="portrait-frame">
                  <img
                    className="portrait-photo"
                    src={profile.photo}
                    alt="Kaazhim presenting the Stridez mobile app project showcase"
                  />
                  <span className="portrait-scan-sweep" aria-hidden="true" />
                </div>
                <div className="portrait-card portrait-card-top">
                  <span>Showcase Mode</span>
                  <strong>Stridez pitch, app demo, and poster proof</strong>
                </div>
                <div className="portrait-card portrait-card-bottom">
                  <span>Verified</span>
                  <strong>PHP lint + Vite build + Android build</strong>
                </div>
                <div className="portrait-ribbon">Support to Build to Present</div>
              </div>
              <div className="visual-stack">
                {['Server', 'Firewall', 'Network', 'Cyber', 'Hardware', 'React', 'SQL'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="proof-grid" aria-label="Profile highlights">
              {proofPoints.map((point) => (
                <div className="proof-item" key={point.label}>
                  <strong>{point.value}</strong>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shell capability-board" aria-label="Capability selector">
            <div className="mode-tabs" role="tablist" aria-label="Capability mode">
              {capabilityModes.map((item) => (
                <button
                  className={item.id === activeMode ? 'is-active' : ''}
                  key={item.id}
                  onClick={() => setActiveMode(item.id)}
                  type="button"
                  role="tab"
                  aria-selected={item.id === activeMode}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className={`mode-detail accent-${mode.accent}`}>
              <div>
                <span>Active strength</span>
                <h2>{mode.title}</h2>
                <p>{mode.summary}</p>
              </div>
              <div className="mode-stack">
                {mode.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="mode-flow">
                {mode.flow.map((item, index) => (
                  <div key={item}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WowLayer activeInfra={activeInfra} currentInfra={currentInfra} onDiagnostic={runDiagnostic} onSelectInfra={setActiveInfra} />

        <CleanIllustrationLab activeInfra={activeInfra} onSelectInfra={setActiveInfra} />

        <StridezExperienceShowcase
          activeScreen={activeStridezScreen}
          onOpenProject={() => openProject(projects.find((project) => project.id === 'stridez') ?? projects[0])}
          onSelectScreen={setActiveStridezScreen}
          screens={stridezScreens}
        />

        <section className="cream-band" id="experience">
          <SectionMotionBackdrop variant="experience" />
          <div className="shell section-grid">
            <SectionHeading
              icon={<Workflow />}
              kicker="Experience"
              title="Support mindset with builder habits"
              text="The work history connects hands-on user support, application support, workflow digitization, project execution, and customer-facing operations."
            />
            <div className="timeline-layout">
              <div className="timeline-list" aria-label="Experience timeline">
                {experiences.map((item, index) => (
                  <button
                    className={`timeline-card ${index === activeExperience ? 'is-active' : ''}`}
                    key={item.company}
                    onClick={() => setActiveExperience(index)}
                    onMouseEnter={() => setActiveExperience(index)}
                    type="button"
                  >
                    <span>{item.period}</span>
                    <strong>{item.company}</strong>
                    <small>{item.role}</small>
                  </button>
                ))}
              </div>
              <article className="experience-detail">
                <div className="detail-heading">
                  <div>
                    <p>{experiences[activeExperience].place}</p>
                    <h3>{experiences[activeExperience].role}</h3>
                  </div>
                  <ShieldCheck size={34} />
                </div>
                <ul>
                  {experiences[activeExperience].points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={18} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <ExperienceFlowPanel experience={experiences[activeExperience]} index={activeExperience} />
            </div>
          </div>
        </section>

        <section className="infra-band" id="dashboard">
          <SectionMotionBackdrop variant="dashboard" />
          <div className="shell section-grid">
            <div className="section-split infra-section-head">
              <SectionHeading
                icon={<Gauge />}
                kicker="Infra Lab"
                title="A live-feeling infrastructure dashboard"
                text="Built to show my current direction clearly: servers, firewall rules, network support, cybersecurity hygiene, and hardware replacement."
              />
              <div className="infra-now-card">
                <span>Current focus</span>
                <strong>{currentInfra.title}</strong>
                <p>{currentInfra.status}</p>
              </div>
            </div>
            <InfraDashboard
              activeInfra={activeInfra}
              currentInfra={currentInfra}
              dashboardMode={dashboardMode}
              onDiagnostic={runDiagnostic}
              onSelectInfra={setActiveInfra}
              onToggleTicket={toggleTicket}
              readiness={readiness}
              readinessScore={readinessScore}
              resolvedTickets={resolvedTickets}
              setReadiness={setReadiness}
            />
          </div>
        </section>

        <section className="projects-band ink-band" id="projects">
          <SectionMotionBackdrop variant="projects" />
          <div className="shell">
            <div className="section-split">
              <SectionHeading
                icon={<Code2 />}
                kicker="Projects"
                title="Detailed case studies, not just titles"
                text="Each project is written for recruiter scanning: what problem it solves, how it works, why it matters, and what was verified locally."
              />
              <div className="project-tools" aria-label="Project controls">
                <label className="project-search">
                  <Search size={18} />
                  <input
                    value={projectQuery}
                    onChange={(event) => setProjectQuery(event.target.value)}
                    placeholder="Search stack or project"
                  />
                </label>
                <div className="project-tool-actions">
                  <button className="tool-button" onClick={shuffleProject} type="button">
                    <Shuffle size={16} />
                    Surprise me
                  </button>
                  <button className={`tool-button ${funMode ? 'is-active' : ''}`} onClick={toggleFunMode} type="button">
                    <Palette size={16} />
                    Never Enough mode
                  </button>
                </div>
                <div className="filter-bar" aria-label="Project filters">
                  <Filter size={18} />
                  {projectFilters.map((filter) => (
                    <button
                      className={projectFilter === filter ? 'is-active' : ''}
                      key={filter}
                      onClick={() => setProjectFilter(filter)}
                      type="button"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="featured-strip">
              {featuredProjects.slice(0, 5).map((project) => (
                <button
                  className={`featured-chip accent-${project.accent} ${
                    selectedProject.id === project.id ? 'is-active' : ''
                  }`}
                  key={project.id}
                  onClick={() => {
                    setProjectFilter('Featured');
                    setSelectedProject(project);
                  }}
                  type="button"
                >
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                  <small>Tap to focus</small>
                </button>
              ))}
            </div>

            <div className="project-layout">
              <div className="project-list" aria-label="Project list">
                {filteredProjects.map((project) => (
                  <article
                    className={`project-card accent-${project.accent} ${
                      selectedProject.id === project.id ? 'is-active' : ''
                    }`}
                    key={project.id}
                  >
                    <button className="project-card-main" onClick={() => setSelectedProject(project)} type="button">
                      <ProjectVisual project={project} compact />
                      <div className="project-card-copy">
                        <span>{project.category}</span>
                        <strong>{project.title}</strong>
                        <p>{project.summary}</p>
                        <small>{project.status}</small>
                      </div>
                      <ChevronRight size={20} />
                    </button>
                    <button className="project-view-link" onClick={() => openProject(project)} type="button">
                      <Eye size={16} />
                      View Project
                    </button>
                  </article>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="empty-results">
                    <Search size={24} />
                    <strong>No project found</strong>
                    <p>Try another stack, category, or project name.</p>
                  </div>
                )}
              </div>
              <ProjectDetail project={selectedProject} onView={openProject} />
            </div>

            <div className="source-audit">
              <div className="mini-heading">
                <Clipboard />
                <h3>Source Audit</h3>
              </div>
              <div className="audit-grid">
                {sourceAudit.map((item) => (
                  <article className="audit-card" key={item.item}>
                    <span>{item.status}</span>
                    <strong>{item.item}</strong>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cream-band" id="skills">
          <SectionMotionBackdrop variant="skills" />
          <div className="shell section-grid">
            <SectionHeading
              icon={<Network />}
              kicker="Skills"
              title="A practical full-stack support toolkit"
              text="The skill mix is intentionally broad: support, databases, mobile apps, web prototypes, reporting, and workflow tools."
            />
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.name}>
                  <h3>{group.name}</h3>
                  <div>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <SkillMotionConsole groups={skillGroups} />
            <div className="education-layout">
              <div className="education-panel">
                <div className="mini-heading">
                  <GraduationCap />
                  <h3>Education</h3>
                </div>
                {education.map((item) => (
                  <div className="education-row" key={item.school}>
                    <strong>{item.credential}</strong>
                    <span>{item.school}</span>
                    <small>
                      {item.period} | {item.cgpa}
                    </small>
                  </div>
                ))}
              </div>
              <div className="education-panel">
                <div className="mini-heading">
                  <Sparkles />
                  <h3>Certifications and Proof</h3>
                </div>
                <div className="certification-stack">
                  {certifications.map((item, index) => (
                    <article className="certification-card" key={item.title}>
                      <div className="certification-image">
                        <img
                          src={item.image}
                          alt={`${item.title} evidence`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                        />
                      </div>
                      <div>
                        <span>{item.issuer}</span>
                        <strong>{item.title}</strong>
                        <small>{item.period}</small>
                        <p>{item.description}</p>
                        <div className="certification-tags">
                          {item.tags.map((tag) => (
                            <em key={tag}>{tag}</em>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="achievement-list">
                  {achievements.slice(0, 4).map((item) => (
                    <div className="achievement-row" key={item}>
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="resume-band ink-band" id="resume">
          <SectionMotionBackdrop variant="resume" />
          <div className="shell resume-layout">
            <div>
              <SectionHeading
                icon={<FileText />}
                kicker="Resume"
                title="Two-page resume preview"
                text="A compact record of support experience, project work, education, certifications, and contact details."
              />
              <div className="resume-actions">
                <a className="button button-primary" href={profile.resume} download>
                  <Download size={18} />
                  Download PDF
                </a>
                <a className="button button-line" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <ArrowUpRight size={18} />
                  LinkedIn
                </a>
              </div>
              <ResumeMotionConsole />
            </div>
            <div className="resume-preview" aria-label="Resume preview">
              <img src="/assets/resume-page-1.png" alt="Kaazhim resume page one preview" />
              <img src="/assets/resume-page-2.png" alt="Kaazhim resume page two preview" />
            </div>
          </div>
        </section>

        <section className="contact-band cream-band" id="contact">
          <SectionMotionBackdrop variant="contact" />
          <div className="shell contact-layout">
            <div>
              <SectionHeading
                icon={<Mail />}
                kicker="Contact"
                title="Ready for support, app, and junior developer roles"
                text="Available for IT support, application support, junior software development, digital operations, and workflow-focused opportunities."
              />
              <div className="contact-methods">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={18} />
                  {profile.email}
                </a>
                {profile.phones.map((phone) => (
                  <a href={`tel:${phone.replace(/\s/g, '')}`} key={phone}>
                    <Phone size={18} />
                    {phone}
                  </a>
                ))}
                <button onClick={copyEmail} type="button">
                  <Clipboard size={18} />
                  {copied ? 'Copied' : 'Copy Email'}
                </button>
              </div>
              <ContactSignalPanel />
              <div className="qr-tile">
                <img src="/assets/linkedin-qr.png" alt="LinkedIn QR code for Kaazhim" />
                <span>LinkedIn profile QR</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <label>
                Name
                <input
                  value={contactForm.name}
                  onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  placeholder="your@email.com"
                />
              </label>
              <label>
                Message
                <textarea
                  value={contactForm.message}
                  onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                  placeholder="Tell me about the opportunity"
                  rows="5"
                />
              </label>
              <button className="button button-primary" type="submit">
                <Send size={18} />
                Prepare Email
              </button>
              <p className="form-status">{contactStatus}</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <button
        aria-label="Back to top"
        className={`top-button ${scrollProgress > 8 ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        type="button"
      >
        <ArrowUpRight size={20} />
      </button>
      {modalProject && (
        <ProjectModal
          activeTab={modalTab}
          onClose={() => setModalProject(null)}
          onTabChange={setModalTab}
          project={modalProject}
        />
      )}
    </div>
  );
}

function WelcomePage({ onEnter }) {
  const [progress, setProgress] = useState(8);
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoOrigin = typeof window === 'undefined' ? '' : encodeURIComponent(window.location.origin);
  const videoSrc = `https://www.youtube-nocookie.com/embed/${toronto2014VideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${toronto2014VideoId}&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&origin=${videoOrigin}&widget_referrer=${videoOrigin}`;
  const welcomeLines = useMemo(
    () => [
      'welcome kaazhim --portfolio --cinematic',
      'spotlight infra focus: server firewall network',
      'cue daniel-caesar/toronto-2014 --muted background',
      'open project stories --recruiter-view',
      'ready --enter-portfolio',
    ],
    [],
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncCapability = () => setCanLoadVideo(!mobileQuery.matches && !reducedMotionQuery.matches);

    syncCapability();
    mobileQuery.addEventListener?.('change', syncCapability);
    reducedMotionQuery.addEventListener?.('change', syncCapability);

    return () => {
      mobileQuery.removeEventListener?.('change', syncCapability);
      reducedMotionQuery.removeEventListener?.('change', syncCapability);
    };
  }, []);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        const step = current < 45 ? 4 : current < 82 ? 2 : 1;
        return Math.min(100, current + step);
      });
    }, 120);
    const autoEnterTimer = window.setTimeout(onEnter, 8500);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(autoEnterTimer);
    };
  }, [onEnter]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === 'Escape') onEnter();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onEnter]);

  useEffect(() => {
    if (!canLoadVideo) return undefined;

    let cancelled = false;
    let player;
    const playerId = 'portfolio-welcome-youtube-player';
    const timeout = window.setTimeout(() => {
      if (!cancelled) setVideoFailed(true);
    }, 5200);
    const previousReady = window.onYouTubeIframeAPIReady;

    const markPlayable = () => {
      window.clearTimeout(timeout);
      if (!cancelled) {
        setVideoActive(true);
        setVideoFailed(false);
      }
    };

    const initializePlayer = () => {
      if (cancelled || !window.YT?.Player) return;

      player = new window.YT.Player(playerId, {
        events: {
          onReady: (event) => {
            try {
              event.target.mute();
              event.target.playVideo();
            } catch {
              setVideoFailed(true);
            }
          },
          onStateChange: (event) => {
            const states = window.YT?.PlayerState;
            if (event.data === states?.PLAYING || event.data === states?.BUFFERING) markPlayable();
          },
          onError: () => {
            window.clearTimeout(timeout);
            if (!cancelled) setVideoFailed(true);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        initializePlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.append(script);
      }
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      if (window.onYouTubeIframeAPIReady !== previousReady) {
        window.onYouTubeIframeAPIReady = previousReady;
      }
      try {
        player?.destroy?.();
      } catch {
        // YouTube iframe cleanup can throw when the iframe was already removed.
      }
    };
  }, [canLoadVideo]);

  return (
    <div className="boot-page" role="dialog" aria-modal="true" aria-label="Portfolio welcome page">
      {canLoadVideo ? (
        <div
          className={`boot-video-frame ${videoReady ? 'is-ready' : ''} ${
            videoActive && !videoFailed ? 'is-playing' : 'has-poster'
          }`}
          aria-hidden="true"
        >
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture"
            id="portfolio-welcome-youtube-player"
            onLoad={() => setVideoReady(true)}
            referrerPolicy="origin-when-cross-origin"
            src={videoSrc}
            title="Daniel Caesar Toronto 2014 official music video background"
          />
          <span className="boot-video-poster" />
        </div>
      ) : (
        <div className="boot-fallback" aria-hidden="true">
          <span className="boot-fallback-glow glow-one" />
          <span className="boot-fallback-glow glow-two" />
          <span className="boot-fallback-glow glow-three" />
        </div>
      )}
      <div className="boot-overlay" aria-hidden="true" />
      <div className="boot-grain" aria-hidden="true" />

      <div className="boot-shell">
        <section className="boot-copy" aria-labelledby="boot-title">
          <div className="boot-kicker">
            <Code2 size={16} />
            <span>kaazhim.welcome</span>
            <strong>v2026</strong>
          </div>
          <h2 id="boot-title">Welcome to my Portfolio</h2>
          <p>
            Come in through a cinematic Daniel Caesar backdrop, then explore my infrastructure,
            cybersecurity, server, firewall, network, and project work.
          </p>

          <div className="boot-terminal" aria-label="Welcome notes">
            <div className="boot-terminal-top">
              <span />
              <span />
              <span />
              <strong>welcome/session</strong>
            </div>
            <div className="boot-lines">
              {welcomeLines.map((line, index) => (
                <p key={line} style={{ '--line-delay': `${index * 110}ms` }}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <code>{line}</code>
                </p>
              ))}
            </div>
            <div
              className="boot-progress"
              aria-label="Portfolio welcome progress"
              aria-valuemax="100"
              aria-valuemin="0"
              aria-valuenow={progress}
              role="progressbar"
              style={{ '--boot-progress': `${progress}%` }}
            >
              <div className="boot-progress-track">
                <span />
              </div>
              <strong>{progress}%</strong>
            </div>
          </div>

          <div className="boot-actions">
            <button autoFocus className="boot-enter-button" onClick={onEnter} type="button">
              <Rocket size={18} />
              Enter portfolio
            </button>
            <button className="boot-skip-button" onClick={onEnter} type="button">
              Skip welcome
              <ArrowUpRight size={16} />
            </button>
          </div>
          <small>Daniel Caesar - Toronto 2014 plays muted on desktop. Mobile keeps a lighter cinematic welcome.</small>
        </section>

        <section className="boot-visual" aria-label="Animated portfolio system status">
          <div className="boot-visual-stage">
            <span className="boot-depth-grid" aria-hidden="true" />
            <span className="boot-orbit orbit-one" aria-hidden="true" />
            <span className="boot-orbit orbit-two" aria-hidden="true" />
            <span className="boot-scanline" aria-hidden="true" />
            <div className="boot-core">
              <Sparkles size={24} />
              <strong>KA</strong>
              <span>{progress}%</span>
            </div>
            <div className="boot-stack-card card-server">
              <Server size={22} />
              <span>Server</span>
              <strong>Online</strong>
            </div>
            <div className="boot-stack-card card-firewall">
              <ShieldCheck size={22} />
              <span>Firewall</span>
              <strong>Protected</strong>
            </div>
            <div className="boot-stack-card card-network">
              <Router size={22} />
              <span>Network</span>
              <strong>Routed</strong>
            </div>
            <div className="boot-stack-card card-hardware">
              <HardDrive size={22} />
              <span>Hardware</span>
              <strong>Ready</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeroMotionField({ activeInfra, dashboardMode }) {
  const focusIndex = Math.max(0, infraFocus.findIndex((item) => item.id === activeInfra));
  const packets = ['server', 'firewall', 'network', 'cyber', 'hardware'];
  const particles = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div
      className={`hero-motion-field motion-${dashboardMode}`}
      data-focus={activeInfra}
      style={{ '--focus-index': focusIndex }}
      aria-hidden="true"
    >
      <span className="motion-depth-grid" />
      <span className="motion-glass-plane plane-a" />
      <span className="motion-glass-plane plane-b" />
      <span className="motion-orbit orbit-a" />
      <span className="motion-orbit orbit-b" />
      <span className="motion-orbit orbit-c" />
      <span className="motion-beam beam-a" />
      <span className="motion-beam beam-b" />
      <span className="motion-beam beam-c" />
      {packets.map((item, index) => (
        <span className={`motion-packet packet-${index + 1}`} key={item} />
      ))}
      {particles.map((item) => (
        <span className={`motion-particle particle-${item}`} key={item} />
      ))}
    </div>
  );
}

function SectionMotionBackdrop({ variant = 'sky' }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    const target = backdropRef.current;
    const parentSection = target?.closest('section');
    if (!target || !parentSection) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isLive = entry.isIntersecting;
        target.classList.toggle('is-live', isLive);
        parentSection.classList.toggle('is-motion-live', isLive);
      },
      { rootMargin: '120px 0px', threshold: 0.01 },
    );

    observer.observe(parentSection);

    return () => {
      observer.disconnect();
      target.classList.remove('is-live');
      parentSection.classList.remove('is-motion-live');
    };
  }, []);

  return (
    <div className={`section-kinetic-backdrop kinetic-${variant}`} ref={backdropRef} aria-hidden="true">
      <span className="kinetic-grid" />
      <span className="kinetic-rail rail-one" />
      <span className="kinetic-rail rail-two" />
      <span className="kinetic-orbit orbit-one" />
      <span className="kinetic-orbit orbit-two" />
      <span className="kinetic-pulse pulse-one" />
      <span className="kinetic-pulse pulse-two" />
      <span className="kinetic-packet packet-one" />
      <span className="kinetic-packet packet-two" />
      <span className="kinetic-cube cube-one">
        <i />
        <i />
        <i />
      </span>
      <span className="kinetic-cube cube-two">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

function HeroLiveConsole({ currentInfra, dashboardMode, onDiagnostic, readinessScore }) {
  const modeLabel = dashboardMode === 'live' ? 'monitor' : dashboardMode === 'diagnostic' ? 'trace' : 'harden';
  const consoleLines = [
    `boot ${currentInfra.id}-profile --priority recruiter-view`,
    `check ${currentInfra.tools.slice(0, 2).join(' + ').toLowerCase()}`,
    `write evidence-log --status ${currentInfra.risk.toLowerCase()}`,
  ];

  return (
    <div className="hero-live-console" aria-label="Animated infrastructure console">
      <div className="console-terminal">
        <div className="console-topline">
          <span />
          <span />
          <span />
          <strong>motion.theme/{modeLabel}</strong>
        </div>
        <div className="console-lines">
          {consoleLines.map((line, index) => (
            <p key={line} style={{ '--line-delay': `${index * 120}ms` }}>
              <span>{`0${index + 1}`}</span>
              <code>{line}</code>
            </p>
          ))}
        </div>
      </div>
      <div className="console-readout">
        <div>
          <span>readiness</span>
          <strong>{readinessScore}%</strong>
        </div>
        <div className="console-meter" aria-hidden="true">
          <span style={{ width: `${readinessScore}%` }} />
        </div>
        <div className="console-mini-bars" aria-hidden="true">
          {currentInfra.bars.map((value, index) => (
            <span key={`${currentInfra.id}-${index}`} style={{ '--bar': `${value}%`, '--bar-delay': `${index * 80}ms` }} />
          ))}
        </div>
        <button onClick={onDiagnostic} type="button">
          <Activity size={15} />
          pulse stack
        </button>
      </div>
    </div>
  );
}

function HeroStatusDock({ currentInfra, dashboardMode, readinessScore }) {
  const statusItems = [
    { label: 'focus', value: currentInfra.label },
    { label: 'mode', value: dashboardMode },
    { label: 'readiness', value: `${readinessScore}%` },
  ];

  return (
    <div className="hero-status-dock" aria-label="Current portfolio system status">
      {statusItems.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function HeroCommandRail({ activeInfra, currentInfra, dashboardMode, onDiagnostic, onSelectInfra }) {
  const modeLabel = dashboardMode === 'live' ? 'live-support' : dashboardMode === 'diagnostic' ? 'diagnostic-scan' : 'hardening-review';

  return (
    <div className="shell hero-command-rail" aria-label="Interactive home infrastructure command rail">
      <div className="rail-prompt">
        <Code2 size={16} />
        <span>kaazhim@portfolio</span>
        <strong>./scan --focus={currentInfra.id} --mode={modeLabel}</strong>
      </div>
      <div className="rail-focus-list" aria-label="Infrastructure focus selector">
        {infraFocus.map((item) => (
          <button
            className={activeInfra === item.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => onSelectInfra(item.id)}
            type="button"
          >
            {getInfraIcon(item.id, 15)}
            {item.label}
          </button>
        ))}
      </div>
      <button className="rail-run-button" onClick={onDiagnostic} type="button">
        <RefreshCw size={15} />
        Run scan
      </button>
    </div>
  );
}

function Header({ activeSection, mobileOpen, setMobileOpen }) {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Kaazhim home">
          <span>K</span>
          <strong>{profile.shortName}</strong>
        </a>
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="menu-button"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
          {sections.slice(1).map((section) => (
            <a
              className={activeSection === section ? 'is-active' : ''}
              href={`#${section}`}
              key={section}
              onClick={() => setMobileOpen(false)}
            >
              {sectionLabels[section] ?? section}
            </a>
          ))}
          <a className="nav-cta" href={profile.resume} download>
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

function CinematicScene(props) {
  const anchorRef = useRef(null);
  const [capability, setCapability] = useState({ checked: false, enabled: false });
  const [shouldMount, setShouldMount] = useState(Boolean(props.priority));
  const variant = props.variant ?? 'hero';

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 860px)').matches;
    const saveData = Boolean(navigator.connection?.saveData);
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4;
    let webglSupported = false;

    try {
      const canvas = document.createElement('canvas');
      webglSupported = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      webglSupported = false;
    }

    setCapability({
      checked: true,
      enabled: webglSupported && !reducedMotion && !coarsePointer && !narrowViewport && !saveData && !lowMemory,
    });
  }, []);

  useEffect(() => {
    if (!capability.enabled || props.priority || shouldMount) return undefined;

    const target = anchorRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '520px 0px', threshold: 0.01 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [capability.enabled, props.priority, shouldMount]);

  if (!capability.checked || !capability.enabled || !shouldMount) {
    return (
      <CinematicFallback
        activeFocus={props.activeFocus}
        anchorRef={anchorRef}
        className={props.className}
        mode={props.mode}
        variant={variant}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div
          className={`cinematic-scene cinematic-scene-loading cinematic-scene-${variant} ${props.className ?? ''}`}
          aria-hidden="true"
        />
      }
    >
      <CinematicInfraScene {...props} />
    </Suspense>
  );
}

function CinematicFallback({
  activeFocus = 'server',
  anchorRef,
  className = '',
  mode = 'live',
  variant = 'hero',
}) {
  const label = infraFocus.find((item) => item.id === activeFocus)?.label ?? 'Server';

  return (
    <div
      className={`cinematic-scene cinematic-fallback cinematic-fallback-${mode} cinematic-scene-${variant} ${className}`}
      data-focus={activeFocus}
      ref={anchorRef}
      aria-hidden="true"
    >
      <div className="fallback-grid" />
      <div className="fallback-core">
        {getInfraIcon(activeFocus, variant === 'dashboard' ? 26 : 34)}
        <span>{label}</span>
      </div>
      <span className="fallback-ring ring-a" />
      <span className="fallback-ring ring-b" />
      <span className="fallback-node node-a" />
      <span className="fallback-node node-b" />
      <span className="fallback-node node-c" />
    </div>
  );
}

function WowLayer({ activeInfra, currentInfra, onDiagnostic, onSelectInfra }) {
  const impactStats = [
    { label: 'Recruiter scan path', value: '15 sec', text: 'Hero, infra focus, proof, projects' },
    { label: 'Core identity', value: 'Infra+', text: 'Server, firewall, network, cyber, hardware' },
    { label: 'Proof density', value: '21', text: 'Projects with real visuals or source evidence' },
  ];
  const journey = [
    { icon: <Eye size={17} />, label: 'Scan', text: 'Identity first' },
    { icon: <ShieldCheck size={17} />, label: 'Trust', text: 'Proof visible' },
    { icon: <Network size={17} />, label: 'Route', text: 'Infra focus' },
    { icon: <Rocket size={17} />, label: 'Act', text: 'Projects open' },
  ];

  return (
    <section className="wow-layer-band" aria-label="Premium portfolio impact layer">
      <SectionMotionBackdrop variant="wow" />
      <div className="shell wow-layer-layout">
        <div className="wow-copy">
          <SectionHeading
            icon={<Rocket />}
            kicker="WOW Layer"
            title="A sharper first impression for recruiters"
            text="This layer turns the portfolio into a guided product experience: fast identity, clear infrastructure direction, real project evidence, and a premium visual rhythm."
          />
          <div className="wow-journey" aria-label="Recruiter journey preview">
            {journey.map((item) => (
              <div key={item.label}>
                {item.icon}
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="wow-actions">
            <button className="button button-primary" onClick={onDiagnostic} type="button">
              <Sparkles size={18} />
              Run wow sweep
            </button>
            <a className="button button-dark" href="#projects">
              <ArrowUpRight size={18} />
              Jump to proof
            </a>
          </div>
        </div>

        <div className="wow-orbit-stage" aria-label={`${currentInfra.label} visual focus selector`}>
          <span className="wow-stage-label">Recruiter command orbit</span>
          <span className="wow-beam beam-one" aria-hidden="true" />
          <span className="wow-beam beam-two" aria-hidden="true" />
          <div className="wow-orbit-core">
            {getInfraIcon(activeInfra, 30)}
            <span>{currentInfra.label}</span>
            <strong>{currentInfra.risk}</strong>
          </div>
          <div className="wow-orbit-ring ring-one" aria-hidden="true" />
          <div className="wow-orbit-ring ring-two" aria-hidden="true" />
          {infraFocus.map((item, index) => (
            <button
              className={`wow-node node-${index + 1} ${activeInfra === item.id ? 'is-active' : ''}`}
              key={item.id}
              onClick={() => onSelectInfra(item.id)}
              type="button"
            >
              {getInfraIcon(item.id, 18)}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="wow-scan-readout">
            <span>{currentInfra.score}% focus</span>
            <strong>{currentInfra.title}</strong>
          </div>
        </div>

        <div className="wow-panels">
          {impactStats.map((item) => (
            <article className="wow-panel" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StridezExperienceShowcase({ activeScreen, onOpenProject, onSelectScreen, screens }) {
  const activeIndex = Math.max(0, screens.findIndex((screen) => screen.id === activeScreen));
  const current = screens[activeIndex] ?? screens[0];
  const previous = screens[(activeIndex - 1 + screens.length) % screens.length];
  const next = screens[(activeIndex + 1) % screens.length];
  const dimensions = [
    { icon: <Smartphone size={19} />, title: 'Interface', text: 'Real Flutter screens, auth, profile, settings, and support states.' },
    { icon: <MapPin size={19} />, title: 'GPS', text: 'Park selection, route preview, arrival check, and location permission flow.' },
    { icon: <Activity size={19} />, title: 'Motion', text: 'Warm-up, live run HUD, pause/finish controls, and moving-state feedback.' },
    { icon: <ShieldCheck size={19} />, title: 'Safety', text: 'Park-boundary warning and beginner-friendly guidance built into the run.' },
    { icon: <Gauge size={19} />, title: 'Analysis', text: 'Distance, pace, calories, steps, activity zone, and next-run tips.' },
  ];

  const renderPhone = (screen, position) => (
    <figure className={`stridez-phone stridez-phone-${position}`} key={`${screen.id}-${position}`}>
      <div className="stridez-phone-shell">
        <span className="stridez-phone-speaker" />
        <img src={screen.src} alt={screen.label} loading={position === 'active' ? 'eager' : 'lazy'} />
      </div>
      <figcaption>
        <span>{screen.stage}</span>
        <strong>{screen.label}</strong>
      </figcaption>
    </figure>
  );

  return (
    <section className="stridez-showcase-band" id="stridez" aria-label="Stridez mobile app 5D showcase">
      <SectionMotionBackdrop variant="stridez" />
      <div className="shell stridez-showcase-layout">
        <div className="stridez-copy-panel">
          <SectionHeading
            icon={<Smartphone />}
            kicker="Stridez 5D Showcase"
            title="Real mobile screens with depth, motion, maps, safety, and analysis"
            text="The Stridez project now has a cleaner product story built from the actual UI testing screenshots: from onboarding and GPS park selection to warm-up, live tracking, results, and account flows."
          />
          <div className="stridez-active-card">
            <span>{current.stage} screen</span>
            <strong>{current.label}</strong>
            <p>{current.note}</p>
          </div>
          <div className="stridez-showcase-actions">
            <button className="button button-primary" onClick={onOpenProject} type="button">
              <Eye size={18} />
              Open Stridez Case Study
            </button>
            <a className="button button-line" href="#projects">
              <ArrowUpRight size={18} />
              View All Proof
            </a>
          </div>
        </div>

        <div className="stridez-phone-stage" aria-label="Interactive Stridez phone screen preview">
          <div className="stridez-stage-grid" aria-hidden="true" />
          {renderPhone(previous, 'previous')}
          {renderPhone(current, 'active')}
          {renderPhone(next, 'next')}
        </div>

        <div className="stridez-dimensions" aria-label="Five Stridez experience dimensions">
          {dimensions.map((item) => (
            <article className="stridez-dimension-card" key={item.title}>
              {item.icon}
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="shell stridez-screen-rail" aria-label="Stridez screen selector">
        {screens.map((screen, index) => (
          <button
            className={screen.id === current.id ? 'is-active' : ''}
            key={screen.id}
            onClick={() => onSelectScreen(screen.id)}
            type="button"
          >
            <img src={screen.src} alt="" loading="lazy" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{screen.stage}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}

function CleanIllustrationLab({ activeInfra, onSelectInfra }) {
  const artCards = [
    {
      id: 'server',
      title: 'Server Core',
      label: '3D rack',
      copy: 'A cleaner service-room visual for uptime, backup thinking, and controlled changes.',
    },
    {
      id: 'firewall',
      title: 'Firewall Gate',
      label: 'Security plane',
      copy: 'A glass policy layer for ports, access, exposure checks, and cyber hygiene.',
    },
    {
      id: 'network',
      title: 'Network Orbit',
      label: 'Signal map',
      copy: 'Calm routing lines for LAN, Wi-Fi, DHCP, DNS, and troubleshooting flow.',
    },
    {
      id: 'hardware',
      title: 'Hardware Bench',
      label: 'Device care',
      copy: 'Clean endpoint art for replacement work, setup, inspection, and documentation.',
    },
  ];

  return (
    <section className="clean-art-band" id="visual-lab" aria-label="Clean portfolio illustration lab">
      <SectionMotionBackdrop variant="clean" />
      <div className="shell clean-art-layout">
        <div className="clean-art-copy">
          <SectionHeading
            icon={<Sparkles />}
            kicker="Illustration System"
            title="More 3D character, less visual noise"
            text="A set of clean interactive illustrations now supports the portfolio story without covering the real projects, resume, or recruiter-facing details."
          />
          <div className="clean-art-note">
            <span>Design rule</span>
            <strong>Every visual points back to infrastructure: server, firewall, network, and hardware.</strong>
          </div>
        </div>
        <div className="clean-art-grid">
          {artCards.map((card) => (
            <button
              className={`clean-art-card art-${card.id} ${activeInfra === card.id ? 'is-active' : ''}`}
              key={card.id}
              onClick={() => onSelectInfra(card.id)}
              type="button"
            >
              <Clean3DIllustration id={card.id} />
              <span>{card.label}</span>
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clean3DIllustration({ id }) {
  return (
    <div className={`clean-3d-art clean-3d-${id}`} aria-hidden="true">
      <span className="clean-art-floor" />
      <span className="clean-art-ring" />
      <span className="clean-art-line line-one" />
      <span className="clean-art-line line-two" />
      <span className="clean-art-node node-one" />
      <span className="clean-art-node node-two" />
      <span className="clean-art-node node-three" />
      {id === 'server' && (
        <span className="server-mini-stack">
          <i />
          <i />
          <i />
        </span>
      )}
      {id === 'firewall' && (
        <span className="firewall-mini-gate">
          <i />
          <i />
          <i />
        </span>
      )}
      {id === 'network' && (
        <span className="network-mini-router">
          <i />
          <i />
        </span>
      )}
      {id === 'hardware' && (
        <span className="hardware-mini-device">
          <i />
          <i />
        </span>
      )}
    </div>
  );
}

function ExperienceFlowPanel({ experience, index }) {
  const phases = ['ticket', 'triage', 'fix', 'log'];

  return (
    <article className="experience-flow-panel" aria-label="Animated support workflow visual">
      <div className="flow-cube-stage" aria-hidden="true">
        <span className="flow-core">
          <i />
          <i />
          <i />
        </span>
        <span className="flow-ring ring-a" />
        <span className="flow-ring ring-b" />
        <span className="flow-signal signal-a" />
        <span className="flow-signal signal-b" />
      </div>
      <div>
        <span className="flow-kicker">experience loop 0{index + 1}</span>
        <strong>{experience.company}</strong>
        <p>Support work translated into a clean operational loop: understand the issue, isolate the layer, fix with care, and document the outcome.</p>
      </div>
      <div className="flow-steps">
        {phases.map((phase, phaseIndex) => (
          <span key={phase} style={{ '--step': phaseIndex }}>
            {phase}
          </span>
        ))}
      </div>
    </article>
  );
}

function SkillMotionConsole({ groups }) {
  const orbitItems = groups.slice(0, 5).map((group) => group.name.split(' ')[0]);

  return (
    <div className="skill-motion-console" aria-label="Animated skill orbit">
      <div className="skill-orbit-stage" aria-hidden="true">
        <span className="skill-orbit-ring ring-a" />
        <span className="skill-orbit-ring ring-b" />
        <span className="skill-orbit-core">
          <Code2 size={24} />
        </span>
        {orbitItems.map((item, index) => (
          <span className={`skill-orbit-token token-${index + 1}`} key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="skill-console-copy">
        <span>motion toolkit</span>
        <strong>Support + infra + code in one orbit</strong>
        <p>Animated to show the portfolio’s actual shape: technical support, infrastructure direction, databases, app builds, and workflow tools rotating around practical problem solving.</p>
      </div>
    </div>
  );
}

function ResumeMotionConsole() {
  return (
    <div className="resume-motion-console" aria-label="Animated resume scanner">
      <div className="resume-scan-device" aria-hidden="true">
        <span className="resume-scan-page" />
        <span className="resume-scan-line" />
        <span className="resume-scan-chip chip-a" />
        <span className="resume-scan-chip chip-b" />
      </div>
      <div>
        <span>resume scanner</span>
        <strong>Two pages, recruiter-ready proof trail</strong>
      </div>
    </div>
  );
}

function ContactSignalPanel() {
  return (
    <div className="contact-signal-panel" aria-label="Animated contact signal">
      <div className="contact-signal-orbit" aria-hidden="true">
        <RadioTower size={24} />
        <span className="signal-ring ring-a" />
        <span className="signal-ring ring-b" />
        <span className="signal-dot dot-a" />
        <span className="signal-dot dot-b" />
      </div>
      <div>
        <span>response channel</span>
        <strong>Email, phone, LinkedIn, and QR path ready</strong>
      </div>
    </div>
  );
}

function InfraDashboard({
  activeInfra,
  currentInfra,
  dashboardMode,
  onDiagnostic,
  onSelectInfra,
  onToggleTicket,
  readiness,
  readinessScore,
  resolvedTickets,
  setReadiness,
}) {
  const openTickets = infraTickets.length - resolvedTickets.length;
  const topology = [
    { id: 'hardware', label: 'Endpoint', helper: 'laptop, printer, scanner' },
    { id: 'network', label: 'Switch / Wi-Fi', helper: 'LAN, DHCP, DNS' },
    { id: 'firewall', label: 'Firewall', helper: 'ports, policy, exposure' },
    { id: 'server', label: 'Server', helper: 'services, storage, backup' },
    { id: 'cyber', label: 'Security', helper: 'patch, access, evidence' },
  ];

  return (
    <div className={`infra-dashboard mode-${dashboardMode}`}>
      <div className="infra-control-strip">
        <div>
          <span>Command mode</span>
          <strong>{dashboardMode === 'live' ? 'Live support' : dashboardMode === 'diagnostic' ? 'Diagnostic sweep' : 'Hardening review'}</strong>
        </div>
        <button className="infra-run-button" onClick={onDiagnostic} type="button">
          <RefreshCw size={17} />
          Run diagnostic
        </button>
        <label className="readiness-slider">
          <span>Readiness</span>
          <input
            aria-label="Infrastructure readiness score"
            max="96"
            min="54"
            onChange={(event) => setReadiness(Number(event.target.value))}
            type="range"
            value={readiness}
          />
          <strong>{readinessScore}%</strong>
        </label>
      </div>

      <div className="infra-stats" aria-label="Infrastructure dashboard summary">
        <div>
          <span>Infra readiness</span>
          <strong>{readinessScore}%</strong>
        </div>
        <div>
          <span>Focus score</span>
          <strong>{currentInfra.score}%</strong>
        </div>
        <div>
          <span>Open queue</span>
          <strong>{openTickets}</strong>
        </div>
        <div>
          <span>Risk lens</span>
          <strong>{currentInfra.risk}</strong>
        </div>
      </div>

      <div className="infra-main-grid">
        <aside className="infra-domain-panel" aria-label="Infrastructure focus selector">
          {infraFocus.map((item) => (
            <button
              className={activeInfra === item.id ? 'is-active' : ''}
              key={item.id}
              onClick={() => onSelectInfra(item.id)}
              type="button"
            >
              {getInfraIcon(item.id, 20)}
              <span>{item.label}</span>
              <strong>{item.score}%</strong>
            </button>
          ))}
        </aside>

        <article className="infra-command-panel">
          <div className="infra-panel-head">
            <div className="infra-icon-orbit">{getInfraIcon(currentInfra.id, 34)}</div>
            <div>
              <span>{currentInfra.label} focus</span>
              <h3>{currentInfra.title}</h3>
            </div>
          </div>
          <p>{currentInfra.summary}</p>
          <div className="infra-chip-row">
            {currentInfra.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <ul className="infra-signal-list">
            {currentInfra.signals.map((signal) => (
              <li key={signal}>
                <ShieldCheck size={17} />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="infra-cinema-panel" aria-label="Interactive three dimensional infrastructure scene">
          <div className="infra-panel-head compact cinema-panel-head">
            <Layers3 size={25} />
            <div>
              <span>Blender-style WebGL</span>
              <h3>{currentInfra.label} orbit</h3>
            </div>
            <button className="cinema-scan-button" onClick={onDiagnostic} type="button">
              <Sparkles size={16} />
              Scan
            </button>
          </div>
          <div className="cinema-stage-shell">
            <CinematicScene activeFocus={activeInfra} mode={dashboardMode} variant="dashboard" />
            <div className="cinema-hud cinema-hud-top">
              <span>Firewall</span>
              <strong>{dashboardMode === 'hardening' ? 'Policy sweep' : 'Guarding edge'}</strong>
            </div>
            <div className="cinema-hud cinema-hud-bottom">
              <span>Server core</span>
              <strong>{readinessScore}% readiness</strong>
            </div>
          </div>
          <div className="cinema-node-controls" aria-label="3D focus controls">
            {infraFocus.map((item) => (
              <button
                className={activeInfra === item.id ? 'is-active' : ''}
                key={item.id}
                onClick={() => onSelectInfra(item.id)}
                type="button"
              >
                {getInfraIcon(item.id, 16)}
                {item.label}
              </button>
            ))}
          </div>
        </article>

        <article className="infra-wave-panel">
          <div className="infra-panel-head compact">
            <Activity size={25} />
            <div>
              <span>Signal pattern</span>
              <h3>Maintenance rhythm</h3>
            </div>
          </div>
          <div className="wave-bars" aria-label={`${currentInfra.label} readiness chart`}>
            {currentInfra.bars.map((value, index) => (
              <span key={`${currentInfra.id}-${index}`} style={{ '--bar': `${value}%` }}>
                <i>{value}</i>
              </span>
            ))}
          </div>
          <div className="album-meter" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>

        <article className="infra-topology-panel">
          <div className="infra-panel-head compact">
            <RadioTower size={25} />
            <div>
              <span>Topology</span>
              <h3>Click a node</h3>
            </div>
          </div>
          <div className="topology-map" aria-label="Clickable infrastructure topology">
            {topology.map((node, index) => (
              <button
                className={activeInfra === node.id ? 'is-active' : ''}
                key={node.id}
                onClick={() => onSelectInfra(node.id)}
                style={{ '--step': index }}
                type="button"
              >
                {getInfraIcon(node.id, 22)}
                <strong>{node.label}</strong>
                <span>{node.helper}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="infra-queue-panel">
          <div className="infra-panel-head compact">
            <Clipboard size={25} />
            <div>
              <span>Ticket queue</span>
              <h3>Practical triage</h3>
            </div>
          </div>
          <div className="ticket-list">
            {infraTickets.map((ticket) => {
              const resolved = resolvedTickets.includes(ticket.id);
              return (
                <button
                  className={resolved ? 'is-done' : ''}
                  key={ticket.id}
                  onClick={() => onToggleTicket(ticket.id)}
                  type="button"
                >
                  <span>{ticket.priority}</span>
                  <strong>{ticket.title}</strong>
                  <small>{ticket.detail}</small>
                </button>
              );
            })}
          </div>
        </article>

        <article className="hardware-panel">
          <div className="infra-panel-head compact">
            <HardDrive size={25} />
            <div>
              <span>Replacement board</span>
              <h3>Asset readiness</h3>
            </div>
          </div>
          {hardwareQueue.map((item) => {
            const progress = Math.round((item.done / item.total) * 100);
            return (
              <div className="hardware-row" key={item.asset}>
                <div>
                  <strong>{item.asset}</strong>
                  <span>
                    {item.done}/{item.total} complete
                  </span>
                </div>
                <div className="hardware-progress">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
}

function getProjectGallery(project) {
  const gallery = [...(project.gallery ?? [])];

  if (project.image && !gallery.some((item) => item.src === project.image)) {
    gallery.unshift({ src: project.image, label: project.visualLabel ?? 'Real project visual' });
  }

  if (project.logo && !gallery.some((item) => item.src === project.logo)) {
    gallery.push({ src: project.logo, label: `${project.title} logo` });
  }

  return gallery;
}

function SourceProofPanel({ artifact, compact = false }) {
  if (!artifact) return null;

  const visibleLines = compact ? artifact.lines.slice(0, 3) : artifact.lines;

  return (
    <div className={`source-proof ${compact ? 'is-compact' : ''}`}>
      <div className="source-proof-top">
        <FileCode2 size={compact ? 16 : 20} />
        <div>
          <span>{artifact.label}</span>
          <strong>{artifact.source}</strong>
        </div>
      </div>
      <pre>{visibleLines.join('\n')}</pre>
    </div>
  );
}

function ProjectVisual({ project, compact = false }) {
  const gallery = getProjectGallery(project);
  const primary = gallery[0];

  if (primary) {
    return (
      <figure className={`project-visual ${compact ? 'is-compact' : ''}`}>
        <img src={primary.src} alt={primary.label} />
        <figcaption>
          <ImageIcon size={compact ? 14 : 16} />
          {project.visualLabel ?? primary.label}
        </figcaption>
      </figure>
    );
  }

  if (project.artifact) {
    return <SourceProofPanel artifact={project.artifact} compact={compact} />;
  }

  return (
    <div className={`project-visual project-visual-empty ${compact ? 'is-compact' : ''}`}>
      <Rocket size={compact ? 22 : 34} />
      <span>Project evidence</span>
    </div>
  );
}

function ProjectVisualGallery({ project }) {
  const gallery = getProjectGallery(project);

  return (
    <div className="modal-visuals">
      {gallery.length > 0 && (
        <div className="visual-gallery">
          {gallery.map((item) => (
            <figure key={`${project.id}-${item.src}`}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {project.artifact && <SourceProofPanel artifact={project.artifact} />}
      {gallery.length === 0 && !project.artifact && (
        <div className="visual-empty-state">
          <ImageIcon />
          <strong>No visual artifact yet</strong>
          <p>This project is still listed with written source evidence only.</p>
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ project, onView }) {
  const icon = getProjectIcon(project.category);

  return (
    <article className={`project-detail accent-${project.accent}`}>
      <div className="project-detail-top">
        <div>
          <span>{project.type}</span>
          <h3>{project.title}</h3>
        </div>
        {icon}
      </div>

      <div className="project-detail-proof">
        <ProjectVisual project={project} />
        <p className="detail-summary">{project.summary}</p>
      </div>

      <div className="meta-row">
        <span>{project.year}</span>
        <span>{project.role}</span>
        <span>{project.status}</span>
      </div>

      <div className="case-grid">
        <div>
          <h4>Problem</h4>
          <p>{project.problem}</p>
        </div>
        <div>
          <h4>Solution</h4>
          <p>{project.solution}</p>
        </div>
        <div>
          <h4>Impact</h4>
          <p>{project.impact}</p>
        </div>
      </div>

      <div className="detail-section">
        <h4>Recruiter Notes</h4>
        <ul className="feature-list">
          {project.highlights.map((item) => (
            <li key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="evidence-list">
        <h4>Verification</h4>
        {project.evidence.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      <div className="project-links">
        <button className="project-open-button" onClick={() => onView(project)} type="button">
          <Eye size={16} />
          View Project
        </button>
        {project.links?.map((link) => (
          <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
            <ExternalLink size={16} />
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function ProjectModal({ activeTab, onClose, onTabChange, project }) {
  const tabs = [
    { id: 'visuals', label: 'Visuals' },
    { id: 'story', label: 'Story' },
    { id: 'stack', label: 'Stack' },
    { id: 'proof', label: 'Proof' },
  ];

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        aria-labelledby="project-modal-title"
        aria-modal="true"
        className={`project-modal accent-${project.accent}`}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} type="button" aria-label="Close project viewer">
          <X size={22} />
        </button>
        <div className="modal-hero">
          <ProjectVisual project={project} compact />
          <div>
            <span>{project.category} | {project.type}</span>
            <h3 id="project-modal-title">{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        </div>
        <div className="modal-tabs" role="tablist" aria-label="Project viewer tabs">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="modal-panel">
          {activeTab === 'visuals' && <ProjectVisualGallery project={project} />}
          {activeTab === 'story' && (
            <div className="modal-story">
              <div>
                <h4>Problem</h4>
                <p>{project.problem}</p>
              </div>
              <div>
                <h4>Solution</h4>
                <p>{project.solution}</p>
              </div>
              <div>
                <h4>Impact</h4>
                <p>{project.impact}</p>
              </div>
            </div>
          )}
          {activeTab === 'stack' && (
            <div>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <ul className="feature-list modal-feature-list">
                {project.highlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'proof' && (
            <div className="modal-proof">
              <strong>{project.status}</strong>
              {project.evidence.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
        </div>
        <div className="modal-actions">
          {project.links?.map((link) => (
            <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
              <ExternalLink size={16} />
              {link.label}
            </a>
          ))}
          <button onClick={onClose} type="button">
            Close Viewer
          </button>
        </div>
      </article>
    </div>
  );
}

function Confetti({ pieces }) {
  if (!pieces.length) return null;

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          style={{
            '--left': `${piece.left}%`,
            '--delay': `${piece.delay}s`,
            '--spin': piece.spin,
          }}
        />
      ))}
    </div>
  );
}

function getInfraIcon(id, size = 24) {
  if (id === 'server') return <Server size={size} />;
  if (id === 'firewall') return <Lock size={size} />;
  if (id === 'network') return <Router size={size} />;
  if (id === 'cyber') return <Shield size={size} />;
  if (id === 'hardware') return <Monitor size={size} />;
  return <Cpu size={size} />;
}

function getProjectIcon(category) {
  if (category === 'Mobile') return <Smartphone size={34} />;
  if (category === 'Android') return <Smartphone size={34} />;
  if (category === 'Data') return <Database size={34} />;
  if (category === 'Workflow') return <Workflow size={34} />;
  if (category === 'GitHub') return <Github size={34} />;
  if (category === 'Fundamentals') return <Search size={34} />;
  if (category === 'Design') return <Layers3 size={34} />;
  if (category === 'Web') return <Code2 size={34} />;
  if (category === 'Java') return <Wrench size={34} />;
  return <BriefcaseBusiness size={34} />;
}

function SectionHeading({ icon, kicker, title, text }) {
  return (
    <div className="section-heading">
      <div className="heading-icon">{icon}</div>
      <div className="heading-orbit" aria-hidden="true">
        <span className="heading-ring ring-a" />
        <span className="heading-ring ring-b" />
        <span className="heading-dot dot-a" />
        <span className="heading-dot dot-b" />
      </div>
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>Built for {profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </footer>
  );
}

export default App;

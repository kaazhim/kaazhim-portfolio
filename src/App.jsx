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
const motionModeKey = 'kaazhim_motion_mode_v1';
const toronto2014VideoId = '-YlFWMXxgtg';
const motionModeOptions = [
  {
    id: 'smooth',
    label: 'Smooth',
    caption: 'Soft depth',
    intensity: 0.72,
    pointer: 0.7,
    ease: 0.11,
  },
  {
    id: 'deep',
    label: 'Deep',
    caption: 'Layered depth',
    intensity: 1,
    pointer: 0.95,
    ease: 0.095,
  },
  {
    id: 'cinematic',
    label: 'Cinema',
    caption: 'Full motion',
    intensity: 1.24,
    pointer: 1.12,
    ease: 0.08,
  },
];
const motionModeProfiles = Object.fromEntries(motionModeOptions.map((mode) => [mode.id, mode]));

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
  const [motionDockOpen, setMotionDockOpen] = useState(false);
  const [motionMode, setMotionMode] = useState(() => {
    if (typeof window === 'undefined') return 'smooth';

    try {
      const storedMode = window.localStorage.getItem(motionModeKey);
      return motionModeProfiles[storedMode] ? storedMode : 'smooth';
    } catch {
      return 'smooth';
    }
  });
  const [motionPaused, setMotionPaused] = useState(false);
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
  const motionProfile = motionModeProfiles[motionMode] ?? motionModeProfiles.smooth;
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
    try {
      window.localStorage.setItem(motionModeKey, motionMode);
    } catch {
      // Motion preference is optional; private browsing can block storage.
    }
  }, [motionMode]);

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
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const profile = motionModeProfiles[motionMode] ?? motionModeProfiles.smooth;
    const intensity = profile.intensity;
    const ease = profile.ease;
    let frame = 0;
    const targetRoot = { scrollRatio: 0, scrollY: 0 };
    const currentRoot = { scrollRatio: 0, scrollY: 0 };
    const targetSections = new Map();
    const currentSections = new Map();

    const isDisabled = () => reducedMotionQuery.matches || motionPaused;
    const lerp = (current, target, amount) => current + (target - current) * amount;

    const resetSectionDepth = () => {
      root.classList.remove('parallax-live');
      root.classList.toggle('motion-paused', motionPaused);
      root.dataset.motionMode = motionMode;
      root.style.setProperty('--parallax-intensity', '0');
      root.style.setProperty('--scroll-ratio', '0');
      root.style.setProperty('--scroll-y', '0px');
      document.querySelectorAll('[data-parallax-section]').forEach((section) => {
        section.style.setProperty('--section-progress', '0.5');
        section.style.setProperty('--parallax-far-y', '0px');
        section.style.setProperty('--parallax-bg-y', '0px');
        section.style.setProperty('--parallax-mid-y', '0px');
        section.style.setProperty('--parallax-near-y', '0px');
        section.style.setProperty('--parallax-invert-y', '0px');
        section.style.setProperty('--parallax-depth-tilt', '0deg');
        section.style.setProperty('--parallax-scale', '1');
      });
    };

    const measureTargets = () => {
      root.dataset.motionMode = motionMode;
      root.classList.toggle('motion-paused', motionPaused);

      if (isDisabled()) {
        resetSectionDepth();
        return;
      }

      root.classList.add('parallax-live');
      root.style.setProperty('--parallax-intensity', intensity.toFixed(2));
      const viewportHeight = Math.max(window.innerHeight, 1);
      const total = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
      targetRoot.scrollRatio = Math.min(1, Math.max(0, window.scrollY / total));
      targetRoot.scrollY = window.scrollY;

      targetSections.clear();
      document.querySelectorAll('[data-parallax-section]').forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        const local = (progress - 0.5) * 2;
        const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / Math.max(viewportHeight, rect.height);
        const clampedCenter = Math.min(1, Math.max(-1, centerOffset));
        const depth = Math.max(-1, Math.min(1, local));

        targetSections.set(section, {
          progress,
          farY: -depth * 62 * intensity,
          bgY: -depth * 42 * intensity,
          midY: -depth * 27 * intensity,
          nearY: -depth * 15 * intensity,
          invertY: depth * 22 * intensity,
          tilt: -clampedCenter * 1.45 * intensity,
          scale: 1 + Math.abs(depth) * 0.012 * intensity,
        });
      });
    };

    const writeSection = (section, values) => {
      section.style.setProperty('--section-progress', values.progress.toFixed(4));
      section.style.setProperty('--parallax-far-y', `${values.farY.toFixed(2)}px`);
      section.style.setProperty('--parallax-bg-y', `${values.bgY.toFixed(2)}px`);
      section.style.setProperty('--parallax-mid-y', `${values.midY.toFixed(2)}px`);
      section.style.setProperty('--parallax-near-y', `${values.nearY.toFixed(2)}px`);
      section.style.setProperty('--parallax-invert-y', `${values.invertY.toFixed(2)}px`);
      section.style.setProperty('--parallax-depth-tilt', `${values.tilt.toFixed(2)}deg`);
      section.style.setProperty('--parallax-scale', values.scale.toFixed(4));
    };

    const animateDepth = () => {
      frame = 0;

      if (isDisabled()) {
        resetSectionDepth();
        return;
      }

      let isSettled = true;
      currentRoot.scrollRatio = lerp(currentRoot.scrollRatio, targetRoot.scrollRatio, ease);
      currentRoot.scrollY = lerp(currentRoot.scrollY, targetRoot.scrollY, ease);

      if (Math.abs(currentRoot.scrollRatio - targetRoot.scrollRatio) > 0.0004) isSettled = false;
      root.style.setProperty('--scroll-ratio', currentRoot.scrollRatio.toFixed(4));
      root.style.setProperty('--scroll-y', `${currentRoot.scrollY.toFixed(1)}px`);

      targetSections.forEach((target, section) => {
        const current = currentSections.get(section) ?? { ...target };
        const next = {
          progress: lerp(current.progress, target.progress, ease),
          farY: lerp(current.farY, target.farY, ease),
          bgY: lerp(current.bgY, target.bgY, ease),
          midY: lerp(current.midY, target.midY, ease),
          nearY: lerp(current.nearY, target.nearY, ease),
          invertY: lerp(current.invertY, target.invertY, ease),
          tilt: lerp(current.tilt, target.tilt, ease),
          scale: lerp(current.scale, target.scale, ease),
        };

        if (
          Math.abs(next.nearY - target.nearY) > 0.08 ||
          Math.abs(next.farY - target.farY) > 0.08 ||
          Math.abs(next.progress - target.progress) > 0.0006
        ) {
          isSettled = false;
        }

        currentSections.set(section, next);
        writeSection(section, next);
      });

      currentSections.forEach((_, section) => {
        if (!targetSections.has(section)) currentSections.delete(section);
      });

      if (!isSettled) frame = window.requestAnimationFrame(animateDepth);
    };

    const requestDepthUpdate = () => {
      measureTargets();
      if (frame) return;
      frame = window.requestAnimationFrame(animateDepth);
    };

    requestDepthUpdate();
    window.addEventListener('scroll', requestDepthUpdate, { passive: true });
    window.addEventListener('resize', requestDepthUpdate);
    reducedMotionQuery.addEventListener?.('change', requestDepthUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestDepthUpdate);
      window.removeEventListener('resize', requestDepthUpdate);
      reducedMotionQuery.removeEventListener?.('change', requestDepthUpdate);
      resetSectionDepth();
    };
  }, [motionMode, motionPaused, showWelcome]);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const profile = motionModeProfiles[motionMode] ?? motionModeProfiles.smooth;
    const pointerIntensity = profile.pointer;
    const ease = Math.min(profile.ease + 0.045, 0.18);
    let frame = 0;
    const targetPointer = {
      x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
      y: typeof window === 'undefined' ? 0 : window.innerHeight / 2,
      normalX: 0,
      normalY: 0,
    };
    const currentPointer = {
      ...targetPointer,
    };
    const lerp = (current, target, amount) => current + (target - current) * amount;

    const writePointerDepth = () => {
      frame = 0;
      const canMove = !reducedMotionQuery.matches && !motionPaused;
      const targetX = canMove ? targetPointer.normalX : 0;
      const targetY = canMove ? targetPointer.normalY : 0;

      currentPointer.x = lerp(currentPointer.x, targetPointer.x, ease);
      currentPointer.y = lerp(currentPointer.y, targetPointer.y, ease);
      currentPointer.normalX = lerp(currentPointer.normalX, targetX, ease);
      currentPointer.normalY = lerp(currentPointer.normalY, targetY, ease);

      const soft = 8 * pointerIntensity;
      const mid = 17 * pointerIntensity;
      const far = -21 * pointerIntensity;
      const tiltX = -currentPointer.normalY * 1.85 * pointerIntensity;
      const tiltY = currentPointer.normalX * 2.35 * pointerIntensity;

      root.style.setProperty('--pointer-x', `${currentPointer.x.toFixed(1)}px`);
      root.style.setProperty('--pointer-y', `${currentPointer.y.toFixed(1)}px`);
      root.style.setProperty('--pointer-normal-x', currentPointer.normalX.toFixed(4));
      root.style.setProperty('--pointer-normal-y', currentPointer.normalY.toFixed(4));
      root.style.setProperty('--pointer-soft-x', `${(currentPointer.normalX * soft).toFixed(2)}px`);
      root.style.setProperty('--pointer-soft-y', `${(currentPointer.normalY * soft).toFixed(2)}px`);
      root.style.setProperty('--pointer-mid-x', `${(currentPointer.normalX * mid).toFixed(2)}px`);
      root.style.setProperty('--pointer-mid-y', `${(currentPointer.normalY * mid).toFixed(2)}px`);
      root.style.setProperty('--pointer-far-x', `${(currentPointer.normalX * far).toFixed(2)}px`);
      root.style.setProperty('--pointer-far-y', `${(currentPointer.normalY * far).toFixed(2)}px`);
      root.style.setProperty('--pointer-tilt-x', `${tiltX.toFixed(2)}deg`);
      root.style.setProperty('--pointer-tilt-y', `${tiltY.toFixed(2)}deg`);

      if (
        Math.abs(currentPointer.normalX - targetX) > 0.002 ||
        Math.abs(currentPointer.normalY - targetY) > 0.002 ||
        Math.abs(currentPointer.x - targetPointer.x) > 0.5 ||
        Math.abs(currentPointer.y - targetPointer.y) > 0.5
      ) {
        frame = window.requestAnimationFrame(writePointerDepth);
      }
    };

    const onPointerMove = (event) => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      targetPointer.x = event.clientX;
      targetPointer.y = event.clientY;
      targetPointer.normalX = (event.clientX / width - 0.5) * 2;
      targetPointer.normalY = (event.clientY / height - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(writePointerDepth);
    };

    const onPointerLeave = () => {
      targetPointer.x = window.innerWidth / 2;
      targetPointer.y = window.innerHeight / 2;
      targetPointer.normalX = 0;
      targetPointer.normalY = 0;
      if (!frame) frame = window.requestAnimationFrame(writePointerDepth);
    };

    writePointerDepth();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', onPointerLeave);
    reducedMotionQuery.addEventListener?.('change', writePointerDepth);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onPointerLeave);
      reducedMotionQuery.removeEventListener?.('change', writePointerDepth);
    };
  }, [motionMode, motionPaused]);

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
        <section className="hero ink-band parallax-section parallax-hero" id="home" data-parallax-section>
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
                  Open My Work
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
                  Open Infra Lab
                </a>
              </div>
              <div className="hero-signal-strip" aria-label="Live infrastructure signal">
                <span>portfolio is live</span>
                <strong>{dashboardMode === 'live' ? 'Support view' : dashboardMode === 'diagnostic' ? 'Checking stack' : 'Security notes'}</strong>
                <small>{currentInfra.label} lane</small>
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
                Real photo. Real work.
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
                  <span>Final year work</span>
                  <strong>Stridez pitch, app demo, and poster proof</strong>
                </div>
                <div className="portrait-card portrait-card-bottom">
                  <span>Checked locally</span>
                  <strong>PHP lint, Vite build, and Android build notes</strong>
                </div>
                <div className="portrait-ribbon">Support, build, present</div>
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
                <span>Current lane</span>
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

        <section className="cream-band parallax-section" id="experience" data-parallax-section>
          <SectionMotionBackdrop variant="experience" />
          <div className="shell section-grid">
            <SectionHeading
              icon={<Workflow />}
              kicker="Experience"
              title="The work that shaped my IT habits"
              text="My experience is a mix of user support, application support, workflow digitization, project follow-up, and customer-facing operations."
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

        <section className="infra-band parallax-section" id="dashboard" data-parallax-section>
          <SectionMotionBackdrop variant="dashboard" />
          <div className="shell section-grid">
            <div className="section-split infra-section-head">
              <SectionHeading
                icon={<Gauge />}
                kicker="Infra Lab"
                title="The dashboard for what I am learning now"
                text="This is my current direction in one interactive view: servers, firewall rules, network checks, cybersecurity hygiene, and hardware replacement."
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

        <section className="projects-band ink-band parallax-section" id="projects" data-parallax-section>
          <SectionMotionBackdrop variant="projects" />
          <div className="shell">
            <div className="section-split">
              <SectionHeading
                icon={<Code2 />}
                kicker="Projects"
                title="Projects with the proof beside them"
                text="I rewrote these so they sound like me: what I built, what I fixed, what I checked, and what I can explain in an interview."
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
                    Pick one
                  </button>
                  <button className={`tool-button ${funMode ? 'is-active' : ''}`} onClick={toggleFunMode} type="button">
                    <Palette size={16} />
                    Never Enough
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
                    <small>Click to focus</small>
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
                      Open Project
                    </button>
                  </article>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="empty-results">
                    <Search size={24} />
                    <strong>I could not find that project</strong>
                    <p>Try a stack, category, or project name.</p>
                  </div>
                )}
              </div>
              <ProjectDetail project={selectedProject} onView={openProject} />
            </div>

            <div className="source-audit">
              <div className="mini-heading">
                <Clipboard />
                <h3>What I Checked</h3>
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

        <section className="cream-band parallax-section" id="skills" data-parallax-section>
          <SectionMotionBackdrop variant="skills" />
          <div className="shell section-grid">
            <SectionHeading
              icon={<Network />}
              kicker="Skills"
              title="The tools I keep reaching for"
              text="My skill set is practical on purpose: support work, databases, mobile apps, web prototypes, reporting, and workflow tools."
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

        <section className="resume-band ink-band parallax-section" id="resume" data-parallax-section>
          <SectionMotionBackdrop variant="resume" />
          <div className="shell resume-layout">
            <div>
              <SectionHeading
                icon={<FileText />}
                kicker="Resume"
                title="Two-page resume preview"
                text="A quick view of my support experience, project work, education, certifications, and contact details."
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

        <section className="contact-band cream-band parallax-section" id="contact" data-parallax-section>
          <SectionMotionBackdrop variant="contact" />
          <div className="shell contact-layout">
            <div>
              <SectionHeading
                icon={<Mail />}
                kicker="Contact"
                title="Open to IT support, infra, and junior dev roles"
                text="I am aiming for roles where I can grow through support, infrastructure work, application support, digital operations, and workflow tools."
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
                  {copied ? 'Copied' : 'Copy email'}
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
                  placeholder="Tell me about the role or project"
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
      {!showWelcome && (
        <MotionControlDock
          activeSection={activeSection}
          motionMode={motionMode}
          motionPaused={motionPaused}
          motionProfile={motionProfile}
          isOpen={motionDockOpen}
          onModeChange={setMotionMode}
          onToggleOpen={() => setMotionDockOpen((current) => !current)}
          onTogglePause={() => setMotionPaused((current) => !current)}
          scrollProgress={scrollProgress}
        />
      )}
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

function MotionControlDock({
  activeSection,
  motionMode,
  motionPaused,
  motionProfile,
  isOpen,
  onModeChange,
  onToggleOpen,
  onTogglePause,
  scrollProgress,
}) {
  const activeLabel = sectionLabels[activeSection] ?? activeSection;

  return (
    <aside
      className={`motion-control-dock ${motionPaused ? 'is-paused' : ''} ${isOpen ? 'is-open' : ''}`}
      aria-label="Parallax motion controls"
    >
      <button
        aria-label={isOpen ? 'Close parallax controls' : 'Open parallax controls'}
        aria-expanded={isOpen}
        className="motion-dock-head"
        onClick={onToggleOpen}
        type="button"
      >
        <Activity size={18} />
        <div>
          <span>motion controls</span>
          <strong>{motionPaused ? 'Paused' : `${motionProfile.label} mode`}</strong>
        </div>
        <small>{Math.round(scrollProgress)}%</small>
        <ChevronRight className="motion-dock-chevron" size={16} />
      </button>
      <div
        className="motion-progress"
        aria-label="Page scroll progress"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow={Math.round(scrollProgress)}
        role="progressbar"
      >
        <span style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="motion-mode-grid" aria-label="Parallax intensity">
        {motionModeOptions.map((mode) => {
          const Icon = mode.id === 'cinematic' ? Sparkles : mode.id === 'deep' ? Activity : Gauge;

          return (
            <button
              aria-pressed={motionMode === mode.id}
              className={motionMode === mode.id ? 'is-active' : ''}
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              type="button"
            >
              <Icon size={15} />
              <span>{mode.label}</span>
              <small>{mode.caption}</small>
            </button>
          );
        })}
      </div>
      <div className="motion-dock-actions">
        <button className={motionPaused ? 'is-active' : ''} onClick={onTogglePause} type="button">
          <RefreshCw size={15} />
          {motionPaused ? 'Resume' : 'Pause'}
        </button>
        <a href={`#${activeSection}`}>
          <ArrowUpRight size={15} />
          {activeLabel}
        </a>
      </div>
    </aside>
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
      'init kaazhim.dev',
      'load blue/yellow motion',
      'keep the wording honest',
      'open real project proof',
      'ready to enter',
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

    return () => window.clearInterval(progressTimer);
  }, []);

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
            <span>kaazhim.dev</span>
            <strong>v2026</strong>
          </div>
          <h2 id="boot-title">Hey, I am Kaazhim.</h2>
          <p>
            This portfolio is built like a small interactive desk: my IT infrastructure focus,
            my real project proof, and the work I can actually talk through.
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
              Skip intro
              <ArrowUpRight size={16} />
            </button>
            <a
              className="boot-skip-button boot-watch-button"
              href={`https://www.youtube.com/watch?v=${toronto2014VideoId}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch with sound
              <ExternalLink size={16} />
            </a>
          </div>
          <small>Toronto 2014 plays muted on desktop when the browser allows it. Mobile keeps the intro lighter.</small>
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
              <strong>Ready</strong>
            </div>
            <div className="boot-stack-card card-firewall">
              <ShieldCheck size={22} />
              <span>Firewall</span>
              <strong>Checked</strong>
            </div>
            <div className="boot-stack-card card-network">
              <Router size={22} />
              <span>Network</span>
              <strong>Stable</strong>
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
  const particles = Array.from({ length: 18 }, (_, index) => index + 1);

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
      <span className="kinetic-depth-glow glow-one" />
      <span className="kinetic-depth-glow glow-two" />
      <span className="kinetic-depth-line line-one" />
      <span className="kinetic-depth-line line-two" />
      <span className="kinetic-grid" />
      <span className="kinetic-rail rail-one" />
      <span className="kinetic-rail rail-two" />
      <span className="kinetic-orbit orbit-one" />
      <span className="kinetic-orbit orbit-two" />
      <span className="kinetic-pulse pulse-one" />
      <span className="kinetic-pulse pulse-two" />
      <span className="kinetic-packet packet-one" />
      <span className="kinetic-packet packet-two" />
      <span className="kinetic-wave wave-one" />
      <span className="kinetic-wave wave-two" />
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
  const modeLabel = dashboardMode === 'live' ? 'notes' : dashboardMode === 'diagnostic' ? 'check' : 'secure';
  const consoleLines = [
    `open ${currentInfra.id}-notes`,
    `check ${currentInfra.tools.slice(0, 2).join(' + ').toLowerCase()}`,
    `save handover --risk ${currentInfra.risk.toLowerCase()}`,
  ];

  return (
    <div className="hero-live-console" aria-label="Animated infrastructure console">
      <div className="console-terminal">
        <div className="console-topline">
          <span />
          <span />
          <span />
          <strong>kaazhim.dev/{modeLabel}</strong>
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
          cycle stack
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
  const modeLabel = dashboardMode === 'live' ? 'support' : dashboardMode === 'diagnostic' ? 'checking' : 'secure-notes';

  return (
    <div className="shell hero-command-rail" aria-label="Interactive home infrastructure rail">
      <div className="rail-prompt">
        <Code2 size={16} />
        <span>kaazhim@desk</span>
        <strong>focus={currentInfra.id} / mode={modeLabel}</strong>
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
        Cycle focus
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
    { label: 'First impression', value: '10 sec', text: 'Who I am, what I focus on, where the proof is' },
    { label: 'Current lane', value: 'Infra+', text: 'Server, firewall, network, cyber, hardware' },
    { label: 'Project proof', value: '21', text: 'Screenshots, source notes, builds, and fixes' },
  ];
  const journey = [
    { icon: <Eye size={17} />, label: 'Meet', text: 'Name and direction' },
    { icon: <ShieldCheck size={17} />, label: 'Check', text: 'Real evidence' },
    { icon: <Network size={17} />, label: 'Route', text: 'Infra focus' },
    { icon: <Rocket size={17} />, label: 'Open', text: 'Project viewer' },
  ];
  const cameraSteps = ['intro', 'desk', 'infra', 'projects', 'contact'];

  return (
    <section
      className="wow-layer-band parallax-section"
      data-parallax-section
      aria-label="Interactive portfolio flow layer"
    >
      <SectionMotionBackdrop variant="wow" />
      <div className="shell wow-layer-layout">
        <div className="wow-copy">
          <SectionHeading
            icon={<Rocket />}
            kicker="Portfolio Flow"
            title="I made the page feel closer to my working desk"
            text="The goal is simple: land here, understand my IT infrastructure direction, and open real project proof without guessing."
          />
          <div className="wow-journey" aria-label="Portfolio journey preview">
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
              Cycle the scene
            </button>
            <a className="button button-dark" href="#projects">
              <ArrowUpRight size={18} />
              Open proof
            </a>
          </div>
        </div>

        <div className="wow-orbit-stage" aria-label={`${currentInfra.label} visual focus selector`}>
          <span className="wow-stage-label">scroll scene / click nodes</span>
          <span className="wow-beam beam-one" aria-hidden="true" />
          <span className="wow-beam beam-two" aria-hidden="true" />
          <div className="scene-code-panel" aria-hidden="true">
            <span>localhost:portfolio</span>
            <code>focus="{currentInfra.id}"</code>
            <small>smooth scroll camera</small>
          </div>
          <div className="scene-camera-path" aria-hidden="true">
            {cameraSteps.map((step, index) => (
              <span key={step} style={{ '--step': index }}>
                <i />
                {step}
              </span>
            ))}
          </div>
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
    <section
      className="stridez-showcase-band parallax-section"
      id="stridez"
      data-parallax-section
      aria-label="Stridez mobile app project showcase"
    >
      <SectionMotionBackdrop variant="stridez" />
      <div className="shell stridez-showcase-layout">
        <div className="stridez-copy-panel">
          <SectionHeading
            icon={<Smartphone />}
            kicker="Stridez Project Tour"
            title="A real app flow I can walk you through"
            text="These are the actual testing screenshots from my Stridez project: onboarding, GPS park selection, warm-up, live tracking, safety warning, results, and account screens."
          />
          <div className="stridez-active-card">
            <span>{current.stage} screen</span>
            <strong>{current.label}</strong>
            <p>{current.note}</p>
          </div>
          <div className="stridez-showcase-actions">
            <button className="button button-primary" onClick={onOpenProject} type="button">
              <Eye size={18} />
              Open Stridez Details
            </button>
            <a className="button button-line" href="#projects">
              <ArrowUpRight size={18} />
              View all projects
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
    <section
      className="clean-art-band parallax-section"
      id="visual-lab"
      data-parallax-section
      aria-label="Clean portfolio illustration lab"
    >
      <SectionMotionBackdrop variant="clean" />
      <div className="shell clean-art-layout">
        <div className="clean-art-copy">
          <SectionHeading
            icon={<Sparkles />}
            kicker="Visual Lab"
            title="Clean 3D pieces for the infra side"
            text="I kept the illustrations tied to the skills I am focusing on: server, firewall, network, and hardware. They are there to support the story, not hide the work."
          />
          <div className="clean-art-note">
            <span>Design rule</span>
            <strong>If it moves, it should still point back to the work.</strong>
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
        <span className="flow-kicker">work loop 0{index + 1}</span>
        <strong>{experience.company}</strong>
        <p>My support rhythm is simple: understand the issue, isolate the layer, fix carefully, and leave notes that are useful later.</p>
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
        <span>skill map</span>
        <strong>Support, infra, and code in one orbit</strong>
        <p className="human-copy">This is how the portfolio is really shaped: support work, infrastructure direction, databases, app builds, and workflow tools around practical problem solving.</p>
      </div>
    </div>
  );
}

function ResumeMotionConsole() {
  return (
    <div className="resume-motion-console" aria-label="Animated resume preview">
      <div className="resume-scan-device" aria-hidden="true">
        <span className="resume-scan-page" />
        <span className="resume-scan-line" />
        <span className="resume-scan-chip chip-a" />
        <span className="resume-scan-chip chip-b" />
      </div>
      <div>
        <span>resume preview</span>
        <strong>Two pages with the key proof in one place</strong>
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
        <span>contact path</span>
        <strong>Email, phone, LinkedIn, and QR are ready</strong>
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
          <span>Mode</span>
          <strong>{dashboardMode === 'live' ? 'Support view' : dashboardMode === 'diagnostic' ? 'Stack check' : 'Security notes'}</strong>
        </div>
        <button className="infra-run-button" onClick={onDiagnostic} type="button">
          <RefreshCw size={17} />
          Cycle check
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
          <span>Risk note</span>
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
              <span>3D infra view</span>
              <h3>{currentInfra.label} orbit</h3>
            </div>
            <button className="cinema-scan-button" onClick={onDiagnostic} type="button">
              <Sparkles size={16} />
              Check
            </button>
          </div>
          <div className="cinema-stage-shell">
            <CinematicScene activeFocus={activeInfra} mode={dashboardMode} variant="dashboard" />
            <div className="cinema-hud cinema-hud-top">
              <span>Firewall</span>
              <strong>{dashboardMode === 'hardening' ? 'Rule review' : 'Watching edge'}</strong>
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
              <h3>How ready it feels</h3>
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
              <h3>Click any node</h3>
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
              <h3>Practice triage</h3>
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
              <h3>Device readiness</h3>
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
          <strong>No screenshot yet</strong>
          <p>I only have source notes for this one right now.</p>
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
          <h4>Why I Built It</h4>
          <p>{project.problem}</p>
        </div>
        <div>
          <h4>What I Made</h4>
          <p>{project.solution}</p>
        </div>
        <div>
          <h4>Why It Matters</h4>
          <p>{project.impact}</p>
        </div>
      </div>

      <div className="detail-section">
        <h4>What I Worked On</h4>
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
        <h4>How I Checked It</h4>
        {project.evidence.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      <div className="project-links">
        <button className="project-open-button" onClick={() => onView(project)} type="button">
          <Eye size={16} />
          Open Project
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
    { id: 'story', label: 'Notes' },
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
                <h4>Why I Built It</h4>
                <p>{project.problem}</p>
              </div>
              <div>
                <h4>What I Made</h4>
                <p>{project.solution}</p>
              </div>
              <div>
                <h4>Why It Matters</h4>
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
            Close
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

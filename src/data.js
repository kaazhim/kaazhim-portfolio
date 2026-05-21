export const profile = {
  name: 'KAAZHIM NUR KAARIM BIN RAHIM',
  shortName: 'Kaazhim',
  title: 'IT Support | IT Infrastructure Focus | Application Support | Junior Full-Stack Developer',
  location: 'Sungai Buloh, Selangor, Malaysia',
  email: 'kaazhim03@gmail.com',
  phones: ['014-311 3455', '017-311 3477'],
  linkedin: 'https://www.linkedin.com/in/kaazhim-kaarim-7019a427b',
  github: 'https://github.com/kaazhim',
  resume: '/kaazhim-resume.pdf',
  photo: '/assets/profile/kaazhim-real-photo.png',
  summary:
    'Information Technology undergraduate building toward IT infrastructure: server operations, firewall awareness, network support, cybersecurity hygiene, hardware replacement, and practical app development.',
  pitch:
    'I am strongest where users, devices, networks, and systems meet: diagnosing issues, documenting fixes, replacing hardware confidently, and turning messy operations into maintainable workflows.',
};

export const proofPoints = [
  { value: '3.55', label: 'Bachelor of IT CGPA' },
  { value: 'Infra', label: 'Server, firewall, network, cyber focus' },
  { value: '4', label: 'Public GitHub repos checked' },
  { value: '2026', label: 'Technology and Digital internship' },
];

export const capabilityModes = [
  {
    id: 'infra',
    label: 'Infra',
    title: 'Growing into infrastructure operations',
    summary:
      'Currently focused on server fundamentals, firewall policy thinking, network troubleshooting, cybersecurity hygiene, device lifecycle care, and hardware replacement.',
    stack: ['Server basics', 'Firewall rules', 'Network support', 'Cyber hygiene', 'Hardware replacement'],
    flow: ['Inspect', 'Secure', 'Replace', 'Document'],
    accent: 'sky',
  },
  {
    id: 'support',
    label: 'Support',
    title: 'Calm issue resolution for real users',
    summary:
      'Handles first-level support, access issues, laptops, printers, meeting equipment, boot errors, and application questions with documentation discipline.',
    stack: ['Troubleshooting', 'User support', 'Issue tracking', 'Documentation'],
    flow: ['Listen', 'Replicate', 'Resolve', 'Record'],
    accent: 'teal',
  },
  {
    id: 'workflow',
    label: 'Workflow',
    title: 'Turns operations into repeatable systems',
    summary:
      'Maps operational requests into BPMS and ProcessMaker-style flows, with attention to approvals, data fields, status states, and maintainability.',
    stack: ['BPMS', 'ProcessMaker', 'Requirements', 'Process mapping'],
    flow: ['Discover', 'Model', 'Validate', 'Improve'],
    accent: 'sun',
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Builds clearer database-backed records',
    summary:
      'Works with SQL, MySQL, Oracle APEX, Power BI assistance, and validation tasks to make records easier to search, report, and trust.',
    stack: ['SQL', 'MySQL', 'Oracle APEX', 'Power BI'],
    flow: ['Collect', 'Clean', 'Model', 'Explain'],
    accent: 'sky',
  },
  {
    id: 'build',
    label: 'Build',
    title: 'Ships practical prototypes across stacks',
    summary:
      'Builds coursework and portfolio systems in PHP, Java, Flutter, Android, React, HTML, CSS, and JavaScript, with a bias for useful workflow tools.',
    stack: ['PHP', 'Java', 'Flutter', 'React', 'JavaScript'],
    flow: ['Design', 'Develop', 'Test', 'Present'],
    accent: 'coral',
  },
];

export const experiences = [
  {
    company: 'Encorp Berhad',
    role: 'IT Intern, Technology and Digital Unit',
    place: 'Kota Damansara',
    period: 'Mar 2026 - Present',
    points: [
      'Delivered first-level IT and application support across devices, systems, access, printing, scanners, and meeting-room equipment.',
      'Supported issue tracking, system monitoring, documentation, Power BI reporting assistance, and data validation work.',
      'Developed and refined PCAD/P&C Service Requisition System workflows using BPMS and ProcessMaker concepts.',
      'Translated department operational needs into structured workflow architecture for digitalization planning.',
    ],
  },
  {
    company: 'Youths Today Sdn. Bhd.',
    role: 'IT Intern, Project Management and Execution',
    place: 'Petaling Jaya',
    period: 'Sep 2023 - Mar 2024',
    points: [
      'Supported IT project delivery through task coordination, business-process flows, and internal/external requirement follow-up.',
      'Collected client issue details, clarified requirements, and supported smoother project execution during daily operations.',
      'Contributed website components, user journey ideas, interaction improvements, and UI/UX observations.',
    ],
  },
  {
    company: 'Retail, Event, and Operations Support',
    role: 'Part-time Watson event, Service Assistance, Sports Direct, Machine Operator',
    place: 'Malaysia',
    period: '2021 - 2025',
    points: [
      'Built customer-service, payment handling, stock control, product knowledge, and workplace reliability before entering IT roles.',
      'Practiced communication, quality checking, and operational discipline in fast-paced environments.',
    ],
  },
];

export const projects = [
  {
    id: 'stridez',
    title: 'Stridez GPS Running Companion',
    category: 'Mobile',
    type: 'Flutter App',
    year: '2026',
    featured: true,
    accent: 'teal',
    role: 'Mobile developer and product designer',
    status: 'Source reviewed. Import casing fixed. Flutter analyzer blocked by local toolchain hang.',
    image: '/assets/projects/stridez-klcc.jpg',
    logo: '/assets/projects/stridez-logo.png',
    tags: ['Flutter', 'Firebase', 'GPS', 'Firestore', 'Pedometer', 'Voice cues'],
    summary:
      'A GPS-enabled running app for novice runners, built around park discovery, run tracking, feedback, and beginner-friendly guidance.',
    problem:
      'New runners can struggle with route confidence, pacing, activity feedback, and remembering progress across sessions.',
    solution:
      'The app combines Firebase authentication, profile management, run history, GPS distance/pace tracking, park media, sound cues, and local fallback storage.',
    impact:
      'Shows product thinking beyond a basic tracker: onboarding, motion feedback, run history, media assets, and accessible guidance for beginners.',
    highlights: [
      'Firebase Auth, Firestore run records, Firebase Storage profile photos, and shared preferences fallback.',
      'Run metrics for distance, duration, pace, calories, steps, and activity category analysis.',
      'Park image assets, welcome/warmup/milestone/finish sounds, and motion-warning cues for a richer mobile experience.',
      'Fixed case-sensitive import issue from `Signup.dart` to `signup.dart` in `main.dart` and `Login.dart`.',
    ],
    evidence: [
      'Local source inspected at C:/Users/Admin/AndroidStudioProjects/stridez_new.',
      'Flutter command was available, but `flutter analyze --no-pub` timed out after 3 minutes in this environment.',
    ],
  },
  {
    id: 'attendance-system',
    title: 'Employee Attendance Record System',
    category: 'Web',
    type: 'PHP/MySQL',
    year: '2026',
    featured: true,
    accent: 'sun',
    role: 'Full-stack maintainer',
    status: 'Fixed and PHP syntax checked across all PHP files.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'Admin dashboard', 'CRUD'],
    summary:
      'A staff attendance system with employee time-in/time-out capture, admin login, employee management, user management, and attendance logs.',
    problem:
      'Manual attendance records are slow to capture, hard to audit, and easy to lose when staff and admin data live separately.',
    solution:
      'The system stores employees, users, and attendance events in MySQL, with public check-in/out actions and an admin dashboard for record control.',
    impact:
      'Demonstrates practical workplace-system thinking: authentication, relational tables, CRUD screens, and operational record keeping.',
    highlights: [
      'Patched admin login typo from `msqli_error()` to `mysqli_error($conn)`.',
      'Fixed employee name generation in time logs so first, middle, and last names are combined correctly.',
      'Corrected duplicate employee-number validation in the employee save flow.',
      'Reworked root login/employee entry points so stale or broken pages do not block the admin workflow.',
    ],
    evidence: [
      'Source inspected at C:/Users/Admin/Downloads/Telegram Desktop/System_Attendance.',
      'Ran `php -l` on every PHP file after fixes with no syntax errors detected.',
    ],
  },
  {
    id: 'real-estate-ai-studio',
    title: 'REAL-ESTATE AI Studio Prototype',
    category: 'GitHub',
    type: 'React/Vite',
    year: '2026',
    featured: true,
    accent: 'coral',
    role: 'Frontend application builder',
    status: 'GitHub clone build passed with Vite chunk-size warning.',
    tags: ['React', 'TypeScript', 'Vite', 'Google GenAI', 'Video generation'],
    summary:
      'A React/Vite AI studio prototype from the public REAL-ESTATE repo, with prompt-driven video generation states and API-key handling.',
    problem:
      'AI generation tools need a clear interface for prompt input, API-key readiness, loading, error recovery, generated output, and retry/extend flows.',
    solution:
      'The app structures generation around a studio view, history/project content views, a prompt form, API key dialog, loading state, video result view, and Gemini/Veo service layer.',
    impact:
      'Shows modern frontend composition, async state handling, generated-media UX, and production build awareness.',
    highlights: [
      'Uses React 19, TypeScript, Vite, `@google/genai`, and reusable components.',
      'Handles API-key selection checks before generation.',
      'Supports loading, success, error, retry, reset, and video-extension states.',
      'Production build completed successfully; bundle emitted one chunk-size warning above 500 kB.',
    ],
    evidence: [
      'Cloned from https://github.com/kaazhim/REAL-ESTATE.',
      'Ran `npm.cmd install` and `npm.cmd run build` successfully in D:/kaazhim-github-scan/REAL-ESTATE.',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/kaazhim/REAL-ESTATE' }],
  },
  {
    id: 'electricity-bill-estimator',
    title: 'Electricity Bill Estimator',
    category: 'Android',
    type: 'Java/Android',
    year: '2025',
    featured: true,
    accent: 'sky',
    role: 'Android developer',
    status: 'Gradle debug build passed after setting Android SDK environment.',
    tags: ['Java', 'Android Studio', 'SQLite', 'Gradle', 'Material UI'],
    summary:
      'An Android app for calculating electricity bills, applying rebates, saving bill history, and reviewing or editing stored records.',
    problem:
      'Users need a simple way to estimate electricity charges, compare final costs after rebates, and keep historical records.',
    solution:
      'The app provides month selection, kWh input, rebate controls, SQLite storage, bill list/detail screens, update/delete actions, splash/about screens, and local assets.',
    impact:
      'Demonstrates a complete Android coursework app with UI, persistence, navigation, and CRUD behavior.',
    highlights: [
      'SQLite helper manages bill insert, fetch, update, and delete operations.',
      'Main calculator separates total charge and final cost after rebate.',
      'History and detail screens support review, edit, delete, and formatted bill display.',
      'Debug APK assembled successfully with Gradle 8.11.1 and Android SDK path configured.',
    ],
    evidence: [
      'Cloned from https://github.com/kaazhim/ElectricityBillEstimator.',
      'Ran `gradlew.bat assembleDebug --no-daemon` successfully with `ANDROID_HOME` pointing to the local SDK.',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/kaazhim/ElectricityBillEstimator' }],
  },
  {
    id: 'workflow-requisition',
    title: 'PCAD/P&C Service Requisition Workflow',
    category: 'Workflow',
    type: 'BPMS',
    year: '2026',
    featured: true,
    accent: 'plum',
    role: 'Workflow analyst intern',
    status: 'Resume-backed work project.',
    tags: ['BPMS', 'ProcessMaker', 'Requirements', 'Service workflow'],
    summary:
      'A digital service requisition workflow effort for department operations, focused on request structure, process logic, and approvals.',
    problem:
      'Operational service requests can become scattered when intake, status, approvals, and documentation are handled manually.',
    solution:
      'Translated process needs into workflow structure, status movement, data fields, and BPMS/ProcessMaker-style implementation planning.',
    impact:
      'Shows ability to understand real business operations and convert them into maintainable workflow systems.',
    highlights: [
      'Mapped request handling into a structured digital workflow.',
      'Balanced user needs with approval and documentation requirements.',
      'Connected support experience with process architecture.',
    ],
    evidence: ['Based on current Technology and Digital internship responsibilities.'],
  },
  {
    id: 'healthcare-registration',
    title: 'Healthcare Registration System',
    category: 'Web',
    type: 'PHP/MySQL',
    year: '2026',
    featured: false,
    accent: 'teal',
    role: 'Full-stack developer',
    status: 'SQL dump reviewed.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'Registration'],
    summary:
      'A database-driven registration module for structured patient/user intake and cleaner record management.',
    problem:
      'Healthcare registration needs consistent fields, validation thinking, and database-backed storage to reduce manual record errors.',
    solution:
      'Designed structured forms and MySQL-backed storage so registration data can be entered, stored, and reviewed more consistently.',
    impact:
      'Highlights full-stack fundamentals, database design, form logic, and user-centered workflow thinking.',
    highlights: [
      'Registration-focused data model.',
      'Form flow aimed at reducing repeated manual entry.',
      'Database-backed storage for cleaner record retrieval.',
    ],
    evidence: ['Source archive reviewed from healthcare SQL dump.'],
  },
  {
    id: 'volunteer-allowance',
    title: 'Volunteer Allowance Management System',
    category: 'Java',
    type: 'OOP Console',
    year: '2024',
    featured: false,
    accent: 'sun',
    role: 'Java developer',
    status: 'Compile checked.',
    tags: ['Java', 'OOP', 'Inheritance', 'Polymorphism'],
    summary:
      'A Java allowance calculator for RELA volunteers using category-specific allowance formulas.',
    problem:
      'Different volunteer categories need different allowance rules while sharing common identity and attendance data.',
    solution:
      'Used an abstract Volunteer superclass with HealthVolunteer and CommonVolunteer subclasses to calculate session-based net allowance.',
    impact:
      'Demonstrates inheritance, method overriding, object arrays, runtime type checks, and reporting logic.',
    highlights: [
      'Abstract base class for shared volunteer behavior.',
      'Subclass-specific allowance formulas.',
      'Highest-allowance reporting across volunteer records.',
    ],
    evidence: ['Source compiled successfully during local archive review.'],
  },
  {
    id: 'cake-queue',
    title: 'Cake Order Queue Processor',
    category: 'Java',
    type: 'Data Structure',
    year: '2024',
    featured: false,
    accent: 'coral',
    role: 'Java developer',
    status: 'Compile checked.',
    tags: ['Java', 'Queue', 'Linked List', 'File I/O'],
    summary:
      'A cake order processor that reads orders, separates delivery and pickup queues, and summarizes orders by cake type.',
    problem:
      'Order records need to be separated by fulfillment method while preserving queue order and generating useful summaries.',
    solution:
      'Implemented custom linked-list queue logic, file input/output, delivery/pickup classification, and sales summary calculations.',
    impact:
      'Shows data-structure use in a business workflow rather than a purely abstract exercise.',
    highlights: [
      'Custom node/list structures.',
      'Delivery and pickup queue separation.',
      'Cake-type total summaries and output writing.',
    ],
    evidence: ['Source compiled successfully; archived hardcoded paths remain a portability limitation.'],
  },
  {
    id: 'online-business',
    title: 'Online Business Sales Analyzer',
    category: 'Java',
    type: 'Console Analytics',
    year: '2024',
    featured: false,
    accent: 'sky',
    role: 'Java developer',
    status: 'Compile checked.',
    tags: ['Java', 'Arrays', 'File I/O', 'Search', 'Receipts'],
    summary:
      'A console sales analyzer for apparel records with membership discounts, receipt output, item grouping, and search.',
    problem:
      'Small business sales data needs product summaries, averages, category counts, and receipt output from raw item records.',
    solution:
      'Reads item/customer records, calculates discounts and averages, groups highest-selling item types, searches records, and writes receipts.',
    impact:
      'Shows business-rule calculation, array processing, inheritance, file handling, and reporting.',
    highlights: [
      'Membership discount logic.',
      'Average sales and highest-selling group calculations.',
      'Search and receipt generation flow.',
    ],
    evidence: ['Source compiled successfully during local archive review.'],
  },
  {
    id: 'student-cgpa',
    title: 'Student CGPA Analyzer',
    category: 'Java',
    type: 'Academic Records',
    year: '2024',
    featured: false,
    accent: 'teal',
    role: 'Java developer and fixer',
    status: 'Fixed and compile checked.',
    tags: ['Java', 'ArrayList', 'Sorting', 'Comparable'],
    summary:
      'A student record analyzer that captures CGPA data, calculates average CGPA, sorts records, and groups results.',
    problem:
      'Academic records need consistent object structure, average calculation, and sorted reporting for review.',
    solution:
      'Used Student objects, ArrayList storage, Comparable sorting by ID, average calculation, and above/below-average grouping.',
    impact:
      'Shows debugging and Java collection fundamentals, not only first-pass implementation.',
    highlights: [
      'Fixed extra braces, missing accessor, generic ArrayList usage, and sort call issues.',
      'Average CGPA grouping for performance categories.',
      'Comparable implementation for sorted student output.',
    ],
    evidence: ['Source compiled successfully after local fixes.'],
  },
  {
    id: 'costume-empire',
    title: 'Costume Empire Rental Database',
    category: 'Data',
    type: 'MySQL',
    year: '2024',
    featured: false,
    accent: 'sun',
    role: 'Database designer',
    status: 'SQL dump reviewed.',
    tags: ['MySQL', 'Rental system', 'Orders', 'Triggers'],
    summary:
      'A transaction-heavy costume rental database covering admins, customers, products, orders, order items, and returns.',
    problem:
      'Rental workflows need product availability, customer records, payment details, pickup/return dates, and order status tracking.',
    solution:
      'Modeled relational tables for rental transactions and included trigger logic that derives return dates from pickup dates.',
    impact:
      'Demonstrates database modeling for a workflow with real lifecycle states and operational constraints.',
    highlights: [
      'Order and order-item tables.',
      'Customer, admin, product, payment, pickup, and return fields.',
      'Trigger-backed rental return logic.',
    ],
    evidence: ['SQL dump reviewed from local source archive.'],
  },
  {
    id: 'sports-booking',
    title: 'Sports Equipment Booking Database',
    category: 'Data',
    type: 'SQL',
    year: '2024',
    featured: false,
    accent: 'sky',
    role: 'Database designer',
    status: 'SQL files reviewed.',
    tags: ['SQL', 'Booking system', 'Reservation', 'ERD'],
    summary:
      'A booking database set for students, equipment, courts, crews, reservations, bookings, and events.',
    problem:
      'Sports facilities need structured booking and equipment records across students, events, courts, and crew assignments.',
    solution:
      'Organized the booking domain into relational tables that can support reservation details and equipment/court usage.',
    impact:
      'Adds database-backed operations experience in scheduling and reservation management.',
    highlights: [
      'Multiple related booking-domain entities.',
      'Reservation and event data support.',
      'Useful example of normalized operational records.',
    ],
    evidence: ['SQL files reviewed from local sports booking archive.'],
  },
  {
    id: 'library-management',
    title: 'Library Management System',
    category: 'Data',
    type: 'Oracle APEX',
    year: '2024',
    featured: false,
    accent: 'plum',
    role: 'Database application developer',
    status: 'Resume-backed project.',
    tags: ['Oracle APEX', 'Database', 'Transactions'],
    summary:
      'Oracle APEX modules for book records, borrowing, returns, and structured library transaction management.',
    problem:
      'Library teams need cleaner record control across books, borrowers, borrowing transactions, and returns.',
    solution:
      'Built database-backed modules for record entry, transaction flow, and return handling.',
    impact:
      'Shows Oracle APEX and database fundamentals in a familiar operational domain.',
    highlights: [
      'Book and transaction records.',
      'Borrow and return workflow thinking.',
      'Database-backed application structure.',
    ],
    evidence: ['Resume-backed Oracle APEX coursework project.'],
  },
  {
    id: 'food-ordering',
    title: 'Food Ordering System',
    category: 'Java',
    type: 'OOP App',
    year: '2024',
    featured: false,
    accent: 'coral',
    role: 'Java developer',
    status: 'Resume-backed project.',
    tags: ['Java', 'OOP', 'Order flow'],
    summary:
      'An ordering application with menu display, order processing, receipt generation, and clear navigation flow.',
    problem:
      'Food ordering needs simple menu navigation, correct transaction capture, and readable receipt output.',
    solution:
      'Structured the order flow around menu choices, processing logic, and receipt-style output.',
    impact:
      'Demonstrates object-oriented programming and basic transaction workflow design.',
    highlights: [
      'Menu-driven interaction.',
      'Order processing logic.',
      'Receipt generation flow.',
    ],
    evidence: ['Resume-backed Java coursework project.'],
  },
  {
    id: 'sweetin-hotel',
    title: 'SweetIn Hotel Rental Calculator',
    category: 'Java',
    type: 'Swing Input',
    year: '2024',
    featured: false,
    accent: 'teal',
    role: 'Java developer',
    status: 'Compile checked.',
    tags: ['Java', 'Swing', 'Input dialogs', 'Pricing rules'],
    summary:
      'A hotel rental calculator for room type, bed type, nights, and total stay cost using Java dialog input.',
    problem:
      'A simple booking calculator needs clear pricing rules and dependable total-cost output.',
    solution:
      'Applied room-rate rules for standard and family rooms, calculated total rental, and printed customer rental details.',
    impact:
      'Shows compact Java GUI-input practice and rule-based calculation.',
    highlights: [
      'Dialog-based input flow.',
      'Room and bed type pricing rules.',
      'Total rental calculation output.',
    ],
    evidence: ['Source compiled successfully during local archive review.'],
  },
  {
    id: 'temperature-tool',
    title: 'Temperature Sorting and Search Tool',
    category: 'Fundamentals',
    type: 'Java',
    year: '2024',
    featured: false,
    accent: 'sky',
    role: 'Java developer',
    status: 'Compile checked with warning.',
    tags: ['Java', 'ArrayList', 'Bubble sort', 'Binary search'],
    summary:
      'A temperature record tool that sorts locations by temperature/name and searches for a location using binary search.',
    problem:
      'Location-temperature records need sorted display and fast lookup from console input.',
    solution:
      'Stored location-temperature pairs, performed manual sorting passes, and searched sorted location data.',
    impact:
      'Shows algorithm fundamentals and the tradeoff of raw collection usage.',
    highlights: [
      'Manual sort implementation.',
      'Binary search flow.',
      'Unchecked raw ArrayList warning noted during compile.',
    ],
    evidence: ['Source compiled successfully with Java unchecked-operation notes.'],
  },
  {
    id: 'chartflow',
    title: 'ChartFlow Diagram Archive',
    category: 'Design',
    type: 'Systems Analysis',
    year: '2024',
    featured: false,
    accent: 'sun',
    role: 'Systems documentation creator',
    status: 'Diagram archive reviewed.',
    tags: ['Draw.io', 'Flowcharts', 'Class diagrams', 'Planning'],
    summary:
      'A collection of flowcharts, class diagrams, and process visuals used for coursework planning and system explanation.',
    problem:
      'Software projects are easier to explain when system flow and object structure are visible before implementation.',
    solution:
      'Created and kept Draw.io diagrams plus exported visuals for process and class-level documentation.',
    impact:
      'Highlights communication, planning, and documentation ability alongside coding.',
    highlights: [
      'Flowchart source files and exported visuals.',
      'Class-diagram documentation.',
      'Useful bridge between requirements and code.',
    ],
    evidence: ['Diagram archive reviewed from local Downloads/ChartFlow.'],
  },
  {
    id: 'even-sum',
    title: 'Even Number Summation Program',
    category: 'Fundamentals',
    type: 'C++',
    year: '2023',
    featured: false,
    accent: 'coral',
    role: 'C++ fundamentals practice',
    status: 'Source reviewed. C++ compiler unavailable in local environment.',
    tags: ['C++', 'Loops', 'Conditionals'],
    summary:
      'A small C++ exercise that accepts ten numbers and calculates the sum of even inputs.',
    problem:
      'Core programming practice needs clear loop control, conditions, input, and formatted output.',
    solution:
      'Used loop control, modulo checking, input scanning, and console output.',
    impact:
      'A compact fundamentals exercise that rounds out the early programming archive.',
    highlights: [
      'Even-number detection with modulo logic.',
      'Ten-input loop structure.',
      'Formatted console output.',
    ],
    evidence: ['Source reviewed; no g++ compiler was available for compile validation.'],
  },
  {
    id: 'pixel-agents',
    title: 'Pixel Agents Fork',
    category: 'GitHub',
    type: 'Fork Exploration',
    year: '2026',
    featured: false,
    accent: 'plum',
    role: 'Open-source exploration',
    status: 'Public GitHub fork. Not presented as original work.',
    tags: ['GitHub', 'Fork', 'AI agents', 'Exploration'],
    summary:
      'A forked public repository described as Pixel office, kept as a learning and exploration entry rather than an original portfolio build.',
    problem:
      'Recruiters should be able to distinguish original projects from forked exploration work.',
    solution:
      'The portfolio labels this clearly as a fork and keeps it separate from build-verified original projects.',
    impact:
      'Shows GitHub activity while preserving honesty and source clarity.',
    highlights: [
      'Fork status confirmed from the GitHub API.',
      'Included for transparency, not inflated as original development.',
      'Excluded anything named afifah from the GitHub scan.',
    ],
    evidence: ['Public repo: https://github.com/kaazhim/pixel-agents.'],
    links: [{ label: 'GitHub', url: 'https://github.com/kaazhim/pixel-agents' }],
  },
  {
    id: 'clawdmeter',
    title: 'Clawdmeter Fork',
    category: 'GitHub',
    type: 'Fork Exploration',
    year: '2026',
    featured: false,
    accent: 'teal',
    role: 'Open-source exploration',
    status: 'Public GitHub fork. Not presented as original work.',
    tags: ['GitHub', 'Fork', 'ESP32', 'Dashboard'],
    summary:
      'A forked ESP32 desk dashboard repository for Claude Code usage, included as a transparent GitHub activity entry.',
    problem:
      'Hardware/dashboard repositories can be interesting, but fork status should be clear in a professional portfolio.',
    solution:
      'The project card identifies it as a fork and links back to the public repo.',
    impact:
      'Keeps the GitHub section complete without overstating ownership.',
    highlights: [
      'Fork status confirmed from the GitHub API.',
      'Topic area touches embedded dashboards and developer tooling.',
      'Included separately from original, build-checked projects.',
    ],
    evidence: ['Public repo: https://github.com/kaazhim/Clawdmeter.'],
    links: [{ label: 'GitHub', url: 'https://github.com/kaazhim/Clawdmeter' }],
  },
];

export const sourceAudit = [
  {
    item: 'System_Attendance',
    status: 'Fixed and syntax checked',
    note:
      'Patched PHP login error handling, employee-name assembly, employee-number duplicate validation, and stale root entry pages. All PHP files passed `php -l`.',
  },
  {
    item: 'Stridez Flutter app',
    status: 'Source fix applied',
    note:
      'Fixed case-sensitive `signup.dart` imports. Flutter analyzer remained blocked because the local Flutter command timed out repeatedly.',
  },
  {
    item: 'GitHub originals',
    status: 'Build checked',
    note:
      'REAL-ESTATE passed Vite build. ElectricityBillEstimator passed Gradle debug build after setting Android SDK variables.',
  },
  {
    item: 'GitHub forks',
    status: 'Labeled clearly',
    note:
      'pixel-agents and Clawdmeter are included as fork exploration entries, not original build claims. Repos containing afifah were excluded.',
  },
  {
    item: 'VirtualBox VMs / denji',
    status: 'Infrastructure archive',
    note:
      'VirtualBox VM configuration and disk image. Useful environment exposure, but not listed as an application project.',
  },
  {
    item: 'anaconda3.2',
    status: 'Tooling archive',
    note:
      'Python/Anaconda environment folder. Treated as development tooling rather than a portfolio project.',
  },
];

export const infraFocus = [
  {
    id: 'server',
    label: 'Server',
    title: 'Server operations and uptime discipline',
    score: 88,
    risk: 'Low-medium',
    status: 'Learning and practicing core administration patterns',
    summary:
      'Focusing on server health checks, access control, storage awareness, backup thinking, service monitoring, and clean incident documentation.',
    tools: ['Windows Server concepts', 'Linux CLI basics', 'Service checks', 'Backup discipline'],
    signals: [
      'Review CPU, memory, storage, service state, and update readiness before escalating.',
      'Document symptoms, user impact, attempted fixes, and final resolution clearly.',
      'Treat access and server changes as controlled actions, not casual clicks.',
    ],
    bars: [78, 84, 72, 89, 81],
  },
  {
    id: 'firewall',
    label: 'Firewall',
    title: 'Firewall rules, exposure, and policy thinking',
    score: 82,
    risk: 'Medium',
    status: 'Building confidence in rule review and secure access logic',
    summary:
      'Learning how traffic rules, source/destination logic, ports, allow/deny decisions, and change notes protect business systems.',
    tools: ['Allow/deny policy', 'Port awareness', 'Rule documentation', 'Change review'],
    signals: [
      'Check what access is required, who needs it, and whether the rule is too broad.',
      'Prefer least-privilege notes that explain purpose, owner, and expiry expectation.',
      'Connect firewall changes to cybersecurity impact and business continuity.',
    ],
    bars: [68, 76, 83, 71, 86],
  },
  {
    id: 'network',
    label: 'Network',
    title: 'Network troubleshooting from user symptom to root cause',
    score: 86,
    risk: 'Low-medium',
    status: 'Practicing structured triage across device, cable, Wi-Fi, IP, and DNS layers',
    summary:
      'Focusing on repeatable troubleshooting: physical checks, connectivity tests, IP/DNS awareness, printer/network setup, and escalation-ready notes.',
    tools: ['IP basics', 'DNS/DHCP awareness', 'Ping/traceroute', 'Printer and endpoint setup'],
    signals: [
      'Start with physical layer and user scope before assuming an application problem.',
      'Separate one-device issues from wider network, Wi-Fi, switch, or service impact.',
      'Record the exact test path so the next technician can continue quickly.',
    ],
    bars: [82, 87, 74, 79, 90],
  },
  {
    id: 'cyber',
    label: 'Cybersecurity',
    title: 'Security hygiene for everyday infrastructure work',
    score: 80,
    risk: 'Medium',
    status: 'Strengthening habits around endpoint, account, and data protection',
    summary:
      'Developing practical security instincts around access control, phishing awareness, patching, endpoint hygiene, backup readiness, and clean evidence handling.',
    tools: ['Patch awareness', 'Account safety', 'Endpoint hygiene', 'Incident notes'],
    signals: [
      'Look for unusual access, stale accounts, risky files, and missing patch discipline.',
      'Explain security issues in language business users can act on calmly.',
      'Keep evidence, timestamps, and change notes clear for audit and escalation.',
    ],
    bars: [70, 79, 84, 73, 82],
  },
  {
    id: 'hardware',
    label: 'Hardware',
    title: 'Hardware replacement and endpoint lifecycle care',
    score: 91,
    risk: 'Low',
    status: 'Comfortable with practical device support and replacement workflows',
    summary:
      'Focused on diagnosing laptops, peripherals, printers, scanners, meeting equipment, replacement readiness, handover notes, and user-friendly support.',
    tools: ['Laptop triage', 'Peripheral setup', 'Asset handover', 'Replacement checklist'],
    signals: [
      'Confirm symptoms, warranty/asset details, user urgency, and replacement readiness.',
      'Protect user data and account access before moving or replacing hardware.',
      'Close the loop with setup confirmation and documented handover.',
    ],
    bars: [89, 92, 86, 94, 88],
  },
];

export const infraTickets = [
  {
    id: 'srv-patch',
    area: 'Server',
    title: 'Patch readiness review',
    priority: 'High',
    detail: 'Confirm server update window, rollback note, storage headroom, and service owner.',
  },
  {
    id: 'fw-rule',
    area: 'Firewall',
    title: 'Narrow inbound access',
    priority: 'High',
    detail: 'Replace broad access request with source-specific rule and documented business purpose.',
  },
  {
    id: 'net-printer',
    area: 'Network',
    title: 'Printer reachability triage',
    priority: 'Medium',
    detail: 'Check cable, IP address, ping response, driver state, and user queue behavior.',
  },
  {
    id: 'cyber-phish',
    area: 'Cybersecurity',
    title: 'Suspicious email handling',
    priority: 'Medium',
    detail: 'Preserve evidence, warn user, check link/domain indicators, and escalate if needed.',
  },
  {
    id: 'hw-refresh',
    area: 'Hardware',
    title: 'Laptop replacement checklist',
    priority: 'Low',
    detail: 'Verify asset tag, backup readiness, installed apps, handover note, and user sign-off.',
  },
];

export const hardwareQueue = [
  { asset: 'Laptop refresh', done: 7, total: 10 },
  { asset: 'Printer/scanner check', done: 5, total: 8 },
  { asset: 'Meeting room equipment', done: 6, total: 6 },
  { asset: 'Peripheral replacement', done: 9, total: 12 },
];

export const skillGroups = [
  {
    name: 'Programming',
    items: ['Python', 'Java', 'C++', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    name: 'App Development',
    items: ['React', 'Vite', 'Flutter', 'Android Studio', 'Firebase', 'SQLite', 'REST/API basics'],
  },
  {
    name: 'Databases and Reporting',
    items: ['MySQL', 'Oracle APEX', 'Database design', 'SQL programming', 'Power BI support', 'Data validation'],
  },
  {
    name: 'Support and Workflow',
    items: [
      'Application support',
      'Helpdesk support',
      'Hardware troubleshooting',
      'Printer/network setup',
      'BPMS',
      'ProcessMaker',
    ],
  },
  {
    name: 'IT Infrastructure Focus',
    items: [
      'Server health checks',
      'Firewall rule awareness',
      'Network troubleshooting',
      'Cybersecurity hygiene',
      'Hardware replacement',
      'Endpoint lifecycle support',
    ],
  },
];

export const education = [
  {
    school: 'Universiti Teknologi MARA (UiTM), Shah Alam',
    credential: 'Bachelor of Information Technology (Hons.)',
    period: 'Mar 2024 - Jul 2026',
    cgpa: 'CGPA 3.55',
  },
  {
    school: 'Universiti Teknologi MARA (UiTM), Jasin',
    credential: 'Diploma in Computer Science',
    period: 'Oct 2021 - Mar 2024',
    cgpa: 'CGPA 3.21',
  },
];

export const achievements = [
  'Gold Medal, Kuala Lumpur International Invention & Innovation Symposium, Future Inventor, 2024',
  'Python Data Hackathon, 2024',
  'President, Student Sports Committee, UiTM',
  'Participant, Service Learning Malaysia (SULAM) and Braillethon Project 2024',
  'Oracle Academy: Database Design and Database Programming with SQL',
];

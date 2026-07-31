import { resumeFile } from './resume.js';

export { resumeFile };

export const pageTitles = [
	'☕ Code • Coffee • Sleep',
	'💻 Code • Create • Repeat',
	'⚡ Build • Learn • Improve',
	'🚀 Think • Code • Deploy',
	'🌱 Learn • Build • Grow',
	'🎨 Design • Develop • Deliver',
	'💡 Imagine • Build • Inspire',
	'⌨️ Eat • Sleep • Code',
	'🌐 Build • Test • Launch',
	'🧩 Debug • Commit • Repeat'
];

export const allDetails = [
	{
		id: 'hero',
		layout: 'hero',
		buttonsUnderMedia: true,
		title: 'Kaviyarasan C',
		subtitle: 'Web Developer — Svelte · Node.js · GraphQL',
		description: [
			'Web Developer with 2+ years building production web apps end to end — Svelte and Tailwind CSS on the front, Node.js, GraphQL and MongoDB behind them. I design GraphQL schemas, evolve MongoDB data models with the migrations to match, and build reusable, data-driven components instead of one-off screens: less duplicated markup, faster features, and fewer hardcoded conditionals for the next person.'
		],
		image: {
			src: ['/images/profile_transparent.png', '/images/kaviyarasan_hi.png'],
			alt: 'Portrait of Kaviyarasan',
			position: 'right', // 'left' | 'right'
			shape: 'circle', // 'circle' | 'rounded' | 'square'
			frame: 'elevated' // 'plain' | 'bordered' | 'elevated' | 'background'
		},
		highlights: [
			{ title: 'Experience', value: '2+ years' },
			{ title: 'Core Stack', value: 'Svelte · Node.js · GraphQL' },
			{ title: 'Worked in', value: 'EdTech — Learning Platforms' },
			{ title: 'Also Skilled In', value: 'Power Platform · Azure' },
			{ title: 'Status', value: 'Open to opportunities' },
			{ title: 'Based in', value: 'Salem, Tamil Nadu, India' }
		],
		buttons: [
			{
				label: 'Download Resume',
				type: 'download',
				href: resumeFile.href,
				variant: 'secondary'
			},
			{ label: 'Get in Touch', type: 'link', href: '/connect', variant: 'secondary' }
		]
	},

	// ─────────────────────────────────────────────
	// 2. ABOUT
	// ─────────────────────────────────────────────
	{
		id: 'about',
		layout: 'about',
		title: 'About Me',
		subtitle: 'Web Developer · Salem, Tamil Nadu',
		description: [
			"I'm a web developer with over two years of experience building front-end features and backend APIs for real products — most recently at Sharp Abacus, an EdTech learning platform used by students, teachers, and admins across Vedic Maths and Abacus course tracks.",
			'My core stack is JavaScript, Svelte, Tailwind CSS, and Node.js with GraphQL and MongoDB on the backend. Day to day that meant building reusable UI components, designing GraphQL schemas, and writing migration scripts to keep data models clean as the product grew.',
			'Before that, I spent six months on the Microsoft Power Platform side at Genpact — building low-code business applications with Power Apps, Power Automate, and Copilot Studio, and automating workflows that used to take manual effort. It gave me a different lens on problem-solving: same instinct for clean structure, different tools.',
			"I'm currently between roles and open to new opportunities. I care about clean, minimal code, co-located concerns, and data-driven component architectures over hardcoded UI — I'd rather spend an extra hour designing a registry-based component than leave behind ten hardcoded conditionals for the next person to untangle."
		],
		image: {
			src: '/images/profile_office.png',
			alt: 'Kaviyarasan C at work',
			position: 'left',
			shape: 'rounded',
			frame: 'bordered'
		},
		highlights: [
			{ title: 'Education', value: 'B.Sc Computer Science, Periyar University' },
			{ title: 'Most Recent Role', value: 'Web Developer, Sharp Abacus' },
			{ title: 'Prior Experience', value: 'Low-Code Intern, Genpact' },
			{ title: 'Availability', value: 'Open to new opportunities' }
		]
	},
	// ─────────────────────────────────────────────
	// 3. JOURNEY (career timeline)
	// ─────────────────────────────────────────────
	{
		id: 'journey',
		layout: 'journey',
		title: 'My Journey',
		subtitle: "Where I've worked and what I built",
		description:
			"Two years of shipping real product features, plus a stint in enterprise low-code automation — here's the path so far.",
		categories: [
			{
				title: 'Web Developer — Sharp Abacus (Remote, Bangalore)',
				description: 'Jul 2024 – Jun 2026',
				items: [
					'Developed and optimized front-end features using Svelte, JavaScript, and Tailwind CSS, improving page load performance and UX',
					'Built reusable UI components, reducing development time for new features across the learning platform',
					'Designed and integrated GraphQL APIs using Node.js and MongoDB for efficient data handling',
					'Updated data models, wrote migration scripts, and created API endpoints for evolving product requirements',
					'Converted an internship-track role into a full-time position after delivering on the EdTech platform'
				]
			},
			{
				title: 'Intern — Low Code Development, Genpact (Bangalore)',
				description: 'Jan 2024 – Jun 2024',
				items: [
					'Built business applications using Power Apps, Power Automate, Copilot Studio, and Dataverse to automate workflows',
					'Developed automation flows that reduced manual task effort and improved process efficiency',
					'Collaborated cross-functionally to translate business requirements into scalable solutions',
					'Strengthened corporate communication, documentation, and workflow design skills'
				]
			},
			{
				title: 'Web Development Intern — Sharp Abacus (Remote, Bangalore)',
				description: 'Jul 2023 – Dec 2023',
				items: [
					'Developed responsive UI features using HTML, CSS, JavaScript, Tailwind CSS, and Svelte',
					'Fixed UI bugs and improved application usability and performance',
					'Used Git and GitHub for version control and collaboration',
					'Debugged and tested applications using Chrome DevTools',
					'First hands-on experience with Svelte, which became the primary stack for later roles'
				]
			},
			{
				title: 'B.Sc Computer Science — Periyar University, Salem',
				description: '2019 – 2022 · CGPA 7.46/10.0',
				items: [
					'Built the foundation in programming, data structures, and web fundamentals that led into web development',
					'Completed prior studies at Arignar Anna Govt Arts College, Attur'
				]
			}
		]
	},

	// ─────────────────────────────────────────────
	// 4. TECH STACK & PRINCIPLES
	// ─────────────────────────────────────────────
	{
		id: 'techStack',
		layout: 'techStack',
		title: 'Tech Stack & Principles',
		subtitle: 'Tools I build with, and the principles behind them',
		description:
			"A front-end-leaning full-stack toolkit, plus a parallel track in Microsoft's low-code ecosystem for business automation work.",
		blocksOrder: ['categories', 'highlights', 'principles'],
		highlights: [
			{ title: 'Years with Svelte', value: '2+' },
			{ title: 'Total Tools', value: '15+' },
			{ title: 'Categories', value: '4' }
		],
		categories: [
			{
				title: 'Frontend & UI',
				description: 'What I use to build interfaces',
				items: ['JavaScript', 'HTML', 'CSS', 'Svelte', 'Tailwind CSS']
			},
			{
				title: 'Backend & Data',
				description: 'APIs and data handling',
				items: ['Node.js', 'GraphQL', 'MongoDB', 'REST APIs']
			},
			{
				title: 'Microsoft Power Platform',
				description: 'Low-code automation and enterprise tooling',
				items: ['Power Apps', 'Power Automate', 'Copilot Studio', 'Dataverse', 'Microsoft Azure']
			},
			{
				title: 'Development Tools',
				description: 'Day-to-day workflow',
				items: ['Git', 'GitHub', 'Visual Studio Code', 'Chrome DevTools']
			}
		],
		principles: [
			{
				title: 'DRY',
				description:
					"Don't Repeat Yourself. When the same markup, query, or logic shows up more than twice, I pull it into a reusable component, utility, or GraphQL fragment instead of copy-pasting. On the Sharp Abacus platform this meant registry-based UI components and shared resolvers, so a fix or a new field only had to be written once."
			},
			{
				title: 'KISS',
				description:
					'Keep It Simple, Stupid. I reach for the plainest solution that solves the actual problem before considering a clever abstraction — straightforward state, obvious data flow, and readable code that a teammate can follow six months later without a walkthrough.'
			},
			{
				title: 'YAGNI',
				description:
					"You Aren't Gonna Need It. I build what the current feature or ticket actually requires, not speculative options, config flags, or extensibility for a use case that hasn't shown up yet. It keeps schemas, components, and Power Automate flows lean instead of bloated with unused branches."
			},
			{
				title: 'SOLID',
				description:
					'The five object-oriented design principles — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. I lean on them when structuring components and backend modules so each piece has one clear job, and new behavior extends the system instead of rewriting it.'
			}
		]
	},

	// ─────────────────────────────────────────────
	// 5. PROBLEM SOLVING
	// ─────────────────────────────────────────────
	{
		id: 'problemSolving',
		layout: 'problemSolving',
		title: 'Problem Solving',
		subtitle: 'How I approach a new feature or bug',
		description:
			"I start by understanding the real problem before writing code. I break complex features into smaller tasks, build reusable components, and follow DRY principles to keep the code maintainable. I use AI tools to speed up research and implementation while reviewing every solution myself. Before shipping, I test edge cases, optimize performance, and refactor where needed so the codebase stays clean, scalable, and easy to extend.",
		steps: [
			{
				title: '1. Understand the root cause',
				description:
					"Before touching code, get a clear picture of why something behaves the way it does, instead of jumping straight to a fix. On the EdTech platform, this often meant tracing a UI glitch back to a data model change rather than patching the component."
			},
			{
				title: '2. Break it into smaller tasks',
				description:
					'Split the feature or bug into small, manageable pieces before writing any code, so each piece can be built and verified on its own instead of tackling the whole thing at once.'
			},
			{
				title: '3. Build reusable and DRY',
				description:
					'Look for the reusable component, utility, or registry entry hiding inside a one-off request, so the fix or feature helps the next one too instead of duplicating logic.'
			},
			{
				title: '4. Favor data-driven architecture',
				description:
					'Reach for configuration-driven, component-based structure over hardcoded conditionals, so new content or layouts drop in without touching core logic.'
			},
			{
				title: '5. Use AI tools, review everything myself',
				description:
					"Use Claude, GitHub Copilot, Codex, and ChatGPT to research approaches, validate ideas, and speed up implementation — but read and review every line before it ships, since the responsibility for correctness stays mine."
			},
			{
				title: '6. Test edge cases and performance',
				description:
					'Validate against real-world inputs — course data, student records, invoice documents, automation triggers — and check performance and user experience, not just the happy path.'
			},
			{
				title: '7. Refactor and automate the workflow',
				description:
					'Clean up as I go so the codebase is better than I found it, and automate repetitive work with Prettier, auto-save, and a consistent editor setup instead of doing it by hand each time.'
			}
		],
		highlights: [
			{ title: 'AI Tools', value: 'Claude · Copilot · Codex · ChatGPT' },
			{ title: 'Approach', value: 'Understand → break down → build → review → ship' }
		]
	},

	// ─────────────────────────────────────────────
	// 6. PROJECTS
	// ─────────────────────────────────────────────
	{
		id: 'projects',
		layout: 'projects',
		title: 'Projects',
		subtitle: 'Selected work',
		description:
			"A mix of a live product I've worked on for two years, and four Power Platform automations built to replace manual business processes.",
		categories: [
			{
				title: 'Sharp Abacus Learning Platform',
				description:
					'EdTech / Web Application — Svelte.js, JavaScript, Tailwind CSS, Node.js, GraphQL, MongoDB',
				items: [
					'Built learning modules including Vedic Maths, Junior Abacus, and Global Competition features for student engagement',
					'Built reusable, responsive UI components with Svelte.js and Tailwind CSS for performance and maintainability',
					'Designed and integrated GraphQL APIs with Node.js and MongoDB for efficient data handling behind every module',
					'Implemented video upload, playback, rating system, and leaderboard for performance tracking',
					'Integrated screen recording, screenshot capture, and custom input systems for interactivity',
					'Actively developed and extended from July 2023 to June 2026, across both internship and full-time roles'
				]
			},
			{
				title: 'Knowledge Management Chatbot',
				description:
					'Enterprise / AI Automation — Microsoft Copilot Studio, Power Automate, Dataverse',
				items: [
					'Built an AI-powered chatbot for conversational, document-upload, and query-based knowledge search',
					'Implemented custom suggestion flows with selectable options and image-based prompts for quick navigation',
					'Connected the bot to Dataverse so answers pulled from real, structured knowledge data rather than static scripts'
				]
			},
			{
				title: 'Invoice Processing Automation',
				description: 'Business Process Automation — Power Automate, OneDrive, Dataverse',
				items: [
					'Built an automated pipeline: files uploaded to OneDrive were processed, data extracted, and stored in Dataverse',
					'Implemented success/failure tracking for reliable document processing',
					'Removed a manual data-entry step from the invoice workflow, cutting processing time and human error'
				]
			},
			{
				title: 'AP Helpdesk Management System',
				description: 'Enterprise / Workflow Management — Power Apps, Power Automate, OneDrive',
				items: [
					'Built a helpdesk system managing real-time emails and meetings with reply, flag, read/unread, and delete features',
					'Streamlined communication workflows and improved operational efficiency',
					'Gave the AP team a single interface for triaging inbound requests instead of juggling raw inbox and calendar views'
				]
			},
			{
				title: 'Automatic Email Response Generator',
				description:
					'AI Automation / Enterprise Tools — Power Apps, Power Automate, Dataverse, Azure',
				items: [
					'Built an AI system that extracts intent, requirements, emotion, and flags from incoming emails',
					'Integrated database retrieval to generate structured email outputs (subject, title, body) with review/edit before sending',
					'Kept a human review step in the loop, so automation sped up drafting without removing final approval'
				]
			}
		]
	},
];

export default allDetails;

export const navbarLinks = {
	home: { name: 'Home', page: 'home' },
	resume: { name: 'Resume', page: 'resume' },
	certificates: { name: 'Certificates', page: 'certificates' },
	connect: { name: 'Get in Touch', page: 'connect' }
};

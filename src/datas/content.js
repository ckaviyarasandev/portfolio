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
			'Web Developer with 2+ years building production web apps end to end — Svelte and Tailwind CSS on the front, Node.js, GraphQL and MongoDB behind them. I design GraphQL schemas, evolve MongoDB data models with the migrations to match, and build reusable, data-driven components instead of one-off screens: less duplicated markup, faster features, and fewer hardcoded conditionals for the next person.',
			'Currently shipping an EdTech learning platform used across multiple course tracks — Vedic Maths and Junior Abacus modules, video playback, ratings and leaderboards. Also fluent in the Microsoft Power Platform — Power Apps, Power Automate and Copilot Studio — from automating real business workflows at Genpact.'
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
			{ title: 'Projects Shipped', value: '5+' },
			{ title: 'Based in', value: 'Salem, Tamil Nadu, India' }
		],
		buttons: [
			{
				label: 'Download Resume',
				type: 'download',
				href: resumeFile.href,
				variant: 'secondary'
			},
			{ label: 'Get in Touch', type: 'scroll', target: 'connect', variant: 'secondary' }
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
			"I'm a web developer with over two years of experience building front-end features and backend APIs for real products — most recently an EdTech learning platform used by students across multiple course tracks, including Vedic Maths and Junior Abacus modules.",
			'My core stack is JavaScript, Svelte/SvelteKit, Tailwind CSS, and Node.js with GraphQL and MongoDB on the backend. Day to day that means building reusable UI components, designing GraphQL schemas, and writing migration scripts to keep data models clean as products grow.',
			'Before that, I spent six months on the Microsoft Power Platform side at Genpact — building low-code business applications with Power Apps, Power Automate, and Copilot Studio, and automating workflows that used to take manual effort. It gave me a different lens on problem-solving: same instinct for clean structure, different tools.',
			"I care about clean, minimal code, co-located concerns, and data-driven component architectures over hardcoded UI. I'd rather spend an extra hour designing a registry-based component than leave behind ten hardcoded conditionals for the next person to untangle."
		],
		image: {
			src: '/images/profile_office.png',
			alt: 'Kaviyarasan C at work',
			position: 'left',
			shape: 'rounded',
			frame: 'bordered'
		},
		highlights: [
			{ title: 'Experience', value: '2+ years' },
			{ title: 'Location', value: 'Salem, Tamil Nadu, India' },
			{ title: 'Education', value: 'B.Sc Computer Science, Periyar University' },
			{ title: 'Current Role', value: 'Web Developer, Sharp Abacus' },
			{ title: 'Focus', value: 'Svelte · Node.js · GraphQL' },
			{ title: 'Also Skilled In', value: 'Power Platform · Azure' }
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
		highlights: [
			{ title: 'Total Experience', value: '2+ years' },
			{ title: 'Roles Held', value: '3' },
			{ title: 'Companies', value: 'Sharp Abacus · Genpact' }
		],
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
	// 4. TECH STACK
	// ─────────────────────────────────────────────
	{
		id: 'techStack',
		layout: 'techStack',
		title: 'Tech Stack',
		subtitle: 'Tools I build with',
		description:
			"A front-end-leaning full-stack toolkit, plus a parallel track in Microsoft's low-code ecosystem for business automation work.",
		highlights: [
			{ title: 'Primary Stack', value: 'Svelte · Node.js · GraphQL' },
			{ title: 'Years with Svelte', value: '2+' },
			{ title: 'Categories', value: '4' }
		],
		categories: [
			{
				title: 'Frontend & UI',
				description: 'What I use to build interfaces',
				items: ['JavaScript', 'HTML', 'CSS', 'Svelte', 'SvelteKit', 'Tailwind CSS']
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
		]
	},

	// ─────────────────────────────────────────────
	// 5. PHILOSOPHY
	// ─────────────────────────────────────────────
	{
		id: 'philosophy',
		layout: 'philosophy',
		title: 'How I Work',
		subtitle: 'Principles behind the code',
		principles: [
			{
				title: 'Clean, minimal code',
				description:
					'Favor simple, readable solutions over clever ones — code should be easy to pick up months later.'
			},
			{
				title: 'Co-located concerns',
				description:
					"Keep a component's logic, styling, and markup together so related changes stay in one place."
			},
			{
				title: 'Data-driven architecture',
				description:
					'Build registry-based, configuration-driven components instead of hardcoded conditionals, so new content or layouts drop in without touching core logic.'
			}
		],
		quote:
			"Good architecture is the kind that lets new features drop in without rewriting what's already there."
	},

	// ─────────────────────────────────────────────
	// 6. PROBLEM SOLVING
	// ─────────────────────────────────────────────
	{
		id: 'problemSolving',
		layout: 'problemSolving',
		title: 'Problem Solving',
		subtitle: 'How I approach a new feature or bug',
		description:
			"Whether it's a GraphQL schema change, a flaky UI bug, or a broken Power Automate flow, I work through the same loop every time.",
		steps: [
			{
				title: '1. Understand the root cause',
				description:
					'Before touching code, get a clear picture of why something behaves the way it does — not just the symptom. On the EdTech platform, this often meant tracing a UI glitch back to a data model change rather than patching the component.'
			},
			{
				title: '2. Reproduce and isolate',
				description:
					'Narrow the problem down to the smallest reliable repro — using Chrome DevTools for front-end issues, or isolating a single flow step when debugging Power Automate automations.'
			},
			{
				title: '3. Design for reuse',
				description:
					'Look for the reusable component, utility, or registry entry hiding inside a one-off request, so the fix helps the next feature too, not just this one.'
			},
			{
				title: '4. Validate with real data',
				description:
					'Test against real-world inputs — course data, student records, invoice documents, automation triggers — not just happy-path cases.'
			},
			{
				title: '5. Iterate with the team',
				description:
					'Share progress early and adjust, especially on cross-functional Power Platform projects where business requirements shifted mid-build.'
			},
			{
				title: '6. Ship, then measure',
				description:
					'Push the fix or feature, then watch real usage — page load performance, error rates, or process completion time — to confirm it actually solved the problem.'
			}
		],
		highlights: [
			{ title: 'Debugging Tools', value: 'Chrome DevTools · Git' },
			{ title: 'Approach', value: 'Root cause → repro → fix → validate' }
		]
	},

	// ─────────────────────────────────────────────
	// 7. LEARNING
	// ─────────────────────────────────────────────
	{
		id: 'learning',
		layout: 'learning',
		title: 'Currently Learning',
		subtitle: "Skills I'm actively building",
		description:
			"I treat learning as an ongoing part of the job, not a phase before it — here's what's on my bench right now, and where it's headed next.",
		cards: [
			{
				title: 'Advanced Svelte 5',
				description:
					'Runes, shared stores, and data-driven component registries — replacing hardcoded conditionals with configuration-driven UI.'
			},
			{
				title: 'Backend architecture',
				description:
					'GraphQL API design patterns and MongoDB data modeling at scale, beyond single-endpoint CRUD.'
			},
			{
				title: 'System design',
				description:
					"Structuring larger applications for maintainability and performance as the EdTech platform's feature set grows."
			},
			{
				title: 'Azure-integrated automation',
				description:
					'Connecting Power Platform flows more deeply with Microsoft Azure services for enterprise-grade automation.'
			}
		],
		highlights: [
			{ title: 'Right Now', value: 'Data-driven portfolio architecture' },
			{ title: 'Also Deepening', value: 'GraphQL · Node.js' },
			{ title: 'Exploring', value: 'Azure + Power Platform automation' }
		]
	},

	// ─────────────────────────────────────────────
	// 8. PROJECTS
	// ─────────────────────────────────────────────
	{
		id: 'projects',
		layout: 'projects',
		title: 'Projects',
		subtitle: 'Selected work',
		description:
			"A mix of a live product I've worked on for two years, and four Power Platform automations built to replace manual business processes.",
		highlights: [
			{ title: 'Featured Project', value: 'Sharp Abacus Learning Platform' },
			{ title: 'Domains', value: 'EdTech · Enterprise Automation' },
			{ title: 'Total Projects', value: '5' }
		],
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
					'Ongoing project — actively developed and extended since July 2023 across both internship and full-time roles'
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

	// ─────────────────────────────────────────────
	// 9. CONNECT
	// ─────────────────────────────────────────────
	{
		id: 'connect',
		layout: 'connect',
		title: "Let's Connect",
		subtitle: 'Open to new opportunities and collaborations',
		description:
			"I'm open to full-time roles, freelance work, and collaborations involving Svelte, Node.js, or Power Platform automation. Reach out — I usually reply within a day or two.",
		contactMethods: [
			{ title: 'Email', value: 'cmkkaviyarasanmm@gmail.com', icon: 'mail' },
			{ title: 'Phone', value: '+91 8124212240' },
			{ title: 'Location', value: 'Salem, Tamil Nadu, India', icon: 'location' }
		],
		highlights: [
			{ title: 'Status', value: 'Open to opportunities' },
			{ title: 'Response Time', value: 'Within 1–2 days' },
			{ title: 'Interested In', value: 'Full-time · Freelance · Collaboration' }
		],
		links: [
			{ label: 'GitHub', icon: 'github', href: 'https://github.com/YOUR-USERNAME' }, // TODO: replace with actual profile URL
			{ label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com/in/YOUR-PROFILE' } // TODO: replace with actual profile URL
		],
		buttons: [
			{
				label: 'Send an Email',
				type: 'external',
				href: 'mailto:cmkkaviyarasanmm@gmail.com',
				variant: 'primary'
			},
			{
				label: 'Download Resume',
				type: 'download',
				href: resumeFile.href,
				variant: 'secondary'
			}
		]
	}
];

export default allDetails;

export const temp_allDetails = [
	{
		title: 'Hello!',
		description:
			"Hi, I'm Kaviyarasan, a web developer with over two years of experience creating modern, responsive, and user-friendly web applications. I enjoy transforming ideas into websites that are both functional and enjoyable to use."
	},
	{
		title: 'My Journey',
		description:
			'My journey into web development started with curiosity and has grown into a passion for building digital experiences. Every project has helped me learn something new and improve as a developer.'
	},
	{
		title: 'Technologies',
		description:
			'I primarily work with Svelte, JavaScript, Tailwind CSS, Node.js, GraphQL, and MongoDB. I enjoy choosing the right tools to build clean, maintainable, and efficient applications.'
	},
	{
		title: 'My Philosophy',
		description:
			'I believe a great website is more than good-looking—it should be fast, responsive, accessible, and provide a smooth experience on every device.'
	},
	{
		title: 'Problem Solving',
		description:
			"I enjoy solving problems through code. Whether it's implementing a new feature, fixing a bug, or improving performance, I see every challenge as an opportunity to grow."
	},
	{
		title: 'Code Quality',
		description:
			'Writing clean, organized, and maintainable code is something I value. I believe good code makes projects easier to understand, improve, and scale over time.'
	},
	{
		title: 'Continuous Learning',
		description:
			"I'm someone who enjoys learning continuously. Web technologies evolve quickly, and I'm always exploring new ideas, frameworks, and best practices to improve my skills."
	},
	{
		title: 'Development Approach',
		description:
			"When I'm developing a project, I pay close attention to both the user experience and the developer experience. Building software that is enjoyable to use and easy to maintain is equally important to me."
	},
	{
		title: 'My Portfolio',
		description:
			"This portfolio represents my journey, the technologies I've worked with, and the projects I've enjoyed building. Every project reflects a step forward in my growth as a developer."
	},
	{
		title: 'Thank You',
		description:
			'Thanks for visiting my portfolio. I hope my work gives you a good understanding of who I am, what I enjoy building, and the kind of developer I strive to become.'
	}
];

export const navbarLinks = {
	home: { name: 'Home', page: 'home' },
	resume: { name: 'Resume', page: 'resume' },
};

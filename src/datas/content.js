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

export const heroPageSections = [
	{
		id: 'hero',
		layout: 'hero',
		title: 'Kaviyarasan C',
		subtitle: 'Web Developer — Svelte · Node.js · GraphQL',
		description: [
			'I build scalable, user-friendly web applications end-to-end — from responsive Svelte front ends to the GraphQL APIs and MongoDB data models behind them.',
			"Based in Salem, Tamil Nadu, I've spent the last two years shipping features for a live EdTech learning platform, alongside a stint building low-code automation tools on Microsoft Power Platform.",
			'I care about clean, minimal code and data-driven component architecture — building things that are easy to extend, not just easy to ship once.'
		],
		image: {
			src: '/images/profile_transparent.png',
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
			{ label: 'View Projects', type: 'scroll', target: 'projects', variant: 'primary' },
			{
				label: 'Download Resume',
				type: 'download',
				href: '/resume-kaviyarasan.pdf',
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
			"I'm a web developer with over two years of experience building front-end features and backend APIs for real products — most recently an EdTech learning platform used by students across multiple course tracks.",
			"My core stack is JavaScript, Svelte/SvelteKit, Tailwind CSS, and Node.js with GraphQL and MongoDB on the backend. I've also spent time in the Microsoft Power Platform world — Power Apps, Power Automate, and Copilot Studio — building business automation tools.",
			'I care about clean, minimal code, co-located concerns, and data-driven component architectures over hardcoded UI.'
		],
		highlights: [
			{ title: 'Experience', value: '2+ years' },
			{ title: 'Location', value: 'Salem, Tamil Nadu, India' },
			{ title: 'Education', value: 'B.Sc Computer Science, Periyar University' },
			{ title: 'Focus', value: 'Svelte · Node.js · GraphQL' }
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
		categories: [
			{
				title: 'Web Developer — Sharp Abacus (Remote, Bangalore)',
				description: 'Jul 2024 – Jun 2026',
				items: [
					'Developed and optimized front-end features using Svelte, JavaScript, and Tailwind CSS, improving page load performance and UX',
					'Built reusable UI components, reducing development time for new features',
					'Designed and integrated GraphQL APIs using Node.js and MongoDB for efficient data handling',
					'Updated data models, wrote migration scripts, and created API endpoints'
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
					'Debugged and tested applications using Chrome DevTools'
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
		categories: [
			{
				title: 'Web Technologies',
				description: 'Core front-end and back-end stack',
				items: [
					'JavaScript',
					'HTML',
					'CSS',
					'Svelte',
					'Tailwind CSS',
					'Node.js',
					'GraphQL',
					'MongoDB'
				]
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
		approach: [
			{
				title: 'Understand the root cause',
				description:
					'Before touching code, get a clear picture of why something behaves the way it does — not just the symptom.'
			},
			{
				title: 'Design for reuse',
				description: 'Look for the reusable component or utility hiding inside a one-off request.'
			},
			{
				title: 'Validate with real data',
				description:
					'Test against real-world inputs — course data, student records, automation triggers — not just happy-path cases.'
			},
			{
				title: 'Iterate with the team',
				description:
					'Share progress early, especially on cross-functional Power Platform projects where requirements shift.'
			}
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
		learningAreas: [
			{
				title: 'Advanced Svelte 5',
				description: 'Runes, shared stores, and data-driven component registries'
			},
			{
				title: 'Backend architecture',
				description: 'GraphQL API design patterns and MongoDB data modeling at scale'
			},
			{
				title: 'System design',
				description: 'Structuring larger applications for maintainability and performance'
			}
		],
		currentFocus: [
			'Refining a data-driven content architecture for this portfolio site',
			'Deepening GraphQL + Node.js backend skills',
			'Exploring Azure-integrated Power Platform automation patterns'
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
		categories: [
			{
				title: 'Sharp Abacus Learning Platform',
				description:
					'EdTech / Web Application — Svelte.js, JavaScript, Tailwind CSS, Node.js, GraphQL, MongoDB',
				items: [
					'Built learning modules including Vedic Maths, Junior Abacus, and Global Competition features for student engagement',
					'Built reusable, responsive UI components with Svelte.js and Tailwind CSS for performance and maintainability',
					'Implemented video upload, playback, rating system, and leaderboard for performance tracking',
					'Integrated screen recording, screenshot capture, and custom input systems for interactivity'
				]
			},
			{
				title: 'Knowledge Management Chatbot',
				description:
					'Enterprise / AI Automation — Microsoft Copilot Studio, Power Automate, Dataverse',
				items: [
					'Built an AI-powered chatbot for conversational, document-upload, and query-based knowledge search',
					'Implemented custom suggestion flows with selectable options and image-based prompts for quick navigation'
				]
			},
			{
				title: 'Invoice Processing Automation',
				description: 'Business Process Automation — Power Automate, OneDrive, Dataverse',
				items: [
					'Built an automated pipeline: files uploaded to OneDrive were processed, data extracted, and stored in Dataverse',
					'Implemented success/failure tracking for reliable document processing'
				]
			},
			{
				title: 'AP Helpdesk Management System',
				description: 'Enterprise / Workflow Management — Power Apps, Power Automate, OneDrive',
				items: [
					'Built a helpdesk system managing real-time emails and meetings with reply, flag, read/unread, and delete features',
					'Streamlined communication workflows and improved operational efficiency'
				]
			},
			{
				title: 'Automatic Email Response Generator',
				description:
					'AI Automation / Enterprise Tools — Power Apps, Power Automate, Dataverse, Azure',
				items: [
					'Built an AI system that extracts intent, requirements, emotion, and flags from incoming emails',
					'Integrated database retrieval to generate structured email outputs (subject, title, body) with review/edit before sending'
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
		contactMethods: [
			{ title: 'Email', value: 'cmkkaviyarasanmm@gmail.com', icon: 'mail' },
			{ title: 'Location', value: 'Salem, Tamil Nadu, India', icon: 'location' }
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
			}
		]
	}
];

export default heroPageSections;

export const temp_heroPageSections = [
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
	experience: { name: 'Experience', page: 'experience' },
	skills: { name: 'Skills', page: 'skills' },
	contact: { name: 'Contact', page: 'contact' }
};

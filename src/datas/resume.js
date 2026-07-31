export const resumeFile = {
	label: 'Kaviyarasan_C_Resume.pdf',
	href: 'https://drive.google.com/file/d/1XOdhTbum5wABaPUmmEg62LCRKRl1B_tZ/view?usp=sharing'
};

export const resumeProfile = {
	name: 'Kaviyarasan C',
	roles: ['Frontend Developer', 'Web Developer'],
	contacts: [
		{ label: 'Salem, Tamil Nadu, India' },
		{ label: '+91 8124212240' },
		{ label: 'cmkkaviyarasanmm@gmail.com', href: 'mailto:cmkkaviyarasanmm@gmail.com' },
		{ label: 'linkedin.com/in/kaviyarasanc', href: 'https://linkedin.com/in/kaviyarasanc' }
	]
};

export const resumeSummary =
	'Frontend Developer with 2+ years of experience building responsive, component-driven web applications using JavaScript (ES6+), Svelte, HTML5, CSS3 and Tailwind CSS. Experienced in integrating GraphQL APIs, building reusable UI component libraries, and delivering clean, maintainable interfaces in Agile remote teams.';

export const resumeExperience = [
	{
		title: 'Web Developer (Frontend Focus)',
		dates: '07/2024 – 06/2026',
		company: 'Sharp Abacus · Remote',
		items: [
			'Implemented new features in a Svelte-based online learning platform for abacus and Vedic maths, serving students, teachers and admins through role-based logins.',
			'Built reusable UI components with Svelte and Tailwind CSS, reducing duplicated markup and keeping styling consistent across the platform.',
			'Developed responsive, mobile-first interfaces ensuring usable layouts for young learners on tablets and desktops.',
			'Created and integrated GraphQL queries and mutations with Node.js, connecting frontend views to MongoDB data for new user-facing features.',
			'Extended MongoDB data models and implemented new GraphQL endpoints to support feature requirements.',
			'Fixed frontend defects and refactored existing components using Chrome DevTools, improving UI consistency and code maintainability.'
		]
	},
	{
		title: 'Low Code Development Intern',
		dates: '01/2024 – 06/2024',
		company: 'Genpact · India',
		items: [
			'Completed a structured self-learning programme on Microsoft Power Platform, with daily mentor sessions to review progress and discuss concepts.',
			'Built 4 end-to-end projects applying Power Apps, Power Automate, Copilot Studio and Dataverse to real-world business scenarios.'
		]
	},
	{
		title: 'Web Development Intern',
		dates: '07/2023 – 12/2023',
		company: 'Sharp Abacus · Remote',
		items: [
			'Implemented and enhanced responsive user interfaces using HTML5, CSS3, JavaScript, Svelte and Tailwind CSS.',
			'Fixed frontend defects, improving application stability and user experience across supported browsers.',
			'Maintained version-controlled codebases with Git and GitHub, and debugged layout issues with Chrome DevTools to improve UI consistency.'
		]
	}
];

export const resumeSkills = [
	{
		label: 'Languages',
		tags: [
			{ label: 'JavaScript (ES6+)', hi: true },
			{ label: 'HTML5', hi: true },
			{ label: 'CSS3', hi: true },
			{ label: 'TypeScript' }
		]
	},
	{
		label: 'Frontend',
		tags: [
			{ label: 'Svelte', hi: true },
			{ label: 'Component Architecture' },
			{ label: 'SPA' }
		]
	},
	{
		label: 'Styling & UI',
		tags: [
			{ label: 'Tailwind CSS', hi: true },
			{ label: 'Responsive Design' },
			{ label: 'Flexbox' },
			{ label: 'CSS Grid' },
			{ label: 'Mobile-First' }
		]
	},
	{
		label: 'APIs & Backend',
		tags: [
			{ label: 'GraphQL', hi: true },
			{ label: 'Node.js' },
			{ label: 'MongoDB' },
			{ label: 'Dataverse' }
		]
	},
	{
		label: 'Tools & Practices',
		tags: [
			{ label: 'Git' },
			{ label: 'GitHub' },
			{ label: 'VS Code' },
			{ label: 'Chrome DevTools' },
			{ label: 'Agile / Scrum' }
		]
	},
	{
		label: 'Low-Code',
		tags: [{ label: 'Power Apps' }, { label: 'Power Automate' }, { label: 'Copilot Studio' }]
	}
];

export const resumeEducation = {
	degree: 'B.Sc Computer Science',
	school: 'Periyar University, Salem',
	detail: '2019 – 2022 · CGPA 7.46'
};

export const resumeLanguages = [
	{ name: 'Tamil', level: 'Native' },
	{ name: 'English', level: 'Professional' }
];

export const resumeProjects = [
	{
		name: 'Sharp Abacus Learning Platform',
		stack: 'Svelte · JavaScript · Tailwind CSS · Node.js · GraphQL · MongoDB',
		items: [
			'Built interactive Vedic Maths and Abacus learning modules as reusable Svelte components styled with Tailwind CSS.',
			'Implemented video playback, star ratings, leaderboards and screen recording, integrated with GraphQL APIs, in a fully responsive layout.'
		]
	},
	{
		name: 'Knowledge Management Chatbot',
		stack: 'Copilot Studio · Power Automate · Dataverse',
		items: [
			'Built an AI-powered chatbot supporting conversational search, document upload, and query-based knowledge retrieval.',
			'Implemented custom suggestion flows with selectable options and image-based prompts for quick navigation.',
			'Connected the bot to Dataverse so responses pulled from structured data rather than static scripts.'
		]
	},
	{
		name: 'Invoice Processing Automation',
		stack: 'Power Automate · OneDrive · Dataverse',
		items: [
			'Built an automated pipeline where files uploaded to OneDrive were processed, data extracted, and stored in Dataverse.',
			'Implemented success/failure tracking and removed a manual data-entry step, reducing processing time and human error.'
		]
	},
	{
		name: 'AP Helpdesk Management System',
		stack: 'Power Apps · Power Automate · Outlook · Dataverse',
		items: [
			'Built a helpdesk app managing real-time emails and meetings with reply, flag, read/unread and delete features.',
			'Gave the AP team a single interface for triaging inbound requests instead of switching between inbox and calendar.'
		]
	},
	{
		name: 'Automatic Email Response Generator',
		stack: 'Power Automate · Copilot Studio · Dataverse',
		items: [
			'Built an AI system that extracts intent, requirements, emotion and flags from incoming emails.',
			'Generated structured draft replies (subject, title, body) with a human review and edit step before sending.'
		]
	}
];

export const resumeHighlights = [
	{
		label: 'What I build',
		tags: [
			{ label: 'Learning Platforms', hi: true },
			{ label: 'Component Libraries', hi: true },
			{ label: 'Chatbots' },
			{ label: 'Automation Pipelines' },
			{ label: 'Helpdesk Systems' }
		]
	},
	{
		label: 'Core strengths',
		tags: [
			{ label: 'Reusable Components' },
			{ label: 'GraphQL Integration' },
			{ label: 'Code Refactoring' },
			{ label: 'Role-Based Access' },
			{ label: 'Responsive UI' }
		]
	}
];

export const resumeContact = [
	{ label: 'Email', value: 'cmkkaviyarasanmm@gmail.com', href: 'mailto:cmkkaviyarasanmm@gmail.com' },
	{
		label: 'LinkedIn',
		value: 'linkedin.com/in/kaviyarasanc',
		href: 'https://linkedin.com/in/kaviyarasanc'
	},
	{ label: 'Phone', value: '+91 8124212240' },
	{ label: 'Location', value: 'Salem, Tamil Nadu, India' }
];

export const resumeWorkPreference = [
	{ label: 'Remote', hi: true },
	{ label: 'Hybrid' },
	{ label: 'On-site' }
];

export const experience = [
	{
		id: 'sharp-abacus-intern',
		company: 'Sharp Abacus',
		role: 'Web Development Intern',
		duration: '2023',
		location: 'Remote',
		employmentType: 'Internship',
		theme: 'amber',
		overview:
			'Joined as an intern to support the frontend team on an EdTech admin platform, learning production codebase conventions while shipping my first real features under review.',
		technologies: ['Svelte', 'JavaScript', 'Tailwind', 'Git', 'GitHub'],
		contributions: [
			{ icon: '⚡', text: 'Shipped first production UI components' },
			{ icon: '🧩', text: 'Fixed bugs across the admin dashboard' },
			{ icon: '🎨', text: 'Built responsive layouts from Figma specs' }
		],
		projects: [
			{
				id: 'admin-dashboard-v1',
				name: 'Admin Dashboard',
				summary: 'Core layout and navigation for the school admin panel.',
				details:
					'Built the initial dashboard shell — routing, layout scaffolding, and reusable table components used across every admin view.'
			},
			{
				id: 'video-upload',
				name: 'Video Upload',
				summary: 'Upload flow for lesson recordings.',
				details:
					'Implemented chunked upload with progress feedback and validation for lesson video assets.'
			}
		],
		achievements: [
			{ label: 'Months', value: 6 },
			{ label: 'Components Built', value: 40 },
			{ label: 'Bugs Fixed', value: 25 }
		],
		skills: ['Component Architecture', 'Code Review', 'Debugging', 'Git Workflow'],
		lessons:
			'This internship taught me what "production-ready" actually means — writing code for a team, not just for a feature to work. I learned to read a codebase before changing it.'
	},
	{
		id: 'genpact-lowcode',
		company: 'Genpact',
		role: 'Low-Code Development Intern',
		duration: '2024',
		location: 'Remote',
		employmentType: 'Internship',
		theme: 'sky',
		overview:
			'Worked within an enterprise automation team building internal tools using Microsoft Power Platform — a different world from hand-written frontend code, focused on rapid business-process delivery.',
		technologies: ['Power Apps', 'Power Automate', 'Copilot Studio', 'Dataverse', 'Azure'],
		contributions: [
			{ icon: '🚀', text: 'Automated manual approval workflows' },
			{ icon: '📦', text: 'Modeled business data in Dataverse' },
			{ icon: '🤖', text: 'Prototyped a Copilot Studio assistant' }
		],
		projects: [
			{
				id: 'approval-workflow',
				name: 'Approval Automation',
				summary: 'Replaced a manual email approval chain.',
				details:
					'Built a Power Automate flow connecting a Power Apps form to Dataverse, removing a multi-step manual email approval process.'
			}
		],
		achievements: [
			{ label: 'Months', value: 3 },
			{ label: 'Workflows Automated', value: 4 },
			{ label: 'Manual Hours Saved / wk', value: 10 }
		],
		skills: ['Low-Code Development', 'Process Automation', 'Data Modeling'],
		lessons:
			'This role showed me software delivery from a completely different angle — how much value can ship without traditional code, and how to think in terms of business processes, not just UI.'
	},
	{
		id: 'sharp-abacus-developer',
		company: 'Sharp Abacus',
		role: 'Web Developer',
		duration: 'Jul 2024 – Jun 2026',
		location: 'Remote',
		employmentType: 'Full-time',
		theme: 'violet',
		overview:
			'Returned as a full-time developer to own frontend architecture across the same EdTech platform, this time building the systems other engineers would build on top of.',
		technologies: ['Svelte', 'JavaScript', 'Tailwind', 'Node.js', 'GraphQL', 'MongoDB'],
		contributions: [
			{ icon: '⚡', text: 'Built reusable UI architecture' },
			{ icon: '🚀', text: 'Improved application performance' },
			{ icon: '🧩', text: 'Developed GraphQL APIs' },
			{ icon: '📦', text: 'Designed backend data models' },
			{ icon: '🎨', text: 'Redesigned responsive interfaces' }
		],
		projects: [
			{
				id: 'course-enrollment',
				name: 'Course Enrollment Handler',
				summary: 'Standalone enrollment module extracted from a monolith.',
				details:
					'Refactored a student management component, extracting enrollment logic into a standalone component and consolidating 35+ individual props into six semantic groups, with a full card-based redesign.'
			},
			{
				id: 'vedic-maths',
				name: 'Vedic Maths',
				summary: 'Interactive learning module.',
				details: 'Built the interactive practice flow for the Vedic Maths course track.'
			},
			{
				id: 'junior-abacus',
				name: 'Junior Abacus',
				summary: 'Course module for younger students.',
				details: 'Delivered the UI and enrollment flow for the Junior Abacus track.'
			},
			{
				id: 'screen-recorder',
				name: 'Screen Recorder',
				summary: 'In-browser recording tool.',
				details: 'Built a screen recording feature for capturing student practice sessions.'
			}
		],
		achievements: [
			{ label: 'Years', value: 2 },
			{ label: 'Modules Shipped', value: 10 },
			{ label: 'Components Built', value: 100 },
			{ label: 'Major Features', value: 5 }
		],
		skills: [
			'Frontend Architecture',
			'Reusable Components',
			'Performance Optimization',
			'API Integration',
			'Backend Development',
			'Problem Solving'
		],
		lessons:
			'This role transformed me from an intern into a professional developer. I learned how to build scalable applications, collaborate within a team, write maintainable code, and think beyond simply making features work.'
	}
];

export const experienceSummary = {
	years: '2+',
	highlights: [
		'Frontend Development',
		'Backend Development',
		'Enterprise Automation',
		'Continuous Learning'
	]
};

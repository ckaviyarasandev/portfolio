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
		id: 'welcome',

		title: 'Welcome!',

		subtitle: 'Thanks for stopping by.',

		description:
			"Hi, I'm Kaviyarasan, a Web Developer who enjoys building modern, responsive, and user-friendly web applications. Whether you're a recruiter, hiring manager, fellow developer, colleague, friend, or simply exploring my work, I'm glad you're here. This portfolio is a collection of my experience, projects, and continuous journey as a developer.",

		image: {
			src: '/images/profile_transparent.png',
			alt: 'Portrait of Kaviyarasan',
			position: 'right', // 'left' | 'right'
			shape: 'circle', // 'circle' | 'rounded' | 'square'
			frame: 'elevated' // 'plain' | 'bordered' | 'elevated' | 'background'
		},

		buttons: [
			{
				label: 'Explore Portfolio',
				type: 'scroll',
				target: '#about',
				variant: 'primary'
			},
			{
				label: 'Download Resume',
				type: 'download',
				href: '/resume.pdf',
				variant: 'secondary'
			}
		],

		links: [
			{
				label: 'GitHub',
				icon: 'github',
				href: 'https://github.com/yourusername'
			},
			{
				label: 'LinkedIn',
				icon: 'linkedin',
				href: 'https://linkedin.com/in/yourusername'
			}
		]
	},

	{
		title: 'About Me',

		subtitle:
			'Building modern web experiences through clean code, thoughtful design, and continuous learning.',

		description: [
			"I'm Kaviyarasan, a Frontend Developer with over two years of professional experience building modern, responsive, and user-friendly web applications. I enjoy transforming ideas into digital experiences that are both functional and enjoyable to use.",

			'My primary focus is frontend development using Svelte, JavaScript, and Tailwind CSS, while also working with Node.js, GraphQL, and MongoDB to build complete web solutions. I enjoy understanding how every part of an application works together.',

			"Throughout my journey, I've contributed to educational platforms, enterprise automation solutions, and AI-powered applications. These experiences have strengthened my ability to build reusable components, improve performance, solve real-world problems, and collaborate effectively within development teams.",

			'I believe great software is built through curiosity, continuous learning, and attention to detail. Every project is an opportunity to write cleaner code, create better user experiences, and grow as a developer.'
		],

		highlights: [
			{
				title: 'Experience',
				value: '2+ Years'
			},
			{
				title: 'Projects',
				value: '10+'
			},
			{
				title: 'Primary Focus',
				value: 'Frontend Development'
			},
			{
				title: 'Current Goal',
				value: 'Building scalable web applications'
			}
		],

		buttons: [
			{
				label: 'Download Resume',
				type: 'download',
				href: '/resume.pdf',
				variant: 'primary'
			},
			{
				label: 'View Projects',
				type: 'scroll',
				target: '#projects',
				variant: 'secondary'
			}
		],

		image: {
			src: '/images/profile.webp',
			alt: 'Kaviyarasan',
			position: 'left'
		}
	},
	{
		id: 'journey',
		layout: 'journey',

		title: 'My Journey',

		subtitle: 'Growing through curiosity, experience, and continuous learning.',

		description:
			"My journey into web development began with a curiosity about how websites work and quickly grew into a passion for creating digital experiences. Over the past two years, I've had the opportunity to work on educational platforms, business applications, and AI-powered solutions. Every project has introduced new challenges, strengthened my problem-solving skills, and helped me become a more confident and adaptable developer.",

		image: {
			src: '/images/journey.webp',
			alt: 'Web development journey illustration',
			position: 'left',
			shape: 'rounded',
			frame: 'background'
		},

		buttons: [
			{
				label: 'View Experience',
				type: 'navigate',
				href: '/experience',
				variant: 'primary'
			}
		],

		links: []
	},
	{
		id: 'technology-stack',

		layout: 'techStack',

		title: 'Technology Stack',

		subtitle: 'The technologies I use to build modern, scalable web applications.',

		description:
			'My primary focus is modern web development with Svelte, JavaScript, and Tailwind CSS, creating fast, responsive, and maintainable user interfaces. Beyond the frontend, I work with Node.js, GraphQL, and MongoDB to develop APIs and data-driven applications. I also have experience building business automation and AI-powered solutions using the Microsoft Power Platform, allowing me to contribute across both traditional web development and enterprise automation projects.',

		categories: [
			{
				title: 'Frontend',
				items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Svelte', 'Tailwind CSS']
			},
			{
				title: 'Backend',
				items: ['Node.js', 'GraphQL']
			},
			{
				title: 'Database',
				items: ['MongoDB']
			},
			{
				title: 'Microsoft Power Platform',
				items: ['Power Apps', 'Power Automate', 'Copilot Studio', 'Dataverse', 'Microsoft Azure']
			},
			{
				title: 'Development Tools',
				items: ['Git', 'GitHub', 'Visual Studio Code', 'Chrome DevTools']
			}
		],

		highlights: [
			'Responsive Web Development',
			'Reusable UI Components',
			'GraphQL API Integration',
			'Backend Development',
			'Enterprise Automation',
			'AI-powered Solutions'
		],

		buttons: [
			{
				label: 'View Projects',
				type: 'navigate',
				href: '/projects',
				variant: 'primary'
			}
		]
	},
	{
		id: 'development-philosophy',

		layout: 'philosophy',

		title: 'Development Philosophy',

		subtitle: 'Building software that is clean, reliable, and designed to last.',

		description:
			'I believe great software is more than writing code that works—it should be intuitive, maintainable, and deliver a meaningful experience for its users. My approach focuses on writing clean, reusable components, choosing the right technologies for the problem, and continuously refining both performance and code quality. Every project is an opportunity to learn, improve, and create solutions that remain valuable as they evolve.',

		principles: [
			{
				title: 'User First',
				description:
					'Every feature should improve the user experience through clarity, accessibility, and responsiveness.'
			},
			{
				title: 'Clean & Maintainable',
				description:
					'I write modular, reusable, and well-structured code that is easy to understand and extend.'
			},
			{
				title: 'Performance Matters',
				description:
					'I aim to build fast, optimized applications that provide a smooth experience across devices.'
			},
			{
				title: 'Continuous Learning',
				description:
					'I embrace new technologies, best practices, and constructive feedback to grow with every project.'
			}
		],

		quote:
			"Good software isn't just about solving today's problem—it's about creating solutions that remain valuable tomorrow.",

		buttons: [
			{
				label: 'See My Projects',
				type: 'navigate',
				href: '/projects',
				variant: 'primary'
			}
		]
	},
	{
		id: 'problem-solving',

		layout: 'problemSolving',

		title: 'Problem Solving',

		subtitle: 'Every challenge is an opportunity to build a better solution.',

		description:
			"I enjoy solving problems by understanding both the technical challenge and the user's needs. Whether it's debugging complex issues, improving application performance, designing reusable components, or implementing new features, I focus on finding solutions that are practical, maintainable, and scalable. My goal isn't just to fix problems—it's to leave the codebase better than I found it.",

		approach: [
			{
				title: 'Understand First',
				description: 'I start by understanding the root cause before writing a solution.'
			},
			{
				title: 'Build Thoughtfully',
				description: 'I aim for solutions that are clean, reusable, and easy to maintain.'
			},
			{
				title: 'Test & Refine',
				description:
					'I verify functionality, consider edge cases, and improve the overall user experience.'
			},
			{
				title: 'Learn & Improve',
				description: 'Every challenge teaches something new that I can apply to future projects.'
			}
		],

		examples: [
			'Debugging complex UI issues',
			'Optimizing frontend performance',
			'Designing reusable Svelte components',
			'Building GraphQL integrations',
			'Automating business workflows',
			'Improving application maintainability'
		],

		quote:
			'I believe the best solutions come from understanding the problem before writing the code.',

		buttons: [
			{
				label: 'View My Projects',
				type: 'navigate',
				href: '/projects',
				variant: 'primary'
			}
		]
	},
	{
		id: 'continuous-learning',

		layout: 'learning',

		title: 'Continuous Learning',

		subtitle: 'Technology evolves every day, and so do I.',

		description:
			'I believe learning is a continuous journey rather than a destination. Every project introduces new ideas, every challenge teaches a valuable lesson, and every technology opens the door to better solutions. I enjoy exploring modern frameworks, improving my development practices, and expanding my understanding of both frontend and backend development. Staying curious and adapting to change helps me build better software and grow as a developer.',

		learningAreas: [
			{
				title: 'Modern Web Development',
				description:
					'Keeping up with modern JavaScript, Svelte, and evolving frontend best practices.'
			},
			{
				title: 'Backend Technologies',
				description:
					'Strengthening my understanding of APIs, GraphQL, databases, and scalable application architecture.'
			},
			{
				title: 'AI & Automation',
				description:
					'Exploring AI-powered workflows and business automation to solve real-world problems.'
			},
			{
				title: 'Software Engineering',
				description:
					'Continuously improving code quality, architecture, testing, and maintainability.'
			}
		],

		currentFocus: [
			'Advanced Svelte & SvelteKit',
			'Scalable application architecture',
			'Performance optimization',
			'UI/UX best practices',
			'Clean and maintainable code'
		],

		quote: 'The best developers never stop learning—they keep improving one project at a time.',

		buttons: [
			{
				label: 'Explore My Projects',
				type: 'navigate',
				href: '/projects',
				variant: 'primary'
			}
		]
	},
	{
		id: 'featured-projects',

		layout: 'projects',

		title: 'Featured Projects',

		subtitle: 'Building solutions that solve real-world problems.',

		description:
			"Throughout my journey, I've worked on projects ranging from modern web applications and educational platforms to enterprise automation and AI-powered solutions. Every project has strengthened my technical skills, challenged my problem-solving abilities, and reinforced the importance of writing clean, maintainable software that delivers real value.",

		categories: [
			{
				title: 'Web Applications',
				description:
					'Responsive and modern applications built with Svelte, JavaScript, and Tailwind CSS.'
			},
			{
				title: 'Enterprise Solutions',
				description:
					'Business applications and workflow automation using the Microsoft Power Platform.'
			},
			{
				title: 'Full-Stack Development',
				description: 'Developing GraphQL APIs, backend services, and MongoDB-powered applications.'
			},
			{
				title: 'AI & Automation',
				description:
					'Creating intelligent workflows and AI-assisted solutions to improve productivity.'
			}
		],

		highlights: [
			'Responsive UI Design',
			'Reusable Component Architecture',
			'GraphQL Integration',
			'Business Process Automation',
			'Performance Optimization',
			'Modern Development Practices'
		],

		quote:
			'Every project represents a challenge solved, a lesson learned, and another step forward in my growth as a developer.',

		buttons: [
			{
				label: 'Explore Projects',
				type: 'navigate',
				href: '/projects',
				variant: 'primary'
			},
			{
				label: 'GitHub',
				type: 'external',
				href: 'https://github.com/yourusername',
				variant: 'secondary'
			}
		]
	},
	{
		id: 'lets-connect',

		layout: 'connect',

		title: "Let's Connect",

		subtitle: 'Thanks for visiting my portfolio.',

		description:
			"I appreciate you taking the time to explore my work and learn about my journey as a developer. Whether you're a recruiter, hiring manager, fellow developer, or someone with an interesting idea, I'd be happy to connect. I'm always open to discussing new opportunities, collaborating on meaningful projects, or simply having a conversation about technology and software development.",

		contactMethods: [
			{
				title: 'Email',
				value: 'kaviyarasan@example.com',
				icon: 'mail'
			},
			{
				title: 'LinkedIn',
				value: 'linkedin.com/in/kaviyarasan',
				icon: 'linkedin'
			},
			{
				title: 'GitHub',
				value: 'github.com/kaviyarasan',
				icon: 'github'
			},
			{
				title: 'Location',
				value: 'Tamil Nadu, India',
				icon: 'location'
			}
		],

		quote:
			'Great software is built by people who enjoy learning, collaborating, and solving meaningful problems together.',

		buttons: [
			{
				label: 'Get In Touch',
				type: 'navigate',
				href: '/contact',
				variant: 'primary'
			},
			{
				label: 'Download Resume',
				type: 'download',
				href: '/resume/Kaviyarasan_C_Resume.pdf',
				variant: 'secondary'
			}
		],

		links: [
			{
				label: 'GitHub',
				icon: 'github',
				href: 'https://github.com/yourusername'
			},
			{
				label: 'LinkedIn',
				icon: 'linkedin',
				href: 'https://linkedin.com/in/yourprofile'
			}
		]
	}
];

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

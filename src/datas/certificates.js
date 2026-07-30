// Each entry is one certificate/credential document. `category` groups them
// (course, internship, certification, ...) so future additions — e.g. real
// employer-issued experience certificates — slot straight into this array
// without the page component needing any changes. Every field except `title`
// and `href` is optional and simply hidden on the tile when left blank.
export const certificates = [
	{
		id: 'internship-completion-certificate',
		title: 'Internship Completion Certificate', // TODO: confirm actual certificate title
		workTitle: 'Lowcode Developer', // TODO: e.g. "Web Development Internship" — the program/course this cert is for
		role: 'Consultant', // TODO: e.g. "Frontend Developer" — role held/trained for, if applicable
		company: 'For Genpact India Private Limited', // TODO: issuing company / organization name
		duration: '10-January-24 – 28-June-24.', // TODO: e.g. "Jul 2023 – Dec 2023" or a single completion date
		description: 'I successfully completed a 6-month internship at Genpact from January 2024 to June 2024. During my internship, I worked on Research & Development (R&D) in Artificial Intelligence and Machine Learning, gaining practical experience in AI concepts, problem-solving, and professional software development practices. I was recognized for my hard work, commitment, and successful completion of the internship project.', // TODO: a sentence or two on what the certificate covers
		category: 'Course',
		href: 'https://drive.google.com/file/d/1X1awRip9ah8JBxBcaExt_fk0SQtIoYmC/view?usp=sharing'
	}
];

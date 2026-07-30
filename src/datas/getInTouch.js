const phoneDisplay = '+91 8124212240';
const phoneDial = '+918124212240';
const phoneWhatsapp = '918124212240'; // wa.me needs digits only, no leading +
const email = 'cmkkaviyarasanmm@gmail.com';

const whatsappMessage =
	"Hi Kaviyarasan, I came across your portfolio and I'd like to connect about an opportunity.";
const emailSubject = "Let's connect — from your portfolio";
const emailBody =
	"Hi Kaviyarasan,\n\nI came across your portfolio and would like to talk about an opportunity.\n\nLooking forward to hearing from you.\n\nThanks,\n";

// Every href below opens the visitor's own app (dialer / WhatsApp / mail client)
// with content pre-filled but still editable before they send anything — nothing
// here submits or sends on their behalf.
export const getInTouchChannels = [
	{
		id: 'call',
		label: 'Call Me',
		description: 'Ring me directly for a quick chat.',
		value: phoneDisplay,
		action: 'Tap to call',
		icon: 'phone',
		href: `tel:${phoneDial}`,
		// Falls back to this if the device has no dialer app registered for tel: links.
		copyValue: phoneDisplay
	},
	{
		id: 'whatsapp',
		label: 'WhatsApp',
		description: 'Message me — I usually reply within a day.',
		value: phoneDisplay,
		action: 'Open chat',
		icon: 'whatsapp',
		href: `https://wa.me/${phoneWhatsapp}?text=${encodeURIComponent(whatsappMessage)}`
	},
	{
		id: 'email',
		label: 'Email',
		description: 'Opens a draft with a subject and message already filled in.',
		value: email,
		action: 'Open draft',
		icon: 'mail',
		// A plain https:// link instead of mailto: — mailto: silently does nothing
		// on a device with no registered mail app, whereas this opens Gmail's web
		// compose in a new tab like any other link (LinkedIn/GitHub included),
		// with the same to/subject/body pre-filled and still fully editable.
		href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
		external: true
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		description: 'Connect with me professionally.',
		value: 'linkedin.com/in/kaviyarasanc',
		action: 'View profile',
		icon: 'linkedin',
		href: 'https://linkedin.com/in/kaviyarasanc',
		external: true
	},
	{
		id: 'github',
		label: 'GitHub',
		description: 'Check out my code and projects.',
		value: 'github.com/ckaviyarasandev',
		action: 'View profile',
		icon: 'github',
		href: 'https://github.com/ckaviyarasandev',
		external: true
	}
];

export const getInTouchLocation = {
	label: 'Salem, Tamil Nadu, India',
	mapsHref: 'https://maps.google.com/?q=Salem,Tamil+Nadu,India',
	embedSrc: 'https://www.google.com/maps?q=Salem,Tamil+Nadu,India&output=embed'
};

<script>
	import { contactInfo } from '../../../datas/info.js';

	let { onNavigate } = $props();

	const contactLinks = [
		{ label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
		{
			label: 'Phone',
			value: `${contactInfo.countryCode} ${contactInfo.phone}`,
			href: `tel:${contactInfo.countryCode}${contactInfo.phone}`
		},
		{ label: 'LinkedIn', value: 'linkedin.com/in/kaviyarasan', href: 'https://linkedin.com' },
		{ label: 'GitHub', value: 'github.com/kaviyarasan', href: 'https://github.com' }
	];
</script>

<div class="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-24 text-white md:px-10">
	<header class="max-w-3xl">
		<p class="mb-4 text-sm font-semibold tracking-[0.28em] text-amber-300 uppercase">Contact</p>
		<h1 class="text-4xl font-bold tracking-tight md:text-6xl">Let’s build something useful.</h1>
		<p class="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
			Have a product idea, a frontend challenge, or an opportunity worth discussing? Send a note and
			I’ll get back to you.
		</p>
	</header>

	<section class="grid gap-4 sm:grid-cols-2" aria-label="Contact details">
		{#each contactLinks as contact}
			<a
				class="group rounded-2xl border border-white/15 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-white/40 hover:bg-black/35"
				href={contact.href}
				target={contact.href.startsWith('http') ? '_blank' : undefined}
				rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
			>
				<p class="text-sm text-white/50">{contact.label}</p>
				<p
					class="mt-3 text-lg font-semibold break-words text-white transition group-hover:text-amber-200"
				>
					{contact.value}
				</p>
			</a>
		{/each}
	</section>

	<div class="flex flex-wrap gap-4 border-t border-white/15 pt-8">
		<button
			class="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
			type="button"
			onclick={() => onNavigate?.('home')}
		>
			Back home
		</button>
		<button
			class="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition hover:border-white hover:bg-white hover:text-slate-950"
			type="button"
			onclick={() => onNavigate?.('experience')}
		>
			View experience
		</button>
	</div>
</div>

<script>
	import {
		resumeFile,
		resumeProfile,
		resumeSummary,
		resumeExperience,
		resumeSkills,
		resumeEducation,
		resumeLanguages,
		resumeProjects,
		resumeHighlights,
		resumeContact,
		resumeWorkPreference
	} from '../../../datas/resume.js';
	import { toDriveDownloadUrl } from '../../../utils/driveLink.js';
	import { cx } from '../GUI/slideShow/utils/style.js';

	let { onNavigate } = $props();

	const downloadHref = toDriveDownloadUrl(resumeFile.href);

	const [nameLead, ...nameRest] = resumeProfile.name.split(' ');
	const nameTail = nameRest.join(' ');
	const roleLine = resumeProfile.roles.join(' · ');

	const isExternal = (href) => href?.startsWith('http');

	const cardClass =
		'mb-8 overflow-hidden rounded-2xl border border-slate-700 bg-[#181c27] shadow-2xl shadow-black/40';
	const secTitleClass =
		"flex items-center gap-2 text-[10.5px] font-bold tracking-[1.6px] text-indigo-500 uppercase mb-[18px] after:content-[''] after:h-px after:flex-1 after:bg-gradient-to-r after:from-slate-700 after:to-transparent";
	const tagClass =
		'rounded-md border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[11.5px] text-slate-400 transition-colors hover:border-indigo-500 hover:text-indigo-300';
	const tagHiClass = 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300';
	const bulletClass =
		"relative pl-4 text-[13px] leading-6 text-slate-400 before:content-['▸'] before:absolute before:top-0.5 before:left-0 before:text-[10px] before:text-indigo-500";
	const groupLabelClass =
		'mb-2 text-[10.5px] font-semibold tracking-wide text-indigo-300 uppercase';
	const pageLabelClass =
		'border-t border-slate-700 bg-[#0f1117] px-5 py-2.5 text-right font-mono text-[10px] text-slate-500';
</script>

{#snippet tagRow(list)}
	<div class="flex flex-wrap gap-1.5">
		{#each list as t (t.label)}
			<span class={cx(tagClass, t.hi && tagHiClass)}>{t.label}</span>
		{/each}
	</div>
{/snippet}

{#snippet bulletList(items)}
	<ul class="flex list-none flex-col gap-1.5 p-0">
		{#each items as item}
			<li class={bulletClass}>{item}</li>
		{/each}
	</ul>
{/snippet}

{#snippet labeledTags(label, list)}
	<div class="mb-5 last:mb-0">
		<div class={groupLabelClass}>{label}</div>
		{@render tagRow(list)}
	</div>
{/snippet}

<!-- `relative z-10` is load-bearing: pageController paints its gradient layers as
     `absolute inset-0` siblings, and positioned elements paint above static ones in
     the same stacking context. Without this the whole page renders *under* those
     layers and only the (already `relative`) header stays visible. -->
<div class="relative z-10 min-h-dvh w-full bg-[#0f1117] px-4 pt-24 pb-20 text-slate-200">
	<div class="mx-auto mb-6 flex max-w-[860px] justify-end gap-2.5">
		<button
			type="button"
			class="cursor-pointer rounded-full border border-slate-700 px-[18px] py-2 text-[12.5px] font-semibold text-slate-400 transition-colors hover:border-indigo-500 hover:text-indigo-300"
			onclick={() => onNavigate?.('home')}
		>
			&larr; Back home
		</button>
		<a
			href={downloadHref}
			download
			class="rounded-full border border-indigo-500/40 bg-indigo-500/15 px-[18px] py-2 text-[12.5px] font-semibold text-indigo-300 transition-colors hover:bg-indigo-500 hover:text-white"
		>
			Download PDF
		</a>
	</div>

	<div class="mx-auto flex max-w-[860px] flex-col">
		<!-- ═══════════════ PAGE 1 ═══════════════ -->
		<div class={cardClass}>
			<div
				class="relative overflow-hidden border-b border-slate-700 bg-gradient-to-br from-[#13172a] via-[#1a1f35] to-[#1e1a35] p-7 pb-7 before:pointer-events-none before:absolute
				before:-top-16 before:-right-16 before:aspect-square before:h-auto before:w-72 before:rounded-full before:bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,transparent_70%)] before:content-[''] after:pointer-events-none after:absolute
				after:bottom-[-40px] after:left-[30%] after:aspect-square after:h-auto after:w-52 after:rounded-full after:bg-[radial-gradient(circle,rgba(129,140,248,0.08)_0%,transparent_70%)] after:content-[''] md:p-11 md:pb-9"
			>
				<div class="relative z-10">
					<div class="mb-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
						{nameLead} <span class="text-indigo-400">{nameTail}</span>
					</div>
					<div
						class="mt-2 mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-indigo-300 uppercase"
					>
						<span class="text-[10px]">&#11049;</span>
						{roleLine}
					</div>
					<div class="mt-1 flex flex-wrap gap-x-5 gap-y-1.5">
						{#each resumeProfile.contacts as c (c.label)}
							<span class="flex items-center gap-1.5 text-[12.5px] text-slate-400">
								<span class="text-[8px] text-indigo-500">&#9679;</span>
								{#if c.href}
									<a
										href={c.href}
										target={isExternal(c.href) ? '_blank' : undefined}
										rel={isExternal(c.href) ? 'noopener noreferrer' : undefined}
										class="text-slate-400 no-underline transition-colors hover:text-indigo-300"
										>{c.label}</a
									>
								{:else}
									{c.label}
								{/if}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-[1fr_280px]">
				<!-- MAIN -->
				<div class="border-slate-700 p-6 md:border-r md:p-9 md:pr-10 md:pl-12">
					<div class="mb-8">
						<div class={secTitleClass}>Professional Summary</div>
						<p
							class="border-l-2 border-indigo-500 pl-4 text-[13.5px] leading-[1.75] text-slate-400"
						>
							{resumeSummary}
						</p>
					</div>

					<div class="mb-8">
						<div class={secTitleClass}>Professional Experience</div>
						{#each resumeExperience as job (job.title)}
							<div class="mb-6 last:mb-0">
								<div class="mb-0.5 flex items-start justify-between">
									<div class="text-[14.5px] font-semibold text-white">{job.title}</div>
									<div
										class="rounded-lg border border-indigo-500/25 bg-indigo-500/15 px-2.5 py-0.5 font-mono text-[11px] whitespace-nowrap text-indigo-300"
									>
										{job.dates}
									</div>
								</div>
								<div class="mb-2.5 text-[12.5px] font-medium text-indigo-300">{job.company}</div>
								{@render bulletList(job.items)}
							</div>
						{/each}
					</div>
				</div>

				<!-- SIDE -->
				<div class="bg-[#13172a] p-6 md:p-9 md:px-7">
					<div class="mb-8">
						<div class={secTitleClass}>Technical Skills</div>
						{#each resumeSkills as group (group.label)}
							{@render labeledTags(group.label, group.tags)}
						{/each}
					</div>

					<div class="my-5 h-px bg-slate-700"></div>

					<div class="mb-8">
						<div class={secTitleClass}>Education</div>
						<div>
							<div class="mb-0.5 text-[13.5px] font-semibold text-white">
								{resumeEducation.degree}
							</div>
							<div class="mb-0.5 text-xs text-slate-400">{resumeEducation.school}</div>
							<div class="font-mono text-[11.5px] text-slate-500">{resumeEducation.detail}</div>
						</div>
					</div>

					<div class="my-5 h-px bg-slate-700"></div>

					<div class="mb-8">
						<div class={secTitleClass}>Languages</div>
						<div class="flex flex-col gap-2">
							{#each resumeLanguages as lang (lang.name)}
								<div class="flex items-center justify-between">
									<span class="text-[13px] text-slate-400">{lang.name}</span>
									<span
										class="rounded-lg border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10.5px] text-slate-500"
										>{lang.level}</span
									>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class={pageLabelClass}>Page 1 of 2</div>
		</div>

		<!-- ═══════════════ PAGE 2 ═══════════════ -->
		<div class={cardClass}>
			<div
				class="flex flex-col items-start justify-between gap-1.5 border-b border-slate-700 bg-gradient-to-br from-[#13172a] to-[#1a1f35] px-6 py-5 md:flex-row md:items-center md:gap-0 md:px-12"
			>
				<div>
					<div class="text-lg font-bold text-white">
						{nameLead} <span class="text-indigo-400">{nameTail}</span>
					</div>
					<div class="text-[11px] font-medium tracking-wide text-slate-400">{roleLine}</div>
				</div>
				<div
					class="rounded-lg border border-indigo-500/30 bg-indigo-500/15 px-3 py-0.5 font-mono text-[10.5px] text-indigo-300"
				>
					Projects
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-[1fr_280px]">
				<div class="p-6 md:p-9 md:pr-10 md:pl-12">
					<div class="mb-8">
						<div class={secTitleClass}>Projects</div>
						{#each resumeProjects as project (project.name)}
							<div class="mb-[22px] last:mb-0">
								<div class="mb-0.5 flex items-center justify-between">
									<div class="text-sm font-semibold text-white">{project.name}</div>
								</div>
								<div class="mb-2 font-mono text-[11px] text-slate-500">{project.stack}</div>
								{@render bulletList(project.items)}
							</div>
						{/each}
					</div>
				</div>

				<!-- Side col page 2 — repeat key skills + links -->
				<div class="bg-[#13172a] p-6 md:p-9 md:px-7">
					<div class="mb-8">
						<div class={secTitleClass}>Highlights</div>
						{#each resumeHighlights as h (h.label)}
							{@render labeledTags(h.label, h.tags)}
						{/each}
					</div>

					<div class="my-5 h-px bg-slate-700"></div>

					<div class="mb-8">
						<div class={secTitleClass}>Contact</div>
						<div class="flex flex-col gap-2.5">
							{#each resumeContact as c (c.label)}
								<div class="flex flex-col gap-0.5">
									<span class="text-[10px] tracking-wide text-slate-500 uppercase">{c.label}</span>
									{#if c.href}
										<a
											href={c.href}
											target={isExternal(c.href) ? '_blank' : undefined}
											rel={isExternal(c.href) ? 'noopener noreferrer' : undefined}
											class="text-xs text-indigo-300 no-underline hover:underline">{c.value}</a
										>
									{:else}
										<span class="text-xs text-slate-400">{c.value}</span>
									{/if}
								</div>
							{/each}
						</div>
					</div>

					<div class="my-5 h-px bg-slate-700"></div>

					<div>
						<div class={secTitleClass}>Work Preference</div>
						{@render tagRow(resumeWorkPreference)}
					</div>
				</div>
			</div>

			<div class={pageLabelClass}>Page 2 of 2</div>
		</div>
	</div>
</div>

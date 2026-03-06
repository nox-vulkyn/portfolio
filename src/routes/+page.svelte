<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { base } from '$app/paths';
  import data from '$lib/data/portfolio.json';

  const {
    hero,
    metrics,
    competencies,
    achievements,
    skillSets,
    experiences,
    projects,
    education,
    certificates
  } = data;

  type Contact = { type: 'phone' | 'email' | 'link'; label: string; href?: string };

  const contactHref = (item: Contact) => {
    if (item.type === 'email') return `mailto:${item.label}`;
    if (item.type === 'phone') return `tel:${item.label.replace(/\s+/g, '')}`;
    return item.href ?? '#';
  };

  const resolveHref = (href: string) => (href.startsWith('/') ? `${base}${href}` : href);
  const resolveAsset = (value: string) => (value.startsWith('/') ? `${base}${value}` : value);

  const detailSections = [
    {
      id: 'competencies',
      title: 'Practice pillars',
      summary: 'Strategic apparatus and hands-on guardrails that keep high-velocity delivery secure.'
    },
    {
      id: 'skills',
      title: 'Ecosystem fluency',
      summary: 'Languages, platforms, and automation toolkits that bridge research and execution.'
    },
    {
      id: 'experience',
      title: 'Professional timeline',
      summary: 'Leadership and engineering roles where security automation and testing were delivered end to end.'
    },
    {
      id: 'projects',
      title: 'Highlights & builds',
      summary: 'Tangible automation, detection, and offensive tooling crafted for high-stakes environments.'
    },
    {
      id: 'education',
      title: 'Foundations',
      summary: 'Academic grounding that supports disciplined security research and automation.'
    },
    {
      id: 'certificates',
      title: 'Certifications',
      summary: 'External credentials that prove my dedication to staying ahead in offensive and cloud security.'
    }
  ];

  const navPages = [{ id: 'overview', label: 'Overview' }, ...detailSections.map((section) => ({ id: section.id, label: section.title }))];

  let theme: 'dark' | 'light' = 'dark';
  let rootElem: HTMLElement | null = null;
  let currentPage = 'overview';

  const toggleTheme = () => (theme = theme === 'dark' ? 'light' : 'dark');
  let detailPanel: HTMLElement | null = null;

  const setPage = async (id: string) => {
    currentPage = id;
    await tick();
    detailPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  onMount(() => {
    rootElem = document.documentElement;
    rootElem?.classList.toggle('dark', theme === 'dark');
  });

  $: if (rootElem) {
    rootElem.classList.toggle('dark', theme === 'dark');
  }

  $: themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  $: currentSummary =
    currentPage === 'overview'
      ? 'High-level signals of impact. Tap a snapshot to open the detailed narrative for that discipline.'
      : detailSections.find((section) => section.id === currentPage)?.summary ?? '';
</script>

<svelte:head>
  <title>Arnav Garg — Security Researcher & Architect</title>
  <meta
    name="description"
    content="Portfolio for a GenAI-driven security researcher focusing on automation, testing, and secure communication systems."
  />
</svelte:head>

<main class="relative min-h-screen overflow-hidden bg-background text-foreground">
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute inset-0 opacity-45 [mask-image:radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_55%)]">
      <div class="h-full w-full bg-gradient-to-br from-slate-900 via-slate-900/40 to-emerald-900"></div>
    </div>
  </div>

  <div class="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
    <section class="grid gap-8 rounded-[40px] border border-border/80 bg-card/70 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur">
      <div class="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">{hero.roleLine}</p>
            <button
              class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
              on:click={toggleTheme}
            >
              {themeLabel}
            </button>
          </div>
          <div class="space-y-2">
            <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">{hero.name}</h1>
            <p class="max-w-3xl text-lg text-muted-foreground">{hero.subtitle}</p>
          </div>
          <p class="text-base text-muted-foreground/80">{hero.description}</p>
          <div class="flex flex-wrap gap-3">
            {#each hero.cta as action}
              {#if action.page}
                <button
                  type="button"
                  class={`inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm font-semibold transition ${
                    action.variant === 'solid'
                      ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-border/70 text-primary hover:border-primary'
                  }`}
                  on:click={() => setPage(action.page)}
                >
                  {action.label}
                </button>
              {:else}
                  <a
                    class={`inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm font-semibold transition ${
                      action.variant === 'solid'
                        ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border/70 text-primary hover:border-primary'
                    }`}
                    href={resolveHref(action.href)}
                  >{action.label}</a>
              {/if}
            {/each}
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="relative overflow-hidden rounded-3xl border border-border/60 bg-background/60">
            <img
              src={resolveAsset(hero.photo)}
              alt="Professional portrait"
              class="aspect-[4/5] w-full object-cover brightness-95"
              decoding="async"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background/90"></div>
          </div>
          <div class="grid gap-3 text-sm text-muted-foreground">
            {#each hero.contact as contact}
              <a
                class="rounded-2xl border border-border/70 bg-background/60 px-4 py-2 text-justify text-sm font-medium transition hover:border-primary"
                href={contactHref(contact)}
                target={contact.type === 'link' ? '_blank' : '_self'}
                rel={contact.type === 'link' ? 'noreferrer' : undefined}
                >{contact.label}</a
              >
            {/each}
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        {#each metrics as metric}
          <article class="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/60 p-5">
            <p class="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">{metric.label}</p>
            <p class="text-3xl font-semibold text-foreground">{metric.value}</p>
            <p class="text-sm text-muted-foreground/80">{metric.descriptor}</p>
          </article>
        {/each}
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        {#each achievements as achievement}
          <div class="rounded-2xl border border-border/40 bg-background/50 px-4 py-3 text-sm font-medium text-foreground/80">
            {achievement}
          </div>
        {/each}
      </div>
    </section>

    <section
      bind:this={detailPanel}
      class="grid gap-5 rounded-[32px] border border-border/70 bg-card/60 p-6 shadow-xl shadow-slate-900/30"
    >
      <div class="flex flex-col gap-2">
        <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Guided discovery</p>
        <h2 class="text-2xl font-semibold">Insightful journey</h2>
        <p class="text-sm text-muted-foreground/80">{currentSummary}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        {#each navPages as page}
          <button
            class={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${currentPage === page.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border/60 text-muted-foreground hover:border-primary'}`}
            on:click={() => setPage(page.id)}
          >
            {page.label}
          </button>
        {/each}
      </div>

      <div>
        {#if currentPage === 'overview'}
          <div class="grid gap-4 md:grid-cols-3">
            {#each detailSections as section}
              <button
                type="button"
                class="flex h-full flex-col gap-3 rounded-3xl border border-border/40 bg-background/60 p-5 text-left shadow-sm shadow-slate-900/20 transition hover:border-primary"
                on:click={() => setPage(section.id)}
              >
                <div>
                  <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">{section.title}</p>
                  <p class="mt-2 text-sm text-muted-foreground/90">{section.summary}</p>
                </div>
              </button>
            {/each}
          </div>
        {:else if currentPage === 'competencies'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Practice pillars</p>
                <h3 class="text-xl font-semibold">Competencies</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="grid gap-3 md:grid-cols-3">
              {#each competencies as competence}
                <div class="rounded-3xl border border-border/50 bg-background/40 p-4 text-sm leading-relaxed text-muted-foreground">
                  {competence}
                </div>
              {/each}
            </div>
          </article>
        {:else if currentPage === 'skills'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Ecosystem fluency</p>
                <h3 class="text-xl font-semibold">Skill sets</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              {#each skillSets as set}
                <article class="rounded-3xl border border-border/40 bg-background/50 p-5">
                  <p class="text-sm font-semibold text-foreground/90">{set.title}</p>
                  <div class="mt-3 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {#each set.items as item}
                      <span class="rounded-full border border-border/50 px-3 py-1 bg-background/40">{item}</span>
                    {/each}
                  </div>
                </article>
              {/each}
            </div>
          </article>
        {:else if currentPage === 'experience'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Professional timeline</p>
                <h3 class="text-xl font-semibold">Experience</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="space-y-5">
              {#each experiences as exp}
                <article class="rounded-3xl border border-border/40 bg-background/50 p-6 shadow-sm shadow-slate-900/20">
                  <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span class="font-semibold text-foreground">{exp.title}</span>
                    <span>·</span>
                    <span>{exp.company}</span>
                  </div>
                  <p class="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">{exp.duration}</p>
                  <p class="mt-3 text-sm text-muted-foreground/90">{exp.summary}</p>
                  <div class="mt-3 grid gap-2 md:grid-cols-2">
                    {#each exp.impact as bullet}
                      <p class="text-sm text-muted-foreground/80">• {bullet}</p>
                    {/each}
                  </div>
                  <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {#each exp.technologies as tech}
                      <span class="rounded-full border border-border/30 px-3 py-1 bg-background/30">{tech}</span>
                    {/each}
                  </div>
                </article>
              {/each}
            </div>
          </article>
        {:else if currentPage === 'projects'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Highlights & builds</p>
                <h3 class="text-xl font-semibold">Projects</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="grid gap-5 md:grid-cols-2">
              {#each projects as project}
                <article class="flex h-full flex-col justify-between rounded-3xl border border-border/40 bg-background/60 p-5 shadow-sm shadow-slate-900/20">
                  <header>
                    <div class="flex items-center justify-between">
                      <h3 class="text-xl font-semibold text-foreground">{project.title}</h3>
                      <span class="rounded-full border border-border/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        {project.badge}
                      </span>
                    </div>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground/90">{project.description}</p>
                  </header>
                  <div class="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    <span class="rounded-full border border-border/30 px-3 py-1 bg-background/30">Role: {project.role}</span>
                    {#each project.stack as tech}
                      <span class="rounded-full border border-border/30 px-3 py-1 bg-background/30">{tech}</span>
                    {/each}
                  </div>
                  {#if project.link}
                    <a
                      class="mt-5 inline-flex items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                      href={project.link}
                      >Explore build</a
                    >
                  {/if}
                </article>
              {/each}
            </div>
          </article>
        {:else if currentPage === 'certificates'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Credentials</p>
                <h3 class="text-xl font-semibold">Certificates</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              {#each certificates as cert}
                <article class="rounded-3xl border border-border/40 bg-background/60 p-5">
                  <p class="text-sm font-semibold text-foreground">{cert.name}</p>
                  <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground/70">
                    {cert.issuer} · {cert.year}
                  </p>
                  <p class="mt-2 text-sm text-muted-foreground/80">{cert.description}</p>
                </article>
              {/each}
            </div>
          </article>
        {:else if currentPage === 'education'}
          <article class="space-y-5 rounded-3xl border border-border/40 bg-background/60 p-6 shadow-sm shadow-slate-900/20">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">Foundations</p>
                <h3 class="text-xl font-semibold">Education</h3>
              </div>
              <button
                class="rounded-full border border-border/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition hover:border-primary"
                on:click={() => setPage('overview')}
              >
                Back
              </button>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              {#each education as school}
                <article class="rounded-3xl border border-border/40 bg-background/60 p-5">
                  <p class="text-sm font-semibold text-foreground">{school.institution}</p>
                  <p class="text-sm text-muted-foreground/80">{school.degree}</p>
                  <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground/60">{school.year}</p>
                </article>
              {/each}
            </div>
          </article>
        {/if}
      </div>
    </section>
  </div>
</main>

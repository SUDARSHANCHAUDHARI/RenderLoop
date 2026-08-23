# RenderLoop

A generative art gallery with 264 parametric specs — 22 algorithms, each with 12 seeded variations.

Built as a creative coding study inspired by motionlab.cc, using an original Blueprint design system.

## Table of Contents

- [Stack](#stack)
- [Features](#features)
- [Algorithms](#algorithms)
- [Dev](#dev)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)
- [About](#about)

## Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **p5.js 2.2.3** — canvas sketches
- **Vitest** — unit tests for the seeded RNG and parameter generators
- **pnpm**

## Features

- 264 generative art specs (22 algorithms × 12 parametric variations)
- Sorting: Date, Views, A→Z, Z→A
- Tag filtering + search
- Surprise Me — opens a random spec
- Fullscreen viewer/player
- Playlist queue with auto-advance and shuffle
- Keyboard shortcuts: `P` playlist, `Esc` close, arrow keys skip

## Algorithms

Noise Flow Field · Geometric Mandala · Metaballs · Wave Interference · Constellation · Fractal Tree · Strange Attractor · Boids · Lissajous Curves · Truchet Tiles · Game of Life · Spirograph · L-System Plant · Perlin Marble · Orbit Trails · Sand Simulation · String Art · Harmonograph · Kaleidoscope · Sine Plasma · Epicycles · Noise Worms

## Dev

```bash
pnpm install
pnpm dev --turbopack
```

## Scripts

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm lint         # ESLint (flat config, next/core-web-vitals)
pnpm typecheck    # tsc --noEmit (strict)
pnpm test         # Vitest unit tests
```

## Deployment

RenderLoop is fully client-side — it renders generative art in the browser and
needs **no API keys, backend, or environment variables**.

It's a static export (`output: "export"`): `npx next build` produces `out/`,
served as-is. Deployed on **Cloudflare Pages** at
`renderloop.sudarshantechlabs.com`.

## License

MIT

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)

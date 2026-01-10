# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP Tools

The **Astro docs MCP server** is available (`mcp__astro-docs__search_astro_docs`). Use it to search the official Astro documentation for up-to-date information on Astro APIs, components, and best practices.

## Commands

- **Dev server**: `pnpm dev` (runs on localhost:4321)
- **Build**: `pnpm build` (outputs to `./dist`)
- **Preview**: `pnpm preview` (preview production build)
- **Deploy**: `wrangler deploy` (deploys to Cloudflare Pages)

## Architecture

This is an Astro-based personal blog using:
- **Astro 5** with MDX support for blog posts
- **React** for interactive components (Header, Footer, BaseHead, etc.)
- **Tailwind CSS** for styling with custom theme colors defined in `tailwind.config.ts`
- **Cloudflare Pages** for deployment (configured via `wrangler.toml`)

### Content Structure

- Blog posts are markdown/MDX files in `src/content/blog/` with naming convention `YYYY-MM-DD-slug.md`
- Content schema is defined in `src/content.config.ts` with frontmatter: `title`, `description`, `pubDate`, `updatedDate` (optional), `heroImage` (optional), `tags` (array)
- Site constants (title, description) are in `src/consts.ts`

### Layout Hierarchy

- `BaseLayout.astro` - Main layout wrapper using `BaseHead`, `Header`, and `Footer` components
- `BlogPost.astro` - Blog post layout extending BaseLayout
- Pages: `index.astro` (latest post), `archive.astro`, `about.astro`, `tag/[tag].astro`, `blog/[...slug].astro`

### Styling

Custom Tailwind colors match the original blog design: `heading`, `accent`, `accent-dark`, `body`, `muted`, `border`, `code-bg`, `code-text`, `pre-bg`. Fonts: Noto Serif (body), Open Sans (UI elements).

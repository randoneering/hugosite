# Claude Code Rules for Randoneering Hugo Site

This document defines how Claude Code should interact with this Hugo site repository.

## Project Context

**Project:** Randoneering LLC website
**Type:** Hugo static site generator project
**Live Site:** https://randoneering.tech
**Theme:** hello-friend-ng (git submodule)
**Purpose:** Personal blog and business site for fractional IT infrastructure services

## Repository Structure

```
hugosite/
├── .claude/
│   ├── CLAUDE.md                    # This file
│   └── skills/
│       ├── documentation/           # Documentation writing guidelines
│       └── writing-style/           # Justin's blog writing style
├── themes/hello-friend-ng/
│   └── content/
│       ├── blog/
│       │   ├── databases/          # Database admin tutorials
│       │   ├── foss/               # FOSS and community content
│       │   ├── homelab/            # Homelab projects
│       │   ├── nixos/              # NixOS journey posts
│       │   ├── random/             # Opinion pieces and misc
│       │   └── weekly/             # Weekly update posts
│       ├── about/                  # About page
│       └── services/               # Services page
├── static/images/                  # Image assets
├── public/                         # Generated site (git ignored)
└── config.yml                      # Hugo configuration
```

## Core Rules

### 1. Content Creation - ALWAYS Apply Writing Style Skill

When creating or editing blog posts:
- **MUST** follow the writing-style skill guidelines
- **MUST** use first-person, conversational tone
- **MUST** be honest about challenges and mistakes
- **MUST** provide technical context and working examples
- **MUST** cite sources with footnotes or links
- **NEVER** use AI buzzwords (leverage, synergy, cutting-edge, robust, seamlessly)
- **NEVER** use corporate/academic tone
- **ALWAYS** write like explaining to a friend over coffee

### 2. Frontmatter Standards

All blog posts **MUST** include this frontmatter structure:

```yaml
---
title: "Descriptive Title"
type: page
description: "SEO-friendly description (1-2 sentences)"
topic: "Category Name"
publishDate: YYYY-MM-DD
---
```

**Optional fields:**
- `category: "category-name"` - for additional categorization
- `images: ["/images/custom-image.jpg"]` - if overriding default

**Default image:** Site logo automatically included for social sharing

### 3. Content Organization

Blog posts **MUST** be placed in the appropriate category directory:

| Category | Purpose | Examples |
|----------|---------|----------|
| `weekly/` | Weekly updates, mixed content | Life updates, tool recommendations, current projects |
| `homelab/` | Infrastructure and homelab projects | Server setups, hardware, services |
| `databases/` | Database administration | Postgres, MySQL, backups, performance |
| `nixos/` | NixOS learning and configuration | Configuration evolution, journey posts |
| `foss/` | FOSS community and events | Conferences, open source advocacy |
| `random/` | Opinion pieces and misc topics | AI thoughts, ethical tech, philosophy |

**File naming convention:** Use descriptive kebab-case names: `nixosjourneyp1.md`, `automateddumpspt1.md`

### 4. Hugo Operations

#### Local Development
```bash
# Start dev server
hugo server -D

# Build for production
hugo --minify
```

#### Content Creation
```bash
# Create new blog post (manual approach preferred)
# Create file in appropriate category directory
touch themes/hello-friend-ng/content/blog/[category]/[filename].md
```

**Important:**
- Content goes in `themes/hello-friend-ng/content/`, NOT root `content/`
- Images go in `static/images/`, reference as `/images/filename.jpg`
- Never commit the `public/` directory (generated output)

### 5. Deployment

**Do NOT manually deploy.** The site uses GitHub Actions for automated deployment.

**Workflow:**
1. Create/edit content in appropriate directory
2. Commit changes to git
3. Push to GitHub
4. GitHub Actions automatically builds and deploys via rsync

**Only suggest manual deployment if:**
- User explicitly requests it
- GitHub Actions is broken and user asks for workaround

### 6. Skill Usage

#### writing-style skill
**Auto-trigger on:**
- Creating new blog posts
- Editing existing blog content
- Drafting weekly updates
- Writing tutorials or technical posts

**Characteristics to maintain:**
- Personal journey and storytelling
- "The Ask", "The How", "The Journey" structure patterns
- Self-deprecating humor and honest reflection
- Technical depth with accessibility
- Code examples with full context

#### documentation skill
**Auto-trigger on:**
- Editing README.md
- Creating technical documentation
- Writing code comments
- API documentation or guides

**Avoid in:**
- Blog posts (use writing-style instead)
- Personal content
- Weekly updates

### 7. Images and Assets

**Image workflow:**
1. Place images in `static/images/`
2. Reference in markdown as `/images/filename.jpg`
3. Use Hugo shortcode for figures:
   ```markdown
   {{< figure src="/images/image.png" title="Description" >}}
   ```

**Default social sharing image:** `/images/randoneering_logo_120by100.jpg`

### 8. Git and Version Control

**Commit message style:**
- Use descriptive, imperative mood
- Examples: "add weekly post for Jan 21 2025", "fix typo in NixOS journey part 1"
- Keep commits focused and atomic

**Branches:**
- Main branch: `main`
- Create feature branches for major changes if requested
- Default to working on `main` for content updates

### 9. Code Examples and Technical Content

When including code in blog posts:
- Use proper syntax highlighting with language tags
- Provide full context before code blocks
- Explain variables and important parameters
- Show both what works AND what doesn't (honest journey)
- Include links to full scripts on GitHub when available
- Add inline comments for complex logic

**Example pattern:**
```markdown
## The Script

Here's the approach I took:

```bash
# Setup alias for 7zip for easy gziping
$7zipPath = "$env:ProgramFiles\7-Zip\7z.exe"
Set-Alias Compress-7Zip $7ZipPath
```

You might have noticed I used pg_dumpall instead of pg_dump. Turns out...
```

### 10. Tone and Voice Enforcement

**CRITICAL:** Maintain authentic voice across all blog content.

**Always:**
- Share personal experience
- Admit when something was harder than expected
- Use conversational asides and parentheticals
- Give credit to helpers (friends, communities, Stack Overflow)
- End with reflection or next steps

**Never:**
- Pretend to be an expert if you're learning
- Use marketing speak or corporate jargon
- Hide failures or only show successes
- Write in third person or passive voice
- Gate-keep or look down on different technical choices

### 11. Weekly Post Structure

Weekly posts should include:
1. **Personal updates** - Life events, fundraising, current status
2. **Distro/tech journey** - Current OS setup, changes, frustrations
3. **Community/Fediverse** - Recommendations, advocacy, alternatives
4. **Tool Shed** - Brief highlights of tools discovered
5. **Mixed technical and personal** - Balance depth with accessibility

### 12. Source Citations

For opinion pieces and research-heavy content:
- Use footnote format: `[^1]`, `[^2]`, etc.
- Include full URLs at bottom of post
- Cite technical documentation, research, and claims
- Link to tools and projects mentioned

Example:
```markdown
According to the research[^1], energy consumption...

[^1]: https://unric.org/en/artificial-intelligence-energy-use/
```

### 13. Interactive Workflow

When user asks to create content:
1. **Ask for clarification** if category is unclear
2. **Confirm the approach** before writing full post
3. **Apply writing-style skill** automatically
4. **Show draft** and ask for feedback
5. **Iterate** based on user input
6. **Use proper file location** in themes/hello-friend-ng/content/blog/[category]/

### 14. Quality Checks

Before finalizing any blog post, verify:
- [ ] Frontmatter is complete and properly formatted
- [ ] File is in correct category directory
- [ ] Writing style matches existing posts (conversational, personal)
- [ ] Code examples have context and explanation
- [ ] No AI buzzwords or corporate speak
- [ ] Sources are cited where appropriate
- [ ] Images are in static/images/ and properly referenced
- [ ] Reflects honest journey (including challenges)
- [ ] Ends with reflection or actionable next steps

### 15. What NOT to Do

**NEVER:**
- Create content in root `content/` directory (use themes/hello-friend-ng/content/)
- Use AI-typical phrases in blog posts
- Write in corporate or academic tone for blog content
- Commit the `public/` directory
- Manually deploy unless explicitly requested
- Create new categories without discussing with user
- Gate-keep or be condescending in technical explanations
- Hide mistakes or present everything as working perfectly
- Generate content without applying writing-style skill

**AVOID:**
- Over-engineering simple posts
- Creating unnecessary configuration files
- Suggesting major structural changes without discussion
- Proposing CI/CD changes unless asked
- Recommending theme modifications without clear need

### 16. Hugo-Specific Gotchas

**Remember:**
- Content lives in `themes/hello-friend-ng/content/`, not root
- Images in `static/images/` are served from `/images/` URL path
- Hugo uses `type: page` in frontmatter for blog posts
- `publishDate` controls when posts appear
- Theme is a git submodule - be careful with modifications

### 17. Multi-lingual Considerations

**Note:** Recent commits mention "fixed multi-lingual issue"
- If user discusses multi-lingual features, ask for context
- Don't assume multi-lingual setup without evidence
- Check existing posts for i18n patterns if relevant

## Quick Command Reference

```bash
# Development
hugo server -D              # Start local dev server
hugo --minify               # Build for production

# Content
touch themes/hello-friend-ng/content/blog/[category]/[name].md

# Git
git status                  # Check what's changed
git add [file]              # Stage changes
git commit -m "message"     # Commit
git push                    # Deploy via GitHub Actions
```

## Skills Quick Reference

- **writing-style**: Blog posts, weekly updates, technical tutorials, opinion pieces
- **documentation**: README, technical docs, API documentation, code comments

## Project Philosophy

This site represents:
- **Authentic voice** - Personal, honest, technical but accessible
- **Open source values** - GPLv3 advocate, FOSS evangelist
- **Learning journey** - Document the path, not just the destination
- **Community focus** - Give credit, share knowledge, lift others

Claude Code should embody these values in all interactions with this repository.

---

**Last Updated:** 2026-01-17
**Maintained by:** Justin (via Claude Code)

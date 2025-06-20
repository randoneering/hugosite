# Randoneering Hugo Site

This repository contains the source code for the Randoneering LLC website, built with Hugo static site generator and the [hugo-dracula-charlolamode](https://github.com/randoneering/hugo-dracula-charlolamode) theme.

## 🌐 Live Site
**https://randoneering.tech**

## 📋 About
Randoneering LLC provides fractional IT infrastructure services for startups and small businesses. This website serves as my primary online presence, showcasing my services, values, and commitment to open-source solutions.

## 🛠 Tech Stack
- **Static Site Generator:** Hugo
- **Hosting:** [Linode]
- **Domain:** randoneering.tech
- **License:** MIT

## 🚀 Local Development

### Prerequisites
- Hugo (extended version recommended)
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/randoneering/hugosite.git
   cd hugosite
   ```

2. Install Hugo theme dependencies (if any):
   ```bash
   # Add theme installation commands here if using git submodules
   ```

3. Start the development server:
   ```bash
   hugo server -D
   ```

4. Open your browser to `http://localhost:1313`

### Building for Production
```bash
hugo --minify
```

## 📁 Project Structure
```
├── content/           # Markdown content files
├── static/           # Static assets (images, CSS, JS)
├── themes/           # Hugo themes
├── layouts/          # Custom layout templates
├── config/           # Hugo configuration
├── hugo.toml         # Main Hugo configuration
└── README.md
```

## 📝 Content Management

### Adding Blog Posts
Create new markdown files in the `content/` directory with the following frontmatter:

```yaml
---
title: "Your Post Title"
type: page
description: "Brief description for SEO and social sharing"
topic: "Category/Topic"
category: "category-name"
publishDate: 2025-01-20
images: ["https://randoneering.tech/images/randoneering_logo_120by100.jpg"] # Default settings will always add this for preview generation in posts
---

Your content here...
```

### Adding Services/Pages
Add new pages to the appropriate content directory with proper frontmatter and markdown content.

## 🔧 Configuration

### Open Graph & Social Sharing
All pages include Open Graph meta tags for proper social media link previews. The site logo is automatically included in social sharing previews.

## 🎨 Customization

### Images
- Logo: `static/images/randoneering_logo_120by100.jpg`
- Add new images to the `static/images/` directory
- Reference them in content as `/images/filename.jpg`

### Styling
- Custom CSS can be added to theme files or static directory. Our you can keep what I put together!

## 🚀 Deployment

### Manual Deployment
1. Build the site: `hugo --minify`
2. Upload the `public/` directory to your web server

### Automated Deployment
```
name: deploy-hugo
run-name: Deploy hugo site
on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    environment: deploy
    env:
      HUGO_VERSION: 0.137.1
    steps:
      - name: Checkout the current branch
        uses: actions/checkout@v3

      - name: Initialize the ssh-agent
        uses: webfactory/ssh-agent@v0.4.1
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Install Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Build the website
        run: hugo

      - name: Scan the host key
        run: mkdir -p ~/.ssh/ && ssh-keyscan -H $DEPLOY_SERVER >> ~/.ssh/known_hosts
        env:
          DEPLOY_SERVER: ${{ secrets.DEPLOY_SERVER }}

      - name: Deploy the website
        run: >-
          rsync -avx --delete --exclude '.ssh' public/ $DEPLOY_USERNAME@$DEPLOY_SERVER:./
        env:
          DEPLOY_SERVER: ${{ secrets.DEPLOY_SERVER }}
          DEPLOY_USERNAME: ${{ secrets.DEPLOY_USERNAME }}


```

## 📞 Contact

**Randoneering LLC**
- Website: https://randoneering.tech
- Email: business@randoneering.tech

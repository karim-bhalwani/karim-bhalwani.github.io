# Karim Bhalwani Blog

My personal blog built with Jekyll and hosted on GitHub Pages.

**Live site:** <https://karim-bhalwani.github.io>

## Local Development

### Prerequisites (Windows)

1. **Install Ruby 3.x** from [RubyInstaller](https://rubyinstaller.org/)
   - Download Ruby+Devkit version
   - During install, select option `[1,3]` for MSYS2 base + dev toolchain

2. **Install Bundler:**

   ```bash
   gem install bundler
   ```

### Run Locally

```bash
# Navigate to project
cd C:\GitHub\karim-bhalwani.github.io

# First time only: configure bundle path
bundle config set --local path 'vendor/bundle'

# Install dependencies
bundle install

# Start local server (auto-reloads on file changes)
bundle exec jekyll serve

# Open: http://localhost:4000
```

### Stop Server

Press `Ctrl+C` in the terminal.

---

## Adding New Blog Posts

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.markdown`

2. Add frontmatter and content:

   ```markdown
   ---
   layout: post
   title: "Your Post Title"
   excerpt: "Brief summary shown on homepage"
   date: 2026-01-15 10:00:00 -0500
   ---

   Your content here in Markdown...
   ```

3. Test locally with `bundle exec jekyll serve`

4. Deploy when ready (see below)

---

## Deploy to GitHub Pages

```bash
git add .
git commit -m "Add new blog post"
git push origin main
```

GitHub Pages automatically builds and deploys within ~1 minute.

---

## Project Structure

```
karim-bhalwani.github.io/
├── _config.yml       # Site configuration
├── Gemfile           # Ruby dependencies
├── index.html        # Homepage (lists posts)
├── about.md          # About page
├── _includes/        # Reusable HTML components
├── _layouts/         # Page templates
├── _posts/           # Blog posts (Markdown)
├── css/              # Stylesheets
└── assets/           # Images and media
```

---

## Troubleshooting

**Ruby 3.4+ compatibility:** The Gemfile includes `base64`, `logger`, `csv`, and `bigdecimal` gems which are no longer bundled by default in Ruby 3.4.

**Windows file watching:** Add `gem 'wdm'` to Gemfile if you want faster auto-reload.

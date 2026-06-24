# 🚀 Vishal – Cloud & DevOps Portfolio

A professional technical portfolio website with Three.js 3D animations, deployed on GitHub Pages.

## ✨ Features

- **3D Hero Section** – particle network + floating wireframe cubes (Three.js)
- **Interactive Globe** – rotating wireframe sphere in the About section
- **Scroll Animations** – elements reveal as you scroll
- **Animated Counters** – stats count up on enter
- **Card Tilt Effect** – skills cards with 3D hover tilt
- **Responsive** – mobile-first, works on all screen sizes
- **Zero build tools** – pure HTML/CSS/JS, no bundler needed

## 📁 File Structure

```
portfolio/
├── index.html                    # Main page
├── css/
│   └── style.css                 # All styles
├── js/
│   └── main.js                   # Three.js scenes + interactions
├── assets/
│   └── resume.pdf                # ← Add your resume here
├── .github/
│   └── workflows/
│       └── deploy.yml            # Auto-deploy to GitHub Pages
└── README.md
```

## 🚀 Deploy on GitHub Pages

### Method 1 – Automatic (GitHub Actions)

1. Push this repo to GitHub as `yourusername.github.io` **or** any repo name.
2. Go to **Settings → Pages**.
3. Set Source to **GitHub Actions**.
4. Push to `main` branch → GitHub Actions will auto-deploy.
5. Your site will be live at `https://yourusername.github.io/` (or `/repo-name/`).

### Method 2 – Manual (No Actions needed)

1. Push to GitHub.
2. Go to **Settings → Pages → Source → Deploy from a branch**.
3. Select `main` branch, `/ (root)` folder → Save.
4. Done – site live in ~60 seconds.

## ✏️ Personalise

| What | Where |
|------|-------|
| Your name | `index.html` – nav brand, hero, footer |
| Skills & tools | `index.html` – `#skills` section |
| Projects | `index.html` – `#projects` section |
| Experience | `index.html` – `#experience` section |
| Email / LinkedIn / GitHub | `index.html` – `#contact` section |
| Resume PDF | Replace `assets/resume.pdf` |
| Accent colour | `css/style.css` → `--accent: #00d4ff` |

## 🛠️ Run Locally

No build step needed. Just open with a local server (required for ES modules):

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then open `http://localhost:8080`.

## 📦 Dependencies

- [Three.js r128](https://threejs.org/) – loaded via CDN
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) – Google Fonts
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) – Google Fonts

No npm install needed.

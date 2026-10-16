# Personal Portfolio

A fast, static personal portfolio built with HTML, Tailwind CSS, and vanilla JavaScript.

## Structure

```text
portfolio/
├── index.html
├── src/
│   ├── input.css
│   └── main.js
├── dist/
│   └── output.css
├── assets/
│   ├── images/
│   ├── icons/
│   └── files/
├── package.json
├── tailwind.config.js
└── README.md
```

## Development

Install dependencies:

```bash
npm install
```

Build the Tailwind CSS file:

```bash
npm run build:css
```

Watch for CSS changes while editing:

```bash
npm run watch:css
```

## GitHub Pages

1. Run `npm run build:css` and commit the generated `dist/output.css` file.
2. Push the repository to GitHub.
3. Open the repository's **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.

All production links use relative paths, so the portfolio works from a GitHub Pages project URL such as `https://username.github.io/repository-name/`.

The responsive AVIF, WebP, and optimized JPEG photos in `assets/` are the production image files used by the site.

## Customization

- Update the name, links, email, and project text in `index.html`.
- Replace placeholder project images in `assets/images`.
- Keep paths relative, such as `./dist/output.css` and `./src/main.js`, so the site works on GitHub Pages.

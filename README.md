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

## Customization

- Update the name, links, email, and project text in `index.html`.
- Replace placeholder project images in `assets/images`.
- Keep paths relative, such as `./dist/output.css` and `./src/main.js`, so the site works on GitHub Pages.

# Mohamed Alaa — Personal Portfolio

A static, responsive, dark-themed portfolio built with HTML5, CSS3, JavaScript (ES6+) and Bootstrap 5.
No build step, no framework — open `index.html` and it runs.

## 1. Run locally

Just open `index.html` in your browser. No install needed.

For the GitHub repositories section to load correctly from your local machine (some browsers block `fetch` on `file://` pages), it's best to serve it with a tiny local server:

```bash
# Python 3
python -m http.server 8000

# or Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

## 2. File structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── projects.js
│   ├── github.js
│   └── contact.js
├── assets/
│   ├── images/
│   ├── projects/
│   ├── certificates/
│   ├── icons/
│   └── resume/
├── resume/
│   └── Mohamed-Alaa-CV.pdf   ← add your real CV here
└── README.md
```

## 3. Replace placeholders

Search the project for these and replace them with your real information:

| Placeholder | Where | Replace with |
|---|---|---|
| `[ADD YOUR EMAIL ADDRESS]` | Hero, Contact, Footer | Your real email |
| `[ADD YOUR LINKEDIN URL]` | Hero, Contact, Footer | Your LinkedIn profile URL |
| `[ADD YOUR PORTFOLIO URL]` | `<head>` meta tags, JSON-LD | The live URL once deployed |
| `CERTIFICATE_NAME` / `ORGANIZATION` / `DATE` / `CERTIFICATE_FILE` | Certifications section | Your real certificate details, once earned |
| `[ADD YOUR GITHUB REPO URL]` / `[ADD YOUR LIVE DEMO URL]` (inside `js/projects.js`, currently `null`) | Project data | Real repo/demo links — leave `null` to keep the button hidden |

The GitHub username `mohamed-alaa3` is already wired into the navbar, hero, contact section, footer, and the live GitHub API call in `js/github.js`.

## 4. Add your CV

Place your real CV file at:

```
resume/Mohamed-Alaa-CV.pdf
```

The "Download CV" and "View CV" buttons already point to this path. Until a real file exists there, the links will 404 — add the PDF before publishing.

## 5. Add project screenshots

Drop images into `assets/projects/` and set the `image` field for each project in `js/projects.js`, e.g.:

```js
image: "assets/projects/dar-cover.jpg",
```

Leaving `image: null` shows a clean icon placeholder instead — never a fake photo.

## 6. Add certificates

When you have a real certificate file (PDF or image), place it in `assets/certificates/` and update the certificate card's `href` and text in `index.html` (search for `CERTIFICATE_FILE`).

## 7. Deploy on GitHub Pages

1. Push this folder to a GitHub repository (e.g. `portfolio`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`.
4. Save. Your site will be live at `https://mohamed-alaa3.github.io/portfolio/` within a few minutes.
5. Update `[ADD YOUR PORTFOLIO URL]` in `index.html` with that address.

## 8. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repository.
3. Framework preset: choose **Other** (it's a static site — no build command needed).
4. Deploy. Vercel will give you a live URL.
5. Update `[ADD YOUR PORTFOLIO URL]` in `index.html` with that address.

## 9. Connect the contact form

The form validates input on the client side but does not send anything yet. To make it functional, pick one:

- **EmailJS** — add the EmailJS SDK script and call `emailjs.send(...)` inside `js/contact.js` where the current success toast fires.
- **Formspree** — set the form's `action` to your Formspree endpoint and remove the `preventDefault()` for a plain POST, or keep it and send via `fetch`.
- **Your own Node.js API** — replace the toast logic in `js/contact.js` with a `fetch()` call to your endpoint.

## 10. Full placeholder checklist

- [ ] `[ADD YOUR EMAIL ADDRESS]`
- [ ] `[ADD YOUR LINKEDIN URL]`
- [ ] `[ADD YOUR PORTFOLIO URL]`
- [ ] `resume/Mohamed-Alaa-CV.pdf`
- [ ] Certificate cards (`CERTIFICATE_NAME`, `ORGANIZATION`, `DATE`, `CERTIFICATE_FILE`) or remove the section until you have real ones
- [ ] Project screenshots in `assets/projects/` (optional — icon placeholder shown otherwise)
- [ ] Real GitHub/live-demo links per project in `js/projects.js` (optional — buttons stay hidden until set)
- [ ] `assets/images/og-cover.jpg` for social share previews (optional)

## Notes on authenticity

Every section is written to reflect an IT student building real, practical projects — not invented job history, clients, or metrics. When you add real certificates, project links, or achievements, keep that same standard: specific and true, rather than impressive-sounding and vague.

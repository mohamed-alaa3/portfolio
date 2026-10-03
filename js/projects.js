/* =========================================================
   PROJECT DATA
   Edit this array to add, remove, or update projects.
   Leave "github" or "demo" as null to hide that button.
   ========================================================= */
const PROJECTS = [
  {
    id: "dar-real-estate",
    name: "DAR - Real Estate Platform",
    category: "Full Stack",
    image: null, // e.g. "assets/projects/dar-cover.jpg"
    description: "A full-stack real estate platform designed for browsing and managing properties. The project includes a modern frontend, backend APIs, database integration, authentication, and property image management.",
    technologies: ["Angular 16", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Multer", "Bootstrap"],
    features: [
      "User authentication",
      "Property listings and management",
      "Property categories and locations",
      "Property status tracking",
      "Image upload with Cloudinary storage",
      "REST API integration"
    ],
    learned: "Structuring a full-stack application around a real domain (real estate), connecting an Angular frontend to a Node/Express API, and handling authenticated image uploads with Cloudinary.",
    challenges: "Keeping property data consistent across creation, editing and image management while integrating third-party cloud storage.",
    role: "Full stack developer — built both the Angular frontend and the Node.js/Express/MongoDB backend.",
    github: null, // "[ADD YOUR GITHUB REPO URL]"
    demo: null    // "[ADD YOUR LIVE DEMO URL]"
  },
  {
    id: "souq-mini",
    name: "Souq Mini",
    category: "Full Stack",
    image: null,
    description: "A full-stack marketplace application built to practice real-world e-commerce architecture, including product management, authentication, APIs, database integration, and frontend administration.",
    technologies: ["Angular 16", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST API", "Bootstrap", "Git/GitHub"],
    features: [
      "User authentication",
      "Product management",
      "Admin dashboard",
      "Product listing",
      "API integration",
      "Database operations"
    ],
    learned: "Designing an admin/user separation of concerns and practicing CRUD-heavy REST API design on top of MongoDB.",
    challenges: "Structuring the admin dashboard so product management stayed simple while the data model grew.",
    role: "Full stack developer — frontend, backend and database design.",
    github: null,
    demo: null
  },
  {
    id: "aws-cloud-labs",
    name: "AWS Cloud Labs & Infrastructure Projects",
    category: "Cloud",
    image: null,
    description: "A collection of practical AWS labs focused on understanding cloud infrastructure, compute resources, storage, databases, IAM, and application-to-database connectivity. Presented as hands-on AWS labs and learning projects, not production deployments.",
    technologies: ["AWS EC2", "AWS RDS", "AWS EBS", "AWS IAM", "Security Groups", "Linux", "Web Applications"],
    features: [
      "Launching and configuring EC2 instances",
      "Managing EBS volumes",
      "Working with RDS databases",
      "Configuring security groups",
      "Applying IAM concepts",
      "Connecting applications to databases"
    ],
    learned: "Core AWS building blocks — compute, storage, managed databases and access control — and how they fit together in a simple application setup.",
    challenges: "Getting security groups and IAM permissions configured correctly so an application could reach its database safely.",
    role: "Hands-on learner — set up and tore down each lab independently.",
    github: null,
    demo: null
  }
];

let activeFilter = "all";
let searchTerm = "";

function projectMatches(project) {
  const matchesFilter = activeFilter === "all" || project.category === activeFilter;
  const haystack = (project.name + " " + project.description + " " + project.technologies.join(" ")).toLowerCase();
  const matchesSearch = haystack.includes(searchTerm.toLowerCase());
  return matchesFilter && matchesSearch;
}

function renderProjectCard(project) {
  const thumb = project.image
    ? `<img src="${project.image}" alt="${project.name} screenshot" loading="lazy">`
    : `<i class="bi bi-code-square" aria-hidden="true"></i>`;

  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-proj-outline"><i class="bi bi-github"></i> Code</a>`
    : "";
  const demoBtn = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-proj-outline"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>`
    : "";

  return `
    <div class="col-md-6 col-lg-4 project-item" data-id="${project.id}">
      <div class="project-card">
        <div class="project-thumb">${thumb}</div>
        <div class="project-body">
          <span class="project-category">${project.category}</span>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.technologies.slice(0, 4).map(t => `<span>${t}</span>`).join("")}
            ${project.technologies.length > 4 ? `<span>+${project.technologies.length - 4}</span>` : ""}
          </div>
          <div class="project-actions">
            ${githubBtn}
            ${demoBtn}
            <button type="button" class="btn btn-proj-primary" data-details="${project.id}">Details</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  const empty = document.getElementById("projectsEmpty");
  if (!grid) return;

  const visible = PROJECTS.filter(projectMatches);
  grid.innerHTML = visible.map(renderProjectCard).join("");
  empty.classList.toggle("d-none", visible.length > 0);

  grid.querySelectorAll("[data-details]").forEach(btn => {
    btn.addEventListener("click", () => openProjectModal(btn.getAttribute("data-details")));
  });
}

function openProjectModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  document.getElementById("projectModalLabel").textContent = project.name;

  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-proj-outline"><i class="bi bi-github"></i> GitHub</a>`
    : "";
  const demoBtn = project.demo
    ? `<a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-proj-primary"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>`
    : "";

  document.getElementById("projectModalBody").innerHTML = `
    ${project.image ? `<img src="${project.image}" alt="${project.name} screenshot" loading="lazy">` : ""}
    <p>${project.description}</p>

    <h4>Main Features</h4>
    <ul>${project.features.map(f => `<li>${f}</li>`).join("")}</ul>

    <h4>Technologies</h4>
    <div class="project-tech">${project.technologies.map(t => `<span>${t}</span>`).join("")}</div>

    <h4>What I Learned</h4>
    <p>${project.learned}</p>

    <h4>Challenges</h4>
    <p>${project.challenges}</p>

    <h4>My Role</h4>
    <p>${project.role}</p>

    <div class="project-actions mt-3">${githubBtn} ${demoBtn}</div>
  `;

  const modalEl = document.getElementById("projectModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      renderProjects();
    });
  });

  const searchInput = document.getElementById("projectSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim();
      renderProjects();
    });
  }
});

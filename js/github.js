/* =========================================================
   GITHUB REPOSITORIES
   ========================================================= */
const GITHUB_USERNAME = "mohamed-alaa3";

async function loadGithubRepos() {
  const statusEl = document.getElementById("githubStatus");
  const gridEl = document.getElementById("githubGrid");
  if (!gridEl) return;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      statusEl.innerHTML = `<span>No public repositories found for <strong>${GITHUB_USERNAME}</strong> yet.</span>`;
      return;
    }

    const topRepos = repos
      .filter(r => !r.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    statusEl.remove();
    gridEl.innerHTML = topRepos.map(renderRepoCard).join("");
  } catch (err) {
    console.error("GitHub API request failed:", err);
    statusEl.innerHTML = `
      <span>
        Couldn't load repositories right now. You can browse them directly on
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener">GitHub</a>.
      </span>`;
  }
}

function renderRepoCard(repo) {
  const updated = new Date(repo.updated_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const description = repo.description ? repo.description : "No description provided.";

  return `
    <div class="col-md-6 col-lg-4">
      <div class="repo-card">
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p>${description}</p>
        <div class="repo-meta">
          ${repo.language ? `<span><span class="lang-dot"></span>${repo.language}</span>` : ""}
          <span><i class="bi bi-star"></i> ${repo.stargazers_count}</span>
          <span><i class="bi bi-diagram-2"></i> ${repo.forks_count}</span>
          <span><i class="bi bi-clock-history"></i> ${updated}</span>
        </div>
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", loadGithubRepos);

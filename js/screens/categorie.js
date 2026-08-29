// Sous-écran d'une catégorie (utilisé uniquement par la vue "grille 2x2" de l'accueil, proposition à confirmer).
function render(root, params) {
  const cat = categories.find(c => c.id === params.id);
  if (!cat) { navigate("#/"); return; }

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Accueil</button></div>
      <h3 class="title title-md">${escapeHtml(cat.name)}</h3>
      <div class="tool-grid tool-grid-1col">
        ${cat.tools.map(t => `
          <button class="tool-card ${t.live ? "" : "locked"}" ${t.live ? `data-route="${t.route}"` : "disabled"}>
            ${escapeHtml(t.name)}
            ${t.live ? "" : `<span class="soon">à venir dans cette version d'essai</span>`}
          </button>
        `).join("")}
      </div>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/"));
  root.querySelectorAll("[data-route]").forEach(b => {
    b.addEventListener("click", () => navigate(b.getAttribute("data-route")));
  });
}

const CategoryScreen = { render };

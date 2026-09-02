// Sous-écran d'une catégorie (utilisé uniquement par la vue "grille 2x2" de l'accueil, proposition à confirmer).
// Repli par axe (v1.61) : même état/logique que home.js, variable de module dédiée pour ne pas
// interférer avec l'accordéon de l'accueil si les deux écrans sont visités dans la même session.
let openAxisCat = null;

function render(root, params) {
  const cat = categories.find(c => c.id === params.id);
  if (!cat) { navigate("#/"); return; }

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Accueil</button></div>
      <h3 class="title title-md">${escapeHtml(cat.name)}</h3>
      <div class="tool-grid tool-grid-1col">
        ${renderAxisGroupedHtml(cat.tools, openAxisCat)}
      </div>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/"));
  root.querySelectorAll("[data-route]").forEach(b => {
    b.addEventListener("click", () => navigate(b.getAttribute("data-route")));
  });
  wireAxisToggles(root, (key) => {
    openAxisCat = openAxisCat === key ? null : key;
    CategoryScreen.render(root, params);
  });
}

const CategoryScreen = { render };

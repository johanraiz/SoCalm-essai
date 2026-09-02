function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function navigate(route) {
  window.location.hash = route;
}

let toastTimer = null;
function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

function backRow(label, onBack) {
  return `<div class="back-row"><button class="back" data-back>‹ ${escapeHtml(label)}</button></div>`;
}

function wireBack(root, handler) {
  const btn = root.querySelector("[data-back]");
  if (btn) btn.addEventListener("click", handler);
}

// Lien retour outil → psychoéducation (v1.42) : symétrique du lien module → outil déjà en place
// (cf. module.js, c.closing.link). Défini une seule fois ici (portée globale partagée, util.js)
// plutôt que dans chaque fiche outil, pour éviter tout risque de collision de nom entre fiches
// (cf. note technique v1.16/v1.28 sur les scripts classiques en portée globale).
function renderRelatedModuleLink(mod) {
  if (!mod) return "";
  return `
    <div class="closing-hint">Pour mieux comprendre ce qui t'arrive :</div>
    <a class="link-row" href="#/module/${mod.slug}" data-related-module-link>
      <div><div class="t">${escapeHtml(mod.title)}</div><div class="d">${escapeHtml(mod.desc)}</div></div>
      <span class="chev">›</span>
    </a>
  `;
}

function wireRelatedModuleLink(root) {
  const link = root.querySelector("[data-related-module-link]");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    });
  }
}

// Grille de catégorie repliable par axe (v1.61), à la demande de Johan : sur l'onglet "Comprendre",
// avoir les 15 titres de modules tous visibles en même temps risquait de surcharger et d'angoisser la
// personne qui lit — beaucoup de titres de modules sont volontairement percutants pris un par un, mais
// s'accumulent mal en liste. Seuls les 4 intitulés d'axe (posés en v1.60 via `axisTitle` sur le premier
// module de chaque axe, cf. js/data/grid.js) sont visibles par défaut ; taper dessus déplie les modules
// de cet axe. "Fondateur" (aucun `axisTitle`, en tête de liste) reste toujours visible, jamais replié —
// c'est le point de départ recommandé de tout le module Comprendre. Un seul axe ouvert à la fois
// (Johan, v1.61) : en ouvrir un referme automatiquement celui qui était ouvert, pour rester le plus
// épuré possible. Générique : ne fait rien de spécial pour les catégories dont aucun outil ne porte
// `axisTitle` (Je respire, Je m'ancre, Mes ressources) — tous leurs outils tombent simplement dans le
// groupe "sans axe", rendu exactement comme avant.
function buildAxisGroups(tools) {
  const ungrouped = [];
  const groups = [];
  let current = null;
  tools.forEach(t => {
    if (t.axisTitle) {
      current = { key: t.id, title: t.axisTitle, tools: [t] };
      groups.push(current);
    } else if (current) {
      current.tools.push(t);
    } else {
      ungrouped.push(t);
    }
  });
  return { ungrouped, groups };
}

function renderToolCardHtml(t) {
  return `
    <button class="tool-card ${t.live ? "" : "locked"}" ${t.live ? `data-route="${t.route}"` : "disabled"}>
      ${escapeHtml(t.name)}
      ${t.live ? "" : `<span class="soon">à venir dans cette version d'essai</span>`}
    </button>
  `;
}

function renderAxisGroupedHtml(tools, openAxisKey) {
  const { ungrouped, groups } = buildAxisGroups(tools);
  const ungroupedHtml = ungrouped.map(renderToolCardHtml).join("");
  const groupsHtml = groups.map(g => `
    <button class="axis-toggle ${openAxisKey === g.key ? "open" : ""}" data-axis-toggle="${g.key}">
      <span class="axis-toggle-title">${escapeHtml(g.title)}</span>
      <span class="chev">›</span>
    </button>
    ${openAxisKey === g.key ? g.tools.map(renderToolCardHtml).join("") : ""}
  `).join("");
  return ungroupedHtml + groupsHtml;
}

function wireAxisToggles(root, onToggle) {
  root.querySelectorAll("[data-axis-toggle]").forEach(btn => {
    btn.addEventListener("click", () => onToggle(btn.getAttribute("data-axis-toggle")));
  });
}

// Bouton discret de retour à l'accueil, en bas de chaque écran (v1.58, à la demande de Johan :
// "un bouton discret" retenu parmi les options proposées). Injecté une seule fois, de façon
// centralisée, après le rendu de chaque écran (cf. app.js, renderRoute) plutôt que dupliqué dans
// chaque fiche — un seul endroit à maintenir, aucun risque d'oubli sur un écran futur. Répond à un
// besoin différent du bouton de retour contextuel en haut de chaque écran (qui ne remonte qu'un
// niveau) : sortir directement vers l'accueil depuis n'importe quel écran, sans avoir à remonter la
// pile pas à pas. Volontairement discret (texte simple, couleur atténuée, pas de bouton plein) pour ne
// jamais concurrencer l'action principale de l'écran — en particulier sur les cases de module et leurs
// liens de clôture, où l'accent doit rester sur l'outil proposé, pas sur la sortie.
function injectHomeLink(root) {
  const screen = root.querySelector(".screen");
  if (!screen) return;
  screen.insertAdjacentHTML("beforeend", `<div class="home-link-discreet"><a href="#/" data-home-link>Retour à l'accueil</a></div>`);
  const link = screen.querySelector("[data-home-link]");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("#/");
    });
  }
}

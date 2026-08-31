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

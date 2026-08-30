// Aiguillage des routes #/outil/:slug vers la bonne fiche outil.
// Nécessaire car chaque écran classique déclare son propre "render" en portée globale
// (cf. note technique v1.16) : ce petit routeur garde une seule cible réelle par route,
// évitant d'ajouter directement de nouveaux patterns dans app.js à chaque nouvel outil.
let activeToolScreen = null;

function pickToolScreen(slug) {
  if (slug === "mantra") return OutilMantraScreen;
  if (slug === "ancrage-5432") return OutilAncrageScreen;
  return OutilRespirationScreen;
}

function render(root, params) {
  activeToolScreen = pickToolScreen(params.slug);
  activeToolScreen.render(root, params);
}

function cleanup() {
  if (activeToolScreen && typeof activeToolScreen.cleanup === "function") {
    activeToolScreen.cleanup();
  }
  activeToolScreen = null;
}

const OutilScreen = { render, cleanup };

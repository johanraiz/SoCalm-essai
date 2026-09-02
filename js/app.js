const root = document.getElementById("app");
let currentScreen = null;

const routes = [
  { pattern: /^\/onboarding\/?(\d+)?$/, screen: OnboardingScreen, params: m => ({ step: m[1] }) },
  { pattern: /^\/module\/([a-z0-9-]+)\/(\d+)$/, screen: ModuleScreen, params: m => ({ slug: m[1], index: m[2] }) },
  { pattern: /^\/module\/([a-z0-9-]+)$/, screen: ModuleScreen, params: m => ({ slug: m[1] }) },
  { pattern: /^\/outil\/([a-z0-9-]+)\/([a-z0-9]+)$/, screen: OutilScreen, params: m => ({ slug: m[1], step: m[2] }) },
  { pattern: /^\/outil\/([a-z0-9-]+)$/, screen: OutilScreen, params: m => ({ slug: m[1] }) },
  { pattern: /^\/journal\/([a-z0-9-]+)\/([a-z0-9-]+)$/, screen: JournalScreen, params: m => ({ section: m[1], sub: m[2] }) },
  { pattern: /^\/journal\/([a-z0-9-]+)$/, screen: JournalScreen, params: m => ({ section: m[1] }) },
  { pattern: /^\/journal\/?$/, screen: JournalScreen, params: () => ({}) },
  { pattern: /^\/categorie\/([a-z0-9-]+)$/, screen: CategoryScreen, params: m => ({ id: m[1] }) },
  { pattern: /^\/detresse\/?([a-z-]+)?$/, screen: DetresseScreen, params: m => ({ step: m[1] }) },
  { pattern: /^\/?$/, screen: HomeScreen, params: () => ({}) }
];

function resolveRoute() {
  let hash = window.location.hash.replace(/^#/, "");
  if (!hash) hash = "/";

  if (!store.onboardingDone() && !hash.startsWith("/onboarding")) {
    window.location.hash = "#/onboarding/0";
    return null;
  }

  for (const route of routes) {
    const m = hash.match(route.pattern);
    if (m) return { screen: route.screen, params: route.params(m) };
  }
  return { screen: HomeScreen, params: {} };
}

function renderRoute() {
  const resolved = resolveRoute();
  if (!resolved) return; // redirection en cours

  if (currentScreen && typeof currentScreen.cleanup === "function") {
    currentScreen.cleanup();
  }
  currentScreen = resolved.screen;
  window.scrollTo(0, 0);
  resolved.screen.render(root, resolved.params);
  // Bouton discret de retour à l'accueil (v1.58) : partout sauf sur l'accueil lui-même (inutile) et
  // pendant l'onboarding (parcours de configuration initiale, pas encore de "chez soi" à rejoindre —
  // et onboardingDone n'étant pas encore posé, un clic y ramènerait de toute façon aussitôt).
  if (resolved.screen !== HomeScreen && resolved.screen !== OnboardingScreen) {
    injectHomeLink(root);
  }
}

// Bug trouvé pendant les tests de "J'écris, je m'en libère" (v1.44) : le splash appelle renderRoute
// en callback après son propre délai interne. Si un hashchange survenait entre-temps (rare en usage
// réel, le splash bloque l'interaction, mais possible via un lien profond ou en tests automatisés),
// ce callback rejouait un rendu de la route COURANTE par-dessus l'écran déjà affiché — remettant par
// exemple le minuteur de l'exercice d'écriture à zéro sans raison. Un callback dédié, distinct du
// gestionnaire de hashchange normal, ignore ce rendu de rattrapage si un écran a déjà été rendu
// entre-temps — sans jamais bloquer les navigations ultérieures normales (hashchange continue
// d'appeler renderRoute directement, sans passer par ce garde-fou).
function onSplashDone() {
  if (currentScreen) return;
  renderRoute();
}

function boot() {
  function start() {
    SplashScreen.render(root, onSplashDone);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}
boot();
window.addEventListener("hashchange", renderRoute);

const root = document.getElementById("app");
let currentScreen = null;
let splashShown = false;

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
  if (!splashShown) {
    splashShown = true;
    SplashScreen.render(root, renderRoute);
    return;
  }

  const resolved = resolveRoute();
  if (!resolved) return; // redirection en cours

  if (currentScreen && typeof currentScreen.cleanup === "function") {
    currentScreen.cleanup();
  }
  currentScreen = resolved.screen;
  window.scrollTo(0, 0);
  resolved.screen.render(root, resolved.params);
}

function boot() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderRoute, { once: true });
  } else {
    renderRoute();
  }
}
boot();
window.addEventListener("hashchange", renderRoute);

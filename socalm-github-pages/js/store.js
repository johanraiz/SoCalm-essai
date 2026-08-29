// Persistance locale (localStorage) — v1, prototype d'essai.
const NS = "socalm.";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch (e) {
    // stockage indisponible (navigation privée, quota) — on continue sans persister
  }
}

const store = {
  getPrenom() { return read("prenom", ""); },
  setPrenom(v) { write("prenom", v); },

  onboardingDone() { return read("onboardingDone", false); },
  setOnboardingDone(v) { write("onboardingDone", v); },

  getCompliments() { return read("journal.compliments", []); },
  addCompliment(text) {
    const list = this.getCompliments();
    list.unshift({ text, date: new Date().toISOString() });
    write("journal.compliments", list);
  },

  getMaVersion(toolId) {
    return read("maVersion." + toolId, "");
  },
  setMaVersion(toolId, text) {
    write("maVersion." + toolId, text);
  },

  getFavoris(toolId) { return read("favoris." + toolId, 0); },
  setFavoris(toolId, n) { write("favoris." + toolId, n); },

  getCaseProgress(moduleSlug) { return read("progress." + moduleSlug, 0); },
  setCaseProgress(moduleSlug, index) { write("progress." + moduleSlug, index); },

  getPointDepart() { return read("pointDepart", null); },
  setPointDepart(v) { write("pointDepart", v); },

  getHomeView() { return read("homeView", "grille"); },
  setHomeView(v) { write("homeView", v); }
};

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  } catch (e) {
    return "";
  }
}

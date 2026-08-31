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
  setHomeView(v) { write("homeView", v); },

  // Ancrage 5-4-3-2 (v0.45) : le critère de l'étape "vue" alterne à chaque usage (couleur / forme, point 2).
  getAncrageDernierCritere() { return read("ancrage.dernierCritere", null); },
  setAncrageDernierCritere(v) { write("ancrage.dernierCritere", v); },

  // Journal — liste des déclencheurs (v0.62).
  getDeclencheurs() {
    const list = read("journal.declencheurs", []);
    // Compat : anciennes entrées de test sans id (avant v1.35) — id de repli stable, dérivé de la date.
    return list.map(e => e.id ? e : { ...e, id: e.date });
  },
  addDeclencheur(text) {
    const list = this.getDeclencheurs();
    const id = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    list.unshift({ id, text, date: new Date().toISOString() });
    write("journal.declencheurs", list);
  },

  // Ressource "J'ai confiance, je tiens bon" (v0.54) : la phrase reçue de confiance de l'utilisateur,
  // écrite et conservée pour être relue au besoin — cœur de l'exercice, pas une simple note "Ma version".
  getPhraseConfiance() { return read("phraseConfiance", ""); },
  setPhraseConfiance(v) { write("phraseConfiance", v); },

  // Plan d'intention (v0.76, 3 champs v0.97, un plan par situation dès v1.35) :
  // un plan par déclencheur, indexé par son id — relisable et modifiable.
  getPlansDeclencheurs() { return read("journal.plansParDeclencheur", {}); },
  getPlanForDeclencheur(id) {
    const plans = this.getPlansDeclencheurs();
    return plans[id] || { reflexe: "", action: "" };
  },
  savePlanForDeclencheur(id, plan) {
    const plans = this.getPlansDeclencheurs();
    plans[id] = { reflexe: plan.reflexe || "", action: plan.action || "", date: new Date().toISOString() };
    write("journal.plansParDeclencheur", plans);
  },

  // Journal — "La vérification des attentes" (v0.70, échelle et synthèse v0.73) : noter une
  // prédiction ou une peur avant un événement, la vérifier après coup (texte libre + échelle 1-5,
  // ou évitement). Une entrée passe de "à vérifier" à "vérifiée" une seule fois (pas de re-vérification).
  getPredictions() { return read("journal.predictions", []); },
  addPrediction(text, confiance10) {
    const list = this.getPredictions();
    const id = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    const entry = { id, text, date: new Date().toISOString(), verified: false };
    // Note de confiance sur 10 (v0.72), saisie dans l'outil "Je vérifie, je reprends la main" avant
    // l'événement — conservée avec la prédiction même si la vérification (v0.73) ne la réaffiche pas
    // encore : cohérent avec le protocole du modèle d'apprentissage inhibiteur (Craske et al., 2014,
    // v0.72 point 2), qui suppose une note avant pour mesurer l'écart plus tard.
    if (typeof confiance10 === "number") entry.confiance10 = confiance10;
    list.unshift(entry);
    write("journal.predictions", list);
    return id;
  },
  saveVerification(id, data) {
    const list = this.getPredictions();
    const entry = list.find(p => p.id === id);
    if (!entry) return;
    entry.verified = true;
    entry.resultText = data.resultText || "";
    entry.avoided = !!data.avoided;
    entry.scale = entry.avoided ? null : (data.scale || null);
    entry.petitPas = data.petitPas || "";
    entry.dateVerif = new Date().toISOString();
    write("journal.predictions", list);
  }
};

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  } catch (e) {
    return "";
  }
}

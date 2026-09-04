// J'ai confiance, je tiens bon — phrase reçue de confiance, catégorie Mes ressources.
// Texte et nom finalisés (v0.54). Gabarit repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran C).
//
// Écart constaté entre la maquette et le texte du cahier des charges (v0.54) : l'anecdote y perd
// la précision "dans la tempête de mes émotions et de mon angoisse" (2e paragraphe). Conformément à
// la règle posée par Johan le 31 août 2026 (v1.39, "les versions les plus récentes sont toujours les
// bonnes") — et au propre en-tête de ce fichier de maquette, qui indique avoir été produit à partir
// des textes déjà validés, donc postérieur à eux — la version de la maquette est retenue ici par
// défaut, signalée pour transparence plutôt que bloquée sur une question.
//
// Cette fiche a un champ central différent des autres outils : le cahier des charges (v0.54, point 4
// de la conception retenue) précise explicitement que la personne doit pouvoir noter SA PROPRE phrase
// ("Espace pour noter sa propre phrase, pas seulement lire celle de Johan"), pour la relire "chaque
// fois que tu en as besoin" — donc un champ persistant et réel, pas une simple illustration statique
// comme le "field" de la maquette le montre. D'où l'ajout de store.getPhraseConfiance/setPhraseConfiance,
// distinct du espace générique "Ma version" (qui reste disponible, pour toute autre note personnelle).

// Message vocal pour les moments difficiles (v1.64) — enregistrement par la personne, pour
// elle-même, réécouté en priorité depuis le bouton "Moment difficile" (cf. js/screens/detresse.js).
// Discussion complète et décisions de Johan consignées dans le cahier des charges (v1.64) : intégré
// ici plutôt qu'en outil séparé, jamais proposé pendant l'onboarding lui-même (juste une invitation
// discrète sur l'accueil ensuite, cf. home.js), 30 secondes maximum avec arrêt automatique et une
// barre qui se remplit doucement plutôt qu'un décompte chiffré (pour rester dans le ton calme de
// l'app), et un seul message actif à la fois.
//
// État en mémoire seulement (comme openAxis ailleurs dans l'app) — remis à zéro par cleanup() dès
// qu'on quitte la fiche outil ; pas de sens à conserver un enregistrement en cours ou non sauvegardé
// d'une visite à l'autre.
let mvRecorder = null;
let mvStream = null;
let mvChunks = [];
let mvStopTimer = null;
let mvPendingDataUrl = null;
let mvScreenState = "idle"; // idle | recording | review | error
let mvErrorMsg = "";
let mvBusy = false;

function renderMessageVocalHtml() {
  const saved = store.getMessageVocal();

  if (mvScreenState === "recording") {
    return `
      <div class="mv-section">
        <div class="mv-title">Un message pour les moments difficiles</div>
        <div class="mv-progress"><div class="mv-progress-fill" id="mvFillBar"></div></div>
        <div class="mv-hint">Tu peux t'arrêter quand tu veux — 30 secondes maximum.</div>
        <button class="btn-secondary" data-mv-stop>Terminer maintenant</button>
      </div>
    `;
  }

  if (mvScreenState === "review" && mvPendingDataUrl) {
    return `
      <div class="mv-section">
        <div class="mv-title">Un message pour les moments difficiles</div>
        <audio class="mv-audio" controls src="${mvPendingDataUrl}"></audio>
        <div class="mv-actions">
          <button class="btn-secondary" data-mv-retry>Recommencer</button>
          <button class="btn-primary" data-mv-save>Enregistrer ce message</button>
        </div>
      </div>
    `;
  }

  if (mvScreenState === "error") {
    return `
      <div class="mv-section">
        <div class="mv-title">Un message pour les moments difficiles</div>
        <div class="mv-error">${escapeHtml(mvErrorMsg || "Le micro n'est pas accessible. Tu peux l'autoriser dans les réglages de ton navigateur, puis réessayer.")}</div>
        <button class="btn-secondary" data-mv-retry>Réessayer</button>
      </div>
    `;
  }

  if (saved) {
    return `
      <div class="mv-section">
        <div class="mv-title">Ton message pour les moments difficiles</div>
        <audio class="mv-audio" controls src="${saved.dataUrl}"></audio>
        <button class="mv-link" data-mv-record>Remplacer ce message</button>
      </div>
    `;
  }

  return `
    <div class="mv-section">
      <div class="mv-title">Un message pour les moments difficiles</div>
      <p class="mv-intro">Enregistre un message court pour toi-même — quelque chose qui pourrait te remonter le moral dans un moment difficile. Reste bref : tu as 30 secondes.</p>
      <p class="mv-permission-hint">On va te demander d'autoriser le micro, juste pour cet enregistrement.</p>
      <button class="btn-primary" data-mv-record><span class="ic">●</span> Enregistrer un message</button>
    </div>
  `;
}

function mvStopRecording() {
  if (mvStopTimer) { clearTimeout(mvStopTimer); mvStopTimer = null; }
  if (mvRecorder && mvRecorder.state !== "inactive") {
    try { mvRecorder.stop(); } catch (e) { /* déjà arrêté */ }
  }
}

async function mvStartRecording(root, slug) {
  if (mvBusy) return;
  mvBusy = true;
  mvErrorMsg = "";
  try {
    mvStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    mvScreenState = "error";
    mvErrorMsg = "Le micro n'est pas accessible. Tu peux l'autoriser dans les réglages de ton navigateur, puis réessayer.";
    mvBusy = false;
    renderPhraseConfianceMain(root, slug);
    return;
  }

  try {
    mvRecorder = new MediaRecorder(mvStream);
  } catch (e) {
    mvStream.getTracks().forEach(t => t.stop());
    mvStream = null;
    mvScreenState = "error";
    mvErrorMsg = "L'enregistrement audio n'est pas disponible sur ce navigateur.";
    mvBusy = false;
    renderPhraseConfianceMain(root, slug);
    return;
  }

  mvChunks = [];
  mvRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) mvChunks.push(e.data); };
  mvRecorder.onstop = () => {
    const blob = new Blob(mvChunks, { type: mvRecorder.mimeType || "audio/webm" });
    if (mvStream) { mvStream.getTracks().forEach(t => t.stop()); mvStream = null; }
    const reader = new FileReader();
    reader.onload = () => {
      mvPendingDataUrl = reader.result;
      mvScreenState = "review";
      mvBusy = false;
      renderPhraseConfianceMain(root, slug);
    };
    reader.readAsDataURL(blob);
  };

  mvRecorder.start();
  mvScreenState = "recording";
  renderPhraseConfianceMain(root, slug);
  mvStopTimer = setTimeout(mvStopRecording, 30000);
}

function wireMessageVocalSection(root, slug) {
  const recordBtn = root.querySelector("[data-mv-record]");
  if (recordBtn) recordBtn.addEventListener("click", () => mvStartRecording(root, slug));

  const stopBtn = root.querySelector("[data-mv-stop]");
  if (stopBtn) stopBtn.addEventListener("click", mvStopRecording);

  const retryBtn = root.querySelector("[data-mv-retry]");
  if (retryBtn) retryBtn.addEventListener("click", () => {
    mvPendingDataUrl = null;
    mvErrorMsg = "";
    mvScreenState = "idle";
    renderPhraseConfianceMain(root, slug);
  });

  const saveBtn = root.querySelector("[data-mv-save]");
  if (saveBtn) saveBtn.addEventListener("click", () => {
    const ok = store.setMessageVocal(mvPendingDataUrl);
    mvPendingDataUrl = null;
    if (ok) {
      mvScreenState = "idle";
      toast("Message enregistré");
    } else {
      mvScreenState = "error";
      mvErrorMsg = "Ton message n'a pas pu être enregistré (mémoire de l'appareil insuffisante). Essaie avec un message un peu plus court.";
    }
    renderPhraseConfianceMain(root, slug);
  });

  // Barre qui se remplit doucement sur 30 secondes (v1.64) : posée à 0 dans le gabarit HTML puis
  // étendue à 100% juste après le rendu, pour que la transition CSS (durée posée ici en JS) parte
  // bien de zéro au lieu de sauter instantanément au maximum.
  const fill = root.querySelector("#mvFillBar");
  if (fill) {
    requestAnimationFrame(() => {
      fill.style.transitionDuration = "30s";
      fill.style.width = "100%";
    });
  }
}

function renderPhraseConfianceMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");
  const existing = store.getPhraseConfiance();
  const toolMeta = categories.flatMap(c => c.tools).find(t => t.id === slug);

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Mes ressources</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">J'ai confiance, je tiens bon</h3>
      <div class="body-copy">
        <p>Il y a peut-être, quelque part en toi, une phrase que quelqu'un t'a dite un jour — un parent, un ami, un soignant, quelqu'un en qui tu avais confiance — et qui t'a aidé à tenir. Note-la ici, pour pouvoir te la redire chaque fois que tu en as besoin.</p>
      </div>
      <textarea class="field" id="phraseConfianceInput" placeholder="Écris ta phrase ici…">${escapeHtml(existing)}</textarea>
      <button class="btn-primary" data-save-phrase>Enregistrer</button>
      <div class="anecdote">
        <div class="lbl">Mon expérience</div>
        <p>Moi, cette phrase, c'est ma psychologue qui me l'a offerte, un jour : « Fais-toi confiance, tu vas y arriver. »</p>
        <p>Il y a eu des moments où je n'arrivais pas vraiment à y croire. Et pourtant, aujourd'hui, je peux te dire qu'elle avait raison.</p>
        <p>Alors je te le dis aujourd'hui : fais-toi confiance, tu vas y arriver. Et ton moi de demain te le confirmera aussi, plus tard.</p>
      </div>
      ${renderMessageVocalHtml()}
      <div class="spacer"></div>
      ${toolMeta ? renderRelatedModuleLink(toolMeta.relatedModule) : ""}
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/categorie/mes-ressources"));
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderPhraseConfianceMain(root, slug);
    });
  });
  root.querySelector("[data-save-phrase]").addEventListener("click", () => {
    store.setPhraseConfiance(root.querySelector("#phraseConfianceInput").value);
    toast("Enregistré");
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
  wireRelatedModuleLink(root);
  wireMessageVocalSection(root, slug);
}

function renderPhraseConfianceMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ J'ai confiance, je tiens bon</button></div>
      <h3 class="title title-sm">Ma version</h3>
      <div class="body-copy"><p>Un espace discret pour noter ta propre façon de vivre cet exercice — ce qui marche pour toi, ce que tu adaptes.</p></div>
      <textarea class="field" id="maVersionInput" placeholder="Écris ici…">${escapeHtml(existing)}</textarea>
      <button class="btn-primary" data-save>Enregistrer</button>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/outil/${slug}`));
  root.querySelector("[data-save]").addEventListener("click", () => {
    store.setMaVersion(slug, root.querySelector("#maVersionInput").value);
    toast("Enregistré");
  });
}

function render(root, params) {
  const slug = params.slug;
  if (params.step === "maversion") {
    renderPhraseConfianceMaVersion(root, slug);
    return;
  }
  renderPhraseConfianceMain(root, slug);
}

function cleanup() {
  // Libère le micro et abandonne tout enregistrement non sauvegardé si on quitte la fiche outil
  // (v1.64) — cohérent avec le reste de l'app : une prise non validée n'est jamais conservée.
  // Important : on détache d'abord ondataavailable/onstop avant d'arrêter l'enregistreur. Sans ça,
  // le onstop (asynchrone, via FileReader) pourrait se déclencher APRÈS que la navigation a déjà
  // rendu un autre écran dans `root`, et écraserait cet écran avec le gabarit de cette fiche —
  // un enregistrement interrompu par un changement de page ne doit jamais tenter de se ré-afficher.
  if (mvStopTimer) { clearTimeout(mvStopTimer); mvStopTimer = null; }
  if (mvRecorder) {
    mvRecorder.ondataavailable = null;
    mvRecorder.onstop = null;
    if (mvRecorder.state !== "inactive") {
      try { mvRecorder.stop(); } catch (e) { /* déjà arrêté */ }
    }
    mvRecorder = null;
  }
  if (mvStream) { mvStream.getTracks().forEach(t => t.stop()); mvStream = null; }
  mvChunks = [];
  mvScreenState = "idle";
  mvPendingDataUrl = null;
  mvErrorMsg = "";
  mvBusy = false;
}

const OutilPhraseConfianceScreen = { render, cleanup };

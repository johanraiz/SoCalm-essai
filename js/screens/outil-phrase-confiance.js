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

function cleanup() {}

const OutilPhraseConfianceScreen = { render, cleanup };

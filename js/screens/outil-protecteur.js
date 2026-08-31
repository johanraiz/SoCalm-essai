// Je me critique, je me réponds avec tendresse — le protecteur/critique, catégorie Mes ressources.
// Texte et nom finalisés (v0.48), sous-titre retravaillé (v0.75). Gabarit repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran A).
//
// Écart constaté et corrigé, même vigilance que pour la marche de nettoyage (v1.30) et l'ancrage
// olfactif par association (v1.33) : la maquette tronque le 2e paragraphe (perd la précision
// "dans la famille, à l'école, par un professeur" et toute la phrase sur l'auto-vérification), et
// surtout OMET ENTIÈREMENT l'étape 2 de l'exercice ("Reconnais son intention... Dis-lui : « Je sais
// que tu essaies de me protéger. Merci, mais je n'ai plus besoin que tu le fasses comme ça. »").
// Le texte intégral du cahier des charges (v0.48) est utilisé ici, pas la version tronquée de la maquette.

function renderProtecteurMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Mes ressources</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">Je me critique, je me réponds avec tendresse</h3>
      <div class="subtitle">Quand une voix intérieure te juge — pour lui répondre avec douceur.</div>
      <div class="usage-note">Cet exercice se pratique mieux hors des moments de crise, pour construire sur la durée.</div>
      <div class="body-copy">
        <p>Le <strong>critique</strong>, c'est une part de toi qui s'active chaque fois que tu te juges — un cousin de la petite caméra qui t'observait de l'extérieur pendant tes crises.</p>
        <p>Personne n'y échappe : <strong>on le construit tous de la même façon</strong>. À force d'entendre les mêmes remarques — dans la famille, à l'école, par un professeur — on finit par y croire. Et plus on y croit, plus on cherche, sans le vouloir, à confirmer ces croyances — par le regard des autres, ou par soi-même.</p>
        <p>Voici la <strong>bonne nouvelle</strong> : avant de devenir critique, cette part de toi était <strong>protectrice</strong>. Elle essayait, à sa façon, de t'épargner une douleur — l'échec, le rejet, la honte. Le protecteur est encore là, sous le critique. <strong>On peut le retrouver</strong>.</p>
        <p>La prochaine fois que tu l'entends :</p>
      </div>
      <div class="field-lbl">Complète cette phrase, sans l'adoucir</div>
      <div class="field">« Le critique me dit que… »</div>
      <div class="field-lbl">Reconnais son intention</div>
      <div class="body-copy">
        <p>Il essaie de te protéger de quelque chose — l'échec, le rejet, la honte. Dis-lui :</p>
      </div>
      <div class="field">« Je sais que tu essaies de me protéger. Merci, mais je n'ai plus besoin que tu le fasses comme ça. »</div>
      <div class="field-lbl">Puis réponds-lui, la main sur le cœur</div>
      <div class="dialog-ex">
        <div class="crit"><span class="who">Il dit :</span> « Tu es nul, tu n'y arriveras jamais. »</div>
        <div class="ans"><span class="who">Tu réponds :</span> « Je fais de mon mieux, et c'est déjà beaucoup. »</div>
      </div>
      <div class="spacer"></div>
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/categorie/mes-ressources"));
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderProtecteurMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderProtecteurMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je me critique, je me réponds avec tendresse</button></div>
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
    renderProtecteurMaVersion(root, slug);
    return;
  }
  renderProtecteurMain(root, slug);
}

function cleanup() {}

const OutilProtecteurScreen = { render, cleanup };

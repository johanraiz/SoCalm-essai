// Je sens cette odeur, je construis ma sérénité — l'ancrage olfactif par association, catégorie Je m'ancre.
// Texte et nom finalisés (v0.68), sous-titre retravaillé (v0.75). Gabarit repris de la
// maquette validée design/ecrans-outils-je-mancre.html (écran E).

function renderOdeurAssociationMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Je m'ancre</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">Je sens cette odeur, je construis ma sérénité</h3>
      <div class="subtitle">Une odeur neutre, à associer au calme petit à petit — pour qu'elle seule suffise, plus tard.</div>
      <div class="usage-note">Cet outil se construit dans le temps — les premières fois, il n'apporte rien encore. Continue quand même : c'est la répétition qui crée l'effet.</div>
      <div class="body-copy">
        <p>Choisis une <strong>odeur neutre</strong>, que tu n'utiliseras que pour cet usage — une huile essentielle, un parfum, n'importe quoi qui te soit facile à sentir régulièrement. Ce n'est pas pour ses vertus supposées : c'est ce que tu vas en faire qui compte.</p>
        <p>À la fin d'un exercice, au moment où tu sens <strong>le calme s'installer</strong>, <strong>respire cette odeur</strong>.</p>
        <p>Répète ce geste à chaque fois. Petit à petit, ton corps apprend à <strong>relier l'odeur et l'état</strong> — jusqu'à ce qu'elle seule suffise à te <strong>ramener vers ce calme</strong>.</p>
      </div>
      <div class="anecdote">
        <div class="lbl">Mon expérience</div>
        <p>Pendant longtemps, je ne l'ai pas fait exprès. Le cabinet de ma psychologue sentait la sauge — à force d'y retourner, cette odeur a fini par se lier, dans ma tête, au sentiment de me sentir écouté et apaisé.</p>
        <p>Plus tard, j'ai compris ce qui s'était passé, et j'ai recommencé volontairement avec certaines huiles essentielles — pas pour ce qu'on leur prête comme vertus, mais pour refaire ce même lien, à chaque fois que je retrouvais mon calme.</p>
      </div>
      <div class="spacer"></div>
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/categorie/je-mancre"));
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderOdeurAssociationMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderOdeurAssociationMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je sens cette odeur, je construis ma sérénité</button></div>
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
    renderOdeurAssociationMaVersion(root, slug);
    return;
  }
  renderOdeurAssociationMain(root, slug);
}

function cleanup() {}

const OutilOdeurAssociationScreen = { render, cleanup };

// J'inspire cette odeur, je reviens à moi — objet à l'odeur rassurante, catégorie Je m'ancre.
// Texte et nom finalisés (v0.55), sous-titre retravaillé (v0.75). Gabarit repris de la
// maquette validée design/ecrans-outils-je-mancre.html (écran D).

function renderOdeurMain(root, slug) {
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
      <h3 class="title title-sm">J'inspire cette odeur, je reviens à moi</h3>
      <div class="subtitle">Une odeur qui te rassure déjà — à respirer dès que tu en as besoin.</div>
      <div class="body-copy">
        <p><strong>Une odeur</strong> peut, à elle seule, te ramener au <strong>présent</strong>. Ce n'est pas un hasard : l'odorat est directement relié aux régions du cerveau qui gèrent la mémoire et les émotions.</p>
        <p>Choisis un objet à l'<strong>odeur qui te rassure</strong> — une huile essentielle, un parfum, un baume — et garde-le sur toi. Le jour où tu en as besoin, il te suffit de le <strong>respirer</strong>, quelques instants, pour te retrouver <strong>ici et maintenant</strong>.</p>
      </div>
      <div class="anecdote">
        <div class="lbl">Mon expérience</div>
        <p>Moi, c'est un petit pot avec du menthol et du camphre. Je le respire de temps en temps, pour me remettre dans le présent.</p>
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
      renderOdeurMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderOdeurMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ J'inspire cette odeur, je reviens à moi</button></div>
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
    renderOdeurMaVersion(root, slug);
    return;
  }
  renderOdeurMain(root, slug);
}

function cleanup() {}

const OutilOdeurScreen = { render, cleanup };

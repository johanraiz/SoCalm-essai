// Je me confie, je me sens accompagné — figure symbolique aidante, catégorie Mes ressources.
// Nom et sous-titre finalisés (v0.53, retravaillé v0.75). Gabarit ET texte repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran B).
//
// Écart constaté entre la maquette et le texte original du cahier des charges (v0.53), signalé à
// Johan (v1.38) : la maquette ajoute "une figure symbolique protectrice" au 1er paragraphe, réécrit
// et fusionne le passage rayon de lumière/regard/respiration/étreinte avec une phrase ajoutée
// ("observe les réactions dans ton corps"), ajoute une phrase en fin de fiche ("Tu peux aussi faire
// appel à cette « personne »...") et omet la phrase "Ce qu'elle t'inspire est déjà un peu en toi —
// sinon, tu ne l'aurais jamais reconnu.". Après relecture, Johan choisit explicitement la version de
// la maquette (v1.39) — c'est donc ce texte, pas le texte original v0.53, qui est utilisé ci-dessous.

function renderFigureAidanteMain(root, slug) {
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
      <h3 class="title title-sm">Je me confie, je me sens accompagné</h3>
      <div class="subtitle">Une présence bienveillante à convoquer, pour ne pas te sentir seul·e.</div>
      <div class="body-copy">
        <p>Si tu devais être <strong>accompagné</strong> par quelqu'un qui te permette de te <strong>sentir bien, en confiance</strong> — une figure symbolique protectrice, quelqu'un qui possède les <strong>qualités que tu aimerais avoir</strong> aujourd'hui — qui serait-ce ?</p>
        <p>Une personne que tu connais, un personnage, même fictif, un animal, un objet que tu personnifies… Laisse venir, sans jugement.</p>
        <p><strong>À chaque fois que tu en sentiras le besoin</strong> : ferme les yeux, si tu veux. Imagine cette <strong>présence</strong> à tes côtés.</p>
      </div>
      <div class="glow-block">
        <p>Imagine un rayon de lumière qui vous relie par le cœur et qui vous alimente l'un l'autre. Si tu le souhaites, tu peux laisser s'échanger un regard d'amour entre toi et lui. Maintenant, laisse-toi respirer dans ce lien et observe les réactions dans ton corps. Si tu te sens suffisamment à l'aise, imagine que vous vous prenez dans les bras, l'un et l'autre.</p>
      </div>
      <div class="body-copy">
        <p>Tu peux aussi faire appel à cette « personne » à chaque fois que tu en as besoin, comme un soutien et même un conseiller bienveillant.</p>
      </div>
      <div class="anecdote">
        <div class="lbl">Mon expérience</div>
        <p>Moi, ma figure aidante est une oie sauvage. Quand j'en ai besoin, je me blottis contre elle, et elle m'entoure de ses ailes. Je sens sa douceur, son réconfort.</p>
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
      renderFigureAidanteMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderFigureAidanteMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je me confie, je me sens accompagné</button></div>
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
    renderFigureAidanteMaVersion(root, slug);
    return;
  }
  renderFigureAidanteMain(root, slug);
}

function cleanup() {}

const OutilFigureAidanteScreen = { render, cleanup };

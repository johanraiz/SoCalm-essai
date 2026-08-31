// Je m'y réfugie, je me sens en sécurité — le lieu sécure, catégorie Mes ressources.
// Texte et nom finalisés (v0.59). Gabarit repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran E).
//
// Écarts constatés entre la maquette et le texte du cahier des charges (v0.59) : "que tu connais"
// disparaît du 1er paragraphe ("un lieu réel, que tu connais, ou un lieu imaginé"), et surtout
// "rien ne peut t'atteindre" devient "rien de négatif ne peut t'atteindre" — un ajout qui nuance le
// sens (sécurité relative plutôt qu'absolue), pas une simple coupe. Conformément à la règle posée par
// Johan (v1.39, "les versions les plus récentes sont toujours les bonnes") et à l'en-tête de ce
// fichier de maquette (produit à partir des textes déjà validés, donc postérieur à eux), la version
// de la maquette est retenue par défaut ici — signalée pour transparence, sans bloquer sur une question.

function renderLieuSecureMain(root, slug) {
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
      <h3 class="title title-sm">Je m'y réfugie, je me sens en sécurité</h3>
      <div class="body-copy">
        <p>Ferme les yeux, si tu veux. Pense à <strong>un endroit</strong> où tu te sens totalement <strong>en sécurité</strong> — un lieu réel, ou un lieu imaginé, peu importe.</p>
        <p><strong>Regarde</strong> autour de toi. Qu'est-ce que tu vois ? Les couleurs, les formes, la lumière.</p>
        <p><strong>Écoute</strong>. Quels sons t'accompagnent, dans cet endroit ?</p>
        <p><strong>Remarque</strong> ce que tu ressens sur ta peau — une température, une texture, un contact.</p>
        <p><strong>Sens</strong>, s'il y a une odeur qui fait partie de ce lieu.</p>
        <p>Dans cet endroit, <strong>rien de négatif ne peut t'atteindre</strong>. Tu es <strong>en sécurité</strong>, complètement.</p>
        <p>Respire cette image à travers <strong>ton cœur</strong>, pour <strong>ancrer cette sensation</strong> en toi. Et laisse cette sensation grandir.</p>
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
      renderLieuSecureMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderLieuSecureMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je m'y réfugie, je me sens en sécurité</button></div>
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
    renderLieuSecureMaVersion(root, slug);
    return;
  }
  renderLieuSecureMain(root, slug);
}

function cleanup() {}

const OutilLieuSecureScreen = { render, cleanup };

// Je marche, je me libère — la marche de nettoyage, catégorie Je m'ancre.
// Texte finalisé (v0.40, anecdote ajoutée v0.41). Gabarit repris de la maquette validée
// design/ecrans-outils-je-mancre.html (écran C).

function renderMarcheMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");
  const toolMeta = categories.flatMap(c => c.tools).find(t => t.id === slug);

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Je m'ancre</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">Je marche, je me libère</h3>
      <div class="body-copy">
        <p><strong>Marche</strong>, comme tu peux, où tu peux. Pas besoin de destination — <strong>juste tes pas</strong>, et le sol sous tes pieds.</p>
        <p>À chaque pas, dépose ce qui ne t'appartient plus, et dis-toi :</p>
        <blockquote class="marche-phrase">« Je rends à la terre ce qui ne m'appartient plus. Je me libère de ce qui me pèse aujourd'hui. »</blockquote>
        <p>Puis, à chaque pas suivant, puise une force dans cette même terre, et réalise :</p>
        <blockquote class="marche-phrase">« Je puise dans la terre une force qui m'appartient. Je m'en remplis, un peu plus à chaque pas. »</blockquote>
      </div>
      <div class="anecdote">
        <div class="lbl">Mon expérience</div>
        <p>Pendant mes crises d'angoisse, mon plus grand problème n'était pas de rester assis à respirer — c'était de rester en place, tout court.</p>
        <p>Logique, en réalité : l'amygdale sonne l'alarme pour une seule raison, préparer une action — combattre, ou fuir. Rester immobile allait à l'encontre de tout ce que mon corps réclamait.</p>
        <p>Alors, au début, j'ai beaucoup utilisé cette marche. Presque comme un rituel : le même trajet, presque chaque jour.</p>
        <p>Un geste simple, à la portée de mon corps agité — bien plus que n'importe quel exercice qui demandait de m'arrêter.</p>
      </div>
      <div class="spacer"></div>
      ${toolMeta ? renderRelatedModuleLink(toolMeta.relatedModule) : ""}
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/categorie/je-mancre"));
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderMarcheMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
  wireRelatedModuleLink(root);
}

function renderMarcheMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je marche, je me libère</button></div>
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
    renderMarcheMaVersion(root, slug);
    return;
  }
  renderMarcheMain(root, slug);
}

function cleanup() {}

const OutilMarcheScreen = { render, cleanup };

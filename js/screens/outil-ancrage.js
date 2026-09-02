// Je m'ancre, je suis là — ancrage par les cinq sens (5-4-3-2), catégorie Je m'ancre.
// Texte et nom finalisés (v0.45). Gabarit repris de la maquette validée
// design/ecrans-outils-je-mancre.html (écran B).

function pickCritereVue() {
  const dernier = store.getAncrageDernierCritere();
  const prochain = dernier === "couleur" ? "forme" : "couleur";
  store.setAncrageDernierCritere(prochain);
  const adj = prochain === "couleur" ? "rouges" : "rondes";
  return `Nomme <strong>cinq</strong> choses ${adj} que tu <strong class="sense-verb">vois</strong> autour de toi.`;
}

function renderAncrageMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");

  const vueTxt = pickCritereVue();
  const toolMeta = categories.flatMap(c => c.tools).find(t => t.id === slug);

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Je m'ancre</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">Je m'ancre, je suis là</h3>
      <div class="body-copy">
        <p>Pose ton attention ici, maintenant. On va faire le tour de tes sens, un par un.</p>
      </div>
      <div class="sense-step">
        <div class="n n5">5</div>
        <div class="txt">
          <div class="h">${vueTxt}</div>
          <div class="d">critère tiré automatiquement par l'app à chaque usage — couleur ou forme</div>
        </div>
      </div>
      <div class="sense-step">
        <div class="n n4">4</div>
        <div class="txt">
          <div class="h"><strong class="sense-verb">Touche</strong> <strong>quatre</strong> choses différentes, et remarque leur texture.</div>
          <div class="d">le tissu de tes vêtements... une surface près de toi... le sol sous tes pieds... un objet dans ta poche.</div>
        </div>
      </div>
      <div class="sense-step">
        <div class="n n3">3</div>
        <div class="txt">
          <div class="h"><strong class="sense-verb">Écoute</strong> <strong>trois</strong> sons autour de toi.</div>
        </div>
      </div>
      <div class="sense-step">
        <div class="n n2">2</div>
        <div class="txt">
          <div class="h"><strong class="sense-verb">Sens</strong> <strong>deux</strong> odeurs autour de toi.</div>
          <div class="d">si tu as une odeur qui te rassure toujours sur toi, c'est le moment de la respirer.</div>
        </div>
      </div>
      <p class="ancrage-closing">Tu es là, ici et maintenant.</p>
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
      renderAncrageMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
  wireRelatedModuleLink(root);
}

function renderAncrageMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je m'ancre, je suis là</button></div>
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
    renderAncrageMaVersion(root, slug);
    return;
  }
  renderAncrageMain(root, slug);
}

function cleanup() {}

const OutilAncrageScreen = { render, cleanup };

// Je vérifie, je reprends la main — dernier outil de "Mes ressources", troisième et dernier plan de
// l'intégration de la violation des attentes (v0.69). Texte et nom finalisés (v0.72). Gabarit repris
// de la maquette design/ecrans-outils-mes-ressources.html (écran G) : texte identique au cahier des
// charges, aucun écart constaté cette fois — seule la phrase de clôture "Note-le dans ton Journal.
// Tu reviendras vérifier, une fois l'événement passé." est répartie, dans la maquette, entre le
// titre et la description d'un lien-bouton plutôt qu'affichée comme une phrase continue : restructuration
// d'interface cohérente avec le lien module→outil déjà en place (renderRelatedModuleLink, v1.42),
// pas un écart de contenu.
//
// Pont direct vers "La vérification des attentes" du Journal (v1.45) : le champ "scénario précis"
// et la note "sur 10" ne sont pas de simples champs illustratifs — taper sur "Noter dans le Journal"
// enregistre réellement une nouvelle prédiction (store.addPrediction), consultable et vérifiable
// ensuite depuis le Journal, exactement comme le texte le promet ("Tu reviendras vérifier, une fois
// l'événement passé.").

function renderJeVerifieMain(root, slug) {
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
      <h3 class="title title-sm">Je vérifie, je reprends la main</h3>
      <div class="usage-note">Un outil à utiliser à froid, dans les jours ou les heures qui précèdent un événement redouté — pas en pleine crise.</div>
      <div class="body-copy">
        <p>Quelque chose approche, et l'angoisse monte déjà.</p>
        <p>Qu'est-ce que tu redoutes ? Pas « que ça se passe mal » — le scénario précis auquel tu penses le plus.</p>
      </div>
      <textarea class="field" id="scenarioInput" placeholder="Écris le scénario précis…"></textarea>
      <div class="field-lbl">Sur 10, à quel point tu es sûr·e que ça va arriver ?</div>
      <div class="scale-row scale-row-10" data-scale-row>
        ${[1,2,3,4,5,6,7,8,9,10].map(n => `<div class="scale-dot" data-scale-value="${n}">${n}</div>`).join("")}
      </div>
      <a class="link-row" href="#/journal/verif-attentes/consulter" data-noter-link>
        <div><div class="t">Noter dans le Journal</div><div class="d">tu reviendras vérifier, une fois l'événement passé</div></div>
        <span class="chev">›</span>
      </a>
      <div class="body-copy" style="margin-top:8px;">
        <p style="font-style:italic; color:var(--sage-dark); text-align:center;">Noter ta peur, c'est déjà reprendre la main.</p>
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
      renderJeVerifieMain(root, slug);
    });
  });

  const scaleRow = root.querySelector("[data-scale-row]");
  scaleRow.querySelectorAll(".scale-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      scaleRow.querySelectorAll(".scale-dot").forEach(d => d.classList.remove("chosen"));
      dot.classList.add("chosen");
    });
  });

  root.querySelector("[data-noter-link]").addEventListener("click", (e) => {
    e.preventDefault();
    const text = root.querySelector("#scenarioInput").value.trim();
    if (!text) {
      toast("Écris d'abord le scénario que tu redoutes");
      return;
    }
    const chosenDot = scaleRow.querySelector(".scale-dot.chosen");
    const confiance10 = chosenDot ? parseInt(chosenDot.getAttribute("data-scale-value"), 10) : undefined;
    store.addPrediction(text, confiance10);
    toast("Noté — tu pourras vérifier plus tard");
    navigate("#/journal/verif-attentes/consulter");
  });

  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderJeVerifieMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Je vérifie, je reprends la main</button></div>
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
    renderJeVerifieMaVersion(root, slug);
    return;
  }
  renderJeVerifieMain(root, slug);
}

function cleanup() {}

const OutilJeVerifieScreen = { render, cleanup };

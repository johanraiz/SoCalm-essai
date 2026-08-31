// J'accueille mes émotions, je m'équilibre — le coussin des émotions, catégorie Mes ressources.
// Texte et nom finalisés (v0.57). Gabarit repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran D).
//
// Écarts constatés entre la maquette et le texte du cahier des charges (v0.57) : la maquette fusionne
// plusieurs phrases et en perd des fragments — "et où tu te sens en sécurité" (2e paragraphe),
// "de la couleur qui représente pour toi la sécurité et la protection" (réduit à "protectrice"),
// la phrase entière "Ou repasse ta journée, et identifie si des émotions sont encore présentes pour
// toi." (absente), et "une fois qu'elle a fait son travail" (fin de la phrase sur l'apaisement).
// Conformément à la règle posée par Johan (v1.39, "les versions les plus récentes sont toujours les
// bonnes") et à l'en-tête de ce fichier de maquette (produit à partir des textes déjà validés, donc
// postérieur à eux), la version de la maquette est retenue par défaut ici — signalée pour
// transparence, sans bloquer sur une question.

function renderCoussinMain(root, slug) {
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
      <h3 class="title title-sm">J'accueille mes émotions, je m'équilibre</h3>
      <div class="body-copy">
        <p><strong>Choisis un coussin</strong> que tu n'utiliseras que pour cet exercice.</p>
        <p>Chaque soir, ou chaque fois que tu en sens le besoin, <strong>prends un moment pour toi</strong>, dans un endroit où tu ne seras pas dérangé.</p>
        <p><strong>Connecte-toi</strong> à ta figure ressource, ou imagine que tu es entouré d'une <strong>bulle de lumière protectrice</strong>. Prends quelques respirations, en portant ton attention à travers ton cœur.</p>
        <p>Puis <strong>laisse venir les émotions</strong>, si tu en ressens. Observe-les. Laisse-leur le droit de s'exprimer — une émotion accueillie et exprimée s'apaise généralement d'elle-même.</p>
        <p><strong>Fais-toi confiance.</strong></p>
        <p>Tu peux utiliser le coussin pour taper dessus, pour crier dedans, ou le serrer fort dans tes bras, selon ton besoin. Utilise-le pour libérer ce que tu ressens maintenant, plutôt que pour rejouer ce qui t'a mis en colère.</p>
        <p>Sois créatif, et écoute ce qui te fait du bien.</p>
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
      renderCoussinMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderCoussinMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ J'accueille mes émotions, je m'équilibre</button></div>
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
    renderCoussinMaVersion(root, slug);
    return;
  }
  renderCoussinMain(root, slug);
}

function cleanup() {}

const OutilCoussinScreen = { render, cleanup };

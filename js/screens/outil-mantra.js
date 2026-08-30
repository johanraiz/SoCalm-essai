// Le mantra — fiche outil, catégorie Je m'ancre. Texte finalisé (v0.37, simplifié v1.01).
// Gabarit repris de la maquette validée design/ecrans-outils-je-mancre.html (écran A).
let mantraRaf = null;
function stopMantraAnim() {
  if (mantraRaf) cancelAnimationFrame(mantraRaf);
  mantraRaf = null;
}

function startMantraAnim(root) {
  const el = root.querySelector("#mantraTxt");
  if (!el) return;
  const phrase1 = "À chaque instant, je fais de mon mieux.";
  const phrase2 = "Chaque petit pas compte.";
  let start = null;
  function update(now) {
    if (start === null) start = now;
    const elapsed = (now - start) % 8000;
    const current = elapsed < 4000 ? phrase1 : phrase2;
    if (el.textContent !== current) el.textContent = current;
    mantraRaf = requestAnimationFrame(update);
  }
  mantraRaf = requestAnimationFrame(update);
}

function renderMain(root, slug) {
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
      <h3 class="title title-sm">Le mantra</h3>
      <div class="usage-badge">Outil flash</div>
      <div class="body-copy">
        <p>Pose ton <strong>attention sur ton cœur</strong>. Respire avec moi.</p>
      </div>
      <div class="mantra-wrap">
        <div class="mantra-circle"><span class="mantra-txt" id="mantraTxt">À chaque instant, je fais de mon mieux.</span></div>
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
      renderMain(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));

  startMantraAnim(root);
}

function renderMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Le mantra</button></div>
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
  stopMantraAnim();
  const slug = params.slug;
  if (params.step === "maversion") {
    renderMaVersion(root, slug);
    return;
  }
  renderMain(root, slug);
}

function cleanup() {
  stopMantraAnim();
}

const OutilMantraScreen = { render, cleanup };

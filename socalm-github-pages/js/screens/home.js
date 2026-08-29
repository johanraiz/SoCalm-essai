function render(root) {
  const prenom = store.getPrenom();

  const journalSvg = `<svg viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M50 22 V82"/>
    <path d="M50 26 C 42 20, 30 18, 20 20 V78 C 30 76, 42 78, 50 84"/>
    <path d="M50 26 C 58 20, 70 18, 80 20 V78 C 70 76, 58 78, 50 84"/>
    <path d="M28 34 H42" stroke-width="4.2"/>
    <path d="M28 45 H42" stroke-width="4.2"/>
    <path d="M28 56 H40" stroke-width="4.2"/>
    <path d="M58 34 H72" stroke-width="4.2"/>
    <path d="M58 45 H72" stroke-width="4.2"/>
    <path d="M58 56 H70" stroke-width="4.2"/>
  </svg>`;

  const pointDepart = store.getPointDepart();
  const view = store.getHomeView();

  const catsHtmlListe = categories.map(cat => {
    const recommended = pointDepart && cat.id === pointDepart;
    return `
    <div class="cat-section ${recommended ? "recommended" : ""}">
      <h2>${escapeHtml(cat.name)} ${recommended ? `<span class="cat-badge-pour-toi">Pour toi</span>` : ""}</h2>
      <div class="tool-grid">
        ${cat.tools.map(t => `
          <button class="tool-card ${t.live ? "" : "locked"}" ${t.live ? `data-route="${t.route}"` : "disabled"}>
            ${escapeHtml(t.name)}
            ${t.live ? "" : `<span class="soon">à venir dans cette version d'essai</span>`}
          </button>
        `).join("")}
      </div>
    </div>
  `;
  }).join("");

  const tileIcons = {
    "je-respire": gridIcon_jeRespire,
    "je-mancre": gridIcon_jeMancre,
    "comprendre": gridIcon_comprendre,
    "mes-ressources": gridIcon_mesRessources
  };

  const catsHtmlGrille = `
    <div class="grid-tiles">
      ${categories.map(cat => {
        const recommended = pointDepart && cat.id === pointDepart;
        return `
          <button class="grid-tile ${recommended ? "recommended" : ""}" data-route="#/categorie/${cat.id}">
            ${recommended ? `<span class="cat-badge-pour-toi tile-badge">Pour toi</span>` : ""}
            <img class="grid-tile-icon" src="${tileIcons[cat.id] || ""}" alt="">
            <span class="grid-tile-name">${escapeHtml(cat.name)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  root.innerHTML = `
    <div class="screen">
      <h1 class="title">${prenom ? "Bonjour " + escapeHtml(prenom) : "SoCalm"}</h1>
      <div class="subtitle">stockage local uniquement</div>
      <div class="central-btn-section">
        <button class="cbtn-wrap" data-route="#/detresse">
          <span class="cbtn-ring"></span>
          <span class="cbtn-ring cbtn-ring-2"></span>
          <span class="cbtn"><span class="cbtn-txt">Moment difficile</span></span>
        </button>
        <div class="tap-label">Un seul bouton, <b>toujours au même endroit</b>, pour les moments où choisir devient trop difficile.</div>
        <div class="feed-note">Alimenté par tes outils les mieux notés — jamais par un choix à faire dans l'instant.</div>
        <div class="proposal-flag">emplacement et taille du bouton — proposition à confirmer</div>
      </div>
      <button class="journal-pill" data-route="#/journal">
        <span class="journal-badge">${journalSvg}</span>
        Mon journal
      </button>
      <div class="view-toggle" data-view-toggle>
        <button class="view-toggle-btn ${view === "grille" ? "on" : ""}" data-view="grille">Vue grille</button>
        <button class="view-toggle-btn ${view === "liste" ? "on" : ""}" data-view="liste">Vue liste</button>
      </div>
      <div class="proposal-flag">proposition à comparer — pas encore validée par Johan</div>
      ${view === "grille" ? catsHtmlGrille : catsHtmlListe}
      <div class="note">
        <strong>Version d'essai —</strong> seuls le module « Je me sens anxieux·se, c'est quoi exactement ? », l'outil « Je respire, je m'apaise en profondeur » et la boîte à compliments du Journal sont fonctionnels pour l'instant. Le reste de la grille arrive ensuite.
      </div>
    </div>
  `;

  root.querySelectorAll("[data-route]").forEach(b => {
    b.addEventListener("click", () => navigate(b.getAttribute("data-route")));
  });
  root.querySelectorAll("[data-view]").forEach(b => {
    b.addEventListener("click", () => {
      store.setHomeView(b.getAttribute("data-view"));
      HomeScreen.render(root);
    });
  });
}

const HomeScreen = { render };

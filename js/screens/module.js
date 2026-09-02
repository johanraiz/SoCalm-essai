const MODULES = { fondateur, evitement, "neurologie-crise": neurologieCrise, "anticipation-anxieuse": anticipationAnxieuse, "pensees-intrusives": penseesIntrusives, catastrophisme, "perte-controle": perteControle, "declencheurs-personnels": declencheursPersonnels, emotions, "body-scan": bodyScan, "symptomes-digestifs": symptomesDigestifs, "respiration-module": respirationModule, "anxiete-matin": anxieteMatin, "rumination-soir": ruminationSoir, sommeil };

// Aplatit les volets en une liste unique de cases, avec les métadonnées
// nécessaires à la barre de progression et à la couleur du panneau.
//
// Comptage des cases "planches" à part (v1.53) : une case `panelHtml` (tableau, anecdote) n'est jamais
// comptée dans le "i / total" d'un volet — cohérent avec le principe déjà posé (v1.51, module.js) que
// ces cases n'affichent elles-mêmes aucune barre de progression, et avec la méta-description de chaque
// module, qui distingue toujours "cases" d'un côté et "tableau"/"expérience" de l'autre. Bogue trouvé
// en préparant "peur de perdre le contrôle" (dont l'anecdote s'intercale entre deux cases numérotées du
// volet 2, pas seulement en fin de volet comme "évitement" et "pensées intrusives") : le dénominateur
// (`caseCountInVolet`) comptait à tort TOUTES les entrées du volet, planches comprises — "évitement"
// affichait ainsi "Case 1 / 7" au lieu de "Case 1 / 5" (5 cases réelles, tableau et anecdote à part)
// depuis sa construction (v1.48). Corrigé pour tous les modules à la fois : seules les cases sans
// `panelHtml` sont comptées, qu'elles soient en fin de volet ou intercalées au milieu.
function flattenCases(mod) {
  const flat = [];
  mod.volets.forEach((volet, vIdx) => {
    const countable = volet.cases.filter(c => !c.panelHtml).length;
    let realIdx = 0;
    volet.cases.forEach((c) => {
      const isCountable = !c.panelHtml;
      flat.push({
        ...c,
        voletIndex: vIdx,
        voletNum: volet.num,
        voletName: volet.name,
        voletColor: volet.color,
        caseIndex: realIdx,
        caseCountInVolet: countable,
        caseNum: String(realIdx + 1).padStart(2, "0")
      });
      if (isCountable) realIdx++;
    });
  });
  return flat;
}

function renderCover(root, mod, slug) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Comprendre</button></div>
      <div class="cat-badge">${escapeHtml(mod.cover.badge)}</div>
      <h3 class="title">${escapeHtml(mod.cover.title)}</h3>
      <div class="cover-desc">${mod.cover.desc}</div>
      <div class="meta-row"><span>📖 ${escapeHtml(mod.cover.meta)}</span></div>
      <div class="volet-list">
        ${mod.cover.volets.map((v, i) => `
          <div class="row"><div class="n">${i + 1}</div><div class="t">${escapeHtml(v)}</div></div>
        `).join("")}
      </div>
      ${mod.cover.related ? `
        <div class="related-box">
          <div class="h">Ça peut aussi t'intéresser</div>
          ${escapeHtml(mod.cover.related)}
        </div>
      ` : ""}
      <div class="spacer"></div>
      <button class="btn-primary" data-start>Commencer</button>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/"));
  root.querySelector("[data-start]").addEventListener("click", () => {
    const startAt = store.getCaseProgress(slug) || 0;
    navigate(`#/module/${slug}/${startAt}`);
  });
}

function renderCase(root, mod, slug, index) {
  const flat = flattenCases(mod);
  const total = flat.length;
  const i = Math.min(Math.max(index, 0), total - 1);
  const c = flat[i];

  const colorVar = `var(--${c.voletColor})`;
  const pct = ((c.caseIndex + 1) / c.caseCountInVolet) * 100;

  // Cases "planches" (panelHtml, v1.48) : contenu bespoke — tableau à double entrée, anecdote longue
  // — qui ne rentre pas dans le gabarit case-text centré (introduit pour le module "évitement", dont
  // le tableau et l'expérience personnelle ne sont, dans l'écran témoin validé, ni centrés ni colorés
  // comme les cases du mécanisme). Garde la même navigation (barre de progression, zones de tap,
  // glisser) que les cases ordinaires — seul l'habillage du panneau change.
  let panelInner, bg, border;
  if (c.panelHtml) {
    panelInner = c.panelHtml;
    bg = "transparent";
    border = "none";
  } else {
    let textColor, numColor;
    if (c.climax) {
      // La couleur de fond d'une case climax est, par défaut, un sage-dark constant (déjà en place pour
      // "fondateur" — validé même dans des volets gold-dark/terracotta) — mais l'écran témoin validé
      // d'"anticipation anxieuse" (v1.09) fait un choix différent pour CE module précis : chaque volet
      // clôture sur SA PROPRE couleur d'identité (gold-dark, terracotta, slate), pas sur un sage-dark
      // uniforme. c.climaxBg (v1.50), optionnel, permet cette exception sans toucher aux trois modules
      // déjà en ligne qui ne l'utilisent pas.
      bg = c.climaxBg || "var(--sage-dark)";
      textColor = "#fff";
      numColor = "#fff";
    } else if (c.caseIndex % 2 === 0) {
      bg = "var(--cream)";
      textColor = "var(--ink)";
      numColor = "var(--sage-dark)";
    } else {
      bg = "var(--gold)";
      textColor = "var(--gold-ink)";
      numColor = "var(--gold-ink)";
    }
    border = c.climax ? "none" : (c.caseIndex % 2 === 0 ? "1px solid var(--card-border)" : "none");
    // Emphase typographique supplémentaire (v1.50) : certaines cases climax précises, signalées par
    // Johan (note v0.83 pour neurologie de la crise, réappliquée v0.90 pour anticipation anxieuse),
    // reçoivent en plus un texte agrandi et en gras — distinct du traitement climax de base (fond +
    // halo), que toutes les autres cases climax gardent sans cet ajout.
    const emphasisStyle = c.emphasis ? " font-weight:800; font-size:21px;" : "";
    panelInner = `
      <div class="case-num" style="color:${numColor};">${c.caseNum}</div>
      <div class="case-text" style="color:${textColor};${emphasisStyle}">${c.text}</div>
    `;
  }

  // Un ou plusieurs liens de clôture (v1.49) : "neurologie de la crise" en cite deux (respiration et
  // ancrage), à la différence de "fondateur" qui n'en citait qu'un seul — closing.links (tableau)
  // accepté en plus de closing.link (un seul), pour ne rien changer au module déjà en ligne.
  //
  // Plusieurs sections de clôture distinctes (v1.55) : "émotions" est le premier module dont l'écran
  // témoin valide DEUX phrases d'intro séparées, chacune suivie de son propre lien ("Tu retrouveras ce
  // mécanisme en détail dans :" → module rumination du soir, puis "Pour retrouver l'accès à toute la
  // palette :" → coussin des émotions) — pas une seule intro partagée par plusieurs liens comme
  // "neurologie de la crise". closing.sections (tableau de {intro, links|link}) accepté en plus de la
  // forme à une seule section, pour ne rien changer aux six modules déjà en ligne qui l'utilisent.
  //
  // Lien vers un module pas encore construit (v1.55) : "émotions" renvoie vers "rumination du soir"
  // (module suivant dans la file de construction, pas encore livré) — repris du principe déjà en place
  // dans js/screens/journal.js pour le lien vers "évitement" avant sa construction : un lien dont la
  // cible n'est pas encore live (categories, js/data/grid.js) s'affiche grisé, avec " — à venir" ajouté
  // à la description, sans handler de clic — jamais un lien mort. link.moduleCheck (v1.55) déclenche
  // cette vérification ; le lien redevient automatiquement actif dès que le module cible passe à
  // live:true, sans repasser par ce fichier de données.
  const renderClosingLink = (l) => {
    if (l.moduleCheck) {
      const target = categories.flatMap(cat => cat.tools).find(t => t.id === l.moduleCheck);
      if (!target || !target.live) {
        return `
          <div class="link-row disabled">
            <div><div class="t">${escapeHtml(l.title)}</div><div class="d">${escapeHtml(l.desc)} — à venir</div></div>
          </div>
        `;
      }
    }
    return `
      <a class="link-row" href="${l.route}" data-link>
        <div><div class="t">${escapeHtml(l.title)}</div><div class="d">${escapeHtml(l.desc)}</div></div>
        <span class="chev">›</span>
      </a>
    `;
  };
  let closingHtml = "";
  if (c.closing) {
    if (c.closing.sections) {
      closingHtml = c.closing.sections.map(sec => `
        <div class="closing-hint">${escapeHtml(sec.intro)}</div>
        ${(sec.links || (sec.link ? [sec.link] : [])).map(renderClosingLink).join("")}
      `).join("");
    } else {
      const links = c.closing.links || (c.closing.link ? [c.closing.link] : []);
      closingHtml = `
        <div class="closing-hint">${escapeHtml(c.closing.intro)}</div>
        ${links.map(renderClosingLink).join("")}
      `;
    }
  }

  // Barre de progression masquée pour les cases "planches" (v1.51) : le tableau et l'anecdote
  // d'"évitement" (v1.48) n'en montrent aucune dans l'écran témoin validé (ni l'anecdote de "pensées
  // intrusives", même schéma) — cohérent avec la méta-description du module elle-même, qui distingue
  // déjà "cases" d'un côté et "tableau"/"expérience" de l'autre (jamais comptés ensemble). Bogue trouvé
  // en préparant "pensées intrusives" : le module "évitement", déjà en ligne, affichait par erreur
  // "Volet 1 — 7 / 7" sur son tableau et son anecdote — corrigé ici, sans toucher à la navigation
  // (retour, glisser, toucher pour avancer), absente elle aussi de la maquette sur ces écrans précis
  // mais nécessaire pour ne pas laisser la personne bloquée sans moyen d'avancer ou de revenir.
  // Étiquette de progression (v1.52) : un module à volet unique, sans découpage affiché sur la
  // couverture (déjà le cas pour "évitement", cover.volets vide) montre, dans son propre écran témoin,
  // "Case i / total" plutôt que "Volet 1 — i / total" — le mot "Volet" n'a pas de sens quand il n'y a
  // qu'une seule séquence de cases, jamais nommée comme un volet ailleurs dans l'app. Bogue trouvé en
  // préparant "catastrophisme" : "évitement", déjà en ligne, affichait "Volet 1 —" par erreur depuis sa
  // construction (v1.48) — corrigé ici pour les deux modules à la fois.
  const fracLabel = mod.volets.length === 1
    ? `Case ${c.caseIndex + 1} / ${c.caseCountInVolet}`
    : `Volet ${c.voletNum} — ${c.caseIndex + 1} / ${c.caseCountInVolet}`;
  const progressHtml = c.panelHtml ? "" : `
      <div class="case-progress">
        <div class="bar"><i style="width:${pct}%; background:${colorVar};"></i></div>
        <div class="frac" style="color:${colorVar};">${fracLabel}</div>
      </div>`;

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ ${escapeHtml(mod.cover.title)}</button></div>
      ${progressHtml}
      <div class="case-panel ${c.climax ? "climax" : ""} ${c.panelHtml ? (c.panelClass || "case-panel-plain") : ""}" style="background:${bg}; border:${border};" data-panel>
        ${c.climax ? '<div class="glow-ring"></div>' : ""}
        ${panelInner}
        <div class="case-tap-zone"><div class="z" data-prev></div><div class="z" data-next></div></div>
      </div>
      ${closingHtml}
      <div class="swipe-hint">${i < total - 1 ? "‹ toucher pour avancer ›" : "fin du module"}</div>
    </div>
  `;

  store.setCaseProgress(slug, i);

  root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/module/${slug}`));

  const goTo = (ni) => {
    if (ni < 0) { navigate(`#/module/${slug}`); return; }
    if (ni >= total) return;
    navigate(`#/module/${slug}/${ni}`);
  };

  root.querySelector("[data-prev]").addEventListener("click", () => goTo(i - 1));
  root.querySelector("[data-next]").addEventListener("click", () => goTo(i + 1));

  root.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    });
  });

  // Glisser (swipe) pour avancer / reculer, en plus du tap.
  let touchStartX = null;
  const panel = root.querySelector("[data-panel]");
  panel.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  panel.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? i + 1 : i - 1);
    touchStartX = null;
  }, { passive: true });
}

function render(root, params) {
  const mod = MODULES[params.slug];
  if (!mod) {
    root.innerHTML = `<div class="screen"><div class="empty-state">Module introuvable.</div></div>`;
    return;
  }
  if (params.index === undefined) {
    renderCover(root, mod, params.slug);
  } else {
    renderCase(root, mod, params.slug, parseInt(params.index, 10) || 0);
  }
}

const ModuleScreen = { render };

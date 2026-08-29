const MODULES = { fondateur };

// Aplatit les volets en une liste unique de cases, avec les métadonnées
// nécessaires à la barre de progression et à la couleur du panneau.
function flattenCases(mod) {
  const flat = [];
  mod.volets.forEach((volet, vIdx) => {
    volet.cases.forEach((c, cIdx) => {
      flat.push({
        ...c,
        voletIndex: vIdx,
        voletNum: volet.num,
        voletName: volet.name,
        voletColor: volet.color,
        caseIndex: cIdx,
        caseCountInVolet: volet.cases.length,
        caseNum: String(cIdx + 1).padStart(2, "0")
      });
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
      <div class="related-box">
        <div class="h">Ça peut aussi t'intéresser</div>
        ${escapeHtml(mod.cover.related)}
      </div>
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

  let bg, textColor, numColor;
  if (c.climax) {
    bg = "var(--sage-dark)";
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
  const border = c.climax ? "none" : (c.caseIndex % 2 === 0 ? "1px solid var(--card-border)" : "none");

  let closingHtml = "";
  if (c.closing) {
    closingHtml = `
      <div class="closing-hint">${escapeHtml(c.closing.intro)}</div>
      <a class="link-row" href="${c.closing.link.route}" data-link>
        <div><div class="t">${escapeHtml(c.closing.link.title)}</div><div class="d">${escapeHtml(c.closing.link.desc)}</div></div>
        <span class="chev">›</span>
      </a>
    `;
  }

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ ${escapeHtml(mod.cover.title)}</button></div>
      <div class="case-progress">
        <div class="bar"><i style="width:${pct}%; background:${colorVar};"></i></div>
        <div class="frac" style="color:${colorVar};">Volet ${c.voletNum} — ${c.caseIndex + 1} / ${c.caseCountInVolet}</div>
      </div>
      <div class="case-panel ${c.climax ? "climax" : ""}" style="background:${bg}; border:${border};" data-panel>
        ${c.climax ? '<div class="glow-ring"></div>' : ""}
        <div class="case-num" style="color:${numColor};">${c.caseNum}</div>
        <div class="case-text" style="color:${textColor};">${c.text}</div>
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

  const link = root.querySelector("[data-link]");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    });
  }

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

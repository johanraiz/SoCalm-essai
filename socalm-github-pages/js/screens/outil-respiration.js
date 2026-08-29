let rafId = null;
function stopAnim() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

function seq3(thirdLabel) {
  return [
    { t: 0, label: "Inspire" },
    { t: 1000, label: "2" }, { t: 2000, label: "3" }, { t: 3000, label: "4" },
    { t: 4000, label: "Bloque" },
    { t: 5000, label: "2" }, { t: 6000, label: "3" }, { t: 7000, label: "4" },
    { t: 8000, label: thirdLabel },
    { t: 9000, label: "2" }, { t: 10000, label: "3" }, { t: 11000, label: "4" }, { t: 12000, label: "5" }, { t: 13000, label: "6" }
  ];
}

function labelFor(seq, elapsed) {
  let current = seq[0].label;
  for (const s of seq) if (elapsed >= s.t) current = s.label;
  return current;
}

function renderSelection(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Je respire</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">${escapeHtml(respiration.title)}</h3>
      <div class="usage-badge">${escapeHtml(respiration.usageBadge)}</div>
      ${respiration.levels.filter(l => l.type !== "bubble").map(l => `
        <button class="level-card ${l.suggested ? "suggested" : ""}" data-level="${l.num}">
          <div class="level-num">${l.num}</div>
          <div class="level-txt">
            <div class="h">${escapeHtml(l.h)}</div>
            <div class="d">${escapeHtml(l.d)}</div>
            ${l.tag ? `<div class="level-tag">${escapeHtml(l.tag)}</div>` : ""}
          </div>
        </button>
      `).join("")}
      <div class="spacer"></div>
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/"));
  root.querySelectorAll("[data-level]").forEach(b => {
    b.addEventListener("click", () => navigate(`#/outil/${slug}/${b.getAttribute("data-level")}`));
  });
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderSelection(root, slug);
    });
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => navigate(`#/outil/${slug}/maversion`));
}

function renderLevel1(root, slug, level) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Niveaux</button><span class="back">1 / 3</span></div>
      <div class="body-copy"><p>${escapeHtml(level.intro)}</p></div>
      <div class="phase-label" id="labelB">Inspire</div>
      <div class="curve-wrap">
        <div class="curve-track">
          <svg viewBox="0 0 256 210" preserveAspectRatio="none">
            <path id="curvePathRef" d="M0,35 L20,35 C57,35 94,175 128,175 C146,175 165,35 202,35 L256,35" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3.5" stroke-linecap="round"/>
          </svg>
          <svg viewBox="0 0 256 210" preserveAspectRatio="none">
            <path d="M0,35 L20,35 C57,35 94,175 128,175 C146,175 165,35 202,35 L256,35" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="curve-marker"></div>
      </div>
      <div class="body-copy">${level.body.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/outil/${slug}`));

  const labelEl = root.querySelector("#labelB");
  const track = root.querySelector(".curve-track");
  const marker = root.querySelector(".curve-marker");
  const pathEl = root.querySelector("#curvePathRef");
  let sampleY = null;
  if (pathEl && pathEl.getTotalLength) {
    const totalLen = pathEl.getTotalLength();
    const N = 300;
    const samples = [];
    for (let i = 0; i <= N; i++) {
      const pt = pathEl.getPointAtLength(totalLen * i / N);
      samples.push({ x: pt.x, y: pt.y });
    }
    sampleY = function (x) {
      if (x <= samples[0].x) return samples[0].y;
      if (x >= samples[samples.length - 1].x) return samples[samples.length - 1].y;
      for (let k = 1; k < samples.length; k++) {
        if (samples[k].x >= x) {
          const a = samples[k - 1], b = samples[k];
          const u = (x - a.x) / ((b.x - a.x) || 1);
          return a.y + (b.y - a.y) * u;
        }
      }
      return samples[samples.length - 1].y;
    };
  }

  const seq = seq3("Expire");
  let start = null;
  function update(now) {
    if (start === null) start = now;
    const elapsed = (now - start) % 14000;
    const current = labelFor(seq, elapsed);
    if (labelEl.textContent !== current) labelEl.textContent = current;
    if (sampleY) {
      const scrollOffset = (elapsed / 14000) * 256;
      track.style.transform = "translateX(" + (-scrollOffset) + "px)";
      const sampleX = (128 + scrollOffset) % 256;
      marker.style.top = sampleY(sampleX) + "px";
    }
    rafId = requestAnimationFrame(update);
  }
  rafId = requestAnimationFrame(update);
}

function renderLevel2(root, slug, level) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Niveaux</button><span class="back">2 / 3</span></div>
      <div class="body-copy"><p>${level.intro}</p></div>
      <div class="heart-wrap"><div class="heart-circle"><span class="heart-label" id="labelC">Inspire</span></div></div>
      <div class="body-copy">${level.body.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/outil/${slug}`));
  const labelEl = root.querySelector("#labelC");
  const seq = seq3("Souffle");
  let start = null;
  function update(now) {
    if (start === null) start = now;
    const elapsed = (now - start) % 14000;
    const current = labelFor(seq, elapsed);
    if (labelEl.textContent !== current) labelEl.textContent = current;
    rafId = requestAnimationFrame(update);
  }
  rafId = requestAnimationFrame(update);
}

function renderLevel3Choice(root, slug, level) {
  let chosenWord = sessionStorage.getItem("socalm.resp.word") || level.words[1];
  let chosenColorIdx = parseInt(sessionStorage.getItem("socalm.resp.colorIdx") || "1", 10);
  let customWord = "";

  function paint() {
    root.innerHTML = `
      <div class="screen">
        <div class="back-row"><button class="back" data-back>‹ Niveaux</button><span class="back">3 / 3</span></div>
        <div class="body-copy">
          <p>${escapeHtml(level.intro)}</p>
          <p style="font-style:italic; color:var(--sage-dark);">${escapeHtml(level.introNote)}</p>
        </div>
        <div>
          ${level.words.map(w => `<button class="word-chip ${w === chosenWord ? "chosen" : ""}" data-word="${escapeHtml(w)}">${escapeHtml(w)}</button>`).join("")}
          <input class="word-chip custom" id="customWordInput" type="text" placeholder="ou le tien..." value="${escapeHtml(customWord)}">
        </div>
        <div class="body-copy"><p>Choisis une couleur qui représente cet état pour toi.</p></div>
        <div class="color-row">
          ${level.colors.map((c, i) => `
            <button class="color-dot ${i === chosenColorIdx ? "chosen" : ""}" data-color="${i}"
              style="background:radial-gradient(circle at 35% 30%, ${c.from}, ${c.to}); box-shadow:0 0 14px 4px ${c.glow};"></button>
          `).join("")}
        </div>
        <div class="spacer"></div>
        <button class="btn-primary" data-continue>Continuer</button>
      </div>
    `;
    root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/outil/${slug}`));
    root.querySelectorAll("[data-word]").forEach(b => b.addEventListener("click", () => {
      chosenWord = b.getAttribute("data-word");
      customWord = "";
      paint();
    }));
    const customInput = root.querySelector("#customWordInput");
    customInput.addEventListener("input", () => {
      customWord = customInput.value;
      if (customWord.trim()) chosenWord = customWord.trim();
    });
    root.querySelectorAll("[data-color]").forEach(b => b.addEventListener("click", () => {
      chosenColorIdx = parseInt(b.getAttribute("data-color"), 10);
      paint();
    }));
    root.querySelector("[data-continue]").addEventListener("click", () => {
      sessionStorage.setItem("socalm.resp.word", chosenWord || level.words[1]);
      sessionStorage.setItem("socalm.resp.colorIdx", String(chosenColorIdx));
      navigate(`#/outil/${slug}/3b`);
    });
  }
  paint();
}

function renderLevel3Bubble(root, slug, level) {
  const word = sessionStorage.getItem("socalm.resp.word") || "Légèreté";
  const colorIdx = parseInt(sessionStorage.getItem("socalm.resp.colorIdx") || "1", 10);
  const color = respiration.levels.find(l => l.type === "choice").colors[colorIdx];

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Niveaux</button><span class="back">3 / 3</span></div>
      <div class="body-copy"><p>Imagine ta couleur — <em>${escapeHtml(word)}</em> — enveloppée dans une bulle de lumière, juste devant ton cœur.</p></div>
      <div class="bubble-wrap">
        <div class="bubble" style="background: radial-gradient(circle at 35% 30%, ${color.from}, ${color.to});">
          <span class="bubble-word">${escapeHtml(word)}</span>
          <span class="heart-label" id="labelE" style="color:var(--gold-ink); text-shadow:none;">Inspire</span>
        </div>
      </div>
      <div class="body-copy">${level.body.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate(`#/outil/${slug}/3`));
  const labelEl = root.querySelector("#labelE");
  const seq = seq3("Souffle");
  let start = null;
  function update(now) {
    if (start === null) start = now;
    const elapsed = (now - start) % 14000;
    const current = labelFor(seq, elapsed);
    if (labelEl.textContent !== current) labelEl.textContent = current;
    rafId = requestAnimationFrame(update);
  }
  rafId = requestAnimationFrame(update);
}

function renderMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ ${escapeHtml(respiration.title)}</button></div>
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
  stopAnim();
  const slug = params.slug;
  const step = params.step;

  if (!step) {
    renderSelection(root, slug);
    return;
  }
  if (step === "maversion") {
    renderMaVersion(root, slug);
    return;
  }
  if (step === "3b") {
    renderLevel3Bubble(root, slug, respiration.levels.find(l => l.type === "bubble"));
    return;
  }
  const levelNum = parseInt(step, 10);
  const level = respiration.levels.find(l => l.num === levelNum);
  if (!level) {
    renderSelection(root, slug);
    return;
  }
  if (level.type === "curve") renderLevel1(root, slug, level);
  else if (level.type === "heart") renderLevel2(root, slug, level);
  else if (level.type === "choice") renderLevel3Choice(root, slug, level);
}

function cleanup() {
  stopAnim();
}

const OutilRespirationScreen = { render, cleanup };

let breathRaf = null;

function stopBreathAnim() {
  if (breathRaf) cancelAnimationFrame(breathRaf);
  breathRaf = null;
}

function startBreathAnim(root) {
  const seq = [
    { t: 0, label: "Inspire" },
    { t: 1000, label: "2" },
    { t: 2000, label: "3" },
    { t: 3000, label: "4" },
    { t: 4000, label: "Expire" },
    { t: 5000, label: "2" },
    { t: 6000, label: "3" },
    { t: 7000, label: "4" },
    { t: 8000, label: "5" }
  ];
  const label = root.querySelector("#breathLabel");
  if (!label) return;
  let start = null;
  function update(now) {
    if (start === null) start = now;
    const elapsed = (now - start) % 9000;
    let current = seq[0].label;
    for (const s of seq) if (elapsed >= s.t) current = s.label;
    if (label.textContent !== current) label.textContent = current;
    breathRaf = requestAnimationFrame(update);
  }
  breathRaf = requestAnimationFrame(update);
}

function render(root, params) {
  stopBreathAnim();
  const stepIndex = Math.min(Math.max(parseInt(params.step || "0", 10) || 0, 0), onboardingSteps.length - 1);
  const step = onboardingSteps[stepIndex];
  const prenom = store.getPrenom();

  const dots = onboardingSteps.map((s, i) =>
    `<span class="${i === stepIndex ? "on" : ""}"></span>`
  ).join("");

  let inner = `<div class="dots">${dots}</div>`;

  if (step.id === "respiration") {
    inner += `
      <div class="breath-wrap"><div class="breath-circle"><span class="breath-label" id="breathLabel">Inspire</span></div></div>
      <div class="body-copy">
        ${step.body.map(p => `<p>${p}</p>`).join("")}
        <p class="closing">${step.closing}</p>
      </div>
      <div class="spacer"></div>
      <button class="btn-primary" data-next>Continuer</button>
    `;
  } else if (step.id === "accueil") {
    inner += `
      <div class="avatar">${step.avatar}</div>
      <div class="body-copy">${step.body.map(p => `<p>${p}</p>`).join("")}</div>
      <div class="spacer"></div>
      <button class="btn-primary" data-next>Continuer</button>
    `;
  } else if (step.id === "nom") {
    inner += `
      <div class="body-copy">
        <p class="closing">${step.closing}</p>
        <p>${step.body[1]}</p>
      </div>
      <input class="field" id="prenomInput" type="text" placeholder="${escapeHtml(step.placeholder)}" value="${escapeHtml(prenom)}">
      <div class="spacer"></div>
      <button class="btn-primary" data-next>Continuer</button>
      <button class="btn-secondary" data-skip-name>${step.skip}</button>
    `;
  } else if (step.id === "cadeau") {
    const prenomTxt = prenom ? escapeHtml(prenom) + ", " : "";
    inner += `
      <div class="body-copy"><p>${prenomTxt}${step.body[0]}</p></div>
      <div class="gift-card"><div class="mantra">${step.mantra}</div></div>
      <div class="spacer"></div>
      <button class="btn-primary" data-next>Continuer</button>
    `;
  } else if (step.id === "depart") {
    inner += `
      <div class="body-copy"><p>${step.body[0]}</p></div>
      ${step.options.map(o => `
        <button class="option" data-option data-route="${o.route}">
          <div class="h"><span class="ic">●</span>${escapeHtml(o.h)}</div>
          <div class="d">${escapeHtml(o.d)}</div>
        </button>
      `).join("")}
      <div class="spacer"></div>
      <button class="btn-secondary" data-next>${step.skip}</button>
    `;
  }

  root.innerHTML = `<div class="screen" id="onboardingScreen">${inner}</div>`;

  const goNext = () => {
    if (step.id === "nom") {
      const val = root.querySelector("#prenomInput").value.trim();
      if (val) store.setPrenom(val);
    }
    if (stepIndex >= onboardingSteps.length - 1) {
      store.setOnboardingDone(true);
      navigate("#/");
    } else {
      navigate("#/onboarding/" + (stepIndex + 1));
    }
  };

  root.querySelectorAll("[data-next]").forEach(b => b.addEventListener("click", goNext));
  const skipName = root.querySelector("[data-skip-name]");
  if (skipName) skipName.addEventListener("click", () => {
    store.setPrenom("");
    navigate("#/onboarding/" + (stepIndex + 1));
  });
  root.querySelectorAll("[data-option]").forEach(b => b.addEventListener("click", () => {
    // Ouvre directement sur le module suggéré (v1.62) plutôt que de simplement mémoriser un choix pour
    // l'accueil — la personne peut toujours revenir en arrière ensuite, rien n'est fermé (v0.74).
    store.setOnboardingDone(true);
    navigate(b.getAttribute("data-route"));
  }));

  if (step.id === "respiration") startBreathAnim(root);
}

function cleanup() {
  stopBreathAnim();
}

const OnboardingScreen = { render, cleanup };

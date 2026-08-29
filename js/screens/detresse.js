// Flux du bouton central / gestion de la détresse (v0.2, révisé v0.15-v0.16,
// message de cadrage finalisé v0.67, mockup ecran-bouton-central.html, v1.12).
// Tous les textes visibles sont repris mot pour mot du cahier des charges.
// Minuterie d'avancement automatique, tap pour continuer plus vite, et
// omission de la "rotation" entre plusieurs outils (un seul outil réellement
// en ligne pour l'instant) : choix d'implémentation de Claude, à confirmer.

let detresseTimer = null;
function clearDetresseTimer() {
  if (detresseTimer) clearTimeout(detresseTimer);
  detresseTimer = null;
}

function pickHistoryRedirect() {
  const eligibleCatIds = ["je-respire", "je-mancre"];
  const rated = [];
  categories.filter(c => eligibleCatIds.includes(c.id)).forEach(cat => {
    cat.tools.forEach(t => {
      if (t.live) {
        const n = store.getFavoris(t.id);
        if (n > 0) rated.push({ tool: t, n });
      }
    });
  });
  rated.sort((a, b) => b.n - a.n);
  return rated.length > 0 ? rated[0].tool : null;
}

function renderCadrage(root) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearDetresseTimer();
    navigate("#/detresse/redirection");
  };

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Accueil</button></div>
      <div class="framing-box" data-advance>
        <p>Tu es là, maintenant — et tu as fait le geste de venir chercher de l'aide. C'est déjà beaucoup.</p>
        <p><strong>Fais-toi confiance.</strong> <strong>Ça va passer.</strong> Je vais t'accompagner avec un outil pour t'aider à retrouver ton calme.</p>
      </div>
      <div class="tap-hint" data-advance>toucher pour continuer</div>
      <div class="spacer"></div>
      <div class="emergency-strip">
        <div class="lbl">Besoin d'aide tout de suite ?</div>
        <div class="txt">Le <b>3114</b>, gratuit et disponible 24h/24 (numéro national de prévention du suicide). En cas d'urgence vitale : le <b>15</b> ou le <b>112</b>.</div>
      </div>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", (e) => {
    e.stopPropagation();
    done = true;
    clearDetresseTimer();
    navigate("#/");
  });
  root.querySelectorAll("[data-advance]").forEach(el => el.addEventListener("click", finish));
  detresseTimer = setTimeout(finish, 5000);
}

function renderRedirection(root) {
  const tool = pickHistoryRedirect();
  const hasHistory = !!tool;
  const target = hasHistory ? `#/outil/${tool.id}` : "#/detresse/respiration-accueil";

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearDetresseTimer();
    navigate(target);
  };

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Accueil</button></div>
      <h3 class="title title-md">Redirection automatique</h3>
      <div class="subtitle">${hasHistory
        ? "L'app alterne parmi tes 2-3 outils les mieux notés."
        : "Aucune étoile notée encore — c'est la respiration d'accueil qui prend le relais."}</div>
      <div class="detresse-card" data-advance>
        <div class="lbl">Tu es dirigé·e vers</div>
        <div class="t">${hasHistory ? escapeHtml(tool.name) : "L'exercice de respiration d'onboarding"}</div>
        <div class="d">${hasHistory
          ? "l'un de tes outils les mieux notés — un choix déjà fait par toi, dans un moment plus calme, pour ne pas avoir à en faire un nouveau maintenant."
          : "le même que celui du tout premier écran de l'app — un repère déjà connu, même si c'est la première fois que la détresse te fait chercher de l'aide ici."}</div>
      </div>
      <div class="tap-hint" data-advance>toucher pour continuer</div>
      <div class="spacer"></div>
      <div class="emergency-strip">
        <div class="lbl">Besoin d'aide tout de suite ?</div>
        <div class="txt">Le <b>3114</b>, gratuit et disponible 24h/24. En cas d'urgence vitale : le <b>15</b> ou le <b>112</b>.</div>
      </div>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", (e) => {
    e.stopPropagation();
    done = true;
    clearDetresseTimer();
    navigate("#/");
  });
  root.querySelectorAll("[data-advance]").forEach(el => el.addEventListener("click", finish));
  detresseTimer = setTimeout(finish, 3200);
}

function renderRespirationAccueil(root) {
  const step = onboardingSteps.find(s => s.id === "respiration");
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Accueil</button></div>
      <div class="breath-wrap"><div class="breath-circle"><span class="breath-label" id="breathLabel">Inspire</span></div></div>
      <div class="body-copy">
        ${step.body.map(p => `<p>${p}</p>`).join("")}
        <p class="closing">${step.closing}</p>
      </div>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => {
    stopBreathAnim();
    navigate("#/");
  });
  startBreathAnim(root);
}

function render(root, params) {
  clearDetresseTimer();
  stopBreathAnim();
  if (params.step === "redirection") { renderRedirection(root); return; }
  if (params.step === "respiration-accueil") { renderRespirationAccueil(root); return; }
  renderCadrage(root);
}

function cleanup() {
  clearDetresseTimer();
  stopBreathAnim();
}

const DetresseScreen = { render, cleanup };

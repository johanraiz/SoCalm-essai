function renderHome(root) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Retour</button></div>
      <h3 class="title title-md">Journal</h3>
      <div class="subtitle">stockage local uniquement</div>
      <div class="mantra-banner">
        <div class="lbl">Ton mantra</div>
        <div class="txt">À chaque instant, je fais de mon mieux.<br>Chaque petit pas compte.</div>
      </div>
      ${journalMenu.map(item => `
        <button class="menu-row ${item.live ? "" : "disabled"}" ${item.live ? `data-route="${item.route}"` : "disabled"}>
          <div class="ic"><img src="${item.icon}" alt=""></div>
          <div><div class="t">${escapeHtml(item.name)}</div><div class="d">${escapeHtml(item.desc)}${item.live ? "" : " — à venir"}</div></div>
          <div class="chev">›</div>
        </button>
      `).join("")}
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/"));
  root.querySelectorAll("[data-route]").forEach(b => b.addEventListener("click", () => navigate(b.getAttribute("data-route"))));
}

function renderComplimentsAdd(root) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La boîte à compliments</h3>
      <div class="body-copy">
        <p>Un <strong>compliment</strong> qu'on t'a fait. Une <strong>petite victoire</strong> que tu as remarquée chez toi. Une <strong>pensée positive</strong> que tu t'es dite, sur toi-même.</p>
        <p><strong>Même minuscule, note-la ici. Elle compte.</strong></p>
      </div>
      <textarea class="field" id="complimentInput" placeholder="Écris ici…"></textarea>
      <button class="btn-primary" data-add>Ajouter</button>
      <button class="btn-secondary" data-consult>Voir mes compliments</button>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-consult]").addEventListener("click", () => navigate("#/journal/compliments/consulter"));
  root.querySelector("[data-add]").addEventListener("click", () => {
    const input = root.querySelector("#complimentInput");
    const text = input.value.trim();
    if (!text) return;
    store.addCompliment(text);
    toast("Ajouté à ta boîte à compliments");
    navigate("#/journal/compliments/consulter");
  });
}

function renderComplimentsConsult(root) {
  const entries = store.getCompliments();
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La boîte à compliments</h3>
      <div class="body-copy">
        <p>Ouvre la boîte quand tu veux, ou quand tu as besoin de te rappeler de quoi tu es capable.</p>
        <p><strong>Souviens-toi de chaque moment et respire-le avec ton cœur.</strong></p>
      </div>
      ${entries.length === 0
        ? `<div class="empty-state">Ta boîte est vide pour l'instant.</div>`
        : entries.map(e => `
          <div class="entry-row"><div class="date">${formatDate(e.date)}</div><div class="txt">${escapeHtml(e.text)}</div></div>
        `).join("")
      }
      <div class="spacer"></div>
      <button class="btn-primary" data-add>Ajouter un compliment</button>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-add]").addEventListener("click", () => navigate("#/journal/compliments"));
}

function renderDeclencheursAdd(root) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La liste des déclencheurs</h3>
      <div class="body-copy">
        <p>Quelque chose vient de te faire réagir — une situation, un lieu, une personne, ou peut-être une sensation, une pensée, un souvenir.</p>
        <p>Note-le ici, dès que tu le remarques. Pas besoin de l'expliquer, juste de le nommer.</p>
      </div>
      <textarea class="field" id="declencheurInput" placeholder="Écris ici…"></textarea>
      <button class="btn-primary" data-add>Ajouter</button>
      <button class="btn-secondary" data-consult>Voir ma liste</button>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-consult]").addEventListener("click", () => navigate("#/journal/declencheurs/consulter"));
  root.querySelector("[data-add]").addEventListener("click", () => {
    const input = root.querySelector("#declencheurInput");
    const text = input.value.trim();
    if (!text) return;
    store.addDeclencheur(text);
    toast("Ajouté à ta liste des déclencheurs");
    navigate("#/journal/declencheurs/consulter");
  });
}

function renderDeclencheursConsult(root) {
  const entries = store.getDeclencheurs();
  const plansMap = store.getPlansDeclencheurs();

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La liste des déclencheurs</h3>
      <div class="body-copy">
        <p>Voici <strong>ta carte</strong>, celle que tu redessines petit à petit.</p>
        <p>Relis-la quand tu veux mieux comprendre ce qui te touche — ce n'est pas une preuve de faiblesse, c'est une trace de ton histoire.</p>
      </div>
      ${entries.length === 0
        ? `<div class="empty-state">Ta liste est vide pour l'instant.</div>`
        : entries.map(e => {
          const hasPlan = !!plansMap[e.id];
          const plan = store.getPlanForDeclencheur(e.id);
          return `
          <div class="entry-row-wrap">
            <div class="entry-row">
              <div class="date">${formatDate(e.date)}</div>
              <div class="txt">${escapeHtml(e.text)}</div>
            </div>
            <button class="plan-toggle-btn ${hasPlan ? "has-plan" : ""}" data-plan-toggle="${e.id}">${hasPlan ? "✓ Plan enregistré" : "Je change ma façon de réagir"}</button>
            <div class="plan-block" data-plan-block="${e.id}" hidden>
              <div class="h">Est-ce qu'un même genre de situation revient, dans ce que tu as noté ?<br>Si tu le repères, tu peux te préparer un petit plan, pour la prochaine fois — une idée pour faire différemment, même un tout petit changement, minuscule :</div>
              <div class="plan-field"><b>La prochaine fois que je suis confronté à</b><div class="plan-situation-fixed">${escapeHtml(e.text)}</div></div>
              <div class="plan-field"><b>au lieu de faire</b><input type="text" class="plan-input" data-plan-field="reflexe" value="${escapeHtml(plan.reflexe)}" placeholder="…"></div>
              <div class="plan-field"><b>je peux faire</b><input type="text" class="plan-input" data-plan-field="action" value="${escapeHtml(plan.action)}" placeholder="…"></div>
              <button class="btn-primary" data-save-plan="${e.id}">Enregistrer</button>
            </div>
          </div>
        `;
        }).join("")
      }
      <div class="spacer"></div>
      <button class="btn-primary" data-add>Ajouter un déclencheur</button>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-add]").addEventListener("click", () => navigate("#/journal/declencheurs"));

  root.querySelectorAll("[data-plan-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-plan-toggle");
      const block = root.querySelector(`[data-plan-block="${id}"]`);
      if (block) block.hidden = !block.hidden;
    });
  });

  root.querySelectorAll("[data-save-plan]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-save-plan");
      const block = root.querySelector(`[data-plan-block="${id}"]`);
      const newPlan = {
        reflexe: block.querySelector("[data-plan-field='reflexe']").value,
        action: block.querySelector("[data-plan-field='action']").value
      };
      store.savePlanForDeclencheur(id, newPlan);
      toast("Enregistré");
      renderDeclencheursConsult(root);
      const reopened = root.querySelector(`[data-plan-block="${id}"]`);
      if (reopened) reopened.hidden = false;
    });
  });
}

// Journal — "La vérification des attentes" (v0.70, v0.73), catégorie de menu : Journal.
// Renvoie la proposition complète en tête de phrase ("Aujourd'hui, tu redoutais que...", "Hier,
// tu redoutais que...", "Il y a X jours, tu redoutais que...") : "Il y a aujourd'hui" ou "Il y a
// hier" ne fonctionnent pas grammaticalement, contrairement à "Il y a X jours" — corrigé suite à la
// remarque de Johan (v1.45), la fonction porte donc elle-même le "Il y a" quand il s'applique,
// plutôt que de le préfixer systématiquement à l'appel.
function departPhraseDepuisPrediction(iso) {
  const jours = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  if (jours <= 0) return "Aujourd'hui";
  if (jours === 1) return "Hier";
  return `Il y a ${jours} jours`;
}

function renderVerifAttentesAjouter(root) {
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La vérification des attentes</h3>
      <div class="body-copy">
        <p>Une prédiction, une peur pour ce qui s'en vient ? Note ce que tu redoutes, maintenant.</p>
        <p>Tu pourras vérifier plus tard ce qui s'est vraiment passé.</p>
      </div>
      <textarea class="field" id="predictionInput" placeholder="Écris ici…"></textarea>
      <button class="btn-primary" data-add>Noter</button>
      <button class="btn-secondary" data-consult>Voir mes vérifications</button>
      <div class="spacer"></div>
    </div>
  `;
  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-consult]").addEventListener("click", () => navigate("#/journal/verif-attentes/consulter"));
  root.querySelector("[data-add]").addEventListener("click", () => {
    const input = root.querySelector("#predictionInput");
    const text = input.value.trim();
    if (!text) return;
    store.addPrediction(text);
    toast("Noté — tu pourras vérifier plus tard");
    navigate("#/journal/verif-attentes/consulter");
  });
}

// Phrase de synthèse déterministe (v0.73) : jamais un score, jamais générée par IA — trois variantes
// figées, choisies selon la majorité des vérifications notées (l'évitement en est exclu, point 8).
function renderSyntheseVerifAttentes(scored) {
  if (scored.length < 5) return "";
  const total = scored.length;
  const bas = scored.filter(p => p.scale <= 2).length;
  const haut = scored.filter(p => p.scale >= 4).length;
  let txt;
  if (bas > total / 2) {
    txt = "Depuis que tu vérifies tes prédictions, c'est arrivé plus souvent plus doucement que prévu.";
  } else if (haut > total / 2) {
    txt = "Depuis que tu vérifies tes prédictions, la réalité a souvent rejoint, ou dépassé, ce que tu redoutais. C'est une chose importante à savoir sur toi — et peut-être à explorer plus loin, seul·e ou accompagné·e.";
  } else {
    txt = "Depuis que tu vérifies tes prédictions, chaque situation s'est passée différemment — parfois plus doucement, parfois non. C'est aussi une preuve : rien n'est jamais totalement écrit à l'avance.";
  }
  return `
    <div class="synth-block">
      <div class="lbl">Depuis que tu vérifies tes prédictions</div>
      <div class="txt">${txt}</div>
    </div>
  `;
}

function renderVerifAttentesConsult(root) {
  const entries = store.getPredictions();
  const scored = entries.filter(p => p.verified && !p.avoided && typeof p.scale === "number");

  // Le module "J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?" n'est pas encore construit
  // (cf. js/data/grid.js) : lien affiché tel quel dans le texte validé (v0.73), mais grisé "à venir"
  // en attendant, sur le même principe déjà appliqué aux entrées non construites de la grille (v0.43).
  const evitementModule = categories.flatMap(c => c.tools).find(t => t.id === "evitement");
  const evitementLive = evitementModule && evitementModule.live;

  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ Journal</button></div>
      <h3 class="title title-md">La vérification des attentes</h3>
      ${renderSyntheseVerifAttentes(scored)}
      ${entries.length === 0
        ? `<div class="empty-state">Rien à vérifier pour l'instant.</div>`
        : entries.map(p => `
          <div class="entry-row-wrap">
            <div class="entry-row">
              <div class="date">${formatDate(p.date)}</div>
              <div class="txt">${escapeHtml(p.text)}</div>
            </div>
            ${p.verified ? `
              <div class="plan-block">
                <div class="h">✓ Vérifié
                  ${p.avoided
                    ? `<span class="outcome-badge avoid">Évité</span>`
                    : (p.scale != null ? `<span class="outcome-badge ${p.scale <= 2 ? "soft" : (p.scale >= 4 ? "hard" : "")}">${p.scale}/5</span>` : "")}
                </div>
                ${p.resultText ? `<div class="plan-field">${escapeHtml(p.resultText)}</div>` : ""}
                ${p.petitPas ? `<div class="plan-field"><b>Un petit pas envisagé</b>${escapeHtml(p.petitPas)}</div>` : ""}
              </div>
            ` : `
              <button class="plan-toggle-btn" data-verif-toggle="${p.id}">Vérifier</button>
              <div class="plan-block" data-verif-block="${p.id}" hidden>
                <div class="h">${departPhraseDepuisPrediction(p.date)}, tu redoutais que <em>« ${escapeHtml(p.text)} »</em>.<br>Qu'est-ce qui s'est passé, vraiment ?</div>
                <textarea class="field" data-verif-field="resultText" placeholder="Écris ici…" style="margin-bottom:8px;"></textarea>
                <div class="field-lbl">Comparé à ce que tu redoutais, comment ça s'est passé ?</div>
                <div class="scale-row" data-scale-row="${p.id}">
                  <div class="scale-dot" data-scale-value="1">1</div>
                  <div class="scale-dot" data-scale-value="2">2</div>
                  <div class="scale-dot" data-scale-value="3">3</div>
                  <div class="scale-dot" data-scale-value="4">4</div>
                  <div class="scale-dot" data-scale-value="5">5</div>
                </div>
                <div class="scale-labels"><span>bien plus doux que prévu</span><span>bien pire que prévu</span></div>
                <div class="chip-row"><button class="chip" data-avoid-toggle="${p.id}">Je l'ai évité</button></div>
                <div class="avoid-block" data-avoid-block="${p.id}" hidden>
                  <div class="usage-note">C'est une information tout aussi précieuse.</div>
                  ${evitementLive
                    ? `<a class="link-row" href="#/module/evitement"><div><div class="t">J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?</div><div class="d">pourquoi éviter peut renforcer une peur sans jamais la vérifier</div></div><span class="chev">›</span></a>`
                    : `<div class="link-row disabled"><div><div class="t">J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?</div><div class="d">pourquoi éviter peut renforcer une peur sans jamais la vérifier — à venir</div></div><span class="chev">›</span></div>`}
                  <a class="link-row" href="#/outil/respiration-3-niveaux" data-respiration-link="${p.id}"><div><div class="t">Je respire, je m'apaise en profondeur</div><div class="d">un moment pour respirer, avant de continuer, si besoin</div></div><span class="chev">›</span></a>
                  <div class="field-lbl">À quoi ressemblerait un tout petit pas vers cette situation, la prochaine fois ?</div>
                  <textarea class="field" data-verif-field="petitPas" placeholder="(champ facultatif)"></textarea>
                </div>
                <p class="reflection-note" data-reflection-note="${p.id}">Si ça s'est passé comme tu le redoutais, ou pire : ton inquiétude a-t-elle pu y jouer un rôle ?</p>
                <button class="btn-primary" data-save-verif="${p.id}">Enregistrer</button>
              </div>
            `}
          </div>
        `).join("")
      }
      <div class="spacer"></div>
      <button class="btn-primary" data-add>Noter une prédiction</button>
    </div>
  `;

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/journal"));
  root.querySelector("[data-add]").addEventListener("click", () => navigate("#/journal/verif-attentes"));

  root.querySelectorAll("[data-verif-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-verif-toggle");
      const block = root.querySelector(`[data-verif-block="${id}"]`);
      if (block) block.hidden = !block.hidden;
    });
  });

  root.querySelectorAll("[data-scale-row]").forEach(row => {
    row.querySelectorAll(".scale-dot").forEach(dot => {
      dot.addEventListener("click", () => {
        row.querySelectorAll(".scale-dot").forEach(d => d.classList.remove("chosen"));
        dot.classList.add("chosen");
        const id = row.getAttribute("data-scale-row");
        const avoidBtn = root.querySelector(`[data-avoid-toggle="${id}"]`);
        const avoidBlock = root.querySelector(`[data-avoid-block="${id}"]`);
        if (avoidBtn) avoidBtn.classList.remove("on");
        if (avoidBlock) avoidBlock.hidden = true;
      });
    });
  });

  root.querySelectorAll("[data-avoid-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-avoid-toggle");
      const nowOn = !btn.classList.contains("on");
      btn.classList.toggle("on", nowOn);
      const avoidBlock = root.querySelector(`[data-avoid-block="${id}"]`);
      const reflectionNote = root.querySelector(`[data-reflection-note="${id}"]`);
      if (avoidBlock) avoidBlock.hidden = !nowOn;
      if (reflectionNote) reflectionNote.hidden = nowOn;
      if (nowOn) {
        const row = root.querySelector(`[data-scale-row="${id}"]`);
        if (row) row.querySelectorAll(".scale-dot").forEach(d => d.classList.remove("chosen"));
      }
    });
  });

  root.querySelectorAll("[data-respiration-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    });
  });

  root.querySelectorAll("[data-save-verif]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-save-verif");
      const block = root.querySelector(`[data-verif-block="${id}"]`);
      const avoided = root.querySelector(`[data-avoid-toggle="${id}"]`).classList.contains("on");
      const chosenDot = block.querySelector(`[data-scale-row="${id}"] .scale-dot.chosen`);
      const scale = chosenDot ? parseInt(chosenDot.getAttribute("data-scale-value"), 10) : null;
      if (!avoided && scale == null) {
        toast("Choisis une note, ou « Je l'ai évité »");
        return;
      }
      store.saveVerification(id, {
        resultText: block.querySelector("[data-verif-field='resultText']").value,
        avoided,
        scale,
        petitPas: block.querySelector("[data-verif-field='petitPas']").value
      });
      toast("Enregistré");
      renderVerifAttentesConsult(root);
    });
  });
}

function render(root, params) {
  if (!params.section) {
    renderHome(root);
  } else if (params.section === "compliments" && params.sub === "consulter") {
    renderComplimentsConsult(root);
  } else if (params.section === "compliments") {
    renderComplimentsAdd(root);
  } else if (params.section === "declencheurs" && params.sub === "consulter") {
    renderDeclencheursConsult(root);
  } else if (params.section === "declencheurs") {
    renderDeclencheursAdd(root);
  } else if (params.section === "verif-attentes" && params.sub === "consulter") {
    renderVerifAttentesConsult(root);
  } else if (params.section === "verif-attentes") {
    renderVerifAttentesAjouter(root);
  } else {
    renderHome(root);
  }
}

const JournalScreen = { render };

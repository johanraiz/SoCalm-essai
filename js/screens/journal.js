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
  } else {
    renderHome(root);
  }
}

const JournalScreen = { render };

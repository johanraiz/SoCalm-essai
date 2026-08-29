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

function render(root, params) {
  if (!params.section) {
    renderHome(root);
  } else if (params.section === "compliments" && params.sub === "consulter") {
    renderComplimentsConsult(root);
  } else if (params.section === "compliments") {
    renderComplimentsAdd(root);
  } else {
    renderHome(root);
  }
}

const JournalScreen = { render };

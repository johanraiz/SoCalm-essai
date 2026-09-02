// J'écris, je m'en libère — exercice d'écriture, catégorie Mes ressources.
// Texte et nom finalisés (v0.60). Gabarit repris de la maquette
// design/ecrans-outils-mes-ressources.html (écran F).
//
// Écarts constatés entre la maquette et le texte du cahier des charges (v0.60) : "sans chercher à
// bien faire" disparaît du 2e paragraphe, et la phrase "Quand les 15 minutes sont passées, arrête —
// même en pleine phrase." n'apparaît nulle part dans la maquette (remplacée fonctionnellement par le
// minuteur lui-même). Conformément à la règle posée par Johan (v1.39, "les versions les plus
// récentes sont toujours les bonnes"), la version de la maquette est retenue pour le texte affiché —
// mais le COMPORTEMENT décrit par la phrase manquante (s'arrêter à la fin des 15 minutes) est bien
// implémenté : le champ d'écriture devient en lecture seule dès que le minuteur atteint 0:00.
//
// Fiche rendue réellement interactive, pas seulement illustrative (contrairement à d'autres fiches où
// le "field" reste une simple invite) : le minuteur "15:00" de la maquette est un vrai compte à rebours
// fonctionnel, le champ d'écriture est un vrai textarea, et le bouton "Refermer" vide réellement le
// texte. Point essentiel du cahier des charges (v0.60, point 4) : "Ce texte disparaît, il n'est pas
// gardé" — AUCUNE persistance dans le stockage local pour cette fiche, contrairement à "Ma version"
// ou à la phrase de confiance (v1.40) : le texte ne vit qu'en mémoire le temps de l'écran, jamais
// écrit dans localStorage, cohérent avec la confidentialité déjà actée (v0.3, v0.6) et avec le geste
// de clôture lui-même (pas seulement symbolique : réellement terminé).

const ECRITURE_DUREE_S = 15 * 60;
let ecritureIntervalId = null;

function formatEcritureTemps(secondes) {
  const m = Math.floor(secondes / 60);
  const s = secondes % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function stopEcritureTimer() {
  if (ecritureIntervalId) clearInterval(ecritureIntervalId);
  ecritureIntervalId = null;
}

function startEcritureCompteARebours(timerEl, inputEl, getRestantes, setRestantes) {
  stopEcritureTimer();
  ecritureIntervalId = setInterval(() => {
    const restant = getRestantes() - 1;
    setRestantes(restant);
    if (restant <= 0) {
      setRestantes(0);
      timerEl.textContent = formatEcritureTemps(0);
      timerEl.classList.add("done");
      inputEl.setAttribute("readonly", "readonly");
      stopEcritureTimer();
      return;
    }
    timerEl.textContent = formatEcritureTemps(restant);
  }, 1000);
}

function renderEcritureMain(root, slug) {
  const favN = store.getFavoris(slug);
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="${n <= favN ? "on" : ""}" data-star="${n}">★</button>`
  ).join("");

  let secondesRestantes = ECRITURE_DUREE_S;
  const toolMeta = categories.flatMap(c => c.tools).find(t => t.id === slug);

  root.innerHTML = `
    <div class="screen">
      <div class="back-row">
        <button class="back" data-back>‹ Mes ressources</button>
        <div class="fav-row">${stars}</div>
      </div>
      <h3 class="title title-sm">J'écris, je m'en libère</h3>
      <div class="usage-note">Cet exercice demande un peu de recul — il se pratique mieux hors des moments de crise aiguë.</div>
      <div class="body-copy">
        <p>Il y a peut-être, en ce moment, une pensée qui tourne en boucle — une peur, une idée obsédante, une rumination qui revient sans cesse.</p>
        <p>Donne-lui un moment, un vrai. Prends 15 minutes, et écris. Tout ce qui te passe par la tête sur ce sujet, sans filtre, sans te relire.</p>
      </div>
      <div class="timer-wrap"><div class="timer" id="ecritureTimer">${formatEcritureTemps(ECRITURE_DUREE_S)}</div></div>
      <textarea class="field" id="ecritureInput" placeholder="Écris ici, sans filtre…" style="min-height:110px;"></textarea>
      <button class="btn-primary" data-close>Refermer — mets-le dans la boîte</button>
      <p class="ecriture-closing">Ce texte disparaît, il n'est pas gardé. Tu lui as donné sa place. Pour aujourd'hui, c'est fait.</p>
      <div class="spacer"></div>
      ${toolMeta ? renderRelatedModuleLink(toolMeta.relatedModule) : ""}
      <button class="ma-version" data-maversion><span class="ic">✎</span> Ma version — note personnelle</button>
    </div>
  `;

  const timerEl = root.querySelector("#ecritureTimer");
  const inputEl = root.querySelector("#ecritureInput");
  const getRestantes = () => secondesRestantes;
  const setRestantes = (v) => { secondesRestantes = v; };

  startEcritureCompteARebours(timerEl, inputEl, getRestantes, setRestantes);

  root.querySelector("[data-back]").addEventListener("click", () => navigate("#/categorie/mes-ressources"));
  root.querySelectorAll("[data-star]").forEach(b => {
    b.addEventListener("click", () => {
      const n = parseInt(b.getAttribute("data-star"), 10);
      const current = store.getFavoris(slug);
      store.setFavoris(slug, current === n ? 0 : n);
      renderEcritureMain(root, slug);
    });
  });
  root.querySelector("[data-close]").addEventListener("click", () => {
    inputEl.value = "";
    inputEl.removeAttribute("readonly");
    timerEl.classList.remove("done");
    setRestantes(ECRITURE_DUREE_S);
    timerEl.textContent = formatEcritureTemps(ECRITURE_DUREE_S);
    toast("Refermé — ce texte n'a pas été gardé");
    startEcritureCompteARebours(timerEl, inputEl, getRestantes, setRestantes);
  });
  root.querySelector("[data-maversion]").addEventListener("click", () => {
    stopEcritureTimer();
    navigate(`#/outil/${slug}/maversion`);
  });
  wireRelatedModuleLink(root);
}

function renderEcritureMaVersion(root, slug) {
  const existing = store.getMaVersion(slug);
  root.innerHTML = `
    <div class="screen">
      <div class="back-row"><button class="back" data-back>‹ J'écris, je m'en libère</button></div>
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
  stopEcritureTimer();
  const slug = params.slug;
  if (params.step === "maversion") {
    renderEcritureMaVersion(root, slug);
    return;
  }
  renderEcritureMain(root, slug);
}

function cleanup() {
  stopEcritureTimer();
}

const OutilEcritureScreen = { render, cleanup };

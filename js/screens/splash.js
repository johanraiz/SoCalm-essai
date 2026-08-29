// Écran de lancement — "Cette application vous est proposée par :" + logo de Johan.
// S'affiche à chaque lancement de l'application (chargement de la page),
// avant l'écran normal (onboarding ou accueil selon l'état du stockage local).

function render(root, onDone) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    onDone();
  };

  root.innerHTML = `
    <div class="splash-screen" data-splash>
      <div class="splash-credit">Cette application vous est proposée par&nbsp;:</div>
      <img class="splash-logo" src="assets/logo-johan-raiz.png" alt="Johan Raiz, psychologue">
      <div class="splash-hint">toucher pour continuer</div>
    </div>
  `;

  root.querySelector("[data-splash]").addEventListener("click", finish);
  const timer = setTimeout(finish, 2600);
}

const SplashScreen = { render };

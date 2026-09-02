// Contenu repris mot pour mot du cahier des charges (module "peur de perdre le contrôle", v0.34) —
// source : design/ecran-module-psychoeducation-perte-controle.html. Aucun écart de contenu constaté
// entre les deux sources — mockup complet et cohérent, aucune ambiguïté à résoudre. Trois volets
// (6 + 5 + 12 cases), plus l'expérience personnelle de Johan (la petite caméra), placée en INTERLUDE
// entre les cases 2 et 3 du volet 2 — position exacte du cahier des charges, pas une clôture de module
// comme pour "évitement" et "pensées intrusives". Dernier module de l'axe pensées (6/6).
//
// Bogue trouvé et corrigé au passage (v1.53, voir le commentaire dédié dans module.js) : une case
// "planche" (panelHtml) intercalée au MILIEU d'un volet, comme cette anecdote, révèle que le compteur
// "i / total" comptait à tort toutes les entrées du volet, planches comprises — "évitement", déjà en
// ligne, affichait ainsi "Case 1 / 7" au lieu de "Case 1 / 5" depuis sa construction. Corrigé pour tous
// les modules à la fois.
//
// Deux liens de clôture, déjà validés (pas une proposition) — le texte source précise explicitement que
// ce module "se clôt directement sur le geste concret de nourrir le monstre positivement" : la boîte à
// compliments et le protecteur/critique (tous deux déjà en ligne).
//
// Encart "Ça peut aussi t'intéresser" : le texte de la maquette elle-même ("Dernier module de l'axe
// pensées (6/6) — se clôt directement sur deux outils validés (v0.32, v0.34)") mélange, comme pour
// "évitement" et "pensées intrusives", une note de production (numéros de version) avec le contenu réel
// destiné à la personne. Reformulé ici sans les numéros de version ni la mention d'avancement interne
// ("6/6"), dans le registre déjà établi pour les encarts des autres modules à lien de clôture (ex.
// "neurologie de la crise") — substance conservée (deux outils en lien), pas la note de production.
const perteControle = {
  slug: "perte-controle",
  cover: {
    badge: "Comprendre",
    title: "J'ai peur de perdre le contrôle, est-ce vraiment possible ?",
    desc: "Module de l'axe pensées — dernier module de cet axe. Pourquoi cette peur floue cache une peur plus précise, la sensation réelle de dépersonnalisation sous anxiété, et le petit monstre de l'angoisse, qui devient ce qu'on lui donne à manger.",
    meta: "3 volets, 23 cases + expérience · ~4 min",
    volets: [
      "Ce qui fait vraiment peur",
      "Pourquoi cette peur est si convaincante",
      "Le petit monstre de l'angoisse"
    ],
    related: "Ce module renvoie, en fin de lecture, vers deux outils pratiques en lien."
  },
  volets: [
    {
      num: 1,
      name: "Ce qui fait vraiment peur",
      color: "sage-dark",
      cases: [
        { text: "« Perdre le contrôle. » Une peur floue. Et une peur floue, c'est une peur difficile à combattre." },
        { text: "Alors creusons. Perdre le contrôle... et ensuite, qu'est-ce qui te fait vraiment peur ?" },
        { text: "Perdre le contrôle de son corps : s'évanouir, trembler, vomir — et que tout le monde te voie, te juge faible." },
        { text: "Perdre le contrôle de son esprit : devenir fou, ne plus jamais redevenir toi-même." },
        { text: "Perdre le contrôle de ses actes : dire ou faire quelque chose d'irréparable, blesser quelqu'un, t'humilier pour toujours." },
        { text: "Ce n'est pas « perdre le contrôle » qui fait peur. C'est ce que tu imagines juste après.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Pourquoi cette peur est si convaincante",
      color: "gold-dark",
      cases: [
        { text: "Sous anxiété, tout paraît plus fragile — y compris toi-même." },
        { text: "Parfois, une sensation étrange s'ajoute : comme si tu te regardais de l'extérieur, un peu détaché de toi-même." },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>Il y a eu une période où j'avais l'impression de vivre avec une petite caméra qui me suivait partout.</p>
              <p>Elle m'observait agir, interagir — de l'extérieur, un peu détachée de moi.</p>
              <p>Une partie de moi se demandait sans cesse ce que les autres pensaient. Une autre repassait déjà la scène, cherchant ce que j'aurais pu faire mieux.</p>
              <p>Trois endroits différents, où j'étais en même temps. Et il en manquait un seul.</p>
              <p>Celui où je n'étais jamais : l'instant présent.</p>
            </div>
          `
        },
        { text: "Une sensation réelle, provoquée par l'anxiété elle-même. Pas un signe qu'on est en train de perdre pied." },
        { text: "Alors l'esprit interprète cette sensation comme une preuve : « je sens que je perds le contrôle, donc je le perds. »" },
        { text: "Mais une sensation n'est pas une prédiction. Se sentir sur le point de perdre le contrôle ne prédit pas qu'on va le perdre.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "Le petit monstre de l'angoisse",
      color: "terracotta",
      cases: [
        { text: "Imagine un petit monstre. Discret, au début. À peine visible." },
        { text: "Il se nourrit d'une seule chose : tes pensées anxieuses." },
        { text: "Chaque pensée que tu nourris — que tu prends au sérieux, que tu ressasses — le nourrit, lui." },
        { text: "Et plus il mange, plus il grandit." },
        { text: "Jusqu'à ce que son estomac soit si plein qu'il ne puisse plus rien contenir." },
        { text: "Alors il vomit tout, d'un coup. C'est la crise d'angoisse." },
        { text: "La crise n'est pas un dérèglement soudain, sans raison. C'est la suite logique de tout ce qu'on lui a donné à manger, avant." },
        { text: "Il y a un secret derrière ce monstre : il n'est ni gentil ni méchant. Il devient ce que tu lui donnes à manger." },
        { text: "Nourri de pensées anxieuses, il déborde — et c'est la crise." },
        { text: "Nourri de pensées confiantes, d'encouragements, de petites victoires... il grandit dans l'autre sens. Il devient un allié." },
        { text: "Le même monstre. Juste nourri autrement." },
        {
          text: "Chaque compliment que tu notes, chaque petite victoire que tu gardes en mémoire — c'est un repas de plus pour la version alliée du monstre.",
          climax: true,
          climaxBg: "var(--terracotta)",
          closing: {
            intro: "Pour nourrir la version alliée du monstre :",
            links: [
              { title: "La boîte à compliments", desc: "dans ton Journal", route: "#/journal/compliments" },
              { title: "Je me critique, je me réponds avec tendresse", desc: "le protecteur/critique", route: "#/outil/protecteur-critique" }
            ]
          }
        }
      ]
    }
  ]
};

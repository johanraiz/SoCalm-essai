// Contenu repris mot pour mot du cahier des charges (module "déclencheurs personnels", v0.35) —
// source : design/ecran-module-psychoeducation-declencheurs-personnels.html. Aucun écart de contenu
// constaté, mockup complet et cohérent. Quatre volets courts (3 + 2 + 2 + 2 cases), pas d'anecdote
// personnelle (choix déjà acté). Chaque volet clôture sur SA PROPRE couleur d'identité (comme
// "anticipation anxieuse", v1.50) plutôt qu'un sage-dark constant — gold-dark, terracotta, puis une
// nouvelle couleur --slate pour le volet 4 (déjà introduite pour "anticipation anxieuse").
//
// Note de la maquette elle-même sur le "dernier module du plan" : le texte source (v0.35) disait "clôt
// l'ensemble des 14 modules" — vrai au moment de la rédaction, avant l'ajout de l'axe émotions (v0.56)
// qui porte le total à 15. Aucune conséquence sur le texte des cases lui-même (jamais affiché à
// l'utilisateur), seulement sur une note de production reformulée ci-dessous comme pour les modules
// précédents.
//
// Lien de clôture unique, déjà validé dans le texte source lui-même (pas une proposition) : "La liste
// des déclencheurs" du Journal, que le texte cite explicitement ("il s'accumule dans une liste,
// consultable depuis les outils").
//
// Encart "Ça peut aussi t'intéresser" reformulé sans les numéros de version ni la mention d'avancement
// interne ("15/15"), comme pour les modules précédents dans le même cas — substance conservée.
const declencheursPersonnels = {
  slug: "declencheurs-personnels",
  cover: {
    badge: "Comprendre",
    title: "Pourquoi est-ce que ça m'angoisse, moi, alors que ça n'a pas l'air de déranger les autres ?",
    desc: "Module de l'axe quotidien — pourquoi un déclencheur est <strong>appris et jamais universel</strong>, la différence entre interne et externe, et pourquoi le <strong>comparer aux autres n'a pas de sens</strong>.",
    meta: "4 volets, 9 cases · ~2 min",
    volets: [
      "Pourquoi ça, chez toi",
      "Interne ou externe",
      "Le piège de la comparaison",
      "Une carte qui se redessine"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil du Journal en lien."
  },
  volets: [
    {
      num: 1,
      name: "Pourquoi ça, chez toi",
      color: "sage-dark",
      cases: [
        { text: "Un déclencheur n'est jamais universel, il est appris. Chaque personne a sa propre carte des menaces." },
        { text: "Elle peut venir de trois chemins, tout aussi valables : un vécu direct ; une peur observée chez un proche ; une simple mise en garde, jamais vérifiée par l'expérience." },
        { text: "Le tempérament et les croyances construites tôt (« je dois être irréprochable ») la façonnent aussi. Ce n'est pas un choix.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Interne ou externe",
      color: "gold-dark",
      cases: [
        { text: "Déclencheur externe : une situation, un lieu, une personne." },
        { text: "Déclencheur interne : une sensation, une pensée, un souvenir — aussi réel, juste plus difficile à repérer.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "Le piège de la comparaison",
      color: "terracotta",
      cases: [
        { text: "« Ça n'a pas l'air de déranger les autres » : comparer sa réaction à celle des autres, c'est comparer deux cartes construites par deux histoires différentes. Ça n'a pas de sens." },
        { text: "Ton déclencheur n'est pas une preuve de faiblesse. C'est une trace de ton histoire.", climax: true, climaxBg: "var(--terracotta)" }
      ]
    },
    {
      num: 4,
      name: "Une carte qui se redessine",
      color: "slate",
      cases: [
        { text: "Ce qui a été appris peut être réappris. Mais d'abord, il faut en avoir conscience." },
        {
          text: "Note ton déclencheur dans le journal dès que tu le repères : il s'accumule dans une liste, consultable depuis les outils. C'est un premier pas — mais peut-être le plus important pour agir sur tes déclencheurs.",
          climax: true,
          climaxBg: "var(--slate)",
          closing: {
            intro: "Pour redessiner ta carte :",
            links: [
              { title: "La liste des déclencheurs", desc: "dans ton Journal", route: "#/journal/declencheurs" }
            ]
          }
        }
      ]
    }
  ]
};

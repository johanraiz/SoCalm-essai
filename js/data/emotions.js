// Module "Je ne gère pas mes émotions, au secours..." — texte complet validé (v0.56, cahier des
// charges), premier module de l'axe émotions, nouvel axe distinct des axes corps et pensées déjà
// établis (v0.5). Écran témoin dédié : design/ecran-module-psychoeducation-emotions.html — validé,
// complet, texte identique mot pour mot au cahier des charges (vérifié ligne à ligne, v1.55).
//
// Pas d'anecdote personnelle sur ce module pour l'instant — reste ouvert si Johan souhaite en ajouter
// une plus tard (option A, v0.38) : aucune case panelHtml ici, à la différence d'évitement / pensées
// intrusives / perte de contrôle.
//
// Chaque volet clôture sur SA PROPRE couleur d'identité (climaxBg, v1.50) plutôt que sur un sage-dark
// uniforme — même choix que anticipation anxieuse / perte de contrôle / déclencheurs personnels.
//
// related-box de couverture (v1.55) : le texte de l'écran témoin ("Premier module d'un nouvel axe...
// Pas d'anecdote pour l'instant — reste ouvert (v0.38). Renvoie vers un autre module et vers un outil
// (v0.56).") est une note de production (versions, statut de construction) et non une phrase destinée
// à la personne qui utilise l'app — même schéma que pour évitement / pensées intrusives / perte de
// contrôle / déclencheurs personnels, résolu par l'omission de la boîte plutôt que par une reformulation
// qui n'ajouterait rien (la substance réelle — les deux liens de clôture — est déjà portée par les
// liens eux-mêmes en fin de module).
//
// Clôture à deux sections (v1.55, première apparition) : la case 4.4 valide DEUX phrases d'intro
// séparées, chacune suivie de son propre lien — cf. closing.sections dans module.js. Le lien vers le
// module "rumination-soir" (pas encore construit à ce stade du chantier, tâche #23) utilise
// moduleCheck: "rumination-soir" pour s'afficher grisé ("— à venir") tant que ce module n'est pas
// live:true dans js/data/grid.js, et deviendra automatiquement actif une fois ce module livré, sans
// modification de ce fichier — même principe que js/screens/journal.js pour le lien vers évitement
// avant sa construction. Le lien vers "coussin-emotions" (outil déjà en ligne) n'a pas besoin de cette
// vérification.
const emotions = {
  cover: {
    badge: "Comprendre",
    title: "Je ne gère pas mes émotions, au secours...",
    desc: "Premier module de l'axe émotions — pourquoi une émotion <strong>ne se contrôle pas, mais s'exprime</strong>, à quoi elle sert vraiment, et ce qui se passe quand une partie de la palette émotionnelle reste fermée.",
    meta: "4 volets, 14 cases",
    volets: [
      "Une émotion, ça ne se contrôle pas",
      "À quoi sert une émotion",
      "L'arc-en-ciel incomplet",
      "Quand la palette se referme"
    ],
    related: null
  },
  volets: [
    {
      num: 1,
      name: "Une émotion, ça ne se contrôle pas",
      color: "sage-dark",
      cases: [
        { text: "Tu ne choisis pas d'être triste, en colère, ou d'avoir peur. Une émotion, ça ne se contrôle pas : ça se vit, c'est tout." },
        { text: "Et c'est une bonne nouvelle : les émotions sont adaptatives. Elles ajustent ta réalité intérieure au mouvement du monde extérieur, et régulent tes relations aux autres." },
        { text: "Il n'existe pas d'émotions « négatives » ou « positives » — seulement des émotions adaptatives. Ce sont les événements que tu vis qui peuvent être agréables ou désagréables ; l'émotion, elle, n'est que l'outil de ton corps pour t'y adapter." },
        { text: "Ce qui se régule, en revanche, c'est son expression. Tu n'es pas obligé de te rouler par terre parce que tu es en colère — et l'expression saine de la colère n'est ni l'agressivité, ni la violence.", climax: true, climaxBg: "var(--sage-dark)" }
      ]
    },
    {
      num: 2,
      name: "À quoi sert une émotion",
      color: "gold-dark",
      cases: [
        { text: "Chaque émotion a une fonction. Elle met ton corps en mouvement — à l'intérieur, par un changement physiologique ; à l'extérieur, par une expression, comme un mouvement vers le monde." },
        { text: "D'abord, tu ressens l'émotion : c'est un message important sur ce que la situation te fait vivre. Puis elle te met en action, pour que tu puisses te rééquilibrer." },
        { text: "Il existe six émotions principales : la colère, la joie, le dégoût, la surprise, la tristesse, la peur. Même quand elles sont désagréables à vivre, elles restent essentielles pour t'adapter." },
        { text: "Elles régulent aussi tes relations aux autres — en te rapprochant, ou en te permettant de défendre ton territoire. Bien exprimées, elles garantissent des relations saines.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "L'arc-en-ciel incomplet",
      color: "terracotta",
      cases: [
        { text: "Mais parfois, on n'a pas appris — ou pas assez appris — à utiliser toute cette palette de couleurs émotionnelles." },
        { text: "On en utilise certaines, et on s'est appris, sans le vouloir, à s'interdire d'en ressentir ou d'en exprimer d'autres.", climax: true, climaxBg: "var(--terracotta)" }
      ]
    },
    {
      num: 4,
      name: "Quand la palette se referme",
      color: "slate",
      cases: [
        { text: "Ce qui ne trouve pas sa sortie ne disparaît pas pour autant — ça cherche une autre issue." },
        { text: "Chez certains, cette accumulation ressort sous forme d'angoisse : une tension diffuse, sans objet précis, comme un trop-plein qui n'a pas trouvé sa sortie." },
        { text: "Chez d'autres — ou en même temps — elle revient le soir, sous forme de pensées qui tournent en boucle. C'est souvent de ça qu'il s'agit, derrière une rumination." },
        {
          text: "Ce n'est pas « ne pas savoir gérer ses émotions ». C'est ne pas encore avoir retrouvé l'accès à toute la palette, et le chemin pour l'exprimer sainement.",
          climax: true,
          climaxBg: "var(--slate)",
          closing: {
            sections: [
              {
                intro: "Tu retrouveras ce mécanisme en détail dans :",
                links: [
                  { title: "Le soir, je rumine tout ce qui s'est mal passé", desc: "un autre module de psychoéducation", route: "#/module/rumination-soir", moduleCheck: "rumination-soir" }
                ]
              },
              {
                intro: "Pour retrouver l'accès à toute la palette :",
                links: [
                  { title: "J'accueille mes émotions, je m'équilibre", desc: "le coussin des émotions", route: "#/outil/coussin-emotions" },
                  { title: "J'ai confiance, je tiens bon", desc: "une phrase de confiance à te répéter, la tienne", route: "#/outil/phrase-confiance" }
                ]
              }
            ]
          }
        }
      ]
    }
  ]
};

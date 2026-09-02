// Grille d'outils — 4 catégories (v0.46), noms d'outils/modules repris du cahier des charges.
// live:true = écran réellement construit et navigable dans cette version d'essai.
// Les autres apparaissent grisées ("à venir") : honnêteté du squelette plutôt que des liens morts.

const categories = [
  {
    id: "je-respire",
    name: "Je respire",
    tools: [
      {
        id: "respiration-3-niveaux", name: "Je respire, je m'apaise en profondeur", live: true, route: "#/outil/respiration-3-niveaux",
        // Lien retour outil → psychoéducation (v1.42), symétrique du lien module → outil déjà en place
        // (fondateur pointe déjà vers cet outil, cf. js/data/fondateur.js). Discret, en bas d'écran,
        // jamais au milieu de l'exercice — cf. note d'usage instant présent (v0.48).
        relatedModule: { slug: "fondateur", title: "Je me sens anxieux·se, c'est quoi exactement ?", desc: "le module qui explique le mécanisme derrière cet exercice" }
      }
    ]
  },
  {
    id: "je-mancre",
    name: "Je m'ancre",
    tools: [
      { id: "mantra", name: "Le mantra", live: true, route: "#/outil/mantra" },
      {
        id: "ancrage-5432", name: "Je m'ancre, je suis là", live: true, route: "#/outil/ancrage-5432",
        // Lien retour outil → psychoéducation (v1.59), même principe que respiration-3-niveaux (v1.42).
        relatedModule: { slug: "fondateur", title: "Je me sens anxieux·se, c'est quoi exactement ?", desc: "le module qui explique pourquoi revenir au présent aide à apaiser l'angoisse" }
      },
      {
        id: "marche", name: "Je marche, je me libère", live: true, route: "#/outil/marche",
        relatedModule: { slug: "perte-controle", title: "J'ai peur de perdre le contrôle, est-ce vraiment possible ?", desc: "le module qui explique pourquoi une action simple aide à retrouver un sentiment de contrôle" }
      },
      {
        id: "odeur-rassurante", name: "J'inspire cette odeur, je reviens à moi", live: true, route: "#/outil/odeur-rassurante",
        relatedModule: { slug: "neurologie-crise", title: "Mon cœur s'emballe, je panique", desc: "le module qui explique le mécanisme d'une crise de panique" }
      },
      { id: "odeur-association", name: "Je sens cette odeur, je construis ma sérénité", live: true, route: "#/outil/odeur-association" }
    ]
  },
  {
    id: "comprendre",
    name: "Comprendre",
    // Regroupement par axe thématique (v1.60), à la demande de Johan, pour la clarté de lecture et la
    // recherche par symptôme (chantier noté en v1.58). Réorganisation purement visuelle — aucun module
    // déplacé de catégorie, renommé, ni retiré ; `tools` reste une liste plate consommée telle quelle
    // partout ailleurs dans le code (moduleCheck, relatedModule...), seul l'ORDRE change et un nouveau
    // champ optionnel `axisTitle` marque le premier module de chaque axe pour que home.js insère un
    // sous-titre avant sa carte (cf. js/screens/home.js). Fondateur reste seul en tête, sans sous-titre,
    // comme point de départ commun avant les quatre axes. Ordre des axes choisi par Johan : corps,
    // pensées, quotidien, émotions. Répartition arbitrée par Johan module par module (v1.60) : la
    // respiration reste dans l'axe corps, le sommeil rejoint le quotidien (pas les pensées ni le corps),
    // rumination du soir rejoint bien les 6 modules de l'axe pensées. Intitulés d'axe écrits par Johan.
    tools: [
      { id: "fondateur", name: "Je me sens anxieux·se, c'est quoi exactement ?", live: true, route: "#/module/fondateur" },

      // Axe corps (4)
      { id: "neurologie-crise", name: "Mon cœur s'emballe, je panique", live: true, route: "#/module/neurologie-crise", axisTitle: "Quand mon corps s'affole" },
      { id: "body-scan", name: "Je scanne mon corps en permanence, à l'affût du moindre symptôme, pourquoi ?", live: true, route: "#/module/body-scan" },
      { id: "symptomes-digestifs", name: "Mon anxiété me donne mal au ventre, me coupe l'appétit — c'est lié ?", live: true, route: "#/module/symptomes-digestifs" },
      { id: "respiration-module", name: "Pourquoi respirer m'aide vraiment à me calmer ?", live: true, route: "#/module/respiration-module" },

      // Axe pensées (6)
      { id: "evitement", name: "J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?", live: true, route: "#/module/evitement", axisTitle: "Quand mes pensées m'angoissent" },
      { id: "anticipation-anxieuse", name: "J'ai peur de ce qui pourrait arriver, avant même que ça arrive", live: true, route: "#/module/anticipation-anxieuse" },
      { id: "pensees-intrusives", name: "J'ai des pensées qui me font peur et que je ne contrôle pas", live: true, route: "#/module/pensees-intrusives" },
      { id: "catastrophisme", name: "J'imagine toujours le pire, pourquoi ?", live: true, route: "#/module/catastrophisme" },
      { id: "perte-controle", name: "J'ai peur de perdre le contrôle, est-ce vraiment possible ?", live: true, route: "#/module/perte-controle" },
      { id: "rumination-soir", name: "Le soir, je rumine tout ce qui s'est mal passé, comment arrêter ?", live: true, route: "#/module/rumination-soir" },

      // Axe quotidien (3)
      { id: "declencheurs-personnels", name: "Pourquoi est-ce que ça m'angoisse, moi, alors que ça n'a pas l'air de déranger les autres ?", live: true, route: "#/module/declencheurs-personnels", axisTitle: "Quand le quotidien pèse" },
      { id: "anxiete-matin", name: "Je me réveille déjà anxieux·se, qu'est-ce que je fais ?", live: true, route: "#/module/anxiete-matin" },
      { id: "sommeil", name: "Je n'arrive pas à dormir tellement je suis anxieux·se, que faire ?", live: true, route: "#/module/sommeil" },

      // Axe émotions (1)
      { id: "emotions", name: "Je ne gère pas mes émotions, au secours...", live: true, route: "#/module/emotions", axisTitle: "Quand mes émotions débordent" }
    ]
  },
  {
    id: "mes-ressources",
    name: "Mes ressources",
    tools: [
      { id: "protecteur-critique", name: "Je me critique, je me réponds avec tendresse", live: true, route: "#/outil/protecteur-critique" },
      { id: "figure-aidante", name: "Je me confie, je me sens accompagné", live: true, route: "#/outil/figure-aidante" },
      {
        id: "phrase-confiance", name: "J'ai confiance, je tiens bon", live: true, route: "#/outil/phrase-confiance",
        relatedModule: { slug: "anxiete-matin", title: "Je me réveille déjà anxieux·se, qu'est-ce que je fais ?", desc: "le module qui explique pourquoi l'angoisse est parfois plus forte au réveil" }
      },
      { id: "coussin-emotions", name: "J'accueille mes émotions, je m'équilibre", live: true, route: "#/outil/coussin-emotions" },
      {
        id: "lieu-secure", name: "Je m'y réfugie, je me sens en sécurité", live: true, route: "#/outil/lieu-secure",
        relatedModule: { slug: "neurologie-crise", title: "Mon cœur s'emballe, je panique", desc: "le module qui explique pourquoi ton corps réagit ainsi en pleine crise" }
      },
      {
        id: "ecriture", name: "J'écris, je m'en libère", live: true, route: "#/outil/ecriture",
        relatedModule: { slug: "catastrophisme", title: "J'imagine toujours le pire, pourquoi ?", desc: "le module qui explique pourquoi ton cerveau invente toujours la pire des hypothèses" }
      },
      {
        id: "je-verifie", name: "Je vérifie, je reprends la main", live: true, route: "#/outil/je-verifie",
        relatedModule: { slug: "evitement", title: "J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?", desc: "le module qui explique pourquoi éviter et vérifier soulagent tout de suite, mais nourrissent l'angoisse" }
      }
    ]
  }
];

const journalMenu = [
  { id: "compliments", name: "La boîte à compliments", desc: "se rappeler de quoi tu es capable", live: true, route: "#/journal/compliments", icon: journalIcon_compliments },
  { id: "declencheurs", name: "La liste des déclencheurs", desc: "ta carte, redessinée petit à petit", live: true, route: "#/journal/declencheurs", icon: journalIcon_declencheurs },
  { id: "fil-soirs", name: "Le fil de tes soirs", desc: "nommer, sans expliquer", live: true, route: "#/journal/fil-soirs", icon: journalIcon_filSoirs },
  { id: "bilan", name: "Le bilan auto-écrit", desc: "relire, sans compteur ni score", live: true, route: "#/journal/bilan", icon: journalIcon_bilan },
  { id: "verif-attentes", name: "La vérification des attentes", desc: "noter une prédiction, la vérifier", live: true, route: "#/journal/verif-attentes", icon: journalIcon_verifAttentes }
];

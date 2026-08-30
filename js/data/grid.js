// Grille d'outils — 4 catégories (v0.46), noms d'outils/modules repris du cahier des charges.
// live:true = écran réellement construit et navigable dans cette version d'essai.
// Les autres apparaissent grisées ("à venir") : honnêteté du squelette plutôt que des liens morts.

const categories = [
  {
    id: "je-respire",
    name: "Je respire",
    tools: [
      { id: "respiration-3-niveaux", name: "Je respire, je m'apaise en profondeur", live: true, route: "#/outil/respiration-3-niveaux" }
    ]
  },
  {
    id: "je-mancre",
    name: "Je m'ancre",
    tools: [
      { id: "mantra", name: "Le mantra", live: true, route: "#/outil/mantra" },
      { id: "ancrage-5432", name: "Je m'ancre, je suis là", live: true, route: "#/outil/ancrage-5432" },
      { id: "marche", name: "Je marche, je me libère" },
      { id: "odeur-rassurante", name: "J'inspire cette odeur, je reviens à moi" },
      { id: "odeur-association", name: "Je sens cette odeur, je construis ma sérénité" }
    ]
  },
  {
    id: "comprendre",
    name: "Comprendre",
    tools: [
      { id: "fondateur", name: "Je me sens anxieux·se, c'est quoi exactement ?", live: true, route: "#/module/fondateur" },
      { id: "neurologie-crise", name: "Mon cœur s'emballe, je panique" },
      { id: "anticipation-anxieuse", name: "J'ai peur de ce qui pourrait arriver, avant même que ça arrive" },
      { id: "evitement", name: "J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?" },
      { id: "pensees-intrusives", name: "J'ai des pensées qui me font peur et que je ne contrôle pas" },
      { id: "catastrophisme", name: "J'imagine toujours le pire, pourquoi ?" },
      { id: "perte-controle", name: "J'ai peur de perdre le contrôle, est-ce vraiment possible ?" },
      { id: "declencheurs-personnels", name: "Pourquoi est-ce que ça m'angoisse, moi, alors que ça n'a pas l'air de déranger les autres ?" },
      { id: "emotions", name: "Je ne gère pas mes émotions, au secours..." },
      { id: "body-scan", name: "Je scanne mon corps en permanence, à l'affût du moindre symptôme, pourquoi ?" },
      { id: "symptomes-digestifs", name: "Mon anxiété me donne mal au ventre, me coupe l'appétit — c'est lié ?" },
      { id: "respiration-module", name: "Pourquoi respirer m'aide vraiment à me calmer ?" },
      { id: "anxiete-matin", name: "Je me réveille déjà anxieux·se, qu'est-ce que je fais ?" },
      { id: "rumination-soir", name: "Le soir, je rumine tout ce qui s'est mal passé, comment arrêter ?" },
      { id: "sommeil", name: "Je n'arrive pas à dormir tellement je suis anxieux·se, que faire ?" }
    ]
  },
  {
    id: "mes-ressources",
    name: "Mes ressources",
    tools: [
      { id: "protecteur-critique", name: "Je me critique, je me réponds avec tendresse" },
      { id: "figure-aidante", name: "Je me confie, je me sens accompagné" },
      { id: "phrase-confiance", name: "J'ai confiance, je tiens bon" },
      { id: "coussin-emotions", name: "J'accueille mes émotions, je m'équilibre" },
      { id: "lieu-secure", name: "Je m'y réfugie, je me sens en sécurité" },
      { id: "ecriture", name: "J'écris, je m'en libère" },
      { id: "je-verifie", name: "Je vérifie, je reprends la main" }
    ]
  }
];

const journalMenu = [
  { id: "compliments", name: "La boîte à compliments", desc: "se rappeler de quoi tu es capable", live: true, route: "#/journal/compliments", icon: journalIcon_compliments },
  { id: "declencheurs", name: "La liste des déclencheurs", desc: "ta carte, redessinée petit à petit", icon: journalIcon_declencheurs },
  { id: "fil-soirs", name: "Le fil de tes soirs", desc: "nommer, sans expliquer", icon: journalIcon_filSoirs },
  { id: "bilan", name: "Le bilan auto-écrit", desc: "relire, sans compteur ni score", icon: journalIcon_bilan },
  { id: "verif-attentes", name: "La vérification des attentes", desc: "noter une prédiction, la vérifier", icon: journalIcon_verifAttentes }
];

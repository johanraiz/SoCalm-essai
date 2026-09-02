// Contenu repris mot pour mot du cahier des charges (module "anticipation anxieuse", v0.32, quatrième
// volet ajouté v0.69) — source : design/ecran-module-psychoeducation-anticipation-anxieuse.html (v1.09).
// Aucun écart de contenu constaté entre les deux sources.
//
// Un ajustement de forme, déjà appliqué à "évitement" (v1.48) et "neurologie de la crise" (v1.49) : les
// deux indications séparées de la maquette ("📖 4 volets, 32 cases" et "⏱ ~4 min") sont combinées en
// une seule phrase, le gabarit partagé n'affichant qu'une seule ligne de méta.
//
// Deux points spécifiques à ce module, tous deux confirmés par la maquette validée (v1.09) et pris en
// charge par deux nouveaux champs de case ajoutés au gabarit partagé (v1.50) :
// 1. La case 1.11 ("une compétence pas encore démontrée...", note Johan v0.90) reçoit, en plus du
//    traitement climax habituel (fond plein + halo), un texte agrandi et en gras — même emphase que la
//    case 2.8 de "neurologie de la crise" (note Johan v0.83). `emphasis: true`.
// 2. À la différence des trois modules déjà en ligne, où toute case climax utilise un sage-dark
//    constant quel que soit le volet, la maquette de CE module clôture chaque volet sur SA PROPRE
//    couleur d'identité (gold-dark pour le volet 2, terracotta pour le volet 3, slate pour le volet 4)
//    — un choix délibéré et validé (v1.09), pas une incohérence. `climaxBg` précise cette couleur ; le
//    volet 1 (déjà sage-dark) n'a pas besoin de le préciser, la valeur par défaut étant identique.
//
// Nouvelle couleur d'identité introduite pour le 4e volet, faute de 4e couleur déjà validée dans la
// palette (v1.09) : --slate (bleu-gris), déjà présente dans app.css (utilisée par l'outil "Je m'ancre").
const anticipationAnxieuse = {
  slug: "anticipation-anxieuse",
  cover: {
    badge: "Comprendre",
    title: "J'ai peur de ce qui pourrait arriver, avant même que ça arrive",
    desc: "Module de l'axe pensées — pourquoi <strong>l'attente fait parfois plus mal que l'événement</strong>, comment revenir au présent, distinguer ce qui dépend de toi, et vérifier l'écart entre ce que tu redoutes et ce qui arrive vraiment.",
    meta: "4 volets, 32 cases · ~4 min",
    volets: [
      "L'attente fait parfois plus mal",
      "Seul le présent existe",
      "Distinguer ce qui dépend de toi",
      "L'écart que personne ne calcule"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil du Journal en lien."
  },
  volets: [
    {
      num: 1,
      name: "L'attente fait parfois plus mal",
      color: "sage-dark",
      cases: [
        { text: "Un événement à venir. Connu. Daté." },
        { text: "Bien avant qu'il arrive, l'angoisse s'installe déjà." },
        { text: "Les jours passent, la tension grandit — parfois plus forte que ce que l'événement lui-même provoquera." },
        { text: "Ton cerveau déteste l'incertitude, presque autant qu'un vrai danger." },
        { text: "Alors il tourne en boucle, cherchant à anticiper chaque scénario pour s'y préparer." },
        { text: "Sauf que ruminer un futur incertain n'apporte aucune réponse. Juste de la fatigue, avant même d'avoir commencé." },
        { text: "Il y a autre chose que cette anticipation oublie souvent." },
        { text: "Elle imagine l'événement — mais rarement toi, tel que tu seras, face à lui." },
        { text: "Les ressources que tu mobiliseras sur le moment, elle ne les voit jamais à l'avance." },
        { text: "Ton esprit se concentre sur ce qui pourrait mal tourner. Rarement sur ta capacité à y faire face." },
        { text: "Une compétence pas encore démontrée n'est pas une compétence absente. C'est une compétence en devenir.", climax: true, emphasis: true }
      ]
    },
    {
      num: 2,
      name: "Seul le présent existe",
      color: "gold-dark",
      cases: [
        { text: "Le passé n'existe plus. Le futur n'existe pas encore." },
        { text: "Seul un instant est réel : celui-ci, maintenant." },
        { text: "Un vieux principe, écrit il y a près de deux mille ans, déjà." },
        { text: "Pourtant, l'esprit voyage sans cesse hors du présent — vers un futur qu'il imagine, qu'il redoute." },
        { text: "Revenir au présent, ça s'apprend. Ça se pratique." },
        { text: "Poser son attention sur ce qui est là, maintenant : ce que tu vois, ce que tu entends, ce que tu sens sous tes pieds.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "Distinguer ce qui dépend de toi",
      color: "terracotta",
      cases: [
        { text: "Le courage de changer ce qui peut l'être. La force d'accepter ce qui ne peut pas l'être. Et la lucidité de distinguer les deux." },
        { text: "Ce qui va se passer, en partie, t'échappe." },
        { text: "Ta façon de t'y préparer, non." },
        { text: "Cette attente peut se transformer. Pas en absence d'inquiétude — en confiance : confiance en toi, en ta capacité à faire face à ce qui vient, quoi qu'il arrive.", climax: true, climaxBg: "var(--terracotta)" }
      ]
    },
    {
      num: 4,
      name: "L'écart que personne ne calcule",
      color: "slate",
      cases: [
        { text: "Avant un événement qui t'angoisse, ton esprit n'imagine pas juste un scénario. Il y croit." },
        { text: "Il calcule une probabilité — basée sur un vécu direct, ou une croyance jamais vérifiée, simplement transmise." },
        { text: "Demande-lui un chiffre : « 90% de chances que ça tourne mal. »" },
        { text: "L'événement arrive. Se déroule. Se termine." },
        { text: "Tu redoutais un blanc, un jugement, un échec complet." },
        { text: "Ce qui arrive, le plus souvent : une conversation banale, un oubli sans suite, un couac vite oublié." },
        { text: "Deux histoires différentes : celle anticipée, celle vécue." },
        { text: "Ton cerveau ne les compare jamais seul. La prochaine fois, il repart du même chiffre. Et la suivante aussi." },
        { text: "Une nuance : parfois, ce n'est pas une fausse alerte — l'anticipation elle-même façonne ce qu'elle redoutait. Comme une prophétie qu'on se fait à soi-même : un stress qui te fait bafouiller, un évitement qui confirme la peur — on donne vie à nos peurs. En prendre conscience, c'est déjà ne plus tomber dans le piège." },
        { text: "Reprends la main : note ce que tu redoutes, avant. Vérifie ce qui s'est vraiment passé, après." },
        {
          text: "Chaque écart devient une preuve — la tienne. Retrouve-la dans ton Journal.",
          climax: true,
          climaxBg: "var(--slate)",
          closing: {
            intro: "Pour reprendre la main :",
            links: [
              { title: "La vérification des attentes", desc: "dans ton Journal", route: "#/journal/verif-attentes" }
            ]
          }
        }
      ]
    }
  ]
};

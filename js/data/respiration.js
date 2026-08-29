// Contenu repris mot pour mot du cahier des charges (v0.43-v0.44)
// Source : design/ecran-outil-respiration-3-niveaux.html

const respiration = {
  slug: "respiration-3-niveaux",
  title: "Je respire, je m'apaise en profondeur",
  usageBadge: "Outil de fond",
  levels: [
    {
      num: 1,
      h: "La respiration guidée",
      d: "suivre une courbe qui monte, tient, redescend",
      tag: "Suggéré",
      suggested: true,
      type: "curve",
      intro: "Pose ton doigt sur le point et suis son mouvement.",
      body: [
        "Inspire par le nez, en suivant la courbe qui monte... <span class=\"count\">2, 3, 4.</span>",
        "Bloque ta respiration, la courbe fait un plateau... <span class=\"count\">2, 3, 4.</span>",
        "Expire par la bouche, laisse échapper un léger souffle sonore et écoute-le, en suivant la courbe qui redescend... <span class=\"count\">2, 3, 4, 5, 6.</span>"
      ]
    },
    {
      num: 2,
      h: "Respirer par le cœur",
      d: "yeux fermés, attention posée sur le cœur",
      type: "heart",
      intro: "Ferme les yeux, si tu le souhaites. Pose <strong>ton attention sur ton cœur</strong> — comme si tu respirais à travers lui.",
      body: [
        "Inspire par le nez... <span class=\"count\">2, 3, 4.</span>",
        "Bloque ta respiration... <span class=\"count\">2, 3, 4.</span>",
        "Souffle par la bouche, avec un petit son, un soupir... <span class=\"count\">2, 3, 4, 5, 6.</span>"
      ]
    },
    {
      num: 3,
      h: "La couleur de ton intention",
      d: "un mot, une couleur, une visualisation",
      type: "choice",
      intro: "Avant de commencer, une question simple : qu'aimerais-tu ressentir en toi-même, ne serait-ce qu'un tout petit peu ?",
      introNote: "Rappelle-toi : un petit pas, c'est déjà un pas.",
      words: ["Calme", "Légèreté", "Détente", "Sécurité", "Solidité", "Énergie"],
      colors: [
        { from: "#e3f0de", to: "#b7cdb0", glow: "rgba(183,205,176,0.6)" },
        { from: "#faedc6", to: "#e8c98a", glow: "rgba(232,201,138,0.7)" },
        { from: "#f5e4d8", to: "#d9b8a0", glow: "rgba(217,184,160,0.6)" },
        { from: "#dcecf0", to: "#9fb8c2", glow: "rgba(159,184,194,0.6)" },
        { from: "#ecdfd2", to: "#c9a88f", glow: "rgba(201,168,143,0.6)" }
      ]
    },
    {
      // Écran E : respiration avec l'intention choisie au niveau 3
      num: "3b",
      type: "bubble",
      body: [
        "Inspire par le nez, et imagine que tu fais entrer cette couleur <strong>à travers ton cœur</strong>... <span class=\"count\">2, 3, 4.</span>",
        "Bloque ta respiration, et imagine cette <strong>intention qui prend sa place en toi</strong>... <span class=\"count\">2, 3, 4.</span>",
        "Souffle par la bouche, et laisse <strong>partir tout ce qui ne t'appartient plus</strong>... <span class=\"count\">2, 3, 4, 5, 6.</span>"
      ]
    }
  ]
};

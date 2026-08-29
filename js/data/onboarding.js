// Textes repris mot pour mot du cahier des charges
// (respiration v0.11/v0.81, accueil v0.10/v0.81, nom d'usage v0.12, cadeau v0.15, point de départ v0.74, grille v0.16/v0.46)
// Source : design/parcours-accueil-v1.html

const onboardingSteps = [
  {
    id: "respiration",
    body: [
      "On commence doucement. Installe-toi si tu peux, le plus <strong>confortablement</strong> possible — assis, debout, ou même en marchant. On va juste respirer ensemble, une petite minute.",
      "<strong>Inspire</strong> par le nez... <span class=\"count\">2, 3, 4.</span><br><strong>Expire</strong> par la bouche, tu peux même laisser un léger bruit s'échapper, comme un ballon qui se dégonfle... <span class=\"count\">2, 3, 4, 5.</span>",
      "(répète le cycle 4 fois)"
    ],
    closing: "Voilà. Tu viens de faire quelque chose de concret pour toi."
  },
  {
    id: "accueil",
    avatar: "J",
    body: [
      "Bonjour, je m'appelle <span class=\"name-highlight\">Johan</span>. Je suis psychologue clinicien — et ton <span class=\"name-highlight\">compagnon de route</span>. Moi aussi, j'ai connu l'anxiété, les crises d'angoisse, et même la dépression. Aujourd'hui, elle a retrouvé sa juste place : elle est là quand il le faut, et elle me laisse vivre le reste du temps.",
      "Je n'ai aucun don particulier — juste des <strong>outils concrets</strong>, <strong>faciles</strong> à mettre en <strong>pratique</strong>, les mêmes que j'utilise avec mes patients, comme avec moi-même. Je te les partage ici."
    ]
  },
  {
    id: "nom",
    closing: "Comment veux-tu que je t'appelle ?",
    body: ["Prénom, pseudo, comme tu veux.", "Pour personnaliser un peu la suite — ou reste anonyme, c'est très bien aussi."],
    field: true,
    placeholder: "Ton prénom ou pseudo…",
    skip: "Je préfère ne pas dire"
  },
  {
    id: "cadeau",
    body: ["j'aimerais te faire un cadeau : un secret que j'ai appris sur ce chemin, et que j'utilise encore aujourd'hui."],
    mantra: "À chaque instant, je fais de mon mieux.<br>Chaque petit pas compte."
  },
  {
    id: "depart",
    body: ["Ce qui te pèse le plus en ce moment, c'est plutôt…"],
    options: [
      { h: "Ton corps", d: "cœur qui s'emballe, tensions, sommeil", category: "je-respire" },
      { h: "Tes pensées", d: "ça tourne en boucle, tu imagines le pire", category: "je-mancre" },
      { h: "Tes émotions", d: "difficile à identifier, à exprimer, trop d'émotions, trop intense", category: "mes-ressources" }
    ],
    skip: "Je préfère explorer moi-même"
  }
];

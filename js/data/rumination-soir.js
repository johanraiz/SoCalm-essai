// Contenu repris mot pour mot du cahier des charges (module "rumination du soir", v0.33) — source :
// design/ecran-module-psychoeducation-rumination-soir.html. Aucun écart de contenu constaté entre les
// deux sources — mockup complet et cohérent. Trois volets (7 + 6 + 6 cases), pas d'anecdote personnelle
// (choix déjà acté dans le texte source lui-même). Distinct du module "sommeil" (ligne de partage
// réaffirmée dans le texte source, v0.33) — pas de chevauchement de contenu entre les deux.
//
// Chaque volet clôture sur sa propre couleur d'identité (sage-dark, gold-dark, terracotta) via
// `climaxBg` — comme "anticipation anxieuse", "peur de perdre le contrôle" et "déclencheurs personnels".
//
// Deux liens de clôture, déjà validés (v1.09) — "J'écris, je m'en libère" et "J'accueille mes émotions,
// je m'équilibre" — partageant une seule phrase d'intro ("Pour désamorcer la boucle :"), comme
// "neurologie de la crise" et "peur de perdre le contrôle" (closing.links, pas closing.sections : une
// seule section ici, à la différence du module "émotions"). Note du texte source : aucun des deux liens
// n'était cité nommément dans le texte du module lui-même — association ajoutée à la mise en mockup.
//
// PREMIÈRE MISE À JOUR RÉTROACTIVE ATTENDUE DE CE CHANTIER : le module "émotions" (construit avant
// celui-ci) pointe déjà vers "rumination-soir" via un lien marqué `moduleCheck` (v1.55) — dès que ce
// module passe à `live:true` dans js/data/grid.js (fait dans le cadre de cette construction), ce lien
// devient automatiquement actif sans qu'il soit nécessaire de retoucher js/data/emotions.js. Vérifié
// après construction.
//
// Encart "Ça peut aussi t'intéresser" : le texte de la maquette ("(v0.32)") mélange une note de
// production avec le contenu réel — même schéma que "peur de perdre le contrôle". Reformulé sans le
// numéro de version, substance conservée (des outils en lien).
const ruminationSoir = {
  slug: "rumination-soir",
  cover: {
    badge: "Comprendre",
    title: "Le soir, je rumine tout ce qui s'est mal passé, comment arrêter ?",
    desc: "Module de l'axe pensées — pourquoi <strong>rejouer sa journée sans fin</strong> ne change rien, la différence entre réflexion utile et ressassement, et pourquoi ce qui revient le soir est souvent une émotion qui n'a pas eu sa place dans la journée.",
    meta: "3 volets, 19 cases · ~3 min",
    volets: [
      "Les deux façons d'être malheureux pour toujours",
      "Deux façons de repasser sa journée",
      "Pourquoi ça revient"
    ],
    related: "Ce module renvoie, en fin de lecture, vers des outils pratiques en lien."
  },
  volets: [
    {
      num: 1,
      name: "Les deux façons d'être malheureux pour toujours",
      color: "sage-dark",
      cases: [
        { text: "Le soir, la journée repasse en boucle. Ce moment où tu as mal répondu. Cette phrase que tu regrettes." },
        { text: "Tu voudrais revenir en arrière. Faire autrement." },
        { text: "Impossible. Le passé ne se change pas." },
        { text: "Il existe deux façons d'être malheureux pour toujours : vouloir changer ce qui est déjà arrivé..." },
        { text: "... ou le rejouer sans fin dans sa tête, sans jamais rien y changer." },
        { text: "Un peu comme dans « Un jour sans fin » — ce film où le héros revit la même journée, encore et encore, incapable d'en sortir." },
        { text: "Ce qui le libère, à la fin, ce n'est pas de changer la journée. C'est de changer sa façon d'être, à l'intérieur d'elle.", climax: true, climaxBg: "var(--sage-dark)" }
      ]
    },
    {
      num: 2,
      name: "Deux façons de repasser sa journée",
      color: "gold-dark",
      cases: [
        { text: "Repasser une scène dans sa tête, ce n'est pas automatiquement un problème." },
        { text: "Se demander ce qui s'est passé, pour en tirer une leçon : ça, c'est utile." },
        { text: "Mais il y a une autre version, plus insidieuse : ressasser en se comparant, en se jugeant, sans jamais avancer." },
        { text: "« Je suis nul. » « J'aurais dû. » « Pourquoi je fais toujours ça. »" },
        { text: "Cette version-là n'apporte rien. Elle tourne, et elle use." },
        { text: "Se parler à soi-même comme à quelqu'un qu'on aime, plutôt qu'en juge — un premier pas pour l'arrêter.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "Pourquoi ça revient",
      color: "terracotta",
      cases: [
        { text: "Souvent, ce qui revient le soir, ce n'est pas vraiment « ce qui s'est passé »." },
        { text: "C'est une émotion qui n'a pas eu sa place dans la journée. Une colère avalée. Une tristesse mise de côté. Une honte tue." },
        { text: "Le soir, seul avec toi-même, elle refait surface — sous forme de pensées, en boucle." },
        { text: "Ce n'est pas un hasard, ni un défaut de caractère." },
        { text: "Une émotion qui n'a pas pu s'exprimer laisse une trace. Et cette trace cherche une sortie." },
        {
          text: "La nommer, l'écrire, en parler — un petit pas de plus pour désamorcer la boucle.",
          climax: true,
          climaxBg: "var(--terracotta)",
          closing: {
            intro: "Pour désamorcer la boucle :",
            links: [
              { title: "J'écris, je m'en libère", desc: "l'exercice d'écriture, pour une pensée qui tourne", route: "#/outil/ecriture" },
              { title: "J'accueille mes émotions, je m'équilibre", desc: "le coussin des émotions, rituel du soir", route: "#/outil/coussin-emotions" }
            ]
          }
        }
      ]
    }
  ]
};

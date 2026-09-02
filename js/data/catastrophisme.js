// Contenu repris mot pour mot du cahier des charges (module "catastrophisme", v0.24, 13 cases).
//
// Écart de source, résolu en faveur du cahier des charges : la maquette dédiée
// (design/ecran-module-psychoeducation-catastrophisme.html) est explicitement une PREMIÈRE ébauche —
// sa propre note dit ne montrer que "4 des 13 cases [...] pour valider le format bande dessinée avant
// de le dupliquer sur les 15 modules", antérieure à l'écran témoin complet et à la standardisation du
// gabarit (couleurs de fermeture, style des liens `.link-row`) déjà en place pour les quatre modules
// construits depuis. Les 13 cases proviennent donc du cahier des charges (texte complet, jamais mis en
// doute) ; seules la structure (case unique sans volets nommés, comme "évitement") et l'existence de
// deux liens de clôture viennent de cette ébauche, mise à jour avec le gabarit standard plutôt que
// reproduite telle quelle (couleurs de liens bespoke, barre de progression alternée non reprises).
//
// Les deux liens de clôture ("Je m'ancre, je suis là" et "Je respire, je m'apaise en profondeur, niveau
// 3 — la couleur de ton intention") sont validés par cette même ébauche ("Johan a validé les deux liens
// proposés"). Le second pointe directement vers le niveau 3 de l'outil de respiration (`/3`), pas vers
// sa page d'accueil — cohérent avec la maquette qui cite spécifiquement ce niveau, pas l'outil entier.
//
// Case 12 mise en valeur (fond sage-dark, halo) sans être la dernière case du module — la case 13, elle,
// clôt le module sur un fond cream classique, avec les liens en dessous (comme les autres modules à
// liens de clôture, distincts d'une case climax).
//
// Corrigé au passage (v1.52) : la barre de progression d'un module à volet unique et sans nom affiché
// sur la couverture (déjà "évitement") montre "Case i / total", pas "Volet 1 — i / total" — voir le
// commentaire dédié dans module.js.
const catastrophisme = {
  slug: "catastrophisme",
  cover: {
    badge: "Comprendre",
    title: "J'imagine toujours le pire, pourquoi ?",
    desc: "Pourquoi ton cerveau invente-t-il toujours <strong>la pire des hypothèses</strong> face à un silence ou un imprévu — et comment cette stratégie peut <strong>se reconstruire autrement</strong>.",
    meta: "13 cases · ~2 min",
    volets: [],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "J'imagine toujours le pire",
      color: "sage-dark",
      cases: [
        { text: "Un imprévu. Un silence. Un texto resté sans réponse." },
        { text: "Ton cerveau a besoin d'une explication. Le vide est plus difficile à supporter qu'une mauvaise nouvelle." },
        { text: "Alors il t'en donne une : la pire." },
        { text: "Pas parce qu'elle est la plus probable. Parce qu'elle comble le vide — et ça, ça rassure, un instant." },
        { text: "C'est une stratégie. Ton cerveau cherche une solution pour t'apaiser." },
        { text: "Sauf qu'à force de l'utiliser, cette solution devient elle-même le problème." },
        { text: "Elle t'angoisse plus qu'elle ne te calme." },
        { text: "Ton corps ne fait pas la différence entre imaginer et vivre." },
        { text: "Il réagit au scénario comme s'il était déjà arrivé." },
        { text: "Et plus tu l'imagines, plus il devient réel — à tes yeux." },
        { text: "Une hypothèse, parmi tant d'autres possibles, devient LA vérité." },
        { text: "Comme les <em>lunettes de l'angoisse</em> : ce que tu vois n'est qu'une version de la réalité. Pas la seule.", climax: true },
        {
          text: "Cette stratégie, ton cerveau l'a construite. Ce qui se construit peut se reconstruire — autrement.",
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            links: [
              { title: "Je m'ancre, je suis là", desc: "ancrage 5-4-3-2 — ramène l'attention au présent", route: "#/outil/ancrage-5432" },
              { title: "Je respire, je m'apaise en profondeur", desc: "niveau 3 — la couleur de ton intention", route: "#/outil/respiration-3-niveaux/3" }
            ]
          }
        }
      ]
    }
  ]
};

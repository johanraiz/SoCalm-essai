// Contenu repris mot pour mot du cahier des charges (module "neurologie de la crise", v0.21,
// complété v0.22, case 8 du volet 2 reformulée v1.03) — source : design/ecran-module-
// psychoeducation-neurologie-crise.html. Aucun écart de contenu constaté entre les deux sources.
//
// Seul ajustement de forme (déjà fait pour "évitement", v1.48) : les deux indications séparées de la
// maquette ("📖 3 volets, 24 cases" et "⏱ ~3 min") sont combinées en une seule phrase, le gabarit
// partagé n'affichant qu'une seule ligne de méta.
//
// Corrigé (v1.50) : la case de clôture du volet 2 ("C'est physiquement impossible.") avait été omise
// du traitement climax (fond sage-dark + halo) lors de la construction initiale (v1.49) — la maquette
// témoin montre bien CE fond sur cette case, en plus de celui, déjà présent, de la case 8 du même
// volet (note Johan v0.83). Les deux sont désormais distinguées : la case 8 garde en plus l'emphase
// typographique propre à elle seule (texte agrandi et en gras, `emphasis: true`, gabarit étendu en
// v1.50), la case de clôture n'a que le fond et le halo, comme les autres clôtures de volet.
const neurologieCrise = {
  slug: "neurologie-crise",
  cover: {
    badge: "Comprendre",
    title: "Mon cœur s'emballe, je panique",
    desc: "Module de l'axe corps — <strong>le mécanisme d'une crise</strong> (l'amygdale, l'adrénaline, combattre/fuir/se figer), pourquoi ce n'est physiquement pas dangereux, et pourquoi ton cerveau peut, malgré tout, déclencher une fausse alerte.",
    meta: "3 volets, 24 cases · ~3 min",
    volets: [
      "Normaliser par le vécu déjà connu",
      "Le mécanisme : amygdale et adrénaline",
      "La fausse alerte, un exemple concret"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "Normaliser par le vécu déjà connu",
      color: "sage-dark",
      cases: [
        { text: "Tu as sûrement déjà ressenti ça : le cœur qui bat fort, la respiration courte, les mains moites, une envie de vomir, les jambes qui tremblent, la tête qui tourne." },
        { text: "La plupart du temps, ça ne te posait pas de problème." },
        { text: "Comme quand tu courais pour attraper un bus que tu voyais au loin." },
        { text: "Ou lors d'un premier rendez-vous." },
        { text: "Une réaction normale. Passagère. Et ça passait, en effet." },
        { text: "Aujourd'hui, ce n'est plus pareil." },
        { text: "Tu appelles ça une crise d'angoisse — ou une attaque de panique." },
        { text: "Et c'est très difficile à vivre.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Le mécanisme : amygdale et adrénaline",
      color: "gold-dark",
      cases: [
        { text: "Ce cœur qui s'emballe ? Ce n'est pas un hasard." },
        { text: "C'est ton amygdale — un endroit de ton cerveau, un peu comme une sentinelle — qui vient de sonner l'alarme." },
        { text: "Elle croit percevoir un danger — pour ton corps, ou pour ton esprit." },
        { text: "Alors elle envoie un signal : action, maintenant." },
        { text: "Combattre. Fuir. Ou, si rien n'est possible... se figer." },
        { text: "L'adrénaline prépare tout ça : le cœur, les muscles, la respiration." },
        { text: "C'est pour ça que tu penses parfois : « je vais mourir » (danger pour le corps). Ou : « je deviens fou » (danger pour l'esprit)." },
        { text: "Crois le psychologue expérimenté que je suis : personne n'est jamais mort d'une attaque de panique.", climax: true, emphasis: true },
        { text: "Personne n'en est jamais devenu fou non plus." },
        { text: "C'est physiquement impossible.", climax: true }
      ]
    },
    {
      num: 3,
      name: "La fausse alerte, un exemple concret",
      color: "terracotta",
      cases: [
        { text: "Ton amygdale n'est pas toujours fiable." },
        { text: "Elle confond parfois un vrai danger... et une fausse alerte." },
        { text: "L'avion secoue. Turbulences." },
        { text: "Ton corps réagit comme si l'avion allait s'écraser." },
        { text: "Pourtant, c'est un phénomène banal — les avions sont conçus pour ça." },
        {
          text: "La croyance (« ça secoue, donc danger ») déclenche l'alarme. Pas les faits. Et cette croyance, même sans le moindre fait pour la confirmer, ton cerveau la vit comme parfaitement réelle.",
          climax: true,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            links: [
              { title: "Je respire, je m'apaise en profondeur", desc: "l'exercice de respiration en trois niveaux", route: "#/outil/respiration-3-niveaux" },
              { title: "Je m'ancre, je suis là", desc: "l'ancrage par les cinq sens (5-4-3-2)", route: "#/outil/ancrage-5432" }
            ]
          }
        }
      ]
    }
  ]
};

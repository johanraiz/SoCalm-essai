// Contenu repris mot pour mot du cahier des charges (module "pensées intrusives", v0.31) — source :
// design/ecran-module-psychoeducation-pensees-intrusives.html (v1.09). Aucun écart de contenu constaté
// entre les deux sources. Trois volets (10 + 6 + 9 cases), plus l'expérience personnelle de Johan (la
// peur de la mort et les calculs de réassurance) en clôture, en registre récit — même traitement que
// l'anecdote d'"évitement" (v1.48), sans passage mis en évidence (`.hl`) ici, la maquette n'en montrant
// aucun pour ce texte précis.
//
// Un ajustement de forme, déjà appliqué aux trois modules précédents : les deux indications séparées de
// la maquette ("📖 3 volets, 25 cases + expérience" et "⏱ ~4 min") combinées en une seule phrase.
//
// Écart constaté et résolu, du même type que celui déjà rencontré sur "évitement" (v1.48) : la maquette
// affiche, DANS l'encart "Ça peut aussi t'intéresser" de la couverture elle-même, le texte "Pas de lien
// de clôture (v0.32) — décision actée (v1.09)." — manifestement une note de production (numéros de
// version, jamais montrés ailleurs à l'utilisateur) qui a glissé dans l'emplacement visuel de l'encart
// plutôt qu'un vrai texte destiné à la personne qui utilise l'app. Résolu comme pour "évitement" :
// aucun encart inventé pour remplacer cette phrase, cover.related laissé vide — l'encart ne s'affiche
// simplement pas sur ce module, cohérent avec la décision de fond ("pas de lien de clôture", validée
// v1.09) que la phrase elle-même annonçait, seule sa mise en forme dans la maquette étant erronée.
const penseesIntrusives = {
  slug: "pensees-intrusives",
  cover: {
    badge: "Comprendre",
    title: "J'ai des pensées qui me font peur et que je ne contrôle pas, qu'est-ce que c'est ?",
    desc: "Module de l'axe pensées — pourquoi <strong>lutter contre une pensée la renforce</strong>, pourquoi une pensée n'est jamais un acte, et pourquoi la <strong>pensée magique</strong> peut revenir sous anxiété.",
    meta: "3 volets, 25 cases + expérience · ~4 min",
    volets: [
      "Le piège de la lutte",
      "Une pensée n'est pas un acte",
      "Les pensées magiques"
    ],
    related: null
  },
  volets: [
    {
      num: 1,
      name: "Le piège de la lutte",
      color: "sage-dark",
      cases: [
        { text: "Une pensée dérangeante ou inconfortable s'impose à toi. Tu voudrais qu'elle parte. Tout de suite." },
        { text: "Alors tu luttes. Tu la repousses." },
        { text: "Et elle revient. Plus fort. Plus souvent." },
        { text: "Pas un manque de volonté. Un mécanisme bien connu : plus tu chasses une pensée, plus ton cerveau la surveille — pour vérifier qu'elle n'est pas là." },
        { text: "Cette surveillance, c'est elle qui la ramène." },
        { text: "Essaie, là, maintenant : ne pense pas à une boîte de sardines." },
        { text: "... Trop tard." },
        { text: "Une pensée neutre ? Oubliée en une seconde." },
        { text: "Une pensée qu'on juge inacceptable, taboue, bizarre ? Elle s'accroche." },
        { text: "Ce n'est pas la pensée qui décide de revenir. C'est l'importance qu'on lui donne.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Une pensée n'est pas un acte",
      color: "gold-dark",
      cases: [
        { text: "Toutes les pensées ont le droit d'exister. Même les pires. Même celles qui font honte." },
        { text: "Une pensée n'est pas un acte." },
        { text: "Comme le disait mon thérapeute : ce n'est pas le mot « chien » qui va te mordre." },
        { text: "Ton cerveau en génère des centaines, chaque jour. Absurdes, violentes, étranges. Chez tout le monde." },
        { text: "Ce qui rend une pensée « intrusive », ce n'est pas son contenu. C'est le jugement qu'on porte dessus." },
        { text: "Parfois, cette peur va plus loin : peur de passer à l'acte à cause d'une pensée qu'on ne veut surtout pas avoir. Une peur sans fondement — avoir une pensée ne mène jamais à l'acte.", climax: true, climaxBg: "var(--gold-dark)" }
      ]
    },
    {
      num: 3,
      name: "Les pensées magiques",
      color: "terracotta",
      cases: [
        { text: "Il existe une autre peur, cousine de celle-ci." },
        { text: "Croire qu'une pensée peut, à elle seule, faire arriver les choses." },
        { text: "Toucher du bois. Ne pas dire « tout va bien » trop fort, de peur d'attirer le mauvais sort. Tu connais sûrement ce réflexe." },
        { text: "Un vieux mode de pensée, hérité de l'enfance, où penser et agir se confondaient encore." },
        { text: "Sous anxiété, il peut revenir." },
        { text: "Et amplifier chaque pensée redoutée : « si j'y pense, ça va arriver. »" },
        { text: "Non. Penser à un accident ne le provoque pas." },
        { text: "Pas plus que penser à une boîte de sardines n'en fait apparaître une." },
        { text: "Si c'était vrai, avec toutes les fois où j'ai imaginé gagner au loto... je serais milliardaire !", climax: true, climaxBg: "var(--terracotta)" },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>Il y a eu une période où la mort m'obsédait. Pas de façon abstraite — de façon concrète, presque quotidienne.</p>
              <p>Alors j'évitais. Les infos qui en parlaient, certaines conversations, certains films.</p>
              <p>Sauf que plus je fuyais, plus la pensée me rattrapait. Elle s'invitait n'importe quand — au réveil, dans les transports, parfois en pleine nuit, brutalement.</p>
              <p>Alors j'ai trouvé une parade. Un calcul, presque un rituel : « il me reste encore les trois quarts de ma vie à vivre. » C'est encore loin. Je me le répétais, dès que la pensée revenait — et il m'en fallait un peu plus, à chaque fois.</p>
              <p>Ce calcul ne réglait rien. Il confirmait, au contraire, que cette pensée méritait d'être prise très au sérieux — sinon, pourquoi je me donnerais tant de mal pour la calmer ?</p>
              <p>Ce chemin a été long.</p>
              <p>Bien sûr, aujourd'hui, la mort me fait encore un peu peur. Mais paradoxalement, elle ne m'empêche plus de vivre. Et je n'y pense que très rarement — sauf quand je dois te raconter cette anecdote !</p>
            </div>
          `,
          closing: {
            intro: "Pour ne plus lutter contre la pensée :",
            links: [
              { title: "J'écris, je m'en libère", desc: "l'exercice d'écriture, pour sortir la pensée de ta tête", route: "#/outil/ecriture" },
              { title: "Je vérifie, je reprends la main", desc: "noter ce que tu redoutes, pour comparer ensuite avec ce qui arrive vraiment", route: "#/outil/je-verifie" }
            ]
          }
        }
      ]
    }
  ]
};

// Contenu repris mot pour mot du cahier des charges (module "body-scan", v0.28) — source :
// design/ecran-module-psychoeducation-body-scan.html. Aucun écart de contenu constaté entre les deux
// sources — mockup complet et cohérent. Deux volets (12 + 7 cases), plus l'expérience personnelle de
// Johan (hypervigilance et repli sur soi), placée en CLÔTURE du module, en registre récit — même
// position que pour "évitement" et "pensées intrusives" (contrairement à "peur de perdre le contrôle",
// dont l'anecdote est un interlude mi-volet). Aucun passage mis en évidence (`.hl`) dans cette anecdote,
// la maquette n'en montrant aucun pour ce texte précis — même constat que pour "pensées intrusives".
//
// Climax des deux volets sur le sage-dark par défaut (pas de climaxBg) — comme "fondateur" et
// "neurologie de la crise", à la différence des modules qui closent chaque volet sur sa propre couleur
// d'identité : la maquette valide bien un fond sage-dark identique pour les deux clôtures de volet ici.
//
// Lien de clôture, porté par l'anecdote elle-même plutôt que par une case numérotée séparée — première
// fois que panelHtml et closing coexistent sur la même case (le code de module.js les traite déjà
// indépendamment, aucune modification nécessaire) : "Je m'ancre, je suis là" (ancrage 5-4-3-2), déjà en
// ligne.
//
// Encart "Ça peut aussi t'intéresser" : le texte de la maquette ("Ce module renvoie, en fin de lecture,
// vers un outil pratique en lien (v0.32).") mélange une note de production (numéro de version) avec le
// contenu réel destiné à la personne — même schéma que pour "peur de perdre le contrôle". Reformulé sans
// le numéro de version, substance conservée (un outil en lien), registre déjà établi pour ce type
// d'encart.
const bodyScan = {
  slug: "body-scan",
  cover: {
    badge: "Comprendre",
    title: "Je scanne mon corps en permanence, à l'affût du moindre symptôme, pourquoi ?",
    desc: "Module de l'axe corps — pourquoi <strong>l'attention amplifie</strong> ce qu'elle cherche, comment une sensation banale devient une histoire de danger, et pourquoi scanner son corps est une forme de <strong>contrôle qui se retourne contre soi</strong>.",
    meta: "2 volets + expérience, 19 cases · ~3 min",
    volets: [
      "L'attention qui amplifie (et qui filtre, à raison)",
      "L'erreur d'interprétation et le cercle"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "L'attention qui amplifie (et qui filtre, à raison)",
      color: "sage-dark",
      cases: [
        { text: "Cœur qui bat un peu vite. Un point dans le dos. Une drôle de sensation dans le bras." },
        { text: "Tu scannes. En boucle. À la recherche du moindre signal." },
        { text: "Logique, en apparence : mieux vaut repérer le danger tôt." },
        { text: "Sauf qu'un corps produit des sensations en permanence. Digestion. Tension musculaire. Variations du rythme cardiaque. Douleur passagère." },
        { text: "La plupart du temps, personne n'y prête attention. Elles passent inaperçues." },
        { text: "Toi, tu les cherches. Et chercher change tout." },
        { text: "Concentre-toi une seconde sur ta langue, dans ta bouche. Tu la sens, maintenant ?" },
        { text: "Elle était pourtant là avant que tu n'y penses. L'attention ne se contente pas de détecter une sensation. Elle l'amplifie." },
        { text: "Regarde maintenant devant toi. Tu ne vois pas ton nez, pourtant il est bien là, dans ton champ de vision." },
        { text: "Ton cerveau le filtre depuis toujours. Volontairement." },
        { text: "Ne pas percevoir, ce n'est pas une faille. C'est ton corps qui fait bien son travail." },
        { text: "Il en va de même pour la plupart de tes sensations : ne pas les remarquer est le fonctionnement normal.", climax: true }
      ]
    },
    {
      num: 2,
      name: "L'erreur d'interprétation et le cercle",
      color: "gold-dark",
      cases: [
        { text: "Le problème n'est jamais la sensation qu'on remarque. C'est l'histoire qu'on choisit de lui raconter." },
        { text: "« Danger » est une des histoires possibles. Rarement la bonne." },
        { text: "Plus tu scannes, plus tu trouves. Plus tu trouves, plus tu interprètes en danger." },
        { text: "Plus tu t'inquiètes, plus tu scannes." },
        { text: "Le cercle se referme. Comme pour la respiration, en pleine crise." },
        { text: "Scanner, c'est une forme de contrôle. La même famille que celles qu'on a déjà vues." },
        { text: "Sauf que cette fois, ce n'est pas une situation qu'on surveille. C'est son propre corps.", climax: true },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>Quand je souffrais de crises d'angoisse récurrentes, je vivais en état d'hypervigilance permanente — à me demander sans cesse si ce que je ressentais était normal, ou le signe d'un danger mortel, ou qui allait me faire basculer dans la folie sans retour possible.</p>
              <p>Je respirais mal, alors les vertiges revenaient souvent. Et chaque vertige me plongeait dans la même peur : perdre connaissance, en public.</p>
              <p>Je peux te le dire aujourd'hui : ça ne m'est jamais arrivé. Mais à l'époque, ça paraissait plus que plausible.</p>
              <p>Et je repartais pour un tour.</p>
              <p>Une douleur à la poitrine ? Une crise cardiaque, à coup sûr. Une tension dans le crâne ? Un signe précoce d'AVC. Une pensée intrusive ? La preuve que j'étais complètement fou.</p>
              <p>Je me laissais guider par mes peurs. Elles prenaient toute la place.</p>
              <p>Je restais enfermé dans le contrôle de mon monde intérieur — et dans la honte de ce que je vivais. Je me coupais de l'extérieur, de la vie, des autres.</p>
              <p>Exactement l'inverse de ce qu'il fallait faire.</p>
            </div>
          `,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            link: { title: "Je m'ancre, je suis là", desc: "l'ancrage par les cinq sens (5-4-3-2)", route: "#/outil/ancrage-5432" }
          }
        }
      ]
    }
  ]
};

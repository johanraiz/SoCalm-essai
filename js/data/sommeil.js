// Contenu repris mot pour mot du cahier des charges (module "sommeil", v0.27) — source :
// design/ecran-module-psychoeducation-sommeil.html. Aucun écart de contenu constaté sur le texte des
// cases. Deux volets (10 + 6 cases), plus "mon astuce" personnelle de Johan en registre "je" (reformulé
// v1.06 — "secret" remplacé par "astuce", plus concret et moins ludique), en INTERLUDE entre les cases
// 2.5 et 2.6 — position exacte du texte source, pas une clôture de module comme "body-scan" ou
// "respiration". Même encadré visuel que les anecdotes (`.anecdote`), réutilisé pour ce registre "je"
// distinct du registre récit.
//
// Petite incohérence RÉSOLUE dans la maquette elle-même : le méta-texte de couverture dit encore
// "2 volets + secret" alors que la note d'en-tête du même fichier documente explicitement le
// renommage validé "secret" → "astuce" (v1.06) — reliquat non mis à jour, corrigé ici en "astuce"
// (la décision la plus récente et explicite l'emporte, même principe déjà appliqué à "évitement").
//
// Climax des deux volets sur le sage-dark par défaut (pas de climaxBg) — comme "fondateur",
// "neurologie de la crise", "body-scan" et "respiration" : la clôture du volet 2 (case 2.6) est elle
// aussi en sage-dark dans la maquette, pas en gold-dark (couleur d'identité du volet 2).
//
// POINT SIGNALÉ, NON BLOQUANT (même situation que "symptômes digestifs") : les trois liens de clôture
// de la case 2.6 ne sont PAS présentés comme validés dans l'écran témoin — la note d'en-tête dit
// explicitement "Trois liens de clôture proposés, à confirmer", et l'écran porte lui-même un badge
// "proposition — à confirmer". Construits ici quand même — cohérents avec le texte : l'exercice
// d'écriture correspond directement au "laisser tomber, ce n'est pas important" de l'astuce, le lieu
// sécure et la respiration sont explicitement cités en case 1.10 ("les exercices de ce module",
// "la respiration peut la relâcher") — mais CE POINT PRÉCIS, comme pour "symptômes digestifs", reste à
// confirmer par Johan à la relecture finale.
//
// Encart "Ça peut aussi t'intéresser" : la maquette dit "un outil pratique en lien" au singulier alors
// que trois liens sont proposés — reformulé au pluriel, numéro de version retiré (même schéma que les
// modules précédents à liens multiples).
const sommeil = {
  slug: "sommeil",
  cover: {
    badge: "Comprendre",
    title: "Je n'arrive pas à dormir tellement je suis anxieux·se, que faire ?",
    desc: "Module de l'axe corps — pourquoi <strong>chercher le sommeil</strong> l'empêche d'arriver, pourquoi les pensées du soir s'accrochent tant, et une question simple pour <strong>savoir laquelle mérite ton attention</strong>, ce soir.",
    meta: "2 volets + astuce, 16 cases · ~3 min",
    volets: [
      "L'injonction paradoxale du sommeil forcé",
      "Les pensées d'avant le coucher"
    ],
    related: "Ce module renvoie, en fin de lecture, vers des outils pratiques en lien."
  },
  volets: [
    {
      num: 1,
      name: "L'injonction paradoxale du sommeil forcé",
      color: "sage-dark",
      cases: [
        { text: "Tu te couches. Et la mission commence : « il faut que je dorme. »" },
        { text: "Une mission, avec un objectif, un effort, une échéance." },
        { text: "Mais le sommeil n'est pas un objectif qu'on atteint par la volonté. C'est l'état de détente et de lâcher-prise qui mène naturellement au sommeil." },
        { text: "Plus tu essaies, plus ton corps se tend. Et un corps tendu ne s'endort pas." },
        { text: "« Dors » fonctionne comme « calme-toi » : une injonction impossible à obéir sur commande." },
        { text: "Chercher le sommeil, c'est fabriquer la tension qui l'empêche." },
        { text: "Alors que faire, si vouloir dormir empêche de dormir ?" },
        { text: "Renoncer à l'objectif. Pas au lit, pas à la nuit — juste à l'obligation de résultat." },
        { text: "Autorise-toi à rester éveillé, sans lutter. C'est souvent ce qui fait venir le sommeil." },
        { text: "Si ce sont des pensées qui tournent en boucle, les exercices de ce module peuvent t'aider. Si c'est une tension dans le corps, la respiration peut la relâcher.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Les pensées d'avant le coucher",
      color: "gold-dark",
      cases: [
        { text: "Une fois couché, une pensée s'invite. Un problème à régler. Une décision à prendre. Un mail resté sans réponse." },
        { text: "Ton cerveau la garde active, presque malgré toi." },
        { text: "Ce n'est pas un hasard : une tâche non résolue reste en tête bien plus qu'une tâche terminée. Un effet bien connu en psychologie (effet Zeigarnik)." },
        { text: "Ton cerveau n'essaie pas de te torturer. Il essaie, à sa manière, de ne rien oublier." },
        { text: "Mais la nuit ne t'offre aucune action possible sur la plupart de ces pensées." },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon astuce</div>
              <p>Mon astuce que j'utilise, moi, quand une pensée m'envahit le soir.</p>
              <p>Une seule question : est-ce utile d'y penser maintenant ? Est-ce que je peux trouver une solution, là, tout de suite ?</p>
              <p>Si oui, je m'autorise à y réfléchir, jusqu'à trouver une solution.</p>
              <p>Si non, je laisse tomber. Ce n'est pas important, pas maintenant.</p>
            </div>
          `
        },
        {
          text: "Le cerveau n'a pas besoin de résoudre chaque pensée. Juste de savoir laquelle mérite ton attention, ce soir.",
          climax: true,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            links: [
              { title: "J'écris, je m'en libère", desc: "exercice d'écriture bornée, 15 minutes", route: "#/outil/ecriture" },
              { title: "Je m'y réfugie, je me sens en sécurité", desc: "le lieu sécure, visualisation guidée", route: "#/outil/lieu-secure" },
              { title: "Je respire, je m'apaise en profondeur", desc: "l'exercice de respiration en trois niveaux", route: "#/outil/respiration-3-niveaux" }
            ]
          }
        }
      ]
    }
  ]
};

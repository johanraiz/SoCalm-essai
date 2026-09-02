// Contenu repris mot pour mot du cahier des charges (module "évitement", v0.22-v0.23, anecdote
// enrichie v1.08) — source : design/ecran-module-psychoeducation-evitement.html (v1.09).
//
// Deux écarts, résolus sans bloquer, tous deux transparents dans la note propre du fichier témoin
// lui-même plutôt qu'entre deux sources différentes :
// 1. La couverture du témoin annonce encore "Ce module renvoie, en fin de lecture, vers un outil
//    pratique en lien (v0.32)" — mais la note d'en-tête du MÊME fichier dit explicitement l'inverse,
//    daté plus récemment (v1.09) : "Pas de lien de clôture [...] aucune ressource existante ne
//    correspond clairement au mécanisme d'exposition graduelle décrit ici. Décision actée (v1.09)."
//    La phrase de couverture est un reliquat non mis à jour ; la décision v1.09, plus récente et
//    explicite, est retenue — cover.related est donc laissé vide (aucune promesse de lien inventée).
// 2. Le témoin affiche "📖 5 cases + tableau + expérience" et "⏱ ~3 min" comme deux indications
//    séparées ; le gabarit réutilisé (déjà en place pour "fondateur") n'affiche qu'une seule ligne de
//    méta — les deux sont combinées en une phrase, sans perte d'information, plutôt que de dupliquer
//    le composant partagé pour ce seul module.
const evitement = {
  slug: "evitement",
  cover: {
    badge: "Comprendre",
    title: "J'évite tout ce qui m'angoisse, est-ce que j'ai raison ?",
    desc: "Module de l'axe pensées — pourquoi <strong>éviter et contrôler</strong> soulagent tout de suite mais <strong>nourrissent l'angoisse</strong> à long terme, sur les terrains externes et internes.",
    meta: "5 cases + tableau + expérience · ~3 min",
    volets: [],
    related: null
  },
  volets: [
    {
      num: 1,
      name: "Le mécanisme de l'évitement et du contrôle",
      color: "sage-dark",
      cases: [
        { text: "Face à un danger qu'on imagine, le cerveau invente des stratégies pour s'en protéger." },
        { text: "Deux grandes familles : éviter, ou contrôler." },
        { text: "Et deux terrains : ce qui vient de dehors — une situation, un lieu. Ou ce qui vient de dedans — une sensation, une émotion." },
        { text: "Le problème : ça soulage tout de suite... mais ça confirme au cerveau que le danger était réel." },
        { text: "La prochaine fois, l'alarme sonne encore plus fort.", climax: true },
        {
          panelClass: "case-panel-table",
          panelHtml: `
            <div class="ev-table-title">Deux familles, deux terrains</div>
            <div class="ev-table">
              <div class="ev-cell ev-corner"></div>
              <div class="ev-cell ev-head">Externe<span class="ev-sub">situation, lieu</span></div>
              <div class="ev-cell ev-head">Interne<span class="ev-sub">sensation, émotion</span></div>
              <div class="ev-cell ev-rowhead">Évitement</div>
              <div class="ev-cell">• Peur de la foule → éviter concerts, manifestations<br>• Peur de l'avion → ne jamais voler</div>
              <div class="ev-cell">• Peur d'un AVC → éviter le sport<br>• Peur d'une émotion forte → l'étouffer dans le chocolat</div>
              <div class="ev-cell ev-rowhead">Contrôle</div>
              <div class="ev-cell">• Peur du jugement → contrôler chaque conversation<br>• Peur de l'imprévu → tout planifier</div>
              <div class="ev-cell">• Peur de sa tristesse → ne jamais pleurer<br>• Peur de sa colère → toujours paraître calme</div>
            </div>
          `
        },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>Petit, j'ai eu peur des chiens. Pas à cause d'une mauvaise expérience — à cause d'une phrase prononcée par mon père avec une grande émotion de peur.</p>
              <p>J'avais cinq ans. Je marchais avec mon père sur un trottoir, et j'ai vu un magnifique husky. Je me suis avancé pour le caresser. Mon père m'a retenu par le bras : « Attention, ces chiens-là peuvent te mordre le mollet. »</p>
              <p>Instantanément, j'ai senti la morsure sur ma jambe. Elle n'avait jamais eu lieu.</p>
              <p><span class="hl">Mon cerveau avait appris une règle : les chiens sont dangereux, ils mordent le mollet. Et par la suite, mon cerveau a ancré cette croyance dans ma mémoire associative, et il l'a appliquée à la lettre — à tous les chiens.</span> Même au chihuahua du voisin. Pas très rationnel, tu en conviendras.</p>
              <p>Dès que je croisais un chien, j'angoissais. Cœur qui bat, respiration courte. J'évitais toutes les situations où je risquais d'en croiser un.</p>
              <p>Pas facile à vivre. Et pire : en évitant, je privais mon cerveau de la seule chose qui aurait pu lui prouver le contraire : des chiens affectueux et inoffensifs.</p>
              <p>À 17 ans, je me suis fait un ami qui avait deux choses : un gros chien, et une piscine — bien pratique pour supporter les étés caniculaires de Grenoble. Pour me baigner, j'ai dû <span class="hl">confronter ma peur</span>.</p>
              <p>J'ai compris qu'un chien qui court vers toi en aboyant, parfois, c'est juste qu'il veut jouer. Petit à petit, un lien de confiance a grandi entre ce chien et moi.</p>
              <p><span class="hl">Ma peur des chiens s'est nettement améliorée</span> depuis, et <span class="hl">ma croyance a évolué</span> : maintenant je sais que certains chiens peuvent être dangereux et je sais m'en protéger, mais que la plupart sont très affectueux et joueurs.</p>
            </div>
          `,
          closing: {
            intro: "Pour reprendre la main sur l'évitement :",
            links: [
              { title: "Je vérifie, je reprends la main", desc: "noter ce que tu redoutes, pour comparer ensuite avec ce qui arrive vraiment", route: "#/outil/je-verifie" }
            ]
          }
        }
      ]
    }
  ]
};

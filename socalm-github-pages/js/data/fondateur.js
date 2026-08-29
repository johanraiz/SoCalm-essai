// Contenu repris mot pour mot du cahier des charges (module fondateur, v0.19-v0.20, v0.49, v1.02)
// Source : design/ecran-module-psychoeducation-fondateur.html

const fondateur = {
  slug: "fondateur",
  cover: {
    badge: "Comprendre",
    title: "Je me sens anxieux·se, c'est quoi exactement ?",
    desc: "Le module fondateur — <strong>pourquoi l'angoisse existe</strong>, comment elle se loge dans le corps, les pensées et le rapport au temps, et pourquoi la certitude de <strong>retrouver le calme</strong> compte plus que l'absence d'angoisse elle-même.",
    meta: "3 volets, 35 cases · ~4 min",
    volets: [
      "Qu'est-ce que l'angoisse, au juste ?",
      "Les lunettes de l'angoisse",
      "La certitude de revenir"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "Qu'est-ce que l'angoisse, au juste ?",
      color: "sage-dark",
      cases: [
        { text: "L'angoisse, l'anxiété, une crise de panique — tu les vis peut-être déjà, sans jamais t'être vraiment demandé ce qu'elles sont." },
        { text: "Une chose, d'abord : ce n'est pas un défaut. C'est une réaction normale du corps, quand il croit repérer un danger." },
        { text: "Une réaction qui nous accompagne depuis toujours — c'est elle qui a permis à l'espèce humaine de survivre, en évitant le danger à temps." },
        { text: "Ce système de détection n'est pas infaillible. Il lui arrive de se tromper — de sonner l'alarme pour rien." },
        { text: "Une fausse alerte, en soi, ce n'est pas grave." },
        { text: "Mais elle se loge quelque part. D'abord dans le corps — le souffle qui se raccourcit, le cœur qui s'emballe." },
        { text: "Elle se loge aussi dans la tête — une pensée qui s'impose, qu'on ne contrôle pas, et qui revient sans cesse." },
        { text: "Et elle se loge presque toujours hors de l'instant présent — tournée vers ce qui est déjà arrivé, à ressasser. Ou vers ce qui pourrait arriver, à anticiper." },
        { text: "Le corps, les pensées, le rapport au temps — trois terrains différents, un même mécanisme au fond." },
        { text: "Et c'est là, sur l'un de ces terrains ou sur plusieurs à la fois, que peut naître autre chose : la peur de ressentir à nouveau cette peur." },
        { text: "Cette peur-là peut, avec le temps, prendre toute la place — jusqu'à ce que ta vie entière tourne autour d'elle." },
        { text: "Cette application joue justement sur chacun de ces terrains — le corps, les pensées, le retour à l'instant présent. Pas pour faire disparaître l'angoisse : pour lui redonner sa juste place, et qu'elle redevienne ce qu'elle a toujours été — quelque chose de banal.", climax: true },
        { text: "Quelques mots qu'on va utiliser souvent ici, avec un sens précis." },
        { text: "L'anxiété : un malaise diffus, souvent tourné vers l'avenir — une inquiétude qui s'étire, sans toujours avoir d'objet précis." },
        { text: "L'angoisse : plus intense, plus incarnée dans le corps — le mot vient du latin angustia, l'étroitesse, comme une gorge qui se serre." },
        { text: "La crise d'angoisse, ou l'attaque de panique — les deux mots désignent la même chose : un pic soudain et intense, avec des sensations physiques fortes. Ça monte vite, et ça redescend aussi." },
        { text: "Trois mots d'une même famille — celle qu'on va apprendre, ensemble, à mieux connaître.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Les lunettes de l'angoisse",
      color: "gold-dark",
      cases: [
        { text: "Quand on est anxieux, tout paraît anxiogène." },
        { text: "Comme si on portait des lunettes de l'angoisse." },
        { text: "Pense à ton plat préféré." },
        { text: "Maintenant imagine : nausée, ventre noué." },
        { text: "Même lui... donnerait envie de vomir." },
        { text: "L'angoisse, c'est le même processus." },
        { text: "Une chaise. Une table. Rien de spécial." },
        { text: "Avec les lunettes de l'angoisse, tout devient menaçant." },
        { text: "Mais ce ne sont que des lunettes." },
        { text: "Et ça, ça s'enlève." },
        { text: "Comme un ciel qui redevient bleu après une tempête.", climax: true }
      ]
    },
    {
      num: 3,
      name: "La certitude de revenir",
      color: "terracotta",
      cases: [
        { text: "Au risque de te surprendre, en elle-même, l'angoisse n'a jamais été le problème." },
        { text: "Ce qui pose vraiment problème, c'est autre chose : la crainte de ne pas pouvoir retrouver un état de calme et d'apaisement." },
        { text: "Peu importe la profondeur de la descente — même le fond du gouffre ne ferait pas peur, si on savait qu'à coup sûr, et dans un temps connu, on retrouverait la surface." },
        { text: "Il existe un vieux proverbe : tomber sept fois, se relever huit." },
        { text: "Tomber, même s'effondrer, ce n'est plus un problème dès l'instant où on est certain de pouvoir se relever — même si ça demande des efforts." },
        { text: "C'est exactement ce que cette application cherche à construire avec toi : pas l'absence d'angoisse, mais la certitude de revenir à un état de calme et d'apaisement, à chaque fois." },
        {
          text: "Et avec cette certitude retrouvée, l'angoisse peut redevenir ce qu'elle a toujours été en réalité : quelque chose de banal. Qui se vit, et qui s'oublie presque aussitôt.",
          climax: true,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            link: {
              title: "Je respire, je m'apaise en profondeur",
              desc: "l'exercice de respiration en trois niveaux",
              route: "#/outil/respiration-3-niveaux"
            }
          }
        }
      ]
    }
  ]
};

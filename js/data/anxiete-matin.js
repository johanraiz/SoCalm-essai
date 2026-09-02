// Contenu repris mot pour mot du cahier des charges (module "anxiété du matin", v0.25) — source :
// design/ecran-module-psychoeducation-anxiete-matin.html. Aucun écart de contenu constaté entre les
// deux sources, y compris sur l'anecdote complète (vérifiée jusqu'à ses deux dernières phrases,
// "Mais l'interprétation que j'en fais..." / "Et ce que je construis..."). Séquence unique de 10 cases
// (pas de volets — même schéma que "évitement", "catastrophisme" et "symptômes digestifs"), plus
// l'expérience personnelle de Johan (la sensation dans le ventre) en clôture, registre récit.
//
// Pas de lien de clôture — décision déjà actée dans le texte source lui-même (v1.09) : le mécanisme
// décrit ici (biais de confirmation, mauvaise attribution d'une sensation physique) ne correspond
// directement à aucun outil existant de l'app. Même traitement que "évitement" et "pensées intrusives" :
// cover.related laissé vide, l'encart "Ça peut aussi t'intéresser" de la maquette ("Pas de lien de
// clôture (v0.32) — décision actée (v1.09).") étant une note de production plutôt qu'un texte destiné à
// la personne qui utilise l'app.
const anxieteMatin = {
  slug: "anxiete-matin",
  cover: {
    badge: "Comprendre",
    title: "Je me réveille déjà anxieux·se, qu'est-ce que je fais ?",
    desc: "Module de l'axe quotidien — pourquoi la question « qu'est-ce qui ne va pas ? » trouve toujours une réponse, le rôle du cortisol au réveil, et pourquoi une sensation n'est pas toujours ce qu'on croit.",
    meta: "10 cases + expérience · ~3 min",
    volets: [],
    related: null
  },
  volets: [
    {
      num: 1,
      name: "Le piège de la question, et le rappel physiologique",
      color: "sage-dark",
      cases: [
        { text: "Le réveil sonne. Et la première pensée arrive : « Qu'est-ce qui ne va pas aujourd'hui ? »" },
        { text: "Cette question a déjà la réponse en elle. Quelque chose ne va pas." },
        { text: "Alors ton cerveau se met au travail. Et il trouve. Toujours." },
        { text: "Un rendez-vous qui approche. Une phrase mal interprétée hier. Une fatigue." },
        { text: "Mille raisons possibles. Toutes choisies pour confirmer ce que tu cherchais déjà." },
        { text: "Et cette anxiété, tu la portes maintenant toute la journée." },
        { text: "Pourtant il existe une autre explication. Plus simple." },
        { text: "Le matin, ton cortisol grimpe naturellement. L'hormone qui t'aide à te réveiller." },
        { text: "Ton corps déclenche ce pic chaque matin. Danger ou pas." },
        { text: "Une activation. Pas forcément une alerte.", climax: true },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>Pendant ma période d'angoisse, chaque matin je scannais mon corps. À la recherche d'un signe.</p>
              <p>Un signe qui prouverait ce que je croyais déjà : que j'étais angoissé.</p>
              <p>Mon signe le plus fidèle : une sensation bizarre dans le ventre.</p>
              <p>Dès que je le retrouvais — ou que j'en découvrais un nouveau — le verdict tombait aussitôt. J'étais angoissé. Et paradoxalement, c'était même un peu rassurant : je retrouvais du « connu » — un rituel, certes dysfonctionnel, mais familier.</p>
              <p>Mes pensées prenaient le relais pour trouver pourquoi. Et elles trouvaient. Toujours. J'étais très créatif.</p>
              <p>Puis un matin, une question a devancé les autres : et si ce n'était pas de l'angoisse ?</p>
              <p>J'ai mangé. La sensation s'est envolée avec la faim.</p>
              <p>Depuis, cette question est devenue un réflexe.</p>
              <p>Mes sensations sont réelles — je ne les remets pas en cause.</p>
              <p>Mais l'interprétation que j'en fais, c'est moi qui la construis.</p>
              <p>Et ce que je construis peut nourrir l'angoisse. Ou m'apaiser.</p>
            </div>
          `
        }
      ]
    }
  ]
};

// Contenu repris mot pour mot du cahier des charges (module "respiration", v0.26) — source :
// design/ecran-module-psychoeducation-respiration.html. Aucun écart de contenu constaté entre les deux
// sources — mockup complet et cohérent, lien de clôture déjà validé. Trois volets (5 + 6 + 8 cases),
// plus le témoignage personnel de Johan en clôture de module, registre récit — même position que
// "évitement", "pensées intrusives" et "body-scan".
//
// Nom de fichier et de variable distincts de js/data/respiration.js (déjà en ligne, données de l'OUTIL
// "Je respire, je m'apaise en profondeur") : ce fichier-ci est le MODULE de psychoéducation qui explique
// le mécanisme, pas l'exercice lui-même — les deux coexistent et se renvoient l'un à l'autre (le module
// clôt sur un lien vers l'outil).
//
// Climax des trois volets sur le sage-dark par défaut (pas de climaxBg) — comme "fondateur",
// "neurologie de la crise" et "body-scan" : la maquette valide bien un fond identique aux trois
// clôtures de volet, pas une couleur d'identité propre à chacun.
//
// Nouveauté visuelle (v1.56, voir css/app.css) : le témoignage isole une phrase entière en évidence
// ("Un petit pas est déjà un pas...") via une classe `.highlight` sur tout le paragraphe — à la
// différence du `.hl` en évidence partielle (un passage au milieu d'une phrase) déjà utilisé pour
// l'anecdote d'"évitement". Reprise du style exact de la maquette.
//
// Encart "Ça peut aussi t'intéresser" : le texte de la maquette ("(v0.32)") mélange une note de
// production avec le contenu réel — même schéma que "peur de perdre le contrôle", "body-scan" et
// "symptômes digestifs". Reformulé sans le numéro de version.
const respirationModule = {
  slug: "respiration-module",
  cover: {
    badge: "Comprendre",
    title: "Pourquoi respirer m'aide vraiment à me calmer ?",
    desc: "Module de l'axe corps — pourquoi <strong>« calme-toi »</strong> est une demande impossible, comment la respiration peut nourrir la crise... et comment <strong>ce même souffle</strong>, utilisé autrement, peut te permettre un <strong>retour au calme</strong>, avec un peu d'entraînement.",
    meta: "3 volets + témoignage, 19 cases · ~3 min",
    volets: [
      "L'injonction paradoxale du « calme-toi »",
      "Quand la respiration alimente la crise",
      "Le même souffle, dans l'autre sens"
    ],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "L'injonction paradoxale du « calme-toi »",
      color: "sage-dark",
      cases: [
        { text: "« Calme-toi. » Tu l'as sûrement déjà entendu." },
        { text: "Une phrase bien intentionnée. Mais impossible à obéir." },
        { text: "Personne ne devient calme sur commande. Pas plus qu'on ne devient spontané en se le demandant." },
        { text: "Et si ça ne marche pas, une pensée s'ajoute : « je n'y arrive même pas ». Tu culpabilises, en plus d'être anxieux·se." },
        { text: "Le problème n'a jamais été toi. C'est la demande elle-même qui est impossible à tenir.", climax: true }
      ]
    },
    {
      num: 2,
      name: "Quand la respiration alimente la crise",
      color: "gold-dark",
      cases: [
        { text: "Pendant une crise, ta respiration s'accélère. Elle se prépare à combattre ou fuir." },
        { text: "Mais respirer vite et court a un effet : ça déséquilibre l'oxygène et le CO2 dans ton sang." },
        { text: "Vertiges. Fourmillements. Souffle qui semble manquer." },
        { text: "Des sensations que tu interprètes comme un signe de danger." },
        { text: "Alors que c'est ta respiration elle-même qui les crée." },
        { text: "Le cercle se referme : la peur accélère le souffle, le souffle nourrit la peur.", climax: true }
      ]
    },
    {
      num: 3,
      name: "Le même souffle, dans l'autre sens",
      color: "terracotta",
      cases: [
        { text: "Pourtant, cette même respiration peut faire l'inverse." },
        { text: "Pas en la calmant par la pensée. En la ralentissant, directement." },
        { text: "Un nerf, un seul, relie ton cerveau à ton cœur, tes poumons, ton ventre : le nerf vague." },
        { text: "Quand il est actif, il freine. Le cœur ralentit. Les muscles se relâchent." },
        { text: "Tu peux l'activer par l'expiration. Plus elle est longue, plus le frein s'active. C'est mécanique." },
        { text: "Pas besoin d'y croire pour que ça marche. Ton corps répond, que tu y croies ou non." },
        { text: "Chaque respiration lente envoie un message à ton cerveau : ici, maintenant, on est en sécurité." },
        { text: "Le même souffle qui alimentait le cercle peut désormais le rompre.", climax: true },
        {
          panelHtml: `
            <div class="anecdote">
              <div class="lbl">Mon expérience</div>
              <p>À mon époque, une application comme celle-ci n'existait pas. Mais j'ai eu la chance de connaître un thérapeute dans mon entourage, qui m'a appris des techniques de respiration.</p>
              <p>Je dois te l'avouer : ça n'a pas été un résultat miraculeux dès la première fois.</p>
              <p>Mais suffisamment apaisant pour me donner envie de persévérer.</p>
              <p class="highlight">Un petit pas est déjà un pas. Et quand on est au plus mal, comme je l'étais, c'est déjà beaucoup.</p>
              <p>Alors j'ai répété. Encore. Et encore.</p>
              <p>Jusqu'à ce que ça devienne un réflexe.</p>
              <p>Aujourd'hui, je le fais presque sans y penser.</p>
            </div>
          `,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            link: { title: "Je respire, je m'apaise en profondeur", desc: "l'exercice de respiration en trois niveaux", route: "#/outil/respiration-3-niveaux" }
          }
        }
      ]
    }
  ]
};

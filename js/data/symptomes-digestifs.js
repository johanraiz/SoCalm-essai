// Contenu repris mot pour mot du cahier des charges (module "symptômes digestifs", v0.29) — source :
// design/ecran-module-psychoeducation-symptomes-digestifs.html. Dernier module de l'axe corps. Séquence
// unique de 13 cases (pas de volets, comme "évitement" et "catastrophisme") — pas d'anecdote personnelle
// (choix déjà acté dans le texte source lui-même).
//
// Lien de clôture confirmé par Johan à la relecture finale (v1.57) — proposé dans l'écran témoin sous
// réserve de confirmation ("Lien de clôture proposé, à confirmer [...] Dis-moi si ça te va", badge
// "proposition — à confirmer" sur la case 13), cohérent avec le texte de la case elle-même ("ralentir ta
// respiration apaise aussi ton ventre" pointe explicitement vers l'exercice de respiration en trois
// niveaux, déjà en ligne). Validation actée, plus une proposition.
//
// Encart "Ça peut aussi t'intéresser" : même schéma que "peur de perdre le contrôle" et "body-scan" — le
// texte de la maquette ("(v0.32)") mélange une note de production avec le contenu réel. Reformulé sans
// le numéro de version.
const symptomesDigestifs = {
  slug: "symptomes-digestifs",
  cover: {
    badge: "Comprendre",
    title: "Mon anxiété me donne mal au ventre, me coupe l'appétit — c'est lié ?",
    desc: "Module de l'axe corps, le dernier — le <strong>lien direct</strong> entre ton ventre et ton cerveau, pourquoi la digestion s'arrête en pleine alerte, et pourquoi <strong>ralentir ta respiration</strong> apaise aussi ton ventre.",
    meta: "13 cases, séquence unique · ~2 min",
    volets: [],
    related: "Ce module renvoie, en fin de lecture, vers un outil pratique en lien."
  },
  volets: [
    {
      num: 1,
      name: "Le lien entre ton ventre et ton cerveau",
      color: "sage-dark",
      cases: [
        { text: "Boule au ventre. Nausée. Plus faim du tout." },
        { text: "Tu te dis peut-être : « encore mon corps qui me trahit. »" },
        { text: "Tu as sûrement déjà ressenti ça avant un examen, un entretien, un premier rendez-vous. « Des papillons dans le ventre. »" },
        { text: "Ce n'est pas une expression en l'air. Ton ventre et ton cerveau se parlent, en permanence, par une ligne directe." },
        { text: "Le nerf vague, encore lui — celui qui ralentit ton cœur quand tu respires longuement." },
        { text: "Il relie aussi ton cerveau à ton intestin. Dans les deux sens." },
        { text: "Et ton intestin n'est pas un simple tuyau : il fabrique à lui seul la majorité de la sérotonine de ton corps." },
        { text: "Quand l'alarme sonne dans ta tête, ton ventre l'entend. Littéralement." },
        { text: "En pleine alerte, ton corps fait des choix. Combattre ou fuir, pas digérer." },
        { text: "Le sang part vers tes muscles. La digestion passe au second plan." },
        { text: "D'où la boule au ventre. D'où la faim qui disparaît." },
        { text: "Ce n'est pas « dans ta tête ». Ce n'est pas non plus juste « physique ». C'est les deux, au même endroit." },
        {
          text: "Bonne nouvelle : le nerf qui transmet l'alarme est le même qui peut la faire retomber. Ralentir ta respiration apaise aussi ton ventre.",
          climax: true,
          closing: {
            intro: "Pour t'apaiser, tu peux essayer :",
            link: { title: "Je respire, je m'apaise en profondeur", desc: "l'exercice de respiration en trois niveaux", route: "#/outil/respiration-3-niveaux" }
          }
        }
      ]
    }
  ]
};

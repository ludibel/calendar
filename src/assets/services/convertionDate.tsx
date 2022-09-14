// fonction permettant la convertion de la date en jour, mois ou jour de la semaine en fonction de l'option choisie
export const convertDate = (day: string, options: object) =>
  new Date(day).toLocaleDateString('fr-FR', options);
// fonction permettant de convertir au format la date en heure,minutes et secondes selon l'option choisie
export const convertTime = (slot: string, options: object) =>
  new Date(slot).toLocaleTimeString('fr-FR', options);

import { dateType, formatDate } from '../types';

function padTo2Digits(num: number) {
  return String(num).padStart(2, '0');
}

export function convertir(dispos: Array<dateType>) {
  const newArrayDispos: Array<formatDate> = [];
  {
    dispos.map((date) => {
      const dateStr = new Date(date.day);
      const arraySlots: string[] = [];
      // on mappe sur les slots pour les récupérer puis les mettre au format 00:00 et on push dans le tableau arraySlots
      date.slots.map((time) => {
        const hours = new Date(time).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        arraySlots.push(hours);
      });

      const a: formatDate = {
        day: dateStr.toLocaleString('fr-FR', { weekday: 'long' }),
        month: dateStr.toLocaleString('fr-FR', { month: 'long' }),
        date: dateStr.toLocaleString('fr-FR', { day: 'numeric' }),
        slots: arraySlots,
      };
      newArrayDispos.push(a);
    });
  }
  console.log(newArrayDispos);
  return newArrayDispos;
}

function organizeOutput(result: object) {
  const array: string[] = [];
  let finalString = '';

  Object.entries(result).forEach(([key, value]) => {
    if (value > 0) {
      let word = key;
      if (value == 1) {
        if (key == 'meses') {
          word = key.slice(0, key.length - 2);
        }
        word = key.slice(0, key.length - 1);
      }
      array.push(' ' + result[key as keyof typeof result] + ' ' + word);
    }
  });

  if (array.length == 0) {
    finalString = 'Instantâneo';
  } else if (array.length == 1) {
    finalString = array[0].slice(1);
  } else {
    for (let i = 0; i < array.length; i++) {
      if (i == 0) {
        finalString += array[i].slice(1);
      } else if (i == array.length - 1) {
        finalString += ' e ' + array[i];
      } else {
        finalString += ', ' + array[i];
      }
    }
  }

  return finalString;
}

function convertSecondsToTime(segundos: number) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const anos = Math.floor(segundos / year);
  segundos -= anos * year;
  const meses = Math.floor(segundos / month);
  segundos -= meses * month;
  const dias = Math.floor(segundos / day);
  segundos -= dias * day;
  const horas = Math.floor(segundos / hour);
  segundos -= horas * hour;
  const minutos = Math.floor(segundos / minute);
  segundos -= minutos * minute;

  const result = {
    anos,
    meses,
    dias,
    horas,
    minutos,
    segundos,
  };

  return organizeOutput(result);
}

export default convertSecondsToTime;

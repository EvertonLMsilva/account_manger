

const debuggLog = (text, returnLog) => {
  const randomNumSec = Math.floor(Math.random() * (37 - 33) + 33);

  const dateNow = new Date();
  const fullDate = dateNow.toLocaleString();
const sucess = '\u2714'
const atention = '\uD83D\uDD38'
const err = '\uD83D\uDD3A'
   let colorText = null;

    if (returnLog == 'err') {
        colorText = "\033[0;31m" + err + ' '
    } else if(returnLog == 'sucess'){
        colorText = "\033[0;32m" + sucess + ' '
    } else if(returnLog == 'atention'){
        colorText = "\033[0;33m" + atention + ' '
    } else {
        colorText = "\033[0;" + `${randomNumSec}m`
    }

  console.log( colorText + ` ${fullDate} - ` + text + "\x1b[0m");
};

module.exports = {
  debuggLog,
};

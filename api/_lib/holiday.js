const DAY = 24 * 60 * 60 * 1000;
const JST = 9 * 60 * 60 * 1000;
const START = new Date(Date.UTC(2017, 3 - 1, 10) - JST);

exports.calcTotal = (date) => {
  return Math.floor((date - START) / DAY) + 1;
};

exports.calcYears = (date) => {
  const anchor = new Date(START.getTime() - DAY);
  anchor.setFullYear(date.getFullYear());
  if (date < anchor) {
    anchor.setFullYear(date.getFullYear() - 1);
  }
  return {
    years: anchor.getFullYear() - START.getFullYear(),
    days: Math.floor((date - anchor) / DAY),
  };
};

const DAY = 24 * 60 * 60 * 1000;
const FROM = new Date(2017, 3 - 1, 10);

exports.calcTotal = (date) => {
  return Math.ceil((date - FROM + 1) / DAY);
};

exports.getYearsText = (total) => {
  const years = Math.floor(total / 365);
  const days = total % 365;
  return days === 0 ? `ちょうど ${years} 年` : `${years} 年 と ${days} 日`;
};

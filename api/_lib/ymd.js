const JST = 9 * 60 * 60 * 1000;

exports.toYMD = (date) => {
  return date.toLocaleString(
    'ja-JP',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Tokyo',
    }
  ).replace(/[-\/]/g, '');
};

exports.parseYMD = (str) => {
  const [, year, month, day] = str.match(/(\d{4})(\d{2})(\d{2})/);
  return new Date(Date.UTC(+year, month - 1, +day) - JST);
};

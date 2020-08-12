const path = require('path');
const { md5 } = require('./_lib/md5');
const { renderFile } = require('./_lib/template');
const { toYMD } = require('./_lib/ymd');
const { calcTotal, getYearsText } = require('./_lib/holiday');

const SALT = process.env.SECRET || '';

module.exports = (req, res) => {
  const { date, hash } = req.query;

  const today = new Date();

  const todayYMD = toYMD(today);
  const todayHash = md5(todayYMD + SALT);

  const total = calcTotal(today);
  const yearsText = getYearsText(total);

  const data = {
    total: total,
    years_text: yearsText,
    tweet_url: `https://neet.foooomio.net/${todayYMD}/${todayHash}`
  };

  if (date && hash && md5(date + SALT) === hash) {
    data.og_image_url = `https://neet.foooomio.net/og-image/${date}/${hash}`;
  }

  const html = renderFile(
    path.join(__dirname, '_template/index.html'),
    data
  );

  res.status(200).send(html);
};

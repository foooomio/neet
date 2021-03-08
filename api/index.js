const path = require('path');
const { md5 } = require('./_lib/md5');
const { renderFile } = require('./_lib/template');
const { toYMD } = require('./_lib/ymd');
const { calcTotal, calcYears } = require('./_lib/holiday');

const SECRET = process.env.SECRET ?? '';

module.exports = (req, res) => {
  const { date, hash } = req.query;

  const today = new Date();

  const todayYMD = toYMD(today);
  const todayHash = md5(todayYMD + SECRET);

  const total = calcTotal(today);
  const { years, days } = calcYears(today);

  const data = {
    total: total,
    years_text: days === 0 ? `ちょうど ${years} 年` : `${years} 年 と ${days} 日`,
    tweet_url: `https://neet.foooomio.net/${todayYMD}/${todayHash}`,
  };

  if (date && hash && md5(date + SECRET) === hash) {
    data.og_image_url = `https://neet.foooomio.net/og-image/${date}/${hash}`;
  }

  const file = path.join(__dirname, '_template/index.html');
  const html = renderFile(file, data);

  res.status(200).send(html);
};

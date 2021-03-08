const https = require('https');
const { md5 } = require('./_lib/md5');
const { parseYMD } = require('./_lib/ymd');
const { calcTotal } = require('./_lib/holiday');

const SECRET = process.env.SECRET ?? '';
const CLOUD_NAME = process.env.CLOUD_NAME ?? '';

module.exports = (req, res) => {
  const { date, hash } = req.query;

  if (!date || !hash || md5(date + SECRET) !== hash) {
    res.status(400).end();
    return;
  }

  const total = calcTotal(parseYMD(date));

  const transformations = `l_text:notosansjp-bold.otf_300_bold:${total}`;
  const path = `/${CLOUD_NAME}/image/upload/${transformations}/og-image-base.png`;
  const url = `https://res.cloudinary.com${path}`;

  https.get(url, (image) => {
    res.statusCode = image.statusCode;
    res.setHeader('Content-Type', 'image/png');

    image.on('data', (chunk) => res.write(chunk));
    image.on('end', () => res.end());
  })
  .on('error', (e) => {
    console.error(e);
    res.status(500).end();
  });
};

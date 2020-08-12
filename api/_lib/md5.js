const crypto = require('crypto');

exports.md5 = (str) => {
  const md5 = crypto.createHash('md5');
  return md5.update(str, 'binary').digest('hex');
};

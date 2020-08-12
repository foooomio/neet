const fs = require('fs');

exports.renderFile = (filename, data) => {
  let template = fs.readFileSync(filename, 'utf-8');

  for (const [key, value] of Object.entries(data)) {
    const regexp = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regexp, value);
  }

  return template;
};

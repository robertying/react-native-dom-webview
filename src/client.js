const { doSync } = require('do-sync');

const getHtml = doSync(async (name) => {
  const fetch = require('node-fetch');
  const response = await fetch(`http://localhost:19001/${name}.bundle`);
  const html = await response.text();
  return html;
});

module.exports = getHtml;

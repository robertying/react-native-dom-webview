const { doSync } = require('do-sync');

const getHtml = doSync(async (port, name) => {
  const fetch = require('node-fetch');
  const response = await fetch(`http://localhost:${port}/${name}.bundle`);
  const html = await response.text();
  return html;
});

module.exports = getHtml;

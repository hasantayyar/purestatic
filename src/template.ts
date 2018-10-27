export const template = {};

const stylePath = '/style.css';
const link = (f: string) => `<a class="page" href="/${f}">${f}</a>`;
const header = [
  '<meta name="viewport" content="width=device-width">',
  '<meta name="theme-color" content="#1e2325">',
  // @TODO: add integrity="sha384-......" of file
  `<link rel="stylesheet" href="${stylePath}" crossorigin="anonymous"/>`,
  ''
].join('');
const footer = '<div class="footer">-.-</div>';

export const render = (root: string, fileList: string[]) => {
  const links = fileList.map(link).join('<br />');
  const html: string = `<html>${header}<div id="content">\
    <a class="page" href="${root}">..</a><br>\
    ${links}</div>${footer}\
    </html>`;
  return html;
};

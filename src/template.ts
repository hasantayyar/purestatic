export const template = {};

export const render = (fileList: string[]) => {
  let html: string = '';
  fileList.forEach(f => {
    html += `\n<a href="${f}">${f}</a>`;
  });
  return html;
};

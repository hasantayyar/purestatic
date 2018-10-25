import * as path from 'path';
import * as fs from 'fs-extra';
import * as walker from 'klaw-sync';
import { render } from './template';

const createPage = async function(path: string) {
  console.log('Create index for', path);
  const pageContent = await createContent(path);
  fs.writeFileSync(`${path}/index.html`, pageContent);
};

const createContent = async (filePath: string): Promise<string> => {
  const rootPath = path.resolve('./pages');
  return render(
    (await list(filePath, contentFilter)).map((x: walker.Item) =>
      x.path.replace(rootPath + '/', '')
    )
  );
};
const contentFilter: walker.Filter = (item: walker.Item) =>
  path.extname(item.path) === '.txt' || item.stats.isDirectory();

const dirFilter: walker.Filter = (item: walker.Item) =>
  item.stats.isDirectory();

const list = async (path: string, filter?: walker.Filter) =>
  walker(path, { filter, depthLimit: 0 });

export const build = async (path: string) => {
  await createPage(path);
  const dirs = await list(path, dirFilter);
  await dirs.forEach(async dir => {
    await createPage(dir.path);
    await list(dir.path);
  });
  return dirs;
};

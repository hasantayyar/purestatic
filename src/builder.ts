import * as path from 'path';
import * as fs from 'fs-extra';
import * as walker from 'klaw-sync';
import { render } from './template';

const createPage = async function(item: walker.Item) {
  console.log('Create index for', item.path);
  const pageContent = await createContent(item.path);
  fs.writeFileSync(`${item.path}/index.html`, pageContent);
};

const createContent = async (path: string): Promise<string> => {
  return render(
    (await list(path, txtFilter)).map(x => x.path.split('/').pop())
  );
};
const txtFilter: walker.Filter = (item: walker.Item) =>
  path.extname(item.path) === '.txt';
const dirFilter: walker.Filter = (item: walker.Item) =>
  item.stats.isDirectory();

const list = async (path: string, filter?: walker.Filter) =>
  walker(path, { filter, depthLimit: 1 });

export const build = async (path: string) => {
  const dirs = await list(path, dirFilter);
  await dirs.forEach(async dir => {
    await createPage(dir);
    await list(dir.path);
  });
  return dirs;
};

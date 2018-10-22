import { cleanBuild } from './cleaner';
import { template } from './template';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as walker from 'klaw-sync';

const createPage = async function (item: walker.Item) {
  console.log('Create index for', item.path)
  const pageContent = await createContent(item.path);
  fs.writeFileSync(`${item.path}/index.html`, pageContent);
};

const createContent = async (path: string): Promise<string> => {
  const pages = await list(path, txtFilter, 1);
  console.log('pages for', path, pages.map((x: walker.Item) => x.path))
  return (await pages).map(x => x.path).join('');
}

const txtFilter: walker.Filter = (item: walker.Item) => path.extname(item.path) === '.txt';
const dirFilter: walker.Filter = (item: walker.Item) => item.stats.isDirectory();

const list = async (path: string, filter?: walker.Filter, depthLimit?: number) =>
  walker(path, { filter, depthLimit });

const init = async (path: string) => {
  const dirs = await list(path, dirFilter, 1);
  await dirs.forEach(async (dir) => {
    await createPage(dir);
    await list(dir.path)
  });
  return dirs;
}

export const build = (): Promise<ReadonlyArray<walker.Item>> => {
  const buildPath = './build';
  cleanBuild(buildPath);
  return init('./pages/');
}
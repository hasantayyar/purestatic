import * as fs from 'fs-extra';
import * as walker from 'klaw-sync';
import * as path from 'path';
import { render } from './template';

const createContent = async (fp: string): Promise<string> => {
  const root = path.resolve('./pages');
  return render(
    path
      .resolve(fp)
      .replace(root, '')
      .replace(path.basename(fp), ''),
    (await list(fp, baseFilter)).map((x: walker.Item) =>
      x.path.replace(root + '/', '')
    )
  );
};

const createPage = async (p: string) => {
  console.log('Create index for', p);
  const pageContent = await createContent(p);
  fs.writeFileSync(`${p}/index.html`, pageContent);
};

const baseFilter: walker.Filter = (item: walker.Item) =>
  path.extname(item.path) === '.txt' || item.stats.isDirectory();

const dirFilter: walker.Filter = (item: walker.Item) =>
  item.stats.isDirectory();

const list = async (p: string, filter?: walker.Filter) =>
  walker(p, { filter, depthLimit: 0 });

export const build = async (p: string) => {
  await createPage(p);
  const dirs = await list(p, dirFilter);
  await dirs.forEach(async dir => {
    await createPage(dir.path);
    await build(dir.path);
  });
  return dirs;
};

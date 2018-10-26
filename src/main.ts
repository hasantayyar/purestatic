import { build } from './builder';
import * as walker from 'klaw-sync';

build('./pages').then((data: walker.Item[]) =>
  console.log(`Created page for ${data.length} folder`)
);

import { build } from './builder';
import * as walker from 'klaw-sync';

const tree = build().then((data: walker.Item[]) => console.log(data.map((x: walker.Item) => x.path)));

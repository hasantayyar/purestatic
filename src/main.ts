import { build } from './builder';
import * as klawSync from 'klaw-sync';

const tree = build().then((data: klawSync.Item[]) => console.log(data.map((x: klawSync.Item) => x.path)));

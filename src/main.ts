import { build } from './builder';

const pagesPath = (process.argv && process.argv[2]) || './pages';
console.log(`\x1b[32mBuilding ${pagesPath}`);
build(pagesPath)
  .catch(e => console.error('\x1b[31mError while reading path'));

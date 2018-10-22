import * as fs from 'fs-extra';
import * as path from 'path';

export const cleanBuild = (buildPath: string): void => {
  console.log('Cleaning most recent build...');
  try {
    for (let file of fs.readdirSync(buildPath)) {
      fs.removeSync(path.join(buildPath, file));
    }
  }
  catch (err) {
    const msg = 'Error cleaning build directory';
    console.error(`${msg}: ${err}`);
    throw new Error(msg);
  }
}

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const base = '/DLAI_Nego_contur';
const supportedExtensions = new Set(['.html', '.css']);

async function collectFiles(directory) {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry);
    const details = await stat(path);
    if (details.isDirectory()) files.push(...await collectFiles(path));
    else files.push(path);
  }

  return files;
}

for (const file of await collectFiles(outputDirectory)) {
  const extension = file.slice(file.lastIndexOf('.'));
  if (!supportedExtensions.has(extension)) continue;

  const source = await readFile(file, 'utf8');
  const rewritten = source
    .replace(/(href|src)=(['"])\/(?!DLAI_Nego_contur(?:\/|['"]))/g, `$1=$2${base}/`)
    .replace(/url\((['"]?)\/(?!DLAI_Nego_contur(?:\/|['"]))/g, `url($1${base}/`);

  if (rewritten !== source) await writeFile(file, rewritten);
}

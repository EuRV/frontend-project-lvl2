import path from 'path';
import yaml from 'js-yaml';
import { cwd } from 'process';
import { readFileSync } from 'fs';

const getPath = (pathToFile) => path.resolve(cwd(), pathToFile);
const fileExtname = (pathToFile) => path.extname(getPath(pathToFile));
const readFile = (pathToFile) => readFileSync(getPath(pathToFile), 'utf-8');

const parseFile = (pathToFile) => {
  const ext = fileExtname(pathToFile);
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(readFile(pathToFile));
  }
  return JSON.parse(readFile(pathToFile));
};

export default parseFile;

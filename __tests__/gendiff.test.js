import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check gendiff JSON', () => {
  const diff = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const str = readFile('file-reference.txt');
  expect(diff).toEqual(str);
});

// test('check gendiff YAML', () => {
//   const diff = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
//   const str = readFile('file-reference.txt');
//   expect(diff).toEqual(str);
// });

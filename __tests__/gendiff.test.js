import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('check gendiff', () => {
  const expectedStylish = readFile('current-stylish.txt');
  const expectedPlain = readFile('current-plain.txt');
  const expectedJson = readFile('current-json.txt');
  test('check the STYLISH formatter with the JSON extension', () => {
    const diff = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish');
    expect(diff).toEqual(expectedStylish);
  });

  test('check the STYLISH formatter with the YML extension', () => {
    const diff = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
    expect(diff).toEqual(expectedStylish);
  });

  test('check the PLAIN formatter with the JSON extension', () => {
    const diff1 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
    expect(diff1).toEqual(expectedPlain);
  });

  test('check the JSON formatter with the JSON extension', () => {
    const diff2 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json');
    expect(diff2).toEqual(expectedJson);
  });
});

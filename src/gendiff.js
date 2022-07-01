import parseFile from './parsers.js';
import getDifference from './getdifference.js';
import stylish from './formatters/stylish.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const data1 = parseFile(pathToFile1);
  const data2 = parseFile(pathToFile2);
  const result = getDifference(data1, data2);
  return stylish(result);
};

export default genDiff;

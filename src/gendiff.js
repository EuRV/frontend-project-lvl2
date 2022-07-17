import parseFile from './parsers.js';
import getDifference from './getdifference.js';
import formatOutpput from './formatters/index.js';

const genDiff = (pathToFile1, pathToFile2, formatter) => {
  const data1 = parseFile(pathToFile1);
  const data2 = parseFile(pathToFile2);
  const result = getDifference(data1, data2);
  return formatOutpput(result, formatter);
};

export default genDiff;

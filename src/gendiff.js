import parseFile from './parsers.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const data1 = parseFile(pathToFile1);
  const data2 = parseFile(pathToFile2);
  const data = { ...data1, ...data2 };
  const dataKeys = Object.keys(data).sort();
  const diff = dataKeys.reduce((acc, key) => {
    if (!(key in data1)) {
      acc[`+ ${key}`] = data2[key];
    } else if (!(key in data2)) {
      acc[`- ${key}`] = data1[key];
    } else if (data1[key] === data2[key]) {
      acc[`  ${key}`] = data1[key];
    } else {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
  return JSON.stringify(diff, null, 2).replace(/[",]/g, '');
};

export default genDiff;

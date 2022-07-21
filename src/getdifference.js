import has from 'lodash/has.js';
import isObject from 'lodash/isObject.js';
import keys from 'lodash/keys.js';
import sortBy from 'lodash/sortBy.js';
import union from 'lodash/union.js';

const getDifference = (data1, data2) => {
  const data1Key = keys(data1);
  const data2Key = keys(data2);
  const dataKeys = sortBy(union(data1Key, data2Key));
  return dataKeys.reduce((acc, key) => {
    if (!(key in data1)) {
      acc[key] = { key, type: 'added', value: data2[key] };
    } else if (!(key in data2)) {
      acc[key] = { key, type: 'removed', value: data1[key] };
    } else if (isObject(data1[key]) && isObject(data2[key])) {
      acc[key] = { key, type: 'nested', children: getDifference(data1[key], data2[key]) };
    } else if (data1[key] === data2[key]) {
      acc[key] = { key, type: 'unchanged', value: data1[key] };
    } else if ((has(data1, key) && has(data2, key)) && data1[key] !== data2[key]) {
      acc[key] = {
        key, type: 'changed', previosValue: data1[key], nextValue: data2[key],
      };
    }
    return acc;
  }, {});
};

export default getDifference;

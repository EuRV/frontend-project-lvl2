const getLine1 = (value) => {
  if (typeof value !== 'object' || value === null) {
    return value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const plain = (diff) => {
  // console.log(Object.values(diff));
  const iter = (node, pre) => Object.values(node)
    .flatMap((val) => {
      const path = [...pre, val.key].join('.');
      switch (val.type) {
        case 'added':
          return `Property '${path}' was added with value: ${getLine1(val.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}' was updated. From ${getLine1(val.previosValue)} to ${getLine1(val.nextValue)}`;
        case 'nested':
          return `${iter(val.children, [path]).join('\n')}`;
        default:
          throw new Error(`Type: ${val.type} is undefined`);
      }
    });
  return `${iter(diff, []).join('\n')}`;
};

export default plain;

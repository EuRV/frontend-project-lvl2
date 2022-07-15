const getIndent = (depth, replacer = ' ') => replacer.repeat(depth * 2);

const getLine = (value, count) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(count)}  ${key}: ${getLine(val, count + 2)}`);
  return `{\n${lines.join('\n')}\n${' '.repeat(count * 2 - 2)}}`;
};

const stringify = {
  added: (node, depth) => `\n${getIndent(depth)}+ ${node.key}: ${getLine(node.value, depth + 2)}`,
  removed: (node, depth) => `\n${getIndent(depth)}- ${node.key}: ${getLine(node.value, depth + 2)}`,
  unchanged: (node, depth) => `\n${getIndent(depth)}  ${node.key}: ${getLine(node.value, depth + 2)}`,
  changed: (node, depth) => [`\n${getIndent(depth)}- ${node.key}: ${getLine(node.previosValue, depth + 2)}`,
    `\n${getIndent(depth)}+ ${node.key}: ${getLine(node.nextValue, depth + 2)}`,
  ],
  nested: (node, depth, iter) => `\n${getIndent(depth)}  ${node.key}: {${iter(node.children, depth + 2, iter).join('')}\n${getIndent(depth)}  }`,
};

const stylish = (diff) => {
  const iter = (node, depth) => Object.values(node)
    .flatMap((val) => stringify[val.type](val, depth, iter));
  const lines = iter(diff, 1);
  return `{${lines.join('')}\n}`;
};

export default stylish;

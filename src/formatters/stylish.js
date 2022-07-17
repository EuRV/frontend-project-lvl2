const getIndent = (depth, replacer = ' ') => replacer.repeat(depth * 2);

const getLine = (value, count) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(count)}  ${key}: ${getLine(val, count + 2)}`);
  return `{\n${lines.join('\n')}\n${' '.repeat(count * 2 - 2)}}`;
};

const prefix = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const lineRender = (key, value, type, count) => `\n${getIndent(count)}${prefix[type]} ${key}: ${getLine(value, count + 2)}`;

const stringify = {
  added: (node, depth) => lineRender(node.key, node.value, 'added', depth),
  removed: (node, depth) => lineRender(node.key, node.value, 'removed', depth),
  unchanged: (node, depth) => lineRender(node.key, node.value, 'unchanged', depth),
  changed: (node, depth) => [lineRender(node.key, node.previosValue, 'removed', depth),
    lineRender(node.key, node.nextValue, 'added', depth),
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

import { ReactNode, isValidElement } from 'react';

const isVoidElement = (
  node: ReactNode,
) => {
  // List of known void elements and elements to skip translation for
  const voidElements = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'abbr', 'code', 'var', 'sub', 'sup', 'svg', 'progress', 'kbd', 'ruby',
  ];

  if (isValidElement(node)) return (voidElements.includes(node.type as string));

  return false;
};

export default isVoidElement;

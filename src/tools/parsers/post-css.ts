import postcss, { Plugin, Syntax } from 'postcss';

export const processWithPlugin = (
  cssString: string,
  plugin: Plugin,
  syntax?: Syntax
) => {
  const options = syntax ? { syntax: syntax as any } : undefined;
  const result = postcss([plugin]).process(cssString, options);
  return result.css;
}

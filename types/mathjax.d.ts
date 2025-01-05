declare global {
  interface Window {
    MathJax: {
      typeset: () => void;
    };
  }
}
declare module 'mathjax';

export { };
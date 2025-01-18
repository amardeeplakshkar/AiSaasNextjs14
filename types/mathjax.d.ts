export {};

declare global {
  interface Window {
    renderMathInElement?: (element: HTMLElement, options?: Record<string, unknown>) => void;
  }
}

export interface SplitTextResult {
  elements: HTMLElement[];
  revert: () => void;
}

/**
 * Custom DOM-aware SplitText implementation — splits text content of an element
 * into individually animatable <span> elements while preserving nested elements and classes
 * (e.g. <span className="font-serif italic">accent words</span>).
 *
 * Fixed baseline alignment: uses `vertical-align: text-bottom` on overflow-hidden wrappers
 * so inline-block elements with varied font families/sizes align 100% perfectly on the text line.
 */
export function splitText(
  element: HTMLElement,
  type: 'words' | 'chars' = 'words'
): SplitTextResult {
  const originalHTML = element.innerHTML;
  const elements: HTMLElement[] = [];

  function processNode(node: Node, container: HTMLElement) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (type === 'words') {
        const words = text.split(/(\s+)/);
        words.forEach((word) => {
          if (!word) return;
          if (/^\s+$/.test(word)) {
            container.appendChild(document.createTextNode(' '));
          } else {
            const wrapper = document.createElement('span');
            wrapper.className = 'split-word-wrap';
            wrapper.style.cssText =
              'display:inline-block;overflow:hidden;vertical-align:text-bottom;padding-bottom:0.08em;margin-bottom:-0.08em;';

            const inner = document.createElement('span');
            inner.className = 'split-word';
            inner.style.cssText = 'display:inline-block;will-change:transform,opacity;';
            inner.textContent = word;

            wrapper.appendChild(inner);
            container.appendChild(wrapper);
            elements.push(inner);
          }
        });
      } else {
        text.split('').forEach((char) => {
          if (char === ' ') {
            container.appendChild(document.createTextNode(' '));
            return;
          }
          const span = document.createElement('span');
          span.className = 'split-char';
          span.style.cssText = 'display:inline-block;will-change:transform,opacity;';
          span.textContent = char;
          container.appendChild(span);
          elements.push(span);
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as HTMLElement;
      if (elem.tagName === 'BR') {
        container.appendChild(document.createElement('br'));
        return;
      }
      const clone = elem.cloneNode(false) as HTMLElement;
      clone.innerHTML = '';
      container.appendChild(clone);
      Array.from(elem.childNodes).forEach((child) => {
        processNode(child, clone);
      });
    }
  }

  const tempContainer = document.createElement('div');
  Array.from(element.childNodes).forEach((child) => {
    processNode(child, tempContainer);
  });

  element.innerHTML = tempContainer.innerHTML;

  const finalElements = Array.from(
    element.querySelectorAll<HTMLElement>('.split-word, .split-char')
  );

  return {
    elements: finalElements,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}

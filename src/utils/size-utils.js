/* eslint-disable no-undef */
export const collapseElement = ({ element }) => {
  const srcElement = element;
  const elementHeight = srcElement.scrollHeight;
  const elementTransition = srcElement.style.transition;
  srcElement.style.transition = '';

  requestAnimationFrame(() => {
    srcElement.style.height = `${elementHeight}px`;
    srcElement.style.transition = elementTransition;

    requestAnimationFrame(() => {
      srcElement.style.height = `${0}px`;
    });
  });
};

export function expandSection({ element }) {
  const srcElement = element;
  srcElement.style.display = 'flex';
  const sectionHeight = srcElement.scrollHeight;
  srcElement.style.height = `${sectionHeight}px`;

  srcElement.addEventListener(
    'transitionend',
    function _listener() {
      srcElement.removeEventListener('transitionend', _listener, true);
      srcElement.style.height = null;
    },
    true,
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const flip = keyframes`
  0% {
    transform: rotateY(0);
  }
	100% {
		transform: rotateY(180deg);
	}
`;

const Wrapper = styled.div`
  perspective: 1000px;

  &.flip {
    animation-name: ${flip};
    animation-duration: 800ms;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
`;

const flipAnimationEnd = ({ passedCardBody, passedRef }) => {
  const cardBody = passedCardBody;
  const ref = passedRef;
  cardBody.style.transform = 'rotateY(0)';
  ref.classList.remove('flip');
};

const flipAnimationStart = ({ delay, callback, passedCardBody }) => {
  const cardBody = passedCardBody;
  setTimeout(() => {
    typeof callback === 'function' && callback();
    cardBody.style.transform = 'rotateY(180deg)';
  }, delay / 2.5);
};

const animate = ({ delay = 1000, callback = () => {}, passedRef = HTMLDivElement }) => {
  const refElementWrapper = passedRef.current;
  const refElementInner = refElementWrapper.firstChild;
  const doInTheMiddle = callback;

  refElementWrapper.classList.add('flip');
  refElementInner.classList.add('card__body--back');

  refElementWrapper.addEventListener('animationstart', () => flipAnimationStart({
    callback: doInTheMiddle,
    delay,
    passedCardBody: refElementInner,
  }));
  refElementWrapper.addEventListener('animationend', () => flipAnimationEnd({ passedCardBody: refElementInner, passedRef: refElementWrapper }));
};

const FlipWrapper = React.forwardRef(({ children }, ref) => (
  <Wrapper ref={ref}>{children}</Wrapper>
));

export default animate;

export { FlipWrapper };

FlipWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

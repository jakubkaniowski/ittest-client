import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSVG = styled.svg`
  stroke: ${({ theme }) => `rgb(${theme.colors.primary})`};
`;

const CircleProgress = ({ radius, stroke, progressTo }) => {
  const [progress, setProgress] = useState(0);
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (progress === progressTo) {
      return;
    }
    const interval = setInterval(() => {
      setProgress((prevValue) => prevValue + 1);
    }, 25);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <StyledSVG height={radius * 2} width={radius * 2}>
      <circle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="black"
        stroke="transparent"
        fontWeight="600"
      >
        {progress}
        %
      </text>
    </StyledSVG>
  );
};

CircleProgress.propTypes = {
  radius: PropTypes.number,
  stroke: PropTypes.number,
  progressTo: PropTypes.number,
};

CircleProgress.defaultProps = {
  radius: 0,
  stroke: 0,
  progressTo: 0,
};

export default CircleProgress;

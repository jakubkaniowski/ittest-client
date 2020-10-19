import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import { useLoadingContext } from '../../context/LoadingContext';
import TopicServices from '../../services/TopicServices';

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledHeading = styled(Heading)`
  align-self: center;
  display: flex;
  padding: 1em 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StyledRow = styled.div`
  padding: 0 30px;
`;

const fadeInKeyframe = keyframes`
  0% {
    opacity: 0;
  }
	100% {
		opacity: 1;
	}
`;

const fadeInFontKeyframe = keyframes`
  0% {
    font-size: 0;
    opacity: 0;
	}

	100% {
    font-size: 1em;
    opacity: 0;
	}
`;

const StyledDetails = styled.details`
  line-height: 1.25;
  margin: 10px 0;

  & > summary {
    list-style: none;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }

  &[open] div {
    padding: 10px;
    animation-name: ${fadeInFontKeyframe}, ${fadeInKeyframe};
    animation-duration: 200ms, 200ms;
    animation-delay: 0ms, 200ms;
  }
`;

const StudentLearnCategory = ({ match }) => {
  const [topics, setTopics] = useState([]);
  const loadingContext = useLoadingContext();
  const categoryType = match.params.category || '';

  const handleSetTopics = ({ topicsArray = [] }) => {
    setTopics(topicsArray);
  };

  const getTopics = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await TopicServices.getTopics({ category: categoryType });
      const { topics: receivedTopics } = response.data;

      handleSetTopics({ topicsArray: receivedTopics });
      loadingContext({ isLoading: false });
    } catch (error) {
      loadingContext({ isLoading: false });
      console.error(error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>{categoryType.toUpperCase()}</StyledHeading>
        <StyledRow>
          {topics.map((topic) => {
            const { id, topic: categoryTopic, description } = topic;
            return (
              <StyledDetails key={id}>
                <summary>{categoryTopic}</summary>
                <div>{description}</div>
              </StyledDetails>
            );
          })}
        </StyledRow>
      </StyledWrapper>
    </DashboardTemplate>
  );
};

StudentLearnCategory.propTypes = {
  match: PropTypes.string,
};

StudentLearnCategory.defaultProps = {
  match: 'html',
};

export default StudentLearnCategory;

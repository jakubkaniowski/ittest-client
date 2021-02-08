import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../../components/atoms/Heading/Heading';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';
import CircleProgress from '../../components/molecules/CircleProgress/CircleProgress';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { useLoadingContext } from '../../context/LoadingContext';
import TestServices from '../../services/TestServices';

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledHeading = styled(Heading)`
  display: flex;
  padding: 1em 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  margin-top: 3em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledRow = styled.div`
  text-align: center;
`;

const StudentStatistics = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [statistics, setStatistics] = useState({});
  const loadingContext = useLoadingContext();

  const getStatistics = async () => {
    try {
      loadingContext({ isLoading: true });
      const responseCompletedTests = await TestServices.getAllCompletedTests();
      const testsToConvert = responseCompletedTests.data;
      const completedTestsLength = testsToConvert.length;
      const passedTestsLength = testsToConvert.filter((test) => test.is_passed).length;
      const failedTestsLength = testsToConvert.filter((test) => !test.is_passed).length;

      setStatistics({ completedTestsLength, passedTestsLength, failedTestsLength });
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>
          Twoje Statystyki
          <StyledParagraph>
            Tutaj znajduje się przegląd twoich statystyk dotyczących testów.
          </StyledParagraph>
        </StyledHeading>
        {isLoaded && (
          <>
            <StyledRow>
              <StyledParagraph bold>
                Liczba wykonanych testów:
                {' '}
                {statistics.completedTestsLength}
              </StyledParagraph>
            </StyledRow>
            <StyledGrid>
              <StyledRow>
                <StyledParagraph bold>
                  Liczba poprawnie wykonanych testów:
                  {' '}
                  {statistics.passedTestsLength}
                </StyledParagraph>
                <CircleProgress
                  progressTo={(statistics.passedTestsLength / 20) * 100}
                  radius={120}
                  stroke={10}
                  color="primary"
                />
              </StyledRow>
              <StyledRow>
                <StyledParagraph bold>
                  Liczba błędnie wykonanych testów:
                  {' '}
                  {statistics.failedTestsLength}
                </StyledParagraph>
                <CircleProgress
                  progressTo={(statistics.failedTestsLength / 20) * 100}
                  radius={120}
                  stroke={10}
                  color="danger"
                />
              </StyledRow>
            </StyledGrid>
          </>
        )}
      </StyledWrapper>
    </DashboardTemplate>
  );
};

export default StudentStatistics;

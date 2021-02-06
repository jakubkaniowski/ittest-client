import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/atoms/Button/Button';
import Heading from '../../components/atoms/Heading/Heading';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';
import CircleProgress from '../../components/molecules/CircleProgress/CircleProgress';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { useLoadingContext } from '../../context/LoadingContext';
import TestServices from '../../services/TestServices';
import { COLOR_NAMES } from '../../utils/const';

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

const StyledScoreHeading = styled(Heading)`
  display: flex;
  padding: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  height: 90%;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 2rem;
`;

const StyledScore = styled.span`
  color: ${({ theme }) => `rgb(${theme.colors.primary})`};
  padding: 0;
  margin: 1em 0;
`;

const StyledRow = styled.div`
  height: 100%;
`;

const StyledStatus = styled.span`
  display: block;
  font-size: 2em;
  color: ${({ theme }) => `rgb(${theme.colors.primary})`};
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;

  ${({ alignmentX }) => alignmentX && `justify-content: ${alignmentX}`}
  ${({ alignmentY }) => alignmentY && `align-items: ${alignmentY}`}
`;

const StudentTestResult = () => {
  const [testResult, setTestResult] = useState(null);
  const loadingContext = useLoadingContext();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  const getTestResult = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await TestServices.result({ id });

      setTestResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const returnToDashboard = () => {
    const url = location.pathname.split('/').splice(0, 3).join('/');
    history.push(`${url}`);
  };

  useEffect(() => {
    getTestResult();
  }, []);

  if (!testResult) {
    return '';
  }

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>
          Rezultat testu
          <StyledParagraph>{testResult.info_message}</StyledParagraph>
        </StyledHeading>
        <StyledRow>
          <Button onClick={returnToDashboard} color={COLOR_NAMES.secondary}>
            Powrót
          </Button>
          <StyledGrid>
            <StyledColumn alignmentX="flex-end">
              <StyledParagraph bold>
                Status
                {' '}
                <StyledStatus>{testResult.is_passed ? 'Zaliczony' : 'Niezaliczony'}</StyledStatus>
              </StyledParagraph>
            </StyledColumn>
            <StyledColumn>
              <StyledScoreHeading>
                Wynik
                <br />
                <StyledScore>
                  {' '}
                  {testResult.score}
                  {' '}
                  / 20
                </StyledScore>
                Gratulacje!
              </StyledScoreHeading>
            </StyledColumn>
            <StyledColumn alignmentY="center">
              <StyledParagraph bold>Wynik procentowy</StyledParagraph>
              <CircleProgress progressTo={testResult.percentage_score} radius={120} stroke={10} />
            </StyledColumn>
          </StyledGrid>
        </StyledRow>
      </StyledWrapper>
    </DashboardTemplate>
  );
};

export default StudentTestResult;

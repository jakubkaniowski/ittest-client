import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import Card from '../../components/molecules/Card/Card';
import { useLoadingContext } from '../../context/LoadingContext';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';
import Button from '../../components/atoms/Button/Button';
import TestServices from '../../services/TestServices';
import { COLOR_NAMES } from '../../utils/const';

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

const StyledParagraph = styled(Paragraph)`
  margin-top: 1em;
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ spaced }) => spaced && 'space-between'};
  margin: 10px 0;
`;

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
`;

const StyledCard = styled(Card)`
  width: unset;
  min-width: unset;
`;

const StudentTests = () => {
  const [pendingTests, setPendingTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const loadingContext = useLoadingContext();
  const location = useLocation();
  const history = useHistory();

  const getTests = async () => {
    try {
      loadingContext({ isLoading: true });
      const pendingTestsResponse = await TestServices.getAllPendingTests();
      const completedTestsResponse = await TestServices.getAllCompletedTests();

      setPendingTests(pendingTestsResponse.data);
      setCompletedTests(completedTestsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const removeTest = async ({ id }) => {
    try {
      loadingContext({ isLoading: true });
      await TestServices.removeSingleTest({ id });
      await getTests();
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const beginTest = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await TestServices.create();
      const { id } = response.data;

      history.push(`${location.pathname}/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const viewTest = ({ id }) => {
    try {
      loadingContext({ isLoading: true });

      history.push(`${location.pathname}/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>
          Testy
          <StyledParagraph>Wybierz istniejący test lub rozpocznij nowy!</StyledParagraph>
        </StyledHeading>
        <StyledRow>
          <Button onClick={beginTest}>Rozpocznij test</Button>
        </StyledRow>
        <StyledRow>
          <Paragraph bold>Rozpoczęte testy</Paragraph>
        </StyledRow>
        <StyledRow>
          <StyledGrid>
            {pendingTests.length ? (
              pendingTests.map((test) => {
                const { id, answers_count: answersCount } = test;
                return (
                  <StyledCard rounded key={id} header={`Test ${id}`}>
                    <Paragraph>
                      <b>
                        Udzielono &nbsp;
                        {answersCount}
                        &nbsp; odpowiedzi
                      </b>
                    </Paragraph>
                    <br />
                    <Button onClick={() => viewTest({ id })}>Kontynuuj</Button>
                    <Button onClick={() => removeTest({ id })} color="danger">
                      Usuń
                    </Button>
                  </StyledCard>
                );
              })
            ) : (
              <Paragraph>Brak rozpoczętych testów!</Paragraph>
            )}
          </StyledGrid>
        </StyledRow>
        <StyledRow>
          <Paragraph bold>Zakończone testy</Paragraph>
        </StyledRow>
        <StyledRow>
          <StyledGrid>
            {completedTests.length ? (
              completedTests.map((test) => {
                const { id, score, is_passed: isPassed } = test;
                return (
                  <StyledCard rounded key={id} header={`Test ${id}`}>
                    <Paragraph>
                      <b>
                        Wynik testu: &nbsp;
                        {score}
                        &nbsp; / 20
                      </b>
                    </Paragraph>
                    <br />
                    <Paragraph>
                      <b>
                        Status:&nbsp;
                        {isPassed ? 'Zaliczony' : 'Niezaliczony'}
                      </b>
                    </Paragraph>
                    <br />
                    <Button color={COLOR_NAMES.secondary} onClick={() => viewTest({ id })}>
                      SPRAWDŹ
                    </Button>
                    <Button onClick={() => removeTest({ id })} color="danger">
                      Usuń
                    </Button>
                  </StyledCard>
                );
              })
            ) : (
              <Paragraph>Brak rozpoczętych testów!</Paragraph>
            )}
          </StyledGrid>
        </StyledRow>
      </StyledWrapper>
    </DashboardTemplate>
  );
};

export default StudentTests;

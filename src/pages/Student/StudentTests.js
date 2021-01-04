import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import Card from '../../components/molecules/Card/Card';
import { useLoadingContext } from '../../context/LoadingContext';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';
import Button from '../../components/atoms/Button/Button';

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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 15px;
`;

const StyledCard = styled(Card)`
  width: unset;
  min-width: unset;
`;

const StudentTests = () => {
  const [tests, setTests] = useState([]);
  const loadingContext = useLoadingContext();
  const location = useLocation();
  const history = useHistory();

  const handleSetTests = ({ testsArray = [] }) => {
    setTests(testsArray);
  };

  const getTests = async () => {
    try {
      loadingContext({ isLoading: true });

      handleSetTests({
        testsArray: [
          { id: 1, topic: 'Test 1', lastAnswered: 15 },
          { id: 2, topic: 'Test 2', lastAnswered: 4 },
          { id: 3, topic: 'Test 3', lastAnswered: 24 },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const beginTest = async () => {
    try {
      loadingContext({ isLoading: true });
      const number = Math.round(Math.random() * 10);

      handleSetTests({
        testsArray: [...tests, { id: number, topic: `Topic ${number}`, lastAnswered: 1 }],
      });

      history.push(`${location.pathname}/${number}`);
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
          <Button onClick={beginTest} href="">
            Rozpocznij test
          </Button>
        </StyledRow>
        <StyledRow>
          <Paragraph bold>Rozpoczęte testy</Paragraph>
        </StyledRow>
        <StyledRow>
          <StyledGrid>
            {tests.length ? (
              tests.map((test) => (
                <StyledCard rounded key={test.id} header={test.topic}>
                  <Paragraph>
                    Ostatnia odpowiedź do pytania nr.
                    {test.lastAnswered}
                  </Paragraph>
                  <br />
                  <Button href="">Kontynuuj</Button>
                  <Button color="danger">Usuń</Button>
                </StyledCard>
              ))
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

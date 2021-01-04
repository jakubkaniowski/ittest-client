import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoadingContext } from '../../context/LoadingContext';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Test from '../../components/organisms/Test/Test';

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  flex: 1;
`;

const StudentTest = () => {
  const [questions, setQuestions] = useState([]);
  const loadingContext = useLoadingContext();

  const handleSetQuestions = ({ questionsArray = [] }) => {
    setQuestions(questionsArray);
  };

  const getQuestions = async () => {
    try {
      loadingContext({ isLoading: true });

      handleSetQuestions({
        questionsArray: [
          {
            id: 0,
            title: 'Która z instrukcji umożliwia wysłanie tekstu do przeglądarki?',
            answers: [
              {
                shortcut: 'A',
                description: 'type',
              },
              {
                shortcut: 'B',
                description: 'exit',
              },
              {
                shortcut: 'C',
                description: 'break',
              },
              {
                shortcut: 'D',
                description: 'echo',
              },
            ],
            correctAnswer: 'D',
          },
          {
            id: 1,
            title:
              'W ramce przedstawiono właściwości pliku graficznego. W celu optymalizacji czasu ładowania rysunku na stronę WWW należy',
            answers: [
              {
                shortcut: 'A',
                description: 'zmienić proporcje szerokości do wysokości',
              },
              {
                shortcut: 'B',
                description: 'zmienić format grafiki na CDR',
              },
              {
                shortcut: 'C',
                description: 'zwiększyć rozdzielczość',
              },
              {
                shortcut: 'D',
                description: 'zmniejszyć wymiary rysunku',
              },
            ],
            correctAnswer: 'D',
            image: 'https://egzamin-informatyk.pl/e14/338.jpg',
          },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    questions.length && (
      <DashboardTemplate>
        <StyledWrapper>
          <StyledRow>
            <Test data={questions} />
          </StyledRow>
        </StyledWrapper>
      </DashboardTemplate>
    )
  );
};

export default StudentTest;

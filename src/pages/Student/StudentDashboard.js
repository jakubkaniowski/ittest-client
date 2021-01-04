import React from 'react';
import styled from 'styled-components';
import { faGraduationCap, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import Card from '../../components/molecules/Card/Card';
import { PathCreator } from '../../routing/routes';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';

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
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const StyledLinkBox = styled(Link)`
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  height: 400px;
  transition: 300ms transform;

  &:hover {
    transform: scale(1.02);
  }
`;

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

const StudentDashboard = () => (
  <DashboardTemplate>
    <StyledWrapper>
      <StyledHeading>
        Witaj!
        <StyledParagraph>
          Dziękujemy za skorzystanie z naszej platformy. Wybierz jedną z opcji aby kontynuować!
        </StyledParagraph>
      </StyledHeading>
      <StyledRow>
        <StyledLinkBox to={PathCreator({ pathname: 'student/learn' })}>
          <StyledCard rounded header="Nauka">
            <StyledCardContent>
              <FontAwesomeIcon
                icon={faGraduationCap}
                size="8x"
                style={{ color: 'rgba(87, 167, 115)' }}
              />
              <StyledParagraph>
                Wybierz tą opcję aby przejść do kategorii i rozwijaj swoje umiejętności w wybranym
                przez siebie obszarze.
              </StyledParagraph>
            </StyledCardContent>
          </StyledCard>
        </StyledLinkBox>
        <StyledLinkBox to={PathCreator({ pathname: 'student/tests' })}>
          <StyledCard rounded header="Testy">
            <StyledCardContent>
              <FontAwesomeIcon icon={faFileAlt} size="8x" style={{ color: 'rgba(87, 167, 115)' }} />
              <StyledParagraph>
                Wybierz tą opcję aby przejść do testów i sprawdź co wymaga twój
                nauczyciel/wykładowca.
              </StyledParagraph>
            </StyledCardContent>
          </StyledCard>
        </StyledLinkBox>
      </StyledRow>
    </StyledWrapper>
  </DashboardTemplate>
);

export default StudentDashboard;

import React from 'react';
import styled from 'styled-components';
import { faGraduationCap, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import Card from '../../components/molecules/Card/Card';
import { PathCreator } from '../../routing/routes';

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

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.m};
  margin-top: 1em;
  font-weight: 300;
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const StyledLinkBox = styled.a`
  text-decoration: none;
`;

const StyledCard = styled(Card)`
  margin: 20px;
  flex: 1 1 300px;
  height: 400px;
  transition: 300ms transform;

  &:hover {
    transform: scale(1.05);
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
        <StyledLinkBox href={PathCreator({ path: 'student/learn' })}>
          <StyledCard header="Nauka">
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
        <StyledLinkBox href={PathCreator({ path: 'student/tests' })}>
          <StyledCard header="Testy">
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

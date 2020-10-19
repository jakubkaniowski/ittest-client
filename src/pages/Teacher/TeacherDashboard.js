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
  flex: 0 1 110px;
  width: 50%;
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
  flex: 1 1 0;
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

const TeacherDashboard = () => (
  <DashboardTemplate>
    <StyledWrapper>
      <StyledHeading>
        Witaj!
        <StyledParagraph>
          Dziękujemy za skorzystanie z naszej platformy. Wybierz jedną z opcji aby kontynuować!
        </StyledParagraph>
      </StyledHeading>
      <StyledRow>
        <StyledLinkBox href={PathCreator({ path: 'teacher/tests' })}>
          <StyledCard header="Testy">
            <StyledCardContent>
              <FontAwesomeIcon icon={faFileAlt} size="8x" color="blue" />
              <StyledParagraph>
                Wybierz tą opcję aby przejść do testów i sprawdź umiejętności swoich uczniów.
              </StyledParagraph>
            </StyledCardContent>
          </StyledCard>
        </StyledLinkBox>
        <StyledLinkBox href="/testy">
          <StyledCard header="Grupy">
            <StyledCardContent>
              <FontAwesomeIcon icon={faGraduationCap} size="8x" color="blue" />
              <StyledParagraph>
                Wybierz tą opcję aby przejść do spisu uczniów i zarządzaj grupami.
              </StyledParagraph>
            </StyledCardContent>
          </StyledCard>
        </StyledLinkBox>
      </StyledRow>
    </StyledWrapper>
  </DashboardTemplate>
);

export default TeacherDashboard;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Heading from '../../components/atoms/Heading/Heading';
import Card from '../../components/molecules/Card/Card';
import { PathCreator } from '../../routing/routes';
import CategoryServices from '../../services/CategoryServices';
import { useLoadingContext } from '../../context/LoadingContext';
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

const StyledRow = styled.div``;

const StyledCard = styled(Card)`
  width: 100%;
  margin: 20px 0;
`;

const StyledLink = styled.a`
  align-self: flex-end;
  display: block;
  margin-top: 10px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => `rgba(${theme.colors.black})`};
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => `${darken(0.05, `rgb(${theme.colors.primary})`)}`};
  }
`;

const StudentLearn = () => {
  const [categories, setCategories] = useState([]);
  const loadingContext = useLoadingContext();

  const handleSetCategories = ({ categoriesArray = [] }) => {
    setCategories(categoriesArray);
  };

  const getCategories = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await CategoryServices.getCategories();
      const { categories: receivedCategories } = response.data;

      handleSetCategories({ categoriesArray: receivedCategories });
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>
          Nauka
          <StyledParagraph>Wybierz kategorię i kontynuuj naukę!</StyledParagraph>
        </StyledHeading>
        <StyledRow>
          {categories.map((category) => {
            const { id, title, description } = category;
            return (
              <StyledCard rounded key={id} header={title}>
                <StyledParagraph>{description}</StyledParagraph>
                <StyledLink
                  href={PathCreator({ pathname: `student/learn/${title.toLowerCase()}` })}
                >
                  Przejdź do kategorii
                </StyledLink>
              </StyledCard>
            );
          })}
        </StyledRow>
      </StyledWrapper>
    </DashboardTemplate>
  );
};

export default StudentLearn;

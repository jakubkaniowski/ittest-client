import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from '../../context/LoadingContext';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import Test from '../../components/organisms/Test/Test';
import TestServices from '../../services/TestServices';

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
  const [test, setTest] = useState(null);
  const loadingContext = useLoadingContext();
  const { id } = useParams();

  const handleSetTest = ({ testDetails }) => {
    setTest(testDetails);
  };

  const getTest = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await TestServices.getSingleTest({ id });

      const { data } = response.data;

      handleSetTest({ testDetails: data });
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    getTest();
  }, []);

  return (
    test && (
      <DashboardTemplate>
        <StyledWrapper>
          <StyledRow>
            <Test test={test} />
          </StyledRow>
        </StyledWrapper>
      </DashboardTemplate>
    )
  );
};

export default StudentTest;

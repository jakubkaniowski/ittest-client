import React from 'react';
import { ROUTES, RenderRoutes } from '../../routing/routes';
import MainTemplate from '../../components/templates/MainTemplate';
import LoadingContextWrapper from '../../context/LoadingContext';
import UserContextWrapper from '../../context/UserProvider';

const Root = () => (
  <MainTemplate>
    <LoadingContextWrapper>
      <UserContextWrapper>
        <RenderRoutes routes={ROUTES} />
      </UserContextWrapper>
    </LoadingContextWrapper>
  </MainTemplate>
);

export default Root;

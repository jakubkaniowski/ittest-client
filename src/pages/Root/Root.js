import React from 'react';
import { ROUTES, RenderRoutes } from '../../routing/routes';
import MainTemplate from '../../components/templates/MainTemplate';
import LoadingContextWrapper from '../../context/LoadingContext';

const Root = () => (
  <MainTemplate>
    <LoadingContextWrapper>
      <RenderRoutes routes={ROUTES} />
    </LoadingContextWrapper>
  </MainTemplate>
);

export default Root;

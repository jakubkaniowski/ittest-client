import React from 'react';
import { ROUTES, RenderRoutes } from '../../routing/routes';
import MainTemplate from '../../components/templates/MainTemplate';

const Root = () => (
  <MainTemplate>
    <RenderRoutes routes={ROUTES} />
  </MainTemplate>
);

export default Root;

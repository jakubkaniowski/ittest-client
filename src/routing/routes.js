import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../pages/Auth/Auth';
import Homepage from '../pages/Student/Homepage';

export const RouteWithSubRoutes = (route = {}) => (
  <Route
    path={route.path}
    exact={route.exact}
    component={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <RouteWithSubRoutes key={route.key} {...route} />
    ))}
    <Route component={() => <h1>Not Found!</h1>} />
  </Switch>
);

export const PathCreator = ({ path = '' }) => `/${path}`;

export const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: Auth,
  },
  {
    path: '/auth/:type?',
    key: 'AUTH',
    exact: true,
    component: Auth,
  },
  {
    path: '/teacher',
    key: 'APP_TEACHER',
    exact: true,
    component: () => <h1>App Teacher</h1>,
  },
  {
    path: '/student',
    key: 'APP_STUDENT',
    exact: true,
    component: Homepage,
  },
];

RenderRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

RenderRoutes.defaultProps = {
  routes: [],
};

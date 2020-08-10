import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../pages/Auth/Auth';

export function RouteWithSubRoutes(route = {}) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export const ROUTES = [
  {
    path: '/',
    key: 'AUTH',
    exact: true,
    component: Auth,
  },
  {
    path: '/app/teacher',
    key: 'APP_TEACHER',
    exact: true,
    component: () => <h1>App Teacher</h1>,
  },
  {
    path: '/app/student',
    key: 'APP_STUDENT',
    exact: true,
    component: () => <h1>App Student</h1>,
  },
];

RenderRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

RenderRoutes.defaultProps = {
  routes: [],
};

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../pages/Auth/Auth';
import TeacherDashboard from '../pages/Teacher/TeacherDashboard';
import StudentDashboard from '../pages/Student/StudentDashboard';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import StudentLearn from '../pages/Student/StudentLearn';
import StudentLearnCategory from '../pages/Student/StudentLearnCategory';

export const RouteWithSubRoutes = (route = {}) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
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
    component: WelcomePage,
  },
  {
    path: '/auth',
    key: 'AUTH',
    exact: false,
    component: RenderRoutes,
    routes: [
      {
        path: '/auth/:type',
        key: 'AUTH',
        exact: true,
        component: Auth,
      },
    ],
  },
  {
    path: '/teacher',
    key: 'APP_TEACHER',
    exact: true,
    component: TeacherDashboard,
  },
  {
    path: '/student',
    key: 'APP_STUDENT',
    exact: false,
    component: RenderRoutes,
    routes: [
      {
        path: '/student',
        key: 'APP_STUDENT_DASHBOARD',
        exact: true,
        component: StudentDashboard,
      },
      {
        path: '/student/learn',
        key: 'APP_STUDENT_STUDY',
        exact: true,
        component: StudentLearn,
      },
      {
        path: '/student/learn/:category',
        key: 'APP_STUDENT_STUDY_CATEGORY',
        exact: true,
        component: StudentLearnCategory,
      },
      {
        path: '/student/tests',
        key: 'APP_STUDENT_TESTS',
        exact: true,
        component: () => <h1>TESTY</h1>,
      },
    ],
  },
];

RenderRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

RenderRoutes.defaultProps = {
  routes: [],
};

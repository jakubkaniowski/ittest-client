import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../pages/Auth/Auth';
import StudentDashboard from '../pages/Student/StudentDashboard';
import StudentLearn from '../pages/Student/StudentLearn';
import StudentLearnCategory from '../pages/Student/StudentLearnCategory';
import StudentTests from '../pages/Student/StudentTests';
import StudentTest from '../pages/Student/StudentTest';
import { AUTH_TOKEN_NAME } from '../utils/const';
import StudentTestResult from '../pages/Student/StudentTestResult';
import ForgotPassword from '../pages/Auth/forgot/ForgotPassword';
import RecoverPassword from '../pages/Auth/recoverPassword/RecoverPassword';

export const RouteWithSubRoutes = (route = {}) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);

  if (route.authorize === true && !token) {
    setTimeout(() => {
      window.location.replace('/');
    }, 3000);
    return <Route render={() => <UnauthorizedComponent />} />;
  }

  return (
    <Route
      path={route.path}
      exact={route.exact}
      authorize={route.authorize}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export const UnauthorizedComponent = () => (
  <div>
    <h2>403 Brak autoryzacji</h2>
    Przekierowywanie...
    <br />
    <br />
  </div>
);

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <RouteWithSubRoutes key={route.key} {...route} />
    ))}
    <Route component={() => <h1>Not Found!</h1>} />
  </Switch>
);

export const PathCreator = ({
  pathname = '', search = '', state = {}, hash = '',
}) => ({
  pathname,
  search,
  state,
  hash,
});

export const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    authorize: false,
    component: Auth,
  },
  {
    path: '/password',
    key: 'AUTH',
    exact: false,
    authorize: false,
    component: RenderRoutes,
    routes: [
      {
        path: '/password/forgot',
        key: 'APP_AUTH_FORGOT',
        exact: true,
        component: ForgotPassword,
      },
      {
        path: '/password/recoverPassword',
        key: 'APP_AUTH_RECOVER',
        exact: true,
        component: RecoverPassword,
      },
    ],
  },
  {
    path: '/student',
    key: 'APP_STUDENT',
    exact: false,
    authorize: true,
    component: RenderRoutes,
    role: 'STUDENT',
    routes: [
      {
        path: '/student',
        key: 'APP_STUDENT_DASHBOARD',
        exact: true,
        authorize: true,
        role: 'STUDENT',
        component: StudentDashboard,
      },
      {
        path: '/student/learn',
        key: 'APP_STUDENT_STUDY',
        exact: true,
        authorize: true,
        role: 'STUDENT',
        component: StudentLearn,
      },
      {
        path: '/student/learn/:category',
        key: 'APP_STUDENT_STUDY_CATEGORY',
        exact: true,
        authorize: true,
        role: 'STUDENT',
        component: StudentLearnCategory,
      },
      {
        path: '/student/tests',
        key: 'APP_STUDENT_TESTS',
        exact: false,
        authorize: true,
        role: 'STUDENT',
        component: RenderRoutes,
        routes: [
          {
            path: '/student/tests',
            key: 'APP_STUDENT_TESTS_LIST',
            exact: true,
            authorize: true,
            role: 'STUDENT',
            component: StudentTests,
          },
          {
            path: '/student/tests/:id',
            key: 'APP_STUDENT_TESTS_TEST',
            exact: true,
            authorize: true,
            role: 'STUDENT',
            component: StudentTest,
          },
          {
            path: '/student/tests/:id/result',
            key: 'APP_STUDENT_TESTS_TEST_RESULT',
            exact: true,
            authorize: true,
            role: 'STUDENT',
            component: StudentTestResult,
          },
        ],
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

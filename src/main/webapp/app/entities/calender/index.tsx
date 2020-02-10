import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Calender from './calender';
import CalenderDetail from './calender-detail';
import CalenderUpdate from './calender-update';
import CalenderDeleteDialog from './calender-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CalenderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CalenderUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CalenderDetail} />
      <ErrorBoundaryRoute path={match.url} component={Calender} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CalenderDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserExtention from './user-extention';
import UserExtentionDetail from './user-extention-detail';
import UserExtentionUpdate from './user-extention-update';
import UserExtentionDeleteDialog from './user-extention-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserExtentionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserExtentionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserExtentionDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserExtention} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserExtentionDeleteDialog} />
  </>
);

export default Routes;

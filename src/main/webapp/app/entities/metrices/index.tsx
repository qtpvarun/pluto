import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Metrices from './metrices';
import MetricesDetail from './metrices-detail';
import MetricesUpdate from './metrices-update';
import MetricesDeleteDialog from './metrices-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MetricesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MetricesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MetricesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Metrices} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MetricesDeleteDialog} />
  </>
);

export default Routes;

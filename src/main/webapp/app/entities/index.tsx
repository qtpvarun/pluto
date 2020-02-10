import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserExtention from './user-extention';
import Department from './department';
import ProjectType from './project-type';
import Project from './project';
import Task from './task';
import SubTask from './sub-task';
import TaskHistory from './task-history';
import Calender from './calender';
import Board from './board';
import Metrices from './metrices';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/user-extention`} component={UserExtention} />
      <ErrorBoundaryRoute path={`${match.url}/department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}/project-type`} component={ProjectType} />
      <ErrorBoundaryRoute path={`${match.url}/project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/sub-task`} component={SubTask} />
      <ErrorBoundaryRoute path={`${match.url}/task-history`} component={TaskHistory} />
      <ErrorBoundaryRoute path={`${match.url}/calender`} component={Calender} />
      <ErrorBoundaryRoute path={`${match.url}/board`} component={Board} />
      <ErrorBoundaryRoute path={`${match.url}/metrices`} component={Metrices} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

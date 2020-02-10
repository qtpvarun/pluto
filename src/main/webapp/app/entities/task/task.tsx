import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Task extends React.Component<ITaskProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { taskList, match } = this.props;
    return (
      <div>
        <h2 id="task-heading">
          <Translate contentKey="proTrackApp.task.home.title">Tasks</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.task.home.createLabel">Create a new Task</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {taskList && taskList.length > 0 ? (
            <Table responsive aria-describedby="task-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.assignedDate">Assigned Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.estimatedCompletionDate">Estimated Completion Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.completedDate">Completed Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.draftDueDate">Draft Due Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.internalDueDate">Internal Due Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.priority">Priority</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.isOverdue">Is Overdue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.inProgress">In Progress</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.grade">Grade</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.jsonUIDetails">Json UI Details</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.assignedTo">Assigned To</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.assignedBy">Assigned By</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.assignedQC">Assigned QC</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.task.parentProject">Parent Project</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${task.id}`} color="link" size="sm">
                        {task.id}
                      </Button>
                    </td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                      <Translate contentKey={`proTrackApp.TaskStatus.${task.status}`} />
                    </td>
                    <td>{task.assignedDate}</td>
                    <td>
                      <TextFormat type="date" value={task.estimatedCompletionDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={task.completedDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={task.draftDueDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={task.internalDueDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`proTrackApp.Priority.${task.priority}`} />
                    </td>
                    <td>{task.isOverdue ? 'true' : 'false'}</td>
                    <td>{task.inProgress ? 'true' : 'false'}</td>
                    <td>
                      <Translate contentKey={`proTrackApp.Grade.${task.grade}`} />
                    </td>
                    <td>{task.jsonUIDetails}</td>
                    <td>{task.assignedTo ? task.assignedTo.login : ''}</td>
                    <td>{task.assignedBy ? task.assignedBy.login : ''}</td>
                    <td>{task.assignedQC ? task.assignedQC.login : ''}</td>
                    <td>{task.parentProject ? <Link to={`project/${task.parentProject.id}`}>{task.parentProject.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${task.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${task.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${task.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="proTrackApp.task.home.notFound">No Tasks found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ task }: IRootState) => ({
  taskList: task.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);

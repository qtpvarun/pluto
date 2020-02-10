import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sub-task.reducer';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubTaskProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SubTask extends React.Component<ISubTaskProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { subTaskList, match } = this.props;
    return (
      <div>
        <h2 id="sub-task-heading">
          <Translate contentKey="proTrackApp.subTask.home.title">Sub Tasks</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.subTask.home.createLabel">Create a new Sub Task</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {subTaskList && subTaskList.length > 0 ? (
            <Table responsive aria-describedby="sub-task-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.status">Status</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.assignedDate">Assigned Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.estimatedCompletionDate">Estimated Completion Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.closedDate">Closed Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.priority">Priority</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.isOverdue">Is Overdue</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.inProgress">In Progress</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.assignedTo">Assigned To</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.assignedBy">Assigned By</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.sourceUser">Source User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.targetUser">Target User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.subTask.parentTask">Parent Task</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {subTaskList.map((subTask, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${subTask.id}`} color="link" size="sm">
                        {subTask.id}
                      </Button>
                    </td>
                    <td>{subTask.name}</td>
                    <td>{subTask.description}</td>
                    <td>
                      <Translate contentKey={`proTrackApp.SubTaskStatus.${subTask.status}`} />
                    </td>
                    <td>
                      <TextFormat type="date" value={subTask.assignedDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={subTask.estimatedCompletionDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={subTask.closedDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`proTrackApp.Priority.${subTask.priority}`} />
                    </td>
                    <td>{subTask.isOverdue ? 'true' : 'false'}</td>
                    <td>{subTask.inProgress ? 'true' : 'false'}</td>
                    <td>{subTask.assignedTo ? subTask.assignedTo.login : ''}</td>
                    <td>{subTask.assignedBy ? subTask.assignedBy.login : ''}</td>
                    <td>{subTask.sourceUser ? subTask.sourceUser.login : ''}</td>
                    <td>{subTask.targetUser ? subTask.targetUser.login : ''}</td>
                    <td>{subTask.parentTask ? <Link to={`task/${subTask.parentTask.id}`}>{subTask.parentTask.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${subTask.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subTask.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subTask.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.subTask.home.notFound">No Sub Tasks found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subTask }: IRootState) => ({
  subTaskList: subTask.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubTask);

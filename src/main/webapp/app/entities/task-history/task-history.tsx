import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './task-history.reducer';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TaskHistory extends React.Component<ITaskHistoryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { taskHistoryList, match } = this.props;
    return (
      <div>
        <h2 id="task-history-heading">
          <Translate contentKey="proTrackApp.taskHistory.home.title">Task Histories</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.taskHistory.home.createLabel">Create a new Task History</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {taskHistoryList && taskHistoryList.length > 0 ? (
            <Table responsive aria-describedby="task-history-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.eventDate">Event Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.eventType">Event Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.eventTopic">Event Topic</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.eventDetail">Event Detail</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.isRedline">Is Redline</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.isIdleTask">Is Idle Task</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.jsonUIDetails">Json UI Details</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.taskHistory.parentTask">Parent Task</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {taskHistoryList.map((taskHistory, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${taskHistory.id}`} color="link" size="sm">
                        {taskHistory.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={taskHistory.eventDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <Translate contentKey={`proTrackApp.EventType.${taskHistory.eventType}`} />
                    </td>
                    <td>{taskHistory.eventTopic}</td>
                    <td>{taskHistory.eventDetail}</td>
                    <td>{taskHistory.isRedline ? 'true' : 'false'}</td>
                    <td>{taskHistory.isIdleTask ? 'true' : 'false'}</td>
                    <td>{taskHistory.jsonUIDetails}</td>
                    <td>
                      {taskHistory.parentTask ? <Link to={`task/${taskHistory.parentTask.id}`}>{taskHistory.parentTask.name}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${taskHistory.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${taskHistory.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${taskHistory.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.taskHistory.home.notFound">No Task Histories found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ taskHistory }: IRootState) => ({
  taskHistoryList: taskHistory.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskHistory);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './calender.reducer';
import { ICalender } from 'app/shared/model/calender.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICalenderProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Calender extends React.Component<ICalenderProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { calenderList, match } = this.props;
    return (
      <div>
        <h2 id="calender-heading">
          <Translate contentKey="proTrackApp.calender.home.title">Calenders</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.calender.home.createLabel">Create a new Calender</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {calenderList && calenderList.length > 0 ? (
            <Table responsive aria-describedby="calender-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.startDate">Start Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.endDate">End Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.jsonUIDetails">Json UI Details</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.taskHistory">Task History</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.task">Task</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.project">Project</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.department">Department</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.calender.assignedTo">Assigned To</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {calenderList.map((calender, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${calender.id}`} color="link" size="sm">
                        {calender.id}
                      </Button>
                    </td>
                    <td>{calender.title}</td>
                    <td>
                      <TextFormat type="date" value={calender.startDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={calender.endDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{calender.jsonUIDetails}</td>
                    <td>
                      {calender.taskHistory ? (
                        <Link to={`task-history/${calender.taskHistory.id}`}>{calender.taskHistory.eventTopic}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{calender.task ? <Link to={`task/${calender.task.id}`}>{calender.task.name}</Link> : ''}</td>
                    <td>{calender.project ? <Link to={`project/${calender.project.id}`}>{calender.project.name}</Link> : ''}</td>
                    <td>
                      {calender.department ? <Link to={`department/${calender.department.id}`}>{calender.department.name}</Link> : ''}
                    </td>
                    <td>{calender.assignedTo ? calender.assignedTo.login : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${calender.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${calender.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${calender.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.calender.home.notFound">No Calenders found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calender }: IRootState) => ({
  calenderList: calender.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calender);

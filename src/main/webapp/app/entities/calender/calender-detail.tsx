import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './calender.reducer';
import { ICalender } from 'app/shared/model/calender.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICalenderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CalenderDetail extends React.Component<ICalenderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { calenderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.calender.detail.title">Calender</Translate> [<b>{calenderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="proTrackApp.calender.title">Title</Translate>
              </span>
            </dt>
            <dd>{calenderEntity.title}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="proTrackApp.calender.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={calenderEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="proTrackApp.calender.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={calenderEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="jsonUIDetails">
                <Translate contentKey="proTrackApp.calender.jsonUIDetails">Json UI Details</Translate>
              </span>
            </dt>
            <dd>{calenderEntity.jsonUIDetails}</dd>
            <dt>
              <Translate contentKey="proTrackApp.calender.taskHistory">Task History</Translate>
            </dt>
            <dd>{calenderEntity.taskHistory ? calenderEntity.taskHistory.eventTopic : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.calender.task">Task</Translate>
            </dt>
            <dd>{calenderEntity.task ? calenderEntity.task.name : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.calender.project">Project</Translate>
            </dt>
            <dd>{calenderEntity.project ? calenderEntity.project.name : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.calender.department">Department</Translate>
            </dt>
            <dd>{calenderEntity.department ? calenderEntity.department.name : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.calender.assignedTo">Assigned To</Translate>
            </dt>
            <dd>{calenderEntity.assignedTo ? calenderEntity.assignedTo.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/calender" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/calender/${calenderEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ calender }: IRootState) => ({
  calenderEntity: calender.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalenderDetail);

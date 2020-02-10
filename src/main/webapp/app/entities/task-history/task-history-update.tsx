import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICalender } from 'app/shared/model/calender.model';
import { getEntities as getCalenders } from 'app/entities/calender/calender.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task-history.reducer';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITaskHistoryUpdateState {
  isNew: boolean;
  calenderId: string;
  parentTaskId: string;
}

export class TaskHistoryUpdate extends React.Component<ITaskHistoryUpdateProps, ITaskHistoryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      calenderId: '0',
      parentTaskId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCalenders();
    this.props.getTasks();
  }

  saveEntity = (event, errors, values) => {
    values.eventDate = convertDateTimeToServer(values.eventDate);

    if (errors.length === 0) {
      const { taskHistoryEntity } = this.props;
      const entity = {
        ...taskHistoryEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/task-history');
  };

  render() {
    const { taskHistoryEntity, calenders, tasks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.taskHistory.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.taskHistory.home.createOrEditLabel">Create or edit a TaskHistory</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taskHistoryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="task-history-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="task-history-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventDateLabel" for="task-history-eventDate">
                    <Translate contentKey="proTrackApp.taskHistory.eventDate">Event Date</Translate>
                  </Label>
                  <AvInput
                    id="task-history-eventDate"
                    type="datetime-local"
                    className="form-control"
                    name="eventDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.taskHistoryEntity.eventDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="eventTypeLabel" for="task-history-eventType">
                    <Translate contentKey="proTrackApp.taskHistory.eventType">Event Type</Translate>
                  </Label>
                  <AvInput
                    id="task-history-eventType"
                    type="select"
                    className="form-control"
                    name="eventType"
                    value={(!isNew && taskHistoryEntity.eventType) || 'ASSIGN'}
                  >
                    <option value="ASSIGN">{translate('proTrackApp.EventType.ASSIGN')}</option>
                    <option value="CHECKOUT">{translate('proTrackApp.EventType.CHECKOUT')}</option>
                    <option value="CHECKIN">{translate('proTrackApp.EventType.CHECKIN')}</option>
                    <option value="QC">{translate('proTrackApp.EventType.QC')}</option>
                    <option value="CUSTOMER">{translate('proTrackApp.EventType.CUSTOMER')}</option>
                    <option value="PASS">{translate('proTrackApp.EventType.PASS')}</option>
                    <option value="FAIL">{translate('proTrackApp.EventType.FAIL')}</option>
                    <option value="APPROVE">{translate('proTrackApp.EventType.APPROVE')}</option>
                    <option value="REJECT">{translate('proTrackApp.EventType.REJECT')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="eventTopicLabel" for="task-history-eventTopic">
                    <Translate contentKey="proTrackApp.taskHistory.eventTopic">Event Topic</Translate>
                  </Label>
                  <AvField id="task-history-eventTopic" type="text" name="eventTopic" />
                </AvGroup>
                <AvGroup>
                  <Label id="eventDetailLabel" for="task-history-eventDetail">
                    <Translate contentKey="proTrackApp.taskHistory.eventDetail">Event Detail</Translate>
                  </Label>
                  <AvField id="task-history-eventDetail" type="text" name="eventDetail" />
                </AvGroup>
                <AvGroup>
                  <Label id="isRedlineLabel" check>
                    <AvInput id="task-history-isRedline" type="checkbox" className="form-control" name="isRedline" />
                    <Translate contentKey="proTrackApp.taskHistory.isRedline">Is Redline</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="isIdleTaskLabel" check>
                    <AvInput id="task-history-isIdleTask" type="checkbox" className="form-control" name="isIdleTask" />
                    <Translate contentKey="proTrackApp.taskHistory.isIdleTask">Is Idle Task</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="jsonUIDetailsLabel" for="task-history-jsonUIDetails">
                    <Translate contentKey="proTrackApp.taskHistory.jsonUIDetails">Json UI Details</Translate>
                  </Label>
                  <AvField id="task-history-jsonUIDetails" type="text" name="jsonUIDetails" />
                </AvGroup>
                <AvGroup>
                  <Label for="task-history-parentTask">
                    <Translate contentKey="proTrackApp.taskHistory.parentTask">Parent Task</Translate>
                  </Label>
                  <AvInput id="task-history-parentTask" type="select" className="form-control" name="parentTask.id">
                    <option value="" key="0" />
                    {tasks
                      ? tasks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/task-history" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  calenders: storeState.calender.entities,
  tasks: storeState.task.entities,
  taskHistoryEntity: storeState.taskHistory.entity,
  loading: storeState.taskHistory.loading,
  updating: storeState.taskHistory.updating,
  updateSuccess: storeState.taskHistory.updateSuccess
});

const mapDispatchToProps = {
  getCalenders,
  getTasks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskHistoryUpdate);

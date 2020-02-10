import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sub-task.reducer';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubTaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISubTaskUpdateState {
  isNew: boolean;
  assignedToId: string;
  assignedById: string;
  sourceUserId: string;
  targetUserId: string;
  parentTaskId: string;
}

export class SubTaskUpdate extends React.Component<ISubTaskUpdateProps, ISubTaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      assignedToId: '0',
      assignedById: '0',
      sourceUserId: '0',
      targetUserId: '0',
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

    this.props.getUsers();
    this.props.getTasks();
  }

  saveEntity = (event, errors, values) => {
    values.assignedDate = convertDateTimeToServer(values.assignedDate);
    values.estimatedCompletionDate = convertDateTimeToServer(values.estimatedCompletionDate);
    values.closedDate = convertDateTimeToServer(values.closedDate);

    if (errors.length === 0) {
      const { subTaskEntity } = this.props;
      const entity = {
        ...subTaskEntity,
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
    this.props.history.push('/entity/sub-task');
  };

  render() {
    const { subTaskEntity, users, tasks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.subTask.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.subTask.home.createOrEditLabel">Create or edit a SubTask</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : subTaskEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="sub-task-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="sub-task-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="sub-task-name">
                    <Translate contentKey="proTrackApp.subTask.name">Name</Translate>
                  </Label>
                  <AvField
                    id="sub-task-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="sub-task-description">
                    <Translate contentKey="proTrackApp.subTask.description">Description</Translate>
                  </Label>
                  <AvField id="sub-task-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="sub-task-status">
                    <Translate contentKey="proTrackApp.subTask.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="sub-task-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && subTaskEntity.status) || 'Open'}
                  >
                    <option value="Open">{translate('proTrackApp.SubTaskStatus.Open')}</option>
                    <option value="Closed">{translate('proTrackApp.SubTaskStatus.Closed')}</option>
                    <option value="InProgress">{translate('proTrackApp.SubTaskStatus.InProgress')}</option>
                    <option value="OnHold">{translate('proTrackApp.SubTaskStatus.OnHold')}</option>
                    <option value="NeedInfo">{translate('proTrackApp.SubTaskStatus.NeedInfo')}</option>
                    <option value="Approved">{translate('proTrackApp.SubTaskStatus.Approved')}</option>
                    <option value="Rejected">{translate('proTrackApp.SubTaskStatus.Rejected')}</option>
                    <option value="ReOpen">{translate('proTrackApp.SubTaskStatus.ReOpen')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="assignedDateLabel" for="sub-task-assignedDate">
                    <Translate contentKey="proTrackApp.subTask.assignedDate">Assigned Date</Translate>
                  </Label>
                  <AvInput
                    id="sub-task-assignedDate"
                    type="datetime-local"
                    className="form-control"
                    name="assignedDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.subTaskEntity.assignedDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="estimatedCompletionDateLabel" for="sub-task-estimatedCompletionDate">
                    <Translate contentKey="proTrackApp.subTask.estimatedCompletionDate">Estimated Completion Date</Translate>
                  </Label>
                  <AvInput
                    id="sub-task-estimatedCompletionDate"
                    type="datetime-local"
                    className="form-control"
                    name="estimatedCompletionDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.subTaskEntity.estimatedCompletionDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="closedDateLabel" for="sub-task-closedDate">
                    <Translate contentKey="proTrackApp.subTask.closedDate">Closed Date</Translate>
                  </Label>
                  <AvInput
                    id="sub-task-closedDate"
                    type="datetime-local"
                    className="form-control"
                    name="closedDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.subTaskEntity.closedDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel" for="sub-task-priority">
                    <Translate contentKey="proTrackApp.subTask.priority">Priority</Translate>
                  </Label>
                  <AvInput
                    id="sub-task-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && subTaskEntity.priority) || 'Low'}
                  >
                    <option value="Low">{translate('proTrackApp.Priority.Low')}</option>
                    <option value="Medium">{translate('proTrackApp.Priority.Medium')}</option>
                    <option value="High">{translate('proTrackApp.Priority.High')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="isOverdueLabel" check>
                    <AvInput id="sub-task-isOverdue" type="checkbox" className="form-control" name="isOverdue" />
                    <Translate contentKey="proTrackApp.subTask.isOverdue">Is Overdue</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="inProgressLabel" check>
                    <AvInput id="sub-task-inProgress" type="checkbox" className="form-control" name="inProgress" />
                    <Translate contentKey="proTrackApp.subTask.inProgress">In Progress</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="sub-task-assignedTo">
                    <Translate contentKey="proTrackApp.subTask.assignedTo">Assigned To</Translate>
                  </Label>
                  <AvInput id="sub-task-assignedTo" type="select" className="form-control" name="assignedTo.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sub-task-assignedBy">
                    <Translate contentKey="proTrackApp.subTask.assignedBy">Assigned By</Translate>
                  </Label>
                  <AvInput id="sub-task-assignedBy" type="select" className="form-control" name="assignedBy.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sub-task-sourceUser">
                    <Translate contentKey="proTrackApp.subTask.sourceUser">Source User</Translate>
                  </Label>
                  <AvInput id="sub-task-sourceUser" type="select" className="form-control" name="sourceUser.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sub-task-targetUser">
                    <Translate contentKey="proTrackApp.subTask.targetUser">Target User</Translate>
                  </Label>
                  <AvInput id="sub-task-targetUser" type="select" className="form-control" name="targetUser.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sub-task-parentTask">
                    <Translate contentKey="proTrackApp.subTask.parentTask">Parent Task</Translate>
                  </Label>
                  <AvInput id="sub-task-parentTask" type="select" className="form-control" name="parentTask.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/sub-task" replace color="info">
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
  users: storeState.userManagement.users,
  tasks: storeState.task.entities,
  subTaskEntity: storeState.subTask.entity,
  loading: storeState.subTask.loading,
  updating: storeState.subTask.updating,
  updateSuccess: storeState.subTask.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(SubTaskUpdate);

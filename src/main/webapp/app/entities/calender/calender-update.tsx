import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITaskHistory } from 'app/shared/model/task-history.model';
import { getEntities as getTaskHistories } from 'app/entities/task-history/task-history.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './calender.reducer';
import { ICalender } from 'app/shared/model/calender.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICalenderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICalenderUpdateState {
  isNew: boolean;
  taskHistoryId: string;
  taskId: string;
  projectId: string;
  departmentId: string;
  assignedToId: string;
}

export class CalenderUpdate extends React.Component<ICalenderUpdateProps, ICalenderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      taskHistoryId: '0',
      taskId: '0',
      projectId: '0',
      departmentId: '0',
      assignedToId: '0',
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

    this.props.getTaskHistories();
    this.props.getTasks();
    this.props.getProjects();
    this.props.getDepartments();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { calenderEntity } = this.props;
      const entity = {
        ...calenderEntity,
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
    this.props.history.push('/entity/calender');
  };

  render() {
    const { calenderEntity, taskHistories, tasks, projects, departments, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.calender.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.calender.home.createOrEditLabel">Create or edit a Calender</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : calenderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="calender-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="calender-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="calender-title">
                    <Translate contentKey="proTrackApp.calender.title">Title</Translate>
                  </Label>
                  <AvField
                    id="calender-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="calender-startDate">
                    <Translate contentKey="proTrackApp.calender.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="calender-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.calenderEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="calender-endDate">
                    <Translate contentKey="proTrackApp.calender.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="calender-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.calenderEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="jsonUIDetailsLabel" for="calender-jsonUIDetails">
                    <Translate contentKey="proTrackApp.calender.jsonUIDetails">Json UI Details</Translate>
                  </Label>
                  <AvField id="calender-jsonUIDetails" type="text" name="jsonUIDetails" />
                </AvGroup>
                <AvGroup>
                  <Label for="calender-taskHistory">
                    <Translate contentKey="proTrackApp.calender.taskHistory">Task History</Translate>
                  </Label>
                  <AvInput id="calender-taskHistory" type="select" className="form-control" name="taskHistory.id">
                    <option value="" key="0" />
                    {taskHistories
                      ? taskHistories.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.eventTopic}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="calender-task">
                    <Translate contentKey="proTrackApp.calender.task">Task</Translate>
                  </Label>
                  <AvInput id="calender-task" type="select" className="form-control" name="task.id">
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
                <AvGroup>
                  <Label for="calender-project">
                    <Translate contentKey="proTrackApp.calender.project">Project</Translate>
                  </Label>
                  <AvInput id="calender-project" type="select" className="form-control" name="project.id">
                    <option value="" key="0" />
                    {projects
                      ? projects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="calender-department">
                    <Translate contentKey="proTrackApp.calender.department">Department</Translate>
                  </Label>
                  <AvInput id="calender-department" type="select" className="form-control" name="department.id">
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="calender-assignedTo">
                    <Translate contentKey="proTrackApp.calender.assignedTo">Assigned To</Translate>
                  </Label>
                  <AvInput id="calender-assignedTo" type="select" className="form-control" name="assignedTo.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/calender" replace color="info">
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
  taskHistories: storeState.taskHistory.entities,
  tasks: storeState.task.entities,
  projects: storeState.project.entities,
  departments: storeState.department.entities,
  users: storeState.userManagement.users,
  calenderEntity: storeState.calender.entity,
  loading: storeState.calender.loading,
  updating: storeState.calender.updating,
  updateSuccess: storeState.calender.updateSuccess
});

const mapDispatchToProps = {
  getTaskHistories,
  getTasks,
  getProjects,
  getDepartments,
  getUsers,
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
)(CalenderUpdate);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProjectType } from 'app/shared/model/project-type.model';
import { getEntities as getProjectTypes } from 'app/entities/project-type/project-type.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProjectUpdateState {
  isNew: boolean;
  projectTypeId: string;
  programManagerId: string;
  projectCoordinatorId: string;
  prpjectLeadId: string;
  superviserId: string;
  prpjectManagerId: string;
  prpjectEngineerId: string;
  technicianId: string;
  engineerOfRecordId: string;
  trafficSpecialistId: string;
  prpjectStaffId: string;
  qualitySpecialistId: string;
  parentProjectId: string;
}

export class ProjectUpdate extends React.Component<IProjectUpdateProps, IProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      projectTypeId: '0',
      programManagerId: '0',
      projectCoordinatorId: '0',
      prpjectLeadId: '0',
      superviserId: '0',
      prpjectManagerId: '0',
      prpjectEngineerId: '0',
      technicianId: '0',
      engineerOfRecordId: '0',
      trafficSpecialistId: '0',
      prpjectStaffId: '0',
      qualitySpecialistId: '0',
      parentProjectId: '0',
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

    this.props.getProjectTypes();
    this.props.getUsers();
    this.props.getDepartments();
  }

  saveEntity = (event, errors, values) => {
    values.internalDue = convertDateTimeToServer(values.internalDue);

    if (errors.length === 0) {
      const { projectEntity } = this.props;
      const entity = {
        ...projectEntity,
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
    this.props.history.push('/entity/project');
  };

  render() {
    const { projectEntity, projectTypes, users, departments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.project.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.project.home.createOrEditLabel">Create or edit a Project</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : projectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="project-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="project-name">
                    <Translate contentKey="proTrackApp.project.name">Name</Translate>
                  </Label>
                  <AvField
                    id="project-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="project-description">
                    <Translate contentKey="proTrackApp.project.description">Description</Translate>
                  </Label>
                  <AvField id="project-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="billingCompanyLabel" for="project-billingCompany">
                    <Translate contentKey="proTrackApp.project.billingCompany">Billing Company</Translate>
                  </Label>
                  <AvField id="project-billingCompany" type="text" name="billingCompany" />
                </AvGroup>
                <AvGroup>
                  <Label id="careerNameLabel" for="project-careerName">
                    <Translate contentKey="proTrackApp.project.careerName">Career Name</Translate>
                  </Label>
                  <AvField id="project-careerName" type="text" name="careerName" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteNumberLabel" for="project-siteNumber">
                    <Translate contentKey="proTrackApp.project.siteNumber">Site Number</Translate>
                  </Label>
                  <AvField id="project-siteNumber" type="string" className="form-control" name="siteNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteNameLabel" for="project-siteName">
                    <Translate contentKey="proTrackApp.project.siteName">Site Name</Translate>
                  </Label>
                  <AvField id="project-siteName" type="text" name="siteName" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteCompanyLabel" for="project-siteCompany">
                    <Translate contentKey="proTrackApp.project.siteCompany">Site Company</Translate>
                  </Label>
                  <AvField id="project-siteCompany" type="text" name="siteCompany" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteLatitudeLabel" for="project-siteLatitude">
                    <Translate contentKey="proTrackApp.project.siteLatitude">Site Latitude</Translate>
                  </Label>
                  <AvField id="project-siteLatitude" type="string" className="form-control" name="siteLatitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteLongitudeLabel" for="project-siteLongitude">
                    <Translate contentKey="proTrackApp.project.siteLongitude">Site Longitude</Translate>
                  </Label>
                  <AvField id="project-siteLongitude" type="string" className="form-control" name="siteLongitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteTypeLabel" for="project-siteType">
                    <Translate contentKey="proTrackApp.project.siteType">Site Type</Translate>
                  </Label>
                  <AvInput
                    id="project-siteType"
                    type="select"
                    className="form-control"
                    name="siteType"
                    value={(!isNew && projectEntity.siteType) || 'Architectural'}
                  >
                    <option value="Architectural">{translate('proTrackApp.SiteType.Architectural')}</option>
                    <option value="Guyed">{translate('proTrackApp.SiteType.Guyed')}</option>
                    <option value="Industrial">{translate('proTrackApp.SiteType.Industrial')}</option>
                    <option value="Monopine">{translate('proTrackApp.SiteType.Monopine')}</option>
                    <option value="Monopole">{translate('proTrackApp.SiteType.Monopole')}</option>
                    <option value="Overhead">{translate('proTrackApp.SiteType.Overhead')}</option>
                    <option value="Rooftop">{translate('proTrackApp.SiteType.Rooftop')}</option>
                    <option value="SelfSupporter">{translate('proTrackApp.SiteType.SelfSupporter')}</option>
                    <option value="SmallCell">{translate('proTrackApp.SiteType.SmallCell')}</option>
                    <option value="StealthTower">{translate('proTrackApp.SiteType.StealthTower')}</option>
                    <option value="Undefined">{translate('proTrackApp.SiteType.Undefined')}</option>
                    <option value="NULL">{translate('proTrackApp.SiteType.NULL')}</option>
                    <option value="WaterTower">{translate('proTrackApp.SiteType.WaterTower')}</option>
                    <option value="WoodPole">{translate('proTrackApp.SiteType.WoodPole')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="isSite360Label" check>
                    <AvInput id="project-isSite360" type="checkbox" className="form-control" name="isSite360" />
                    <Translate contentKey="proTrackApp.project.isSite360">Is Site 360</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="internalDueLabel" for="project-internalDue">
                    <Translate contentKey="proTrackApp.project.internalDue">Internal Due</Translate>
                  </Label>
                  <AvInput
                    id="project-internalDue"
                    type="datetime-local"
                    className="form-control"
                    name="internalDue"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.projectEntity.internalDue)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pONumberLabel" for="project-pONumber">
                    <Translate contentKey="proTrackApp.project.pONumber">P O Number</Translate>
                  </Label>
                  <AvField id="project-pONumber" type="text" name="pONumber" />
                </AvGroup>
                <AvGroup>
                  <Label for="project-projectType">
                    <Translate contentKey="proTrackApp.project.projectType">Project Type</Translate>
                  </Label>
                  <AvInput id="project-projectType" type="select" className="form-control" name="projectType.id">
                    <option value="" key="0" />
                    {projectTypes
                      ? projectTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="project-programManager">
                    <Translate contentKey="proTrackApp.project.programManager">Program Manager</Translate>
                  </Label>
                  <AvInput id="project-programManager" type="select" className="form-control" name="programManager.id">
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
                  <Label for="project-projectCoordinator">
                    <Translate contentKey="proTrackApp.project.projectCoordinator">Project Coordinator</Translate>
                  </Label>
                  <AvInput id="project-projectCoordinator" type="select" className="form-control" name="projectCoordinator.id">
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
                  <Label for="project-prpjectLead">
                    <Translate contentKey="proTrackApp.project.prpjectLead">Prpject Lead</Translate>
                  </Label>
                  <AvInput id="project-prpjectLead" type="select" className="form-control" name="prpjectLead.id">
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
                  <Label for="project-superviser">
                    <Translate contentKey="proTrackApp.project.superviser">Superviser</Translate>
                  </Label>
                  <AvInput id="project-superviser" type="select" className="form-control" name="superviser.id">
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
                  <Label for="project-prpjectManager">
                    <Translate contentKey="proTrackApp.project.prpjectManager">Prpject Manager</Translate>
                  </Label>
                  <AvInput id="project-prpjectManager" type="select" className="form-control" name="prpjectManager.id">
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
                  <Label for="project-prpjectEngineer">
                    <Translate contentKey="proTrackApp.project.prpjectEngineer">Prpject Engineer</Translate>
                  </Label>
                  <AvInput id="project-prpjectEngineer" type="select" className="form-control" name="prpjectEngineer.id">
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
                  <Label for="project-technician">
                    <Translate contentKey="proTrackApp.project.technician">Technician</Translate>
                  </Label>
                  <AvInput id="project-technician" type="select" className="form-control" name="technician.id">
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
                  <Label for="project-engineerOfRecord">
                    <Translate contentKey="proTrackApp.project.engineerOfRecord">Engineer Of Record</Translate>
                  </Label>
                  <AvInput id="project-engineerOfRecord" type="select" className="form-control" name="engineerOfRecord.id">
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
                  <Label for="project-trafficSpecialist">
                    <Translate contentKey="proTrackApp.project.trafficSpecialist">Traffic Specialist</Translate>
                  </Label>
                  <AvInput id="project-trafficSpecialist" type="select" className="form-control" name="trafficSpecialist.id">
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
                  <Label for="project-prpjectStaff">
                    <Translate contentKey="proTrackApp.project.prpjectStaff">Prpject Staff</Translate>
                  </Label>
                  <AvInput id="project-prpjectStaff" type="select" className="form-control" name="prpjectStaff.id">
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
                  <Label for="project-qualitySpecialist">
                    <Translate contentKey="proTrackApp.project.qualitySpecialist">Quality Specialist</Translate>
                  </Label>
                  <AvInput id="project-qualitySpecialist" type="select" className="form-control" name="qualitySpecialist.id">
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
                  <Label for="project-parentProject">
                    <Translate contentKey="proTrackApp.project.parentProject">Parent Project</Translate>
                  </Label>
                  <AvInput id="project-parentProject" type="select" className="form-control" name="parentProject.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/project" replace color="info">
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
  projectTypes: storeState.projectType.entities,
  users: storeState.userManagement.users,
  departments: storeState.department.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating,
  updateSuccess: storeState.project.updateSuccess
});

const mapDispatchToProps = {
  getProjectTypes,
  getUsers,
  getDepartments,
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
)(ProjectUpdate);

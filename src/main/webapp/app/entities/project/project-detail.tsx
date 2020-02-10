import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProjectDetail extends React.Component<IProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="proTrackApp.project.name">Name</Translate>
              </span>
            </dt>
            <dd>{projectEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="proTrackApp.project.description">Description</Translate>
              </span>
            </dt>
            <dd>{projectEntity.description}</dd>
            <dt>
              <span id="billingCompany">
                <Translate contentKey="proTrackApp.project.billingCompany">Billing Company</Translate>
              </span>
            </dt>
            <dd>{projectEntity.billingCompany}</dd>
            <dt>
              <span id="careerName">
                <Translate contentKey="proTrackApp.project.careerName">Career Name</Translate>
              </span>
            </dt>
            <dd>{projectEntity.careerName}</dd>
            <dt>
              <span id="siteNumber">
                <Translate contentKey="proTrackApp.project.siteNumber">Site Number</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteNumber}</dd>
            <dt>
              <span id="siteName">
                <Translate contentKey="proTrackApp.project.siteName">Site Name</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteName}</dd>
            <dt>
              <span id="siteCompany">
                <Translate contentKey="proTrackApp.project.siteCompany">Site Company</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteCompany}</dd>
            <dt>
              <span id="siteLatitude">
                <Translate contentKey="proTrackApp.project.siteLatitude">Site Latitude</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteLatitude}</dd>
            <dt>
              <span id="siteLongitude">
                <Translate contentKey="proTrackApp.project.siteLongitude">Site Longitude</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteLongitude}</dd>
            <dt>
              <span id="siteType">
                <Translate contentKey="proTrackApp.project.siteType">Site Type</Translate>
              </span>
            </dt>
            <dd>{projectEntity.siteType}</dd>
            <dt>
              <span id="isSite360">
                <Translate contentKey="proTrackApp.project.isSite360">Is Site 360</Translate>
              </span>
            </dt>
            <dd>{projectEntity.isSite360 ? 'true' : 'false'}</dd>
            <dt>
              <span id="internalDue">
                <Translate contentKey="proTrackApp.project.internalDue">Internal Due</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.internalDue} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="pONumber">
                <Translate contentKey="proTrackApp.project.pONumber">P O Number</Translate>
              </span>
            </dt>
            <dd>{projectEntity.pONumber}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.projectType">Project Type</Translate>
            </dt>
            <dd>{projectEntity.projectType ? projectEntity.projectType.name : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.programManager">Program Manager</Translate>
            </dt>
            <dd>{projectEntity.programManager ? projectEntity.programManager.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.projectCoordinator">Project Coordinator</Translate>
            </dt>
            <dd>{projectEntity.projectCoordinator ? projectEntity.projectCoordinator.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.prpjectLead">Prpject Lead</Translate>
            </dt>
            <dd>{projectEntity.prpjectLead ? projectEntity.prpjectLead.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.superviser">Superviser</Translate>
            </dt>
            <dd>{projectEntity.superviser ? projectEntity.superviser.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.prpjectManager">Prpject Manager</Translate>
            </dt>
            <dd>{projectEntity.prpjectManager ? projectEntity.prpjectManager.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.prpjectEngineer">Prpject Engineer</Translate>
            </dt>
            <dd>{projectEntity.prpjectEngineer ? projectEntity.prpjectEngineer.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.technician">Technician</Translate>
            </dt>
            <dd>{projectEntity.technician ? projectEntity.technician.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.engineerOfRecord">Engineer Of Record</Translate>
            </dt>
            <dd>{projectEntity.engineerOfRecord ? projectEntity.engineerOfRecord.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.trafficSpecialist">Traffic Specialist</Translate>
            </dt>
            <dd>{projectEntity.trafficSpecialist ? projectEntity.trafficSpecialist.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.prpjectStaff">Prpject Staff</Translate>
            </dt>
            <dd>{projectEntity.prpjectStaff ? projectEntity.prpjectStaff.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.qualitySpecialist">Quality Specialist</Translate>
            </dt>
            <dd>{projectEntity.qualitySpecialist ? projectEntity.qualitySpecialist.login : ''}</dd>
            <dt>
              <Translate contentKey="proTrackApp.project.parentProject">Parent Project</Translate>
            </dt>
            <dd>{projectEntity.parentProject ? projectEntity.parentProject.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/project/${projectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Project extends React.Component<IProjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { projectList, match } = this.props;
    return (
      <div>
        <h2 id="project-heading">
          <Translate contentKey="proTrackApp.project.home.title">Projects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.project.home.createLabel">Create a new Project</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {projectList && projectList.length > 0 ? (
            <Table responsive aria-describedby="project-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.billingCompany">Billing Company</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.careerName">Career Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteNumber">Site Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteName">Site Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteCompany">Site Company</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteLatitude">Site Latitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteLongitude">Site Longitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.siteType">Site Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.isSite360">Is Site 360</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.internalDue">Internal Due</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.pONumber">P O Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.projectType">Project Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.programManager">Program Manager</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.projectCoordinator">Project Coordinator</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.prpjectLead">Prpject Lead</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.superviser">Superviser</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.prpjectManager">Prpject Manager</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.prpjectEngineer">Prpject Engineer</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.technician">Technician</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.engineerOfRecord">Engineer Of Record</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.trafficSpecialist">Traffic Specialist</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.prpjectStaff">Prpject Staff</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.qualitySpecialist">Quality Specialist</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.project.parentProject">Parent Project</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${project.id}`} color="link" size="sm">
                        {project.id}
                      </Button>
                    </td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.billingCompany}</td>
                    <td>{project.careerName}</td>
                    <td>{project.siteNumber}</td>
                    <td>{project.siteName}</td>
                    <td>{project.siteCompany}</td>
                    <td>{project.siteLatitude}</td>
                    <td>{project.siteLongitude}</td>
                    <td>
                      <Translate contentKey={`proTrackApp.SiteType.${project.siteType}`} />
                    </td>
                    <td>{project.isSite360 ? 'true' : 'false'}</td>
                    <td>
                      <TextFormat type="date" value={project.internalDue} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{project.pONumber}</td>
                    <td>
                      {project.projectType ? <Link to={`project-type/${project.projectType.id}`}>{project.projectType.name}</Link> : ''}
                    </td>
                    <td>{project.programManager ? project.programManager.login : ''}</td>
                    <td>{project.projectCoordinator ? project.projectCoordinator.login : ''}</td>
                    <td>{project.prpjectLead ? project.prpjectLead.login : ''}</td>
                    <td>{project.superviser ? project.superviser.login : ''}</td>
                    <td>{project.prpjectManager ? project.prpjectManager.login : ''}</td>
                    <td>{project.prpjectEngineer ? project.prpjectEngineer.login : ''}</td>
                    <td>{project.technician ? project.technician.login : ''}</td>
                    <td>{project.engineerOfRecord ? project.engineerOfRecord.login : ''}</td>
                    <td>{project.trafficSpecialist ? project.trafficSpecialist.login : ''}</td>
                    <td>{project.prpjectStaff ? project.prpjectStaff.login : ''}</td>
                    <td>{project.qualitySpecialist ? project.qualitySpecialist.login : ''}</td>
                    <td>
                      {project.parentProject ? <Link to={`department/${project.parentProject.id}`}>{project.parentProject.name}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${project.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${project.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${project.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.project.home.notFound">No Projects found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ project }: IRootState) => ({
  projectList: project.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

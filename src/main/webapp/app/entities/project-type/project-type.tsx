import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './project-type.reducer';
import { IProjectType } from 'app/shared/model/project-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ProjectType extends React.Component<IProjectTypeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { projectTypeList, match } = this.props;
    return (
      <div>
        <h2 id="project-type-heading">
          <Translate contentKey="proTrackApp.projectType.home.title">Project Types</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.projectType.home.createLabel">Create a new Project Type</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {projectTypeList && projectTypeList.length > 0 ? (
            <Table responsive aria-describedby="project-type-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.projectType.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.projectType.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.projectType.department">Department</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {projectTypeList.map((projectType, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${projectType.id}`} color="link" size="sm">
                        {projectType.id}
                      </Button>
                    </td>
                    <td>{projectType.name}</td>
                    <td>{projectType.description}</td>
                    <td>
                      {projectType.department ? (
                        <Link to={`department/${projectType.department.id}`}>{projectType.department.name}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${projectType.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${projectType.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${projectType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.projectType.home.notFound">No Project Types found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ projectType }: IRootState) => ({
  projectTypeList: projectType.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectType);

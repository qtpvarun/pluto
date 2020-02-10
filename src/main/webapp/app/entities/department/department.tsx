import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './department.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Department extends React.Component<IDepartmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { departmentList, match } = this.props;
    return (
      <div>
        <h2 id="department-heading">
          <Translate contentKey="proTrackApp.department.home.title">Departments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.department.home.createLabel">Create a new Department</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {departmentList && departmentList.length > 0 ? (
            <Table responsive aria-describedby="department-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.department.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.department.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.department.activeFlag">Active Flag</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.department.team">Team</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.department.metrices">Metrices</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {departmentList.map((department, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${department.id}`} color="link" size="sm">
                        {department.id}
                      </Button>
                    </td>
                    <td>{department.name}</td>
                    <td>{department.description}</td>
                    <td>{department.activeFlag ? 'true' : 'false'}</td>
                    <td>
                      {department.teams
                        ? department.teams.map((val, j) => (
                            <span key={j}>
                              {val.login}
                              {j === department.teams.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {department.metrices
                        ? department.metrices.map((val, j) => (
                            <span key={j}>
                              <Link to={`metrices/${val.id}`}>{val.name}</Link>
                              {j === department.metrices.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${department.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${department.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${department.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.department.home.notFound">No Departments found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ department }: IRootState) => ({
  departmentList: department.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Department);

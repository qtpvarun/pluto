import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './metrices.reducer';
import { IMetrices } from 'app/shared/model/metrices.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMetricesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Metrices extends React.Component<IMetricesProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { metricesList, match } = this.props;
    return (
      <div>
        <h2 id="metrices-heading">
          <Translate contentKey="proTrackApp.metrices.home.title">Metrices</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="proTrackApp.metrices.home.createLabel">Create a new Metrices</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {metricesList && metricesList.length > 0 ? (
            <Table responsive aria-describedby="metrices-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.metrices.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.metrices.description">Description</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.metrices.sum">Sum</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.metrices.count">Count</Translate>
                  </th>
                  <th>
                    <Translate contentKey="proTrackApp.metrices.average">Average</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {metricesList.map((metrices, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${metrices.id}`} color="link" size="sm">
                        {metrices.id}
                      </Button>
                    </td>
                    <td>{metrices.name}</td>
                    <td>{metrices.description}</td>
                    <td>{metrices.sum}</td>
                    <td>{metrices.count}</td>
                    <td>{metrices.average}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${metrices.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${metrices.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${metrices.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="proTrackApp.metrices.home.notFound">No Metrices found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ metrices }: IRootState) => ({
  metricesList: metrices.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrices);

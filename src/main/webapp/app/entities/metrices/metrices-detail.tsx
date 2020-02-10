import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './metrices.reducer';
import { IMetrices } from 'app/shared/model/metrices.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMetricesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MetricesDetail extends React.Component<IMetricesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { metricesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.metrices.detail.title">Metrices</Translate> [<b>{metricesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="proTrackApp.metrices.name">Name</Translate>
              </span>
            </dt>
            <dd>{metricesEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="proTrackApp.metrices.description">Description</Translate>
              </span>
            </dt>
            <dd>{metricesEntity.description}</dd>
            <dt>
              <span id="sum">
                <Translate contentKey="proTrackApp.metrices.sum">Sum</Translate>
              </span>
            </dt>
            <dd>{metricesEntity.sum}</dd>
            <dt>
              <span id="count">
                <Translate contentKey="proTrackApp.metrices.count">Count</Translate>
              </span>
            </dt>
            <dd>{metricesEntity.count}</dd>
            <dt>
              <span id="average">
                <Translate contentKey="proTrackApp.metrices.average">Average</Translate>
              </span>
            </dt>
            <dd>{metricesEntity.average}</dd>
          </dl>
          <Button tag={Link} to="/entity/metrices" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/metrices/${metricesEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ metrices }: IRootState) => ({
  metricesEntity: metrices.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetricesDetail);

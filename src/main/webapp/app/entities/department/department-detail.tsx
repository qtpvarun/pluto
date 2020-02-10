import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './department.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DepartmentDetail extends React.Component<IDepartmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { departmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.department.detail.title">Department</Translate> [<b>{departmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="proTrackApp.department.name">Name</Translate>
              </span>
            </dt>
            <dd>{departmentEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="proTrackApp.department.description">Description</Translate>
              </span>
            </dt>
            <dd>{departmentEntity.description}</dd>
            <dt>
              <span id="activeFlag">
                <Translate contentKey="proTrackApp.department.activeFlag">Active Flag</Translate>
              </span>
            </dt>
            <dd>{departmentEntity.activeFlag ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="proTrackApp.department.team">Team</Translate>
            </dt>
            <dd>
              {departmentEntity.teams
                ? departmentEntity.teams.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.login}</a>
                      {i === departmentEntity.teams.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
            <dt>
              <Translate contentKey="proTrackApp.department.metrices">Metrices</Translate>
            </dt>
            <dd>
              {departmentEntity.metrices
                ? departmentEntity.metrices.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === departmentEntity.metrices.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/department" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/department/${departmentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ department }: IRootState) => ({
  departmentEntity: department.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './metrices.reducer';
import { IMetrices } from 'app/shared/model/metrices.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMetricesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMetricesUpdateState {
  isNew: boolean;
  departmentsId: string;
}

export class MetricesUpdate extends React.Component<IMetricesUpdateProps, IMetricesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      departmentsId: '0',
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

    this.props.getDepartments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { metricesEntity } = this.props;
      const entity = {
        ...metricesEntity,
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
    this.props.history.push('/entity/metrices');
  };

  render() {
    const { metricesEntity, departments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.metrices.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.metrices.home.createOrEditLabel">Create or edit a Metrices</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : metricesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="metrices-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="metrices-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="metrices-name">
                    <Translate contentKey="proTrackApp.metrices.name">Name</Translate>
                  </Label>
                  <AvField
                    id="metrices-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="metrices-description">
                    <Translate contentKey="proTrackApp.metrices.description">Description</Translate>
                  </Label>
                  <AvField id="metrices-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="sumLabel" for="metrices-sum">
                    <Translate contentKey="proTrackApp.metrices.sum">Sum</Translate>
                  </Label>
                  <AvField id="metrices-sum" type="string" className="form-control" name="sum" />
                </AvGroup>
                <AvGroup>
                  <Label id="countLabel" for="metrices-count">
                    <Translate contentKey="proTrackApp.metrices.count">Count</Translate>
                  </Label>
                  <AvField id="metrices-count" type="string" className="form-control" name="count" />
                </AvGroup>
                <AvGroup>
                  <Label id="averageLabel" for="metrices-average">
                    <Translate contentKey="proTrackApp.metrices.average">Average</Translate>
                  </Label>
                  <AvField id="metrices-average" type="string" className="form-control" name="average" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/metrices" replace color="info">
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
  departments: storeState.department.entities,
  metricesEntity: storeState.metrices.entity,
  loading: storeState.metrices.loading,
  updating: storeState.metrices.updating,
  updateSuccess: storeState.metrices.updateSuccess
});

const mapDispatchToProps = {
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
)(MetricesUpdate);

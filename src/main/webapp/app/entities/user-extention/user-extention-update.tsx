import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-extention.reducer';
import { IUserExtention } from 'app/shared/model/user-extention.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserExtentionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserExtentionUpdateState {
  isNew: boolean;
}

export class UserExtentionUpdate extends React.Component<IUserExtentionUpdateProps, IUserExtentionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userExtentionEntity } = this.props;
      const entity = {
        ...userExtentionEntity,
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
    this.props.history.push('/entity/user-extention');
  };

  render() {
    const { userExtentionEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="proTrackApp.userExtention.home.createOrEditLabel">
              <Translate contentKey="proTrackApp.userExtention.home.createOrEditLabel">Create or edit a UserExtention</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userExtentionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-extention-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-extention-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="loginLabel" for="user-extention-login">
                    <Translate contentKey="proTrackApp.userExtention.login">Login</Translate>
                  </Label>
                  <AvField
                    id="user-extention-login"
                    type="text"
                    name="login"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="profilePicLabel" for="user-extention-profilePic">
                    <Translate contentKey="proTrackApp.userExtention.profilePic">Profile Pic</Translate>
                  </Label>
                  <AvField id="user-extention-profilePic" type="text" name="profilePic" />
                </AvGroup>
                <AvGroup>
                  <Label id="groupLabel" for="user-extention-group">
                    <Translate contentKey="proTrackApp.userExtention.group">Group</Translate>
                  </Label>
                  <AvField id="user-extention-group" type="text" name="group" />
                </AvGroup>
                <AvGroup>
                  <Label id="jsonOtherDetailsLabel" for="user-extention-jsonOtherDetails">
                    <Translate contentKey="proTrackApp.userExtention.jsonOtherDetails">Json Other Details</Translate>
                  </Label>
                  <AvField id="user-extention-jsonOtherDetails" type="text" name="jsonOtherDetails" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-extention" replace color="info">
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
  userExtentionEntity: storeState.userExtention.entity,
  loading: storeState.userExtention.loading,
  updating: storeState.userExtention.updating,
  updateSuccess: storeState.userExtention.updateSuccess
});

const mapDispatchToProps = {
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
)(UserExtentionUpdate);

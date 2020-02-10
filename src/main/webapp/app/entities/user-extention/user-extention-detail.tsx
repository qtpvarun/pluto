import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-extention.reducer';
import { IUserExtention } from 'app/shared/model/user-extention.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserExtentionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserExtentionDetail extends React.Component<IUserExtentionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userExtentionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.userExtention.detail.title">UserExtention</Translate> [<b>{userExtentionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="login">
                <Translate contentKey="proTrackApp.userExtention.login">Login</Translate>
              </span>
            </dt>
            <dd>{userExtentionEntity.login}</dd>
            <dt>
              <span id="profilePic">
                <Translate contentKey="proTrackApp.userExtention.profilePic">Profile Pic</Translate>
              </span>
            </dt>
            <dd>{userExtentionEntity.profilePic}</dd>
            <dt>
              <span id="group">
                <Translate contentKey="proTrackApp.userExtention.group">Group</Translate>
              </span>
            </dt>
            <dd>{userExtentionEntity.group}</dd>
            <dt>
              <span id="jsonOtherDetails">
                <Translate contentKey="proTrackApp.userExtention.jsonOtherDetails">Json Other Details</Translate>
              </span>
            </dt>
            <dd>{userExtentionEntity.jsonOtherDetails}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-extention" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-extention/${userExtentionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userExtention }: IRootState) => ({
  userExtentionEntity: userExtention.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserExtentionDetail);

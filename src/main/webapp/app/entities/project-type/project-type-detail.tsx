import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project-type.reducer';
import { IProjectType } from 'app/shared/model/project-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProjectTypeDetail extends React.Component<IProjectTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="proTrackApp.projectType.detail.title">ProjectType</Translate> [<b>{projectTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="proTrackApp.projectType.name">Name</Translate>
              </span>
            </dt>
            <dd>{projectTypeEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="proTrackApp.projectType.description">Description</Translate>
              </span>
            </dt>
            <dd>{projectTypeEntity.description}</dd>
            <dt>
              <Translate contentKey="proTrackApp.projectType.department">Department</Translate>
            </dt>
            <dd>{projectTypeEntity.department ? projectTypeEntity.department.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/project-type/${projectTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ projectType }: IRootState) => ({
  projectTypeEntity: projectType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTypeDetail);

import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/user-extention">
      <Translate contentKey="global.menu.entities.userExtention" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/department">
      <Translate contentKey="global.menu.entities.department" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/project-type">
      <Translate contentKey="global.menu.entities.projectType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/project">
      <Translate contentKey="global.menu.entities.project" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/task">
      <Translate contentKey="global.menu.entities.task" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/sub-task">
      <Translate contentKey="global.menu.entities.subTask" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/task-history">
      <Translate contentKey="global.menu.entities.taskHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/calender">
      <Translate contentKey="global.menu.entities.calender" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/board">
      <Translate contentKey="global.menu.entities.board" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/metrices">
      <Translate contentKey="global.menu.entities.metrices" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

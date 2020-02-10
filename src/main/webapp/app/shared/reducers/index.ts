import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import userExtention, {
  UserExtentionState
} from 'app/entities/user-extention/user-extention.reducer';
// prettier-ignore
import department, {
  DepartmentState
} from 'app/entities/department/department.reducer';
// prettier-ignore
import projectType, {
  ProjectTypeState
} from 'app/entities/project-type/project-type.reducer';
// prettier-ignore
import project, {
  ProjectState
} from 'app/entities/project/project.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import subTask, {
  SubTaskState
} from 'app/entities/sub-task/sub-task.reducer';
// prettier-ignore
import taskHistory, {
  TaskHistoryState
} from 'app/entities/task-history/task-history.reducer';
// prettier-ignore
import calender, {
  CalenderState
} from 'app/entities/calender/calender.reducer';
// prettier-ignore
import board, {
  BoardState
} from 'app/entities/board/board.reducer';
// prettier-ignore
import metrices, {
  MetricesState
} from 'app/entities/metrices/metrices.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly userExtention: UserExtentionState;
  readonly department: DepartmentState;
  readonly projectType: ProjectTypeState;
  readonly project: ProjectState;
  readonly task: TaskState;
  readonly subTask: SubTaskState;
  readonly taskHistory: TaskHistoryState;
  readonly calender: CalenderState;
  readonly board: BoardState;
  readonly metrices: MetricesState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  userExtention,
  department,
  projectType,
  project,
  task,
  subTask,
  taskHistory,
  calender,
  board,
  metrices,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;

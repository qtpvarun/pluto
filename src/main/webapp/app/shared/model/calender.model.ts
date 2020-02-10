import { Moment } from 'moment';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { ITask } from 'app/shared/model/task.model';
import { IProject } from 'app/shared/model/project.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICalender {
  id?: number;
  title?: string;
  startDate?: Moment;
  endDate?: Moment;
  jsonUIDetails?: string;
  taskHistory?: ITaskHistory;
  task?: ITask;
  project?: IProject;
  department?: IDepartment;
  assignedTo?: IUser;
}

export const defaultValue: Readonly<ICalender> = {};

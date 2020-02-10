import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ITask } from 'app/shared/model/task.model';
import { SubTaskStatus } from 'app/shared/model/enumerations/sub-task-status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface ISubTask {
  id?: number;
  name?: string;
  description?: string;
  status?: SubTaskStatus;
  assignedDate?: Moment;
  estimatedCompletionDate?: Moment;
  closedDate?: Moment;
  priority?: Priority;
  isOverdue?: boolean;
  inProgress?: boolean;
  assignedTo?: IUser;
  assignedBy?: IUser;
  sourceUser?: IUser;
  targetUser?: IUser;
  parentTask?: ITask;
}

export const defaultValue: Readonly<ISubTask> = {
  isOverdue: false,
  inProgress: false
};

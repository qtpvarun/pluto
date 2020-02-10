import { Moment } from 'moment';
import { ICalender } from 'app/shared/model/calender.model';
import { ITask } from 'app/shared/model/task.model';
import { EventType } from 'app/shared/model/enumerations/event-type.model';

export interface ITaskHistory {
  id?: number;
  eventDate?: Moment;
  eventType?: EventType;
  eventTopic?: string;
  eventDetail?: string;
  isRedline?: boolean;
  isIdleTask?: boolean;
  jsonUIDetails?: string;
  calender?: ICalender;
  parentTask?: ITask;
}

export const defaultValue: Readonly<ITaskHistory> = {
  isRedline: false,
  isIdleTask: false
};

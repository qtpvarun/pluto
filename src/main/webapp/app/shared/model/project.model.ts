import { Moment } from 'moment';
import { ITask } from 'app/shared/model/task.model';
import { IProjectType } from 'app/shared/model/project-type.model';
import { IUser } from 'app/shared/model/user.model';
import { IDepartment } from 'app/shared/model/department.model';
import { ICalender } from 'app/shared/model/calender.model';
import { SiteType } from 'app/shared/model/enumerations/site-type.model';

export interface IProject {
  id?: number;
  name?: string;
  description?: string;
  billingCompany?: string;
  careerName?: string;
  siteNumber?: number;
  siteName?: string;
  siteCompany?: string;
  siteLatitude?: number;
  siteLongitude?: number;
  siteType?: SiteType;
  isSite360?: boolean;
  internalDue?: Moment;
  pONumber?: string;
  tasks?: ITask[];
  projectType?: IProjectType;
  programManager?: IUser;
  projectCoordinator?: IUser;
  prpjectLead?: IUser;
  superviser?: IUser;
  prpjectManager?: IUser;
  prpjectEngineer?: IUser;
  technician?: IUser;
  engineerOfRecord?: IUser;
  trafficSpecialist?: IUser;
  prpjectStaff?: IUser;
  qualitySpecialist?: IUser;
  parentProject?: IDepartment;
  calenders?: ICalender[];
}

export const defaultValue: Readonly<IProject> = {
  isSite360: false
};

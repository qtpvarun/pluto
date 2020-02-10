import { IProjectType } from 'app/shared/model/project-type.model';
import { IProject } from 'app/shared/model/project.model';
import { IUser } from 'app/shared/model/user.model';
import { IMetrices } from 'app/shared/model/metrices.model';
import { ICalender } from 'app/shared/model/calender.model';

export interface IDepartment {
  id?: number;
  name?: string;
  description?: string;
  activeFlag?: boolean;
  projectTypes?: IProjectType[];
  projects?: IProject[];
  teams?: IUser[];
  metrices?: IMetrices[];
  calenders?: ICalender[];
}

export const defaultValue: Readonly<IDepartment> = {
  activeFlag: false
};

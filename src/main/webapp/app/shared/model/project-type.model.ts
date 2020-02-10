import { IDepartment } from 'app/shared/model/department.model';
import { IProject } from 'app/shared/model/project.model';

export interface IProjectType {
  id?: number;
  name?: string;
  description?: string;
  department?: IDepartment;
  projects?: IProject[];
}

export const defaultValue: Readonly<IProjectType> = {};

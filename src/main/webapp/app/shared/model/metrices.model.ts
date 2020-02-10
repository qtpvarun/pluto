import { IDepartment } from 'app/shared/model/department.model';

export interface IMetrices {
  id?: number;
  name?: string;
  description?: string;
  sum?: number;
  count?: number;
  average?: number;
  departments?: IDepartment[];
}

export const defaultValue: Readonly<IMetrices> = {};

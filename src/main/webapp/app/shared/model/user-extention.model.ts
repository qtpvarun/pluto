export interface IUserExtention {
  id?: number;
  login?: string;
  profilePic?: string;
  group?: string;
  jsonOtherDetails?: string;
}

export const defaultValue: Readonly<IUserExtention> = {};

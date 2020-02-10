export interface IBoard {
  id?: number;
  name?: string;
  boardFilter?: string;
}

export const defaultValue: Readonly<IBoard> = {};

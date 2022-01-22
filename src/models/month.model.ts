export interface Month {
  id: string;
  number: number;
  year: number;
}

export type CreateMonth = {input: Omit<Month, 'id'>};

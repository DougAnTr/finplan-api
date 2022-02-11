type Database = {
  host: string;
  port: string;
  name: string;
}

type Application = {
  url: string;
  port: number;
}

export interface Constants {
  application: Application;
  database: Database;
}
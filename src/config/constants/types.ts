type Database = {
  mongo_url: string;
}

type Application = {
  url: string;
  port: number;
}

export interface Constants {
  application: Application;
  database: Database;
}
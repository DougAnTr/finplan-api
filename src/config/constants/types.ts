type Database = {
  mongo_url: string;
}

type Application = {
  url: string;
  port: number;
}

type Jwt = {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

export interface Constants {
  application: Application;
  database: Database;
  jwt: Jwt;
}

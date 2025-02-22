import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const OrmConfig: TypeOrmModuleOptions = {
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "",
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
        timezone: "Z",
        dateStrings: true
    },
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    subscribers: [],
    migrations: []
};

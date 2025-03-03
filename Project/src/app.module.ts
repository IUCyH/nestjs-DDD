import { join } from "path";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { WinstonModule } from "nest-winston";
import { LogConfig } from "./configs/log.config";
import { ResponseExceptionLoggingFilter } from "./common/exceptionFilter/response-exception-logging.filter";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { GlobalSharedModule } from "./shared/global-shared.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: "mariadb",
                host: "localhost",
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: "ddd_demo",
                synchronize: false,
                logging: true,
                namingStrategy: new SnakeNamingStrategy(),
                extra: {
                    timezone: "Z",
                    dateStrings: true
                },
                entities: [join(__dirname, "/**/*.entity.{js,ts}")],
                subscribers: [],
                migrations: []
            })
        }),
        WinstonModule.forRoot(LogConfig),
        GlobalSharedModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: ResponseExceptionLoggingFilter
        }
    ]
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmConfig } from "./configs/orm.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(OrmConfig),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

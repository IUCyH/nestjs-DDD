import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmConfig } from "./configs/orm.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        TypeOrmModule.forRoot(OrmConfig)
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

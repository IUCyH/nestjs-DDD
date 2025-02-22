import { Module } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "./infrastructure/user.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository
        }
    ],
    exports: []
})
export class UserModule {}
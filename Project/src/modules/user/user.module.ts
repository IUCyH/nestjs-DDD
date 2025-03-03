import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/user.service";
import { USER_REPOSITORY, UserRepository } from "./infrastructure/user.repository";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository
        }
    ],
    exports: []
})
export class UserModule {}
import { Injectable, Inject } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { USER_REPOSITORY } from "../infrastructure/user.repository";
import { IUserRepository } from "../domain/user.repository.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserDto } from "../dto/user.dto";
import { User } from "../domain/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async getUser(id: number) {
        const result = await this.userRepository.findOne(id);
        if(!result) {
            return null;
        }

        const user = new UserDto(result);
        return user;
    }

    async createUser(user: CreateUserDto) {
        const newUser = User.createFrom(user);
        await this.userRepository.save(newUser);
    }

    async deleteUser(id: number) {
        await this.dataSource.transaction(async manager => {
            await this.userRepository.delete(id, manager);
        });
    }
}
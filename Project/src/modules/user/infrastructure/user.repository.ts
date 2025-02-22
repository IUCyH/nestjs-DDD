import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityManager } from "typeorm";
import { IUserRepository } from "../domain/user.repository.interface";
import { User } from "../domain/user.entity";

export const USER_REPOSITORY = "UserRepository";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async findOne(id: number): Promise<User | null> {
        const user = await this.dataSource.manager.findOne(User, {
            where: { id: id }
        });
        return user;
    }

    async save(user: User): Promise<void> {
        await this.dataSource.manager.insert(User, user);
    }

    async delete(id: number, manager: EntityManager): Promise<void> {
        const runner = manager ? manager : this.dataSource.manager;
        await runner.delete(User, { id: id });
    }
}
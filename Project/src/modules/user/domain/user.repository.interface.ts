import { User } from "./user.entity";
import { EntityManager } from "typeorm";

export interface IUserRepository {
    findOne(id: number): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(id: number, manager?: EntityManager): Promise<void>;
}
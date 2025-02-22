import { User } from "./user.entity";

export interface IUserRepository {
    findOne(id: number): Promise<User>;
    save(user: User): Promise<void>;
    deleteWithCascade(id: number): Promise<void>;
}
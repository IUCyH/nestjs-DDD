import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column("varchar", { length: 10 })
    name: string = "";

    @Column("varchar", { length: 24 })
    email: string = "";

    @Column("varchar", { length: 8 })
    password: string = "";

    private constructor() {}

    static createFrom(dto: CreateUserDto) {
        const user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;

        return user;
    }
}
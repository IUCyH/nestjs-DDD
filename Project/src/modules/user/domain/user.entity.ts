import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

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
}
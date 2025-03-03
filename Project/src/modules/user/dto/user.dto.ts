import { User } from "../domain/user.entity";

export class UserDto {
    id: number = 0;
    name: string = "";
    email: string = "";

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
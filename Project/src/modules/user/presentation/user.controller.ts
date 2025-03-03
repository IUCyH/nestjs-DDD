import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Delete
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../application/user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":id")
    async getUser(@Param("id") id: number) {
        const user = await this.userService.getUser(id);
        return user;
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        await this.userService.createUser(body);

    }
}
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../../../../libs/data/src/lib/user.interface'
import { AdminGuard } from '../auth/admin.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUserById(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    async addUser(@Body() user: User) : Promise<User> {
        return this.userService.addUser(user.name, user.emailAddress, user.password, user.birthDate, user.phoneNumber, user.roles);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteUser(@Param('id') id: string): Promise<boolean> {
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateUser(@Param('id') id: string, @Body() user: User) : Promise<User> {
        return this.userService.updateUser(id, user.name, user.emailAddress, user.password, user.birthDate, user.phoneNumber, user.roles);
    }

}
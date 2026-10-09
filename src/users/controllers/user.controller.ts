import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { MongoIdParamDto } from '../../dto/mongo-id-param.dto.js';
import { UsersService } from '../services/user.services.js';
import { CreateUserDto } from '../dto/create-user-dto.js';
import { UpdateUserDto } from '../dto/update-user-dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  async updateUser(
    @Param() params: MongoIdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(params.id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param() params: MongoIdParamDto) {
    return this.usersService.deleteUser(params.id);
  }

  @Get(':id')
  async singleUser(@Param() params: MongoIdParamDto) {
    return this.usersService.singleUser(params.id);
  }
}

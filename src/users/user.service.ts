// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from 'src/utility/common/interface/IUser';
import { userDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: userDto) {
    const user = this.userRepository.create(createUserDto as UserEntity);
    return await this.userRepository.save(user)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

 async findOneUser(condition = {}): Promise<UserEntity | undefined> {
 const result = await this.userRepository.findOne(condition);
 console.log(result, "result>>>>>>>");

 return result
 }

async update(condition = {}, user: UserEntity): Promise<UserEntity | undefined> {
  await this.userRepository.update(condition, user);
  return await this.userRepository.findOne(condition);
}

async remove(id: string): Promise<void> {
   await this.userRepository.delete(id);
}
  // Implement your user service methods here
}

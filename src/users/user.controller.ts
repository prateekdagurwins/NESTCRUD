// src/users/user.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus, Inject, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { IUser } from 'src/utility/common/interface/IUser'
import { UserEntity } from './user.entity';
import { comparePassword, setPassword } from 'src/utility/common/commonfunc';
import { userDto, userLoginDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService, private readonly authService: AuthService) {}
    // @Post('login')
    // @UseGuards(JwtAuthGuard)
    // async login(@Body(new ValidationPipe()) createUserDto: userLoginDto): Promise<{ token: string }> {
    // let filterByUserName = {username: createUserDto.username}
    //   const foundUser = await this.usersService.findOne(filterByUserName);
    //   console.log(createUserDto.password, foundUser.password, "user>>>>>>>>>>>>>>.");
      
    //   if (foundUser && (await comparePassword(createUserDto, foundUser.password))) {
    //     const token = this.authService.generateJwtToken(foundUser);
    //     return { token };
    //   }
    //   throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    // }


  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
 async createUser(@Body(new ValidationPipe()) createUserDto: userDto): Promise<UserEntity> {
  console.log(createUserDto, "user>>>>>>>>>>>");

      let condition = {username: createUserDto.username}
   // Check if the username is already taken
   const existingUser = await this.usersService.findOneUser(condition);
  const hashPass = await setPassword(createUserDto.password)
  createUserDto.password = hashPass
   if (existingUser) {
     throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
   }
   // Create a new user
   return await this.usersService.create(createUserDto);
  }

  @Get('allusers')
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<IUser> {
    const condition = {id:id}
    return this.usersService.findOneUser(condition);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() user: IUser): Promise<UserEntity> {
    let condition = {id: id}
    return this.usersService.update(condition, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}

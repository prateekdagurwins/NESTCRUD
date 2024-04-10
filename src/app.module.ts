import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/items.entity';
import { itemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { UsersModule } from './users/users.module';
import { UserService } from './users/user.service';
import { AuthService } from './auth/auth.service';
import { UserEntity } from './users/user.entity';
import { ItemsModule } from './items/items.module';
import { UserController } from './users/user.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGO_CONNECTION_STRING,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [Item, UserEntity],
  }), TypeOrmModule.forFeature([Item, UserEntity]), UsersModule, ItemsModule],
  controllers: [itemsController, UserController, AuthController],
  providers: [ItemsService, UserService, AuthService, JwtService],
})

export class AppModule {}




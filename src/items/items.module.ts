import { Module } from '@nestjs/common';
import { itemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [itemsController],
  providers: [ItemsService]
})
export class ItemsModule {}

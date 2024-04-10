// src/users/user.entity.ts
import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/utility/common/interface/IUser';
@Entity()
export class UserEntity implements IUser {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({type:'varchar'})
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

}

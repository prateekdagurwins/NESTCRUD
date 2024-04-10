// // src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
// import { UserEntity} from '../users/user.entity';

// @Injectable()
// export class AuthService {
//   private readonly jwtSecret: string = 'your-secret-key'; // Replace with a secure secret

//   generateJwtToken(user: UserEntity): string {
//     const payload = { sub: user.id, username: user.username };
//     return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
//   }

//   verifyJwtToken(token: string): { sub: string; username: string } | null {
//     try {
//       return jwt.verify(token, this.jwtSecret) as { sub: string; username: string };
//     } catch (error) {
//       return null;
//     }
//   }
// }


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity'; // Replace this with your user entity
import { comparePassword } from 'src/utility/common/commonfunc';


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}
    async validateUser(username: string, password: string): Promise<UserEntity | null> {
      const user = await this.userService.findOneUser({username: username});
      console.log(user, "aaaaaaaaaaaa");

      if(user){
        const passwordMatch =  await comparePassword(password, user.password);
        console.log(passwordMatch, "matcghhhhhhh");
        
        if (!passwordMatch) {
            throw new HttpException('Bad creds', HttpStatus.BAD_REQUEST);
          }
       return user
      }
      return null;
  }


    async generateToken(user: UserEntity) {
          const payload = { sub: user.id, username: user.username };
          // return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
        // const payload = { username: user.username, sub: user.id };
        return this.jwtService.sign(payload, {secret: "secretkey",  expiresIn: "1d" });
    }

    async validateToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token, {secret: "secretkey"});
            // You can add additional validation or fetch user details based on the decoded token here
            console.log(decoded, "decoded>>>>>>>>>>>>>>>>>>>.");

            return decoded;
        } catch (error) {
            return null; // Token validation failed
        }
    }
   
}
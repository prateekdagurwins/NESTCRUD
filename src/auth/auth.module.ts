// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [UsersModule, PassportModule.register({ session: true })],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}



import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_secret_key_here',
            signOptions: { expiresIn: '1h' }, // Set expiration time as needed
        }),
    ],
    providers: [AuthService],
    exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}


// // auth.controller.ts

// import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: { username: string; password: string }) {
        const user = await this.authService.validateUser(credentials.username, credentials.password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        const token = await this.authService.generateToken(user);
        return { access_token: token };
    }
}

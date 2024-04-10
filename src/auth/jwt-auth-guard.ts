import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        console.log(request.headers, "request");

        const token = request.headers.authorization?.split(' ')[0]; // Assuming token is in the format "Bearer token"
        console.log(token, "request");

        if (!token) {
            return false;
        }
        const isValid = this.authService.validateToken(token);
        return isValid;
    }
}

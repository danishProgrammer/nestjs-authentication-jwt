import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { JwtConstants } from "./constant";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verifyAsync(token,{secret:JwtConstants.secret});
            request['user'] = payload;
            
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true
    }

    private extractTokenFromRequest(request:any): string | undefined {
       const [type,token]  = request.headers.authorization?.split(" ") ?? [];
       return type == 'Bearer' ? token : undefined;
    }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService,private jwtService:JwtService){}

    async signIn(userName:string,pass:string):Promise<any>{
        console.log("entering in auth");
        const user = await this.userService.findUser(userName);
        if(user?.password !== pass){
            throw new UnauthorizedException();
        }
        const payload = {sub:user.id,userName:user.userName};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
        // Ideally password should not be sent as it is, it should be sent as encrypted format.(Use bCrypt library to convert password)
    }
}

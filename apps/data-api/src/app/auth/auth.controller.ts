import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Token, UserCredentials, UserRegistration } from '../../../../../libs/data/src/lib/auth.interface';
import { ResourceId } from '../../../../../libs/data/src/lib/id.type';

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() credentials: UserRegistration): Promise<ResourceId> {       
        try {                      
            await this.authService.registerUser(credentials.emailAddress, credentials.password);
            
            return {
                id: await this.authService.createUser(credentials.name, credentials.emailAddress, credentials.password, credentials.birthDate, credentials.phoneNumber),
            };
        } catch (e) {     
            console.log(e);
            throw new HttpException('Username invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Post("login")
    async login(@Body() credentials: UserCredentials) {
        try {            
            return {
                token: await this.authService.generateToken(credentials.emailAddress, credentials.password),
                id: await this.authService.getUserIdByEmailAddress(credentials.emailAddress),
            };
        } catch (e) {                    
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
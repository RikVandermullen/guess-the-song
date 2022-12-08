import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
    roles: string[] = [];

    constructor(roles: string[]) {
        this.roles = roles;
    }

    canActivate(context: ExecutionContext): boolean {
        const host = context.switchToHttp(),
        request = host.getRequest();

        if (request.headers.authorization) {
            const token = verify(request.headers.authorization.split(' ')[1], "Secret");
            const roles = JSON.parse(JSON.stringify(token)).user.roles;           

            let userHasRole = false;
            if (this.roles.length > 0) {
                roles.forEach((role: string) => {
                    if (this.roles.includes(role)) {
                        userHasRole = true;
                    }
                });
            }
            return userHasRole;
        }
        throw new HttpException("User is not authorized", 401);
    }
}
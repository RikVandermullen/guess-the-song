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
            const id = JSON.parse(JSON.stringify(token)).user._id;

            const madeBy = JSON.parse(JSON.stringify(request.body)).madeBy;
            
            if (madeBy !== undefined && madeBy !== id) {
                throw new HttpException("User is not authorized", 401);
            }

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
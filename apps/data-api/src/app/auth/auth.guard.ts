// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

// @Injectable()
// export class LoggedInAuthGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean {
//         const host = context.switchToHttp(), request = host.getRequest();
//         const token = request.header('authorization');
//         console.log(token);
        
//         if (token === "Bearer undefined") {
//             console.log("User not authenticated");
//             throw new UnauthorizedException();
//         }

//         console.log("User is authenticated");
//         return true;
//     }
// }
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class AdminGuard extends AuthGuard {

    constructor() {
        super(['ADMIN']);
    }

}
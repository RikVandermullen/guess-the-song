import { Injectable } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class PlayerGuard extends AuthGuard {

    constructor() {
        super(['PLAYER', 'ADMIN']);
    }

}
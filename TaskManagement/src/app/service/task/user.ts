import { Role } from "./role";
import { Status } from './Status';

export class User {
    id! : number;
    username! : string;
    email! : string;
    password!:string;
    role!:Role;
    isdone!:Status;
}


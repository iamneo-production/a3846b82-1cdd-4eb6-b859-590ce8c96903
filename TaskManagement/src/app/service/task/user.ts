import { Role } from "./role";
import { Status } from './Status';

export class User {
    id! : number;
    name! : string;
    email! : string;
    password!:string;
    role!:Role;
}


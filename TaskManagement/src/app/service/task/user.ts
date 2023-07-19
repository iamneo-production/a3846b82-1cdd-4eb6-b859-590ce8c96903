import { Role } from "./role";

export class User {
    id! : number;
    userName! : string;
    email! : string;
    password!:string;
    role!:Role;
    isdone!:boolean;
}


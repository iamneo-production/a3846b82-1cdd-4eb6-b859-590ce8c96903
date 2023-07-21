import { Task } from "./task";

export class User {
    id! : number;
    userName! : string;
    email! : string;
    password!:string;
    tasks?: Task[];
}


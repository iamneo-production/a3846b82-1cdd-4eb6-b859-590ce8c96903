import { addMinutes } from "date-fns";
import { User } from "./user";
import { Role } from "./role";

export var USER:User[]=[
   {
    'id':1,
    'email':'user1@gmail.com',
    'password':'123456',
    'userName':'user1',
    'role':Role.USER,
    'isdone':true
   }
]      
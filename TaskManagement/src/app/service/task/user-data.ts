import { addMinutes } from "date-fns";
import { User } from "./user";
import { Role } from "./role";
import { Status } from "./Status";
export var USER:User[]=[
   {
    'id':1,
    'email':'user1@gmail.com',
    'password':'123456',
    'username':'user1',
    'role':Role.USER,
    'isdone':Status.True
   }
]      
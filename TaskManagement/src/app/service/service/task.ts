import { TaskStatus } from "./TaskStatus";
import { User } from "./User";
import { Priority } from "./Priority";

export class Task {

    id !: number | null;
    name !: string | null;
    description !: string | null;
    dueDate !: Date | null;
    status !: TaskStatus | null;
    user !: string | null;
    createdDate !: Date | null;
    priority !:Priority|null;
    teamMembers?: User[] |null;  
}

import {IUser} from './user';
import {ITask} from './task';

export interface IActivity {
    user: IUser;
    task: ITask;
    previous?: ITask;
}
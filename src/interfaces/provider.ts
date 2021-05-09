import {IUser} from './user';
import {ITask} from './task';
import {IActivity} from './activity';

export interface IMainProvider {
    user?: IUser,
    setValue?: (value: object) => void;
    auth?: boolean;
    tasks?: ITask[];
    activities?: IActivity[];
    states?: {
        [x: string]: string[]
    };
}
export type IStatus = 'ToDo' | 'InProgress' | 'Blocked' | 'InQA' | 'Done' | 'Deployed';

export interface ITask {
    id?: string;
    title?: string | undefined;
    description?: string | undefined;
    status: IStatus;
}
import React from 'react';
import Icons from './ui/icons';
import {ITask} from '../interfaces/task';
import {Link} from 'react-router-dom';

export default function TaskList(props: React.PropsWithChildren<{ tasks: ITask[] }>) {
    const {tasks} = props;

    return (
        <div className={'sm:grid sm:grid-cols-2 gap-2 md:grid md:grid-cols-2 2xl:grid-cols-3 pb-10 overflow-y-auto tasks-list px-10 py-8 absolute top-4 bottom-0 left-2 right-2'}>
            {
                tasks.map(task =>
                    <div className={'bg-white rounded p-5 shadow-custom border border-gray-300 mb-2 sm:mb-0 min-w-250 h-48'} key={task.id}>
                        <div className={'text-lg font-bold'}>{task.title}</div>
                        <div className={'h-20 text-sm'}>{task.description && task.description.length > 90 ? task.description.substring(0, 90) + '...' : task.description}</div>
                        <div className={'flex justify-between'}>
                            <div className={'bg-blue-dark py-1 px-4 rounded text-white min-w-120 text-center'}>{task.status}</div>
                            <div>
                                <Link to={'/edit/' + task.id}>
                                    <Icons.EditIcon/>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
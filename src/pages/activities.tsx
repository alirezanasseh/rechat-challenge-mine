import React, {useContext} from 'react';
import Layout from '../layouts/layout';
import {MainContext} from '../providers/mainProvider';
import {useHistory} from 'react-router-dom';

export default function Activities(props: React.PropsWithChildren<any>) {
    const {activities} = useContext(MainContext);
    const history = useHistory();

    if(activities?.length === 0){
        history.push('/');
    }

    return (
        <Layout title={'Activities'}>
            <div className={'flex justify-center'}>
                <div className={'px-10 w-full'}>
                    {activities && activities.map(act =>
                        <div className={'border border-gray-border rounded px-3 py-2 mb-2'}>
                            <div><strong>{act.user.name}</strong> made changes in task <strong>{act.task.title}</strong></div>
                            <div className={'grid grid-cols-2 gap-2'}>
                                <div className={'border border-gray-light rounded px-3 py-2'}>
                                    <h2>From</h2>
                                    <p>Title: {act.previous?.title}</p>
                                    <p>Description: {act.previous?.description}</p>
                                    <p>State: {act.previous?.status}</p>
                                </div>
                                <div className={'border border-gray-light rounded px-3 py-2'}>
                                    <h2>To</h2>
                                    <p>Title: {act.task?.title}</p>
                                    <p>Description: {act.task?.description}</p>
                                    <p>State: {act.task?.status}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
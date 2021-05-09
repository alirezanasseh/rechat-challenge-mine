import React from 'react';
import {ILayoutProps} from '../interfaces/general';
import {Link} from 'react-router-dom';

export default function Layout(props: React.PropsWithChildren<ILayoutProps>) {
    return (
        <div className={'h-screen'}>
            <header className={'bg-blue-dark text-white text-2xl pl-10 py-3'}>
                <Link to={'/'}>Task Management</Link>
                {props.title ? ' > ' + props.title : ''}
            </header>
            <main className={'pt-7 absolute top-14 bottom-0 left-0 right-0 min-h-680 overflow-y-auto'}>
                {props.children}
            </main>
        </div>
    );
}
import React from 'react';
import {IUIElement} from '../../interfaces/general';

export const Alert = (props: React.PropsWithChildren<IUIElement>) => {
    const {...rest} = props;
    let className = `rounded border py-2 px-3 mb-2 ${props.additional_classes ?? ''}`;

    switch (props.variant){
        case 'error':
            className += 'bg-red-100 text-red-800 border-red-200';
            break;
    }

    return (
        <div
            className={className}
            {...rest}
        >
            {props.children}
        </div>
    );
};
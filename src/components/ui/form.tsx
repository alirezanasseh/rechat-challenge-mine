import React, {ForwardedRef, useState} from "react";
import {IFormElements, IUIElement} from "../../interfaces/general";

const Group = (props: React.PropsWithChildren<IFormElements>) => {
    return (
        <div className={`mb-2 ${props.additional_classes ?? ''}`}>{props.children}</div>
    );
}

const Input = React.forwardRef((props: React.PropsWithChildren<IFormElements>, ref: ForwardedRef<HTMLInputElement>) => {
    const {...rest} = props;

    return (
        <input
            type={props.type}
            ref={ref}
            className={`bg-gray-light rounded-tl rounded-tr border-b border-gray-border placeholder-gray-500 outline-none focus:border-blue-border px-5 py-3 w-full ${props.additional_classes ?? ''}`}
            {...rest}
        />
    );
});

const Textarea = React.forwardRef((props: React.PropsWithChildren<IFormElements>, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const {...rest} = props;

    return (
        <textarea
            ref={ref}
            rows={props.rows ?? 3}
            className={`bg-gray-light rounded-tl rounded-tr border-b border-gray-border placeholder-gray-500 outline-none focus:border-blue-border px-5 py-3 w-full ${props.additional_classes ?? ''}`}
            {...rest}
        >{props.value}</textarea>
    );
});

const Select = React.forwardRef((props: React.PropsWithChildren<IFormElements>, ref: ForwardedRef<HTMLSelectElement>) => {
    const [show, setShow] = useState(false);

    const select = (value: string) => {
        setShow(false);
        props.onChange({[props.name]: value});
    };

    return (
        <div className={'relative'}>
            <button
                onClick={() => setShow(true)}
                className={'bg-gray-light py-3 px-5 rounded-tl rounded-tr border-b border-gray-border w-full appearance-none focus:outline-none focus:border-blue-border flex justify-start drop-down'}
            >
                {props.value}
            </button>
            {show &&
                <>
                    <div className={'fixed top-0 bottom-0 left-0 right-0 bg-opacity-0'} onClick={() => setShow(false)}>{' '}</div>
                    <ul className={'bg-white border border-gray-light rounded-md shadow-custom absolute top-0 left-0 right-0'}>
                        {props.items && props.items.map((item: {text: string, value: string}) =>
                            <li
                                key={item.value}
                                onClick={() => select(item.value)}
                                className={'px-5 py-2 hover:bg-gray-light'}
                            >
                                {item.text}
                            </li>
                        )}
                    </ul>
                </>
            }
        </div>
    );
});

export const Button = (props: React.PropsWithChildren<IUIElement>) => {
    const {...rest} = props;
    let className = `rounded py-3 px-5 focus:outline-none focus:border-gray-600 focus:ring-2 flex justify-center content-center ${props.additional_classes ?? ''} `;
    if(props.block){
        className += 'w-full '
    }

    switch (props.variant){
        case 'primary':
            className += 'bg-blue-dark text-white focus:border-blue-300 focus:ring-1'
            break;
        case 'default':
            className += 'bg-white text-gray-500 border-2 border-gray-borderLight focus:border-blue-300 focus:ring-1'
            break;
    }
    return (
        <button
            className={className}
            {...rest}
        >
            {props.children}
        </button>
    );
}

const Form = {Group, Input, Textarea, Select};

export default Form;
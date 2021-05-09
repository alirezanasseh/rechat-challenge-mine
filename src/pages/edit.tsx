import React, {createRef, useContext, useEffect, useState} from 'react';
import Layout from '../layouts/layout';
import Form, {Button} from '../components/ui/form';
import {ITask} from '../interfaces/task';
import Icons from '../components/ui/icons';
import {MainContext} from '../providers/mainProvider';
import {useHistory} from 'react-router-dom';
import {Alert} from '../components/ui/alert';

export default function Edit(props: React.PropsWithChildren<any>) {
    const [task, setTask] = useState<ITask>({
        title: '',
        description: '',
        status: 'ToDo'
    });
    const [allowedStates, setAllowedStates] = useState<object[]>([]);
    const [error, setError] = useState('');
    const {tasks, activities, user, states, setValue} = useContext(MainContext);
    const history = useHistory();
    const titleRef = createRef<HTMLInputElement>();
    const descRef = createRef<HTMLTextAreaElement>();
    const ID = props.match.params.id;

    // Field changes
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTask({...task, [e.currentTarget.name]: e.currentTarget.value});
    };

    // Select field changes
    const handleSelectChange = (value: object) => {
        setTask({...task, ...value});
    };

    // Getting task by id
    useEffect(() => {
        const result = tasks?.find(item => item.id === ID);
        if(result){
            // If task found set state
            setTask(result);

            // Setting allowed states for edit
            const curState = result.status.toString();
            let items = [{text: curState, value: curState}];
            if(states) {
                for (let i = 0; i < states[curState].length; i++) {
                    items.push({text: states[curState][i], value: states[curState][i]})
                }
            }
            setAllowedStates(items);
        }else{
            // If task not found go back to home
            history.push('/');
        }
    }, [ID]);

    const handleEdit = () => {
        // Hiding error
        setError('');

        // Validating input
        if(!task?.title){
            setError('Please enter title');
            titleRef.current?.focus();
            return;
        }
        if(!task?.description){
            setError('Please enter description');
            descRef.current?.focus();
            return;
        }

        // Editing Task
        if(user && tasks && activities && setValue){
            // Finding Task index in tasks array
            const index = tasks?.findIndex(item => item.id === ID);

            // Storing previous task values for activity
            const previous = tasks[index];

            // Updating task
            const newTasks = [...tasks];
            newTasks[index] = task;

            // Adding activity to the beginning
            const newActivities = [...activities];
            newActivities.unshift({
                user,
                task,
                previous,
            });

            // Saving updated tasks array
            setValue({
                tasks: newTasks,
                activities: newActivities
            });

            // Go back home
            history.push('/');
        }
    };

    return (
        <Layout title={'Edit'}>
            <div className={'flex justify-center'}>
                <div className={'px-10 w-full lg:w-1/2 2xl:w-1/3'}>
                    {error && <Alert variant={'error'}>{error}</Alert>}
                    <Form.Group>
                        <Form.Input
                            ref={titleRef}
                            type={'text'}
                            name={'title'}
                            value={task.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Textarea
                            ref={descRef}
                            name={'description'}
                            value={task.description}
                            onChange={handleChange}
                            additional_classes={'edit-description'}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            name={'status'}
                            value={task.status}
                            onChange={handleSelectChange}
                            items={allowedStates}
                        />
                    </Form.Group>
                    <div className={'flex grid grid-cols-2 gap-2'}>
                        <Button variant={'primary'} onClick={handleEdit}>
                            <Icons.EditIcon width={'18'} height={'18'} color={'white'}/>
                            <p className={'ml-2'}>Edit</p>
                        </Button>
                        <Button variant={'default'} onClick={() => history.push('/')}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
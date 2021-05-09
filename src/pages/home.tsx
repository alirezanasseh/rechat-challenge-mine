import React, {createRef, useContext, useState} from 'react';
import Layout from '../layouts/layout';
import Form, {Button} from '../components/ui/form';
import {ITask} from '../interfaces/task';
import {MainContext} from '../providers/mainProvider';
import {Alert} from '../components/ui/alert';
import Icons from '../components/ui/icons';
import TaskList from '../components/taskList';
import {Link} from 'react-router-dom';

export default function Home() {
    const [newTask, setNewTask] = useState<ITask>({
        title: '',
        description: '',
        status: 'ToDo'
    });
    const [error, setError] = useState('');
    const {user, tasks, activities, setValue} = useContext(MainContext);
    const titleRef = createRef<HTMLInputElement>();
    const descRef = createRef<HTMLTextAreaElement>();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTask({...newTask, [e.currentTarget.name]: e.currentTarget.value});
    };

    const generateID = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleAdd = () => {
        // Hiding error
        setError('');

        // Validating input
        if(!newTask?.title){
            setError('Please enter title');
            titleRef.current?.focus();
            return;
        }
        if(!newTask?.description){
            setError('Please enter description');
            descRef.current?.focus();
            return;
        }

        // Adding
        if(setValue && tasks && newTask && activities && user){
            // Adding Task
            newTask.id = generateID();
            let newTasks = [...tasks];
            newTasks.push(newTask);

            // Adding Activity to the beginning
            let newActivities = [...activities];
            newActivities.unshift({
                user,
                task: newTask,
            });

            // Saving Task and Activity
            setValue({
                tasks: newTasks,
                activities: newActivities
            });

            // Empty the fields
            setNewTask({
                title: '',
                description: '',
                status: 'ToDo'
            })
        }
    };

    return (
        <Layout title={'Home'}>

            {/* Add Task Section */}
            <div className={'flex justify-center'}>
                <div className={'px-10 w-full lg:w-1/2 2xl:w-1/3'}>
                    <h1>Add a new Task</h1>
                    {error && <Alert variant={'error'}>{error}</Alert>}
                    <Form.Group key={1}>
                        <Form.Input
                            ref={titleRef}
                            type={'text'}
                            name={'title'}
                            value={newTask?.title}
                            onChange={handleChange}
                            placeholder={'Title'}
                        />
                    </Form.Group>
                    <Form.Group key={2}>
                        <Form.Textarea
                            ref={descRef}
                            name={'description'}
                            value={newTask?.description}
                            onChange={handleChange}
                            placeholder={'Description'}
                            rows={5}
                        />
                    </Form.Group>
                    <Form.Group key={3}>
                        <Button
                            variant={'primary'}
                            block={'true'}
                            onClick={handleAdd}
                        >
                            <Icons.AddIcon additional_classes={'self-center'}/>
                            <p className={'ml-5'}>Add</p>
                        </Button>
                    </Form.Group>
                </div>
            </div>

            {/* Show Tasks List */}
            <div className={`mt-${error ? '24' : '10'} absolute left-0 right-0 bottom-0 top-80`}>
                <div className={'bg-blue-dark text-white py-5 px-10 rounded-tl-2xl rounded-tr-2xl pb-10 relative flex justify-between'}>
                    <h2>Tasks</h2>
                    <Link to={'/activities'}>Activities</Link>
                </div>
                <div className={'bg-blue-light rounded-tl-2xl rounded-tr-2xl flex justify-center absolute top-16 bottom-0 left-0 right-0'}>
                    {tasks && tasks.length > 0 ?
                        <TaskList tasks={tasks}/>
                        :
                        <div className={'text-center'}>
                            <p>You have nothing to do.</p>
                            <p>Go get some sleep.</p>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    );
}

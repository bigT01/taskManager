import React, {useEffect, useState} from 'react';
import {useStore} from "../store/useStore";
import {ReverseDateChanger} from "../util/ReverseDateChanger";
import {DateChanger} from "../util/dateChanger";


function TaskEdit({taskId}: string) {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState(0)
    const [newDeadline, setNewDeadline] = useState('')
    const [priority, setPriority] = useState<string>('10')
    const [status, setStatus] = useState('')

    const [isChanged, setIsChanged] = useState(false)

    const task = useStore(state => state.tasks.filter(task => task.id === taskId))
    const editTask = useStore(state => state.editTask)
    const setEditingId = useStore(state => state.setEditingId)
    const deleteTask = useStore(state => state.deleteTask)

    useEffect(() => {
        if(task[0] && !isChanged){
            const task2 = task[0]
            setId(task2.id)
            setTitle(task2.title)
            setDescription(task2.description)
            setDeadline(task2.deadline)
            setPriority(`${task2.priority}`)
            setStatus(task2.status)
            setIsChanged(true)
        }
    }, [task])

    useEffect(() => {
        if(deadline){
            setNewDeadline(ReverseDateChanger(deadline))
        }
    }, [deadline])

    const HandleSubmit = () => {
        editTask({id, title, description, deadline: DateChanger(newDeadline), priority, status})
        setEditingId('')
    }

    const DeleteTask = () => {
        deleteTask(id)
        setEditingId('')
    }
    return (
        <div className='absolute w-screen h-screen overflow-hidden bg-[#00000050] flex justify-center items-center top-0 left-0 '>
            <div className='bg-white p-4 flex-col flex w-4/12 gap-4 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-lg'>Title</label>
                    <input value={title} type="text" className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-lg'>Description</label>
                    <input value={description} type="text" className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={e => setDescription(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-lg'>Deadline</label>
                    <input value={newDeadline} type="text" className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={(e) => setNewDeadline(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-lg'>Priority</label>
                    <input value={priority} type="number" className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={(e) => setPriority(e.target.value)}/>
                </div>

                <button onClick={() => {
                    HandleSubmit()
                }} className='bg-secondary-blue text-white rounded-lg py-4 font-bold'>Submit</button>
                <button onClick={() => {DeleteTask()}} className='bg-secondary-blue text-white rounded-lg py-4 font-bold'>Delete</button>
                <button onClick={() => setEditingId('')} className='bg-secondary-blue text-white rounded-lg py-4 font-bold'>Cancle</button>
            </div>
        </div>
    );
}

export default TaskEdit;

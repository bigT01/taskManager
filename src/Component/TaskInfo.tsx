import React, {useState} from 'react';
import {useStore} from "../store/useStore";
import {generateRandom} from "../util/generateRandom";
import {DateChanger} from "../util/dateChanger";

type TaskInfoProps = {
    state: string
}

function TaskInfo({state}: TaskInfoProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState<string>('10')

    const setIsOpen = useStore(state => state.setIsOpen)
    const addTask = useStore(state => state.addTask)

    const HandleSubmit = () => {
        const id: number = generateRandom()

        if(title && description && deadline && priority){
            const deadlineNew = DateChanger(deadline)
            if(deadlineNew){
                addTask({title, description, deadline: deadlineNew, priority: +priority, id: `${id}`, status: 'Backlog'})
            } else {
                console.log('error Date')
            }

        }
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
                    <input value={deadline} type="text" placeholder='dd.mm.yyyy' className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={(e) => setDeadline(e.target.value)}/>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-semibold text-lg'>Priority</label>
                    <input value={priority} type="number" className='rounded-lg shadow-lg py-2 px-4 w-full' onChange={(e) => setPriority(e.target.value)}/>
                </div>

                <button onClick={() => {
                    HandleSubmit()
                    setIsOpen(false)
                }} className='bg-secondary-blue text-white rounded-lg py-4 font-bold'>Submit</button>
            </div>
        </div>
    );
}

export default TaskInfo;

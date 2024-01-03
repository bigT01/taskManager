import React from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import {DescriptionText} from "../util/descriptionText";
import {useStore} from "../store/useStore";
import TaskEdit from "./TaskEdit";
import {ReverseDateChanger} from "../util/ReverseDateChanger";

type TaskProps = {
    id: string,
    title: string,
    description: string,
    deadline: number,
    priority: number
}

function Task({id, title, description, deadline, priority}: TaskProps) {

    const setDraggedTask = useStore(state => state.setDraggedTask)
    const setEditingId = useStore(state => state.setEditingId)
    const editingId = useStore(state => state.editingId)
    return (
        <>
            <div className='rounded-xl p-2 w-full min-h-24 shadow-xl bg-white cursor-move' draggable onDragStart={() =>setDraggedTask(id)}>

                <div className='flex justify-between items-center mb-2'>
                    <h5 className='font-semibold text-md '>{title}</h5>
                    <button onClick={() => setEditingId(id)}><BsThreeDotsVertical /></button>
                </div>

                <p className='text-sm font-light mb-2'>{DescriptionText(description)}</p>
                <ul>
                    <li className='text-md '><span className='text-primary-blue font-bold'>•</span> priority: {priority}</li>
                    <li className='text-md '><span className='text-primary-pink font-bold'>•</span> deadline: {ReverseDateChanger(deadline)}</li>
                </ul>
            </div>
            {editingId === id && <TaskEdit taskId={id}/>}
        </>

    );
}

export default Task;

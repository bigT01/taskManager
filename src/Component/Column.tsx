import React from 'react';
import Task from "./Task";
import {useStore} from "../store/useStore";

type ColumnProps = {
    title: string
}

function Column({title}:ColumnProps) {
    const tasks = useStore(state => state.tasks.filter(task => task.status === title))
    const setDraggedTask = useStore(state => state.setDraggedTask)
    const draggedTask = useStore(state => state.draggedTask)
    const moveTask = useStore(state => state.moveTask)

    return (
        <>
            <div className='w-3/12 flex flex-col justify-center bg-[#EEF2F5] rounded-lg  h-fit'
                 onDragOver={(e) => {
                     e.preventDefault()
                 }}
                 onDrop={() => {
                     moveTask(draggedTask, title)
                     setDraggedTask('')
                 }}
            >
                <h5 className='font-bold text-lg mx-auto mb-4 pt-4'>{title}</h5>
                <div className="line mb-4"/>
                <div className='px-2 pb-2 w-full h-full flex flex-col gap-2 min-h-[150px]'>
                    {tasks.map(task => (
                        <Task key={task.id} title={task.title} id={task.id} description={task.description} deadline={task.deadline} priority={task.priority}/>
                    ))}
                </div>

            </div>

        </>

    );
}

export default Column;

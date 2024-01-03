import './App.css';
import {useStore} from "./store/useStore";
import {Navigate, useNavigate} from "react-router-dom";
import {MdAdd, MdLogout} from "react-icons/md";
import {FaFilter} from "react-icons/fa";
import Column from "./Component/Column";
import TaskInfo from "./Component/TaskInfo";
import {useEffect, useState} from "react";
import {Sorting} from "./util/sorting/sorting";

function App() {
    const navigate = useNavigate();
    const [sort, setSort] = useState<'BY_DATE' | 'BY_PRIORITY' | 'BY_NAME' | ''>('')
    const filter: any = ['BY_NAME', 'BY_PRIORITY', 'BY_DATE', '']


    const isLogin = useStore(state => state.isLogin)
    const isOpen = useStore(state => state.isOpen)
    const setIsOpen = useStore(state => state.setIsOpen)
    const updateTask = useStore(state => state.updateTask)
    const tasks = useStore(state => state.tasks)
    const setLogout = useStore(state => state.setLogout)

    const onFilter = () => {
        for(let i = 0; i < filter.length; i++){
            if(filter[i] === sort && i !== filter.length-1){
                setSort(filter[i+1])
            }
            if(filter[i] === sort && i === filter.length-1){
                setSort(filter[0])
            }
        }
    }

    useEffect(() => {
        if(sort){
            const sorted = Sorting(tasks, sort)
            updateTask(sorted)
        }
    }, [sort])

    const onLogout = () => {
        setLogout()
    }
    return isLogin ? (
        <div className='w-screen min-h-screen h-full bg-primary-violet'>
            <div className='container mx-auto py-10'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-center text-white font-bold text-3xl'>Task Management System</h1>
                    <button onClick={() => onLogout()}><MdLogout size={24} color={'white'}/></button>
                </div>
                <div className='flex w-full justify-between items-center p-2 bg-secondary-violet rounded-md mb-4'>
                    <p className='text-white text-2xl font-semibold'>Tasks</p>
                    <div className='flex gap-4'>
                        <button className='bg-secondary-blue p-4 rounded-lg cursor-pointer' onClick={() => {
                            setIsOpen(true)
                        }}><MdAdd size={24} color='white'/></button>
                        <div className='flex gap-4 items-center'>
                            <p className='font-bold'>{sort === 'BY_DATE' ? 'By Date' : sort === 'BY_PRIORITY' ? 'By Priority' : sort === 'BY_NAME' ? 'By Name' : 'Default'}</p>
                            <button className='bg-secondary-blue p-4 rounded-lg cursor-pointer' onClick={() => onFilter()}>
                                <FaFilter size={24} color='white'/>
                            </button>
                        </div>

                    </div>

                </div>
                {/*column*/}
                <div className='flex gap-4 justify-between'>
                    <Column title={"Backlog"}/>
                    <Column title={"In Progress"}/>
                    <Column title={"Done"}/>
                </div>

            </div>
            {isOpen && (<TaskInfo state={'Add'}/>)}
        </div>
    ) : <Navigate to='/login'/>
}

export default App

import React, {useState} from 'react';
import {useStore} from "./store/useStore";
import {IoEyeSharp} from "react-icons/io5";
import {FaEyeSlash} from "react-icons/fa";
import {Navigate} from "react-router-dom";

const Login = () => {
    const user = useStore(state => state.user);
    const isLogined = useStore(state => state.isLogin);
    const setIsLogined = useStore(state => state.setIsLogin);

    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isEye, setIsEye] = useState<boolean>(false)

    const addUser = useStore(state => state.addUser)

    const onSubmit = () => {
        if(!isLogin){
            addUser(username, password)
            setUsername('')
            setPassword('')
        } else {
            if(user){
                if(user.name === username && user.password === password){
                    setUsername('')
                    setPassword('')
                    setIsLogined(true)
                } else{
                    console.log('false')
                }
            }
        }
    }

    const buttonStyle = "py-4 w-1/2 mx-auto text-lg font-semibold shadow-lg"
    return !isLogined ? (
        <div className='flex w-screen h-screen bg-primary-violet justify-center items-center'>
            <div className='flex flex-col items-center w-full'>
                <h3 className='text-2xl text-white font-bold mb-6'>{isLogin ? "Login" : "Registration"}</h3>
                <div className='flex w-4/12 mb-4'>
                    <button className={`${isLogin ? 'bg-secondary-blue text-white' : 'bg-white text-black'} ${buttonStyle} rounded-tl-md rounded-bl-md`} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={`${isLogin ? 'bg-white text-black' : 'bg-secondary-blue text-white'} ${buttonStyle} rounded-tr-md rounded-br-md`} onClick={() => setIsLogin(false)}>Registration</button>
                </div>
                <form className='w-4/12 flex flex-col gap-4 bg-white text-black p-4 rounded-md mb-6' onSubmit={() =>{}}>
                    <div className="flex flex-col gap-2">
                        <label className='text-sm font-light'>username</label>
                        <input value={username} type="text" className='w-full input' onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className='text-sm font-light'>password</label>
                        <div className='flex gap-1 items-center'>
                            <input value={password} type={isEye? "text" : 'password'} className='w-full input' onChange={(e) => setPassword(e.target.value)}/>
                            <button className='w-[50px] h-50px flex items-center justify-center' type='button' onClick={() => setIsEye(eye => !eye)}>{isEye ? <IoEyeSharp size={24}/> : <FaEyeSlash size={24}/>}</button>
                        </div>

                    </div>
                </form>
                <button className='py-4 text-white w-4/12 text-2xl rounded-lg enter shadow-xl' onClick={() => onSubmit()}>enter</button>
            </div>
        </div>
    ) : <Navigate to='/dashboard'/>
};

export default Login;

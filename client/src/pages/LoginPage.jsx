import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {

    const [currState, setCurrState] = useState("Sign up");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const { login } = useContext(AuthContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (currState === "Sign up" && !isDataSubmitted) {
            setIsDataSubmitted(true);
            return;
        };

        login(currState === "Sign up" ? 'signup' : 'login',
            { fullName, email, password, bio }
        );
    };

    return (
        <>
            <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

                {/* Left Part */}
                <img
                    src={assets.logo_big}
                    alt=""
                    className="w-32 sm:w-44 md:w-56 lg:w-64 xl:w-72 h-auto object-contain hue-rotate-60" />

                {/* Right Part */}
                <form
                    onSubmit={onSubmitHandler}
                    className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
                    <h2 className='font-medium text-2xl flex justify-between items-center'>
                        {currState}

                        {
                            isDataSubmitted &&
                            <img
                                onClick={() => isDataSubmitted(false)}
                                src={assets.arrow_icon}
                                alt=""
                                className='w-5 cursor-pointer' />
                        }
                    </h2>

                    {currState === "Sign up" && !isDataSubmitted && (

                        <input
                            type="text"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            placeholder='Full Name'
                            required />

                    )}

                    {!isDataSubmitted && (
                        <>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                placeholder='Email Address'
                                required />
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                placeholder='Password'
                                required />
                        </>
                    )}

                    {currState === "Sign up" && isDataSubmitted && (
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            rows={4}
                            className='p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            placeholder='Give a short bio...'
                            required></textarea>
                    )}

                    <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <input type="checkbox" required />
                        <p>Agree to the terms of use & privacy policy.</p>
                    </div>

                    <button
                        type='submit'
                        className='py-3 bg-gradient-to-r from-blue-400 to-violet-600 text-white rounded-md cursor-pointer'>
                        {currState === "Sign up" ? "Create Account" : "Login Now"}
                    </button>

                    <div className='flex flex-col gap-2'>
                        {currState === "Sign up" ? (
                            <p className='text-sm text-gray-500'>
                                Already have an account? <span
                                    onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
                                    className='font-medium text-violet-500 cursor-pointer'>Login here</span>
                            </p>
                        ) : (
                            <p className='text-sm text-gray-500'>
                                Don't have an account? <span
                                    onClick={() => setCurrState("Sign up")}
                                    className='font-medium text-violet-500 cursor-pointer'>Create one</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};
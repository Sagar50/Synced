import React, { useEffect, useState } from 'react'
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Routes, Route, useNavigate } from "react-router-dom";


function HomePage() {
    const [roomCode, setRoomCode] = useState();

    useEffect(() => {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            });
      }, []);
    let navigate = useNavigate(); 
    const onJoinRoom = () =>{ 
        let path = `/join`; 
        navigate(path);
    };
    const onCreateRoom = () =>{ 
        let path = `/create`; 
        navigate(path);
    };

    const clearRoomCode = () => {
        setRoomCode(null);
        navigate("/");
    };
        
    const renderHomePage = () => {
        if (roomCode) {
            navigate('/room/' + roomCode);
        }else{  
            return (
                <div className='space-y-4 sm:space-y-10 mt-6 p-4 h-screen'> 
                    <div className='w-[80%] justify-between flex mx-auto shadow-2xl p-4 rounded-xl'>
                        <div className='flex space-x-4 my-auto cursor-pointer' onClick={() => {navigate('/')}}>
                            <img className='w-[70px] flex-1' src='../../static/images/SyncedLogo.png'/>
                            <h1 className='text-2xl text-center my-auto flex-1 sm:flex p-2'>Synced</h1>
                        </div>
                        <div className='hidden sm:flex md:space-x-4'>
                            <button className= 'flex-1 p-2 uppercase w-[140px] md:w-[180px] text-[#db3321] hover:-translate-y-1 transition-all' onClick={onJoinRoom}>Join a Room</button>
                            <button className= 'flex-1 p-2 uppercase w-[140px] md:w-[180px] text-[#db3321] hover:-translate-y-1 transition-all' onClick={onCreateRoom}>Create a Room</button>
                        </div>
                    </div>
                    <div className='md:flex mx-auto my-auto w-[65%] sm:w-[50%] md:w-[80%]'>
                        <div className='flex-1 '>
                            <img className=' mx-auto xs:w-[60%] xl:w-[80%] ' src='../../static/images/heroImage3.png'/>
                        </div>
                        <div className='flex-1 my-auto p-4 flex-col md:p-4'>
                            <p className='text-[14px] sm:text-[20px] md:text-[28px] w-[60%] justify-center text-left'>The music sharing app</p>
                            <div className='mx-auto w-fit'>
                                <h1 className='text-[32px] sm:text-[48px] mx-auto md:text-[68px] font-extrabold bg-gradient-to-r from-[#f5b079] via-[#f3396a] to-[#db3321] inline-block text-transparent bg-clip-text'>Synced</h1>
                            </div>
                            <p className='text-[14px] sm:text-[20px] md:text-[28px] w-[60%] ml-auto justify-center text-right'>that allows users to share music in real time</p>
                        </div>
                    </div>
                    <div className='sm:hidden flex space-x-4 mx-auto'>
                        <button className='bg-red-500 flex-1 rounded-lg text-sm p-3 uppercase' onClick={onJoinRoom}>Join a Room</button>
                        <button className='bg-green-500 flex-1 rounded-lg p-3 text-sm uppercase' onClick={onCreateRoom}>Create a Room</button>
                    </div>
                </div>
            )
        }
    }
    return (
            
            <Routes>
                <Route exact path='/' element={renderHomePage()}/>
                <Route path='/join' element={<RoomJoinPage />} />
                <Route path='/create' element={<CreateRoomPage />} />
                <Route path='/room/:roomCode' element={<Room clearRoomCode={clearRoomCode}/>} />
            </Routes>
        )
}


export default HomePage

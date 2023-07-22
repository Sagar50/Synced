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
                <div className='space-y-10'>
                    <h1 className='text-3xl justify-center text-center'>Synced</h1>
                    <p className='text-xl justify-center text-center'>A music sharing app that allows users to share music with each other in real time.</p>
                    <div className='flex space-x-4'>
                        <button className='bg-red-500 flex-1 rounded-lg p-4 uppercase' onClick={onJoinRoom}>Join a Room</button>
                        <button className='bg-green-500 flex-1 rounded-lg p-4 uppercase' onClick={onCreateRoom}>Create a Room</button>
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

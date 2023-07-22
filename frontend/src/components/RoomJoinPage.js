import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function RoomJoinPage() {
	const [username, setUsername] = useState('');

	let navigate = useNavigate(); 
    const onBackClick = () =>{ 
        let path = `/`; 
        navigate(path);
    };

	const [roomCode, setRoomCode] = useState('');
	const handleRoomCodeChange = (e) => {
        setRoomCode(e.target.value)
    };
	const handleJoinRoom = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				code: roomCode,
				users: username,
			}),
		};
		fetch('/api/join-room', requestOptions)
			.then((response) => {
				if (response.ok) {
					navigate('/room/' + roomCode);
				} else {
					alert('Room not found.');
				}
			}
			);
	}
	const handleUserChange = (e) => {
        setUsername(e.target.value)
    };
	return (
		<div className='space-y-2 p-4'>
			<h1 className='text-3xl justify-center text-center '>Join a Room</h1>
			<div className="relative">
				<input type="text" onChange={handleRoomCodeChange} id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
				<label htmlFor="floating_outlined" className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Code</label>
				<input type="name" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleUserChange} />
                <p id="helper-text-explanation  " className="mt-2 text-sm text-gray-500 dark:text-gray-400">Username</p>
			</div>
			<div className='w-full flex py-3 space-x-2'>
				<button className='bg-red-500 flex-1 rounded-lg p-4 uppercase' onClick={onBackClick}>Back</button>
				<button className='bg-green-500 flex-1 rounded-lg p-4 uppercase' onClick={handleJoinRoom}>Join Room</button>
			</div>
		</div>
	)
}

export default RoomJoinPage
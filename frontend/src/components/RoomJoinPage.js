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
		<div className='h-screen w-screen flex'>
			<div className='my-auto mx-auto h-[50%]  w-[80%] md:w-[40%] xl:w-[25%] flex flex-col justify-between p-6 rounded-2xl shadow-2xl	'>
				<div className='flex'>
					<h1 className='text-3xl justify-center mx-auto text-center font-extrabold bg-gradient-to-r from-[#f5b079] via-[#f3396a] to-[#db3321] inline-block text-transparent bg-clip-text'>Join a Room</h1>
				</div>
				<div className="relative space-y-6">
					<div>
						<p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Code:</p>
						<input type="text" onChange={handleRoomCodeChange} id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " />
					</div>
					<div>
						<p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Username</p>
						<input type="name" id="helper-text" className="block px-2.5 pb-2.5 pt-4 w-full text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 " onChange={handleUserChange} />
					</div>
					
				
				</div>
				<div className='w-full flex py-3 space-x-2'>
					<button className='bg-[#f5b079] flex-1 rounded-lg p-4 uppercase text-white' onClick={onBackClick}>Back</button>
					<button className='bg-[#db3321] flex-1 rounded-lg p-4 uppercase text-white' onClick={handleJoinRoom}>Join Room</button>
				</div>
			</div>
			
		</div>
	)
}

export default RoomJoinPage
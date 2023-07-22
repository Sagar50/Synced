import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


function CreateRoomPage({ update = false, votesToSkip2, guestCanAddMusic2, guestCanPause2, roomCode}) {
    let defaultVotes = 1;
    let navigate = useNavigate(); 
    const onBackClick = () =>{ 
        let path = `/`; 
        navigate(path);
    };
    const [guestCanPause, setGuestCanPause] = useState(guestCanPause2 || false);
    const [guestCanAddMusic, setGuestCanAddMusic] = useState(guestCanAddMusic2 || false);
    const [votesToSkip, setVotesToSkip] = useState(votesToSkip2 || defaultVotes);
    const [username, setUsername] = useState('');
    const handleVotesChanged = (e) => {
        setVotesToSkip(e.target.value)
    };

    const handleUserChange = (e) => {
        setUsername(e.target.value)
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                guest_can_add_music: guestCanAddMusic,
                users: username,
            }),
        };
        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate(`/room/${data.code}`));
        
    }

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                guest_can_add_music: guestCanAddMusic,
                users: username,
                code: roomCode,
            }),
        };
        fetch("/api/update-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    alert("Room updated successfully!");
                } else {
                    alert("Error updating room...");
                }
                // navigate(`/room/${roomCode}`);
            });
    };
    const renderButtons = () => {
        if(update){
            return (
                <div className='w-full py-3 flex'>
                    <button className='bg-green-500 flex-1 rounded-lg p-4 uppercase w-full my-auto' onClick={handleUpdateButtonPressed}>Update Room</button>
                </div>
            )
        }
        return (
            <div className='w-full flex py-3 space-x-2'>
                <button className='bg-red-500 flex-1 rounded-lg p-4 uppercase' onClick={onBackClick}>Back</button>
                <button className='bg-green-500 flex-1 rounded-lg p-4 uppercase' onClick={handleRoomButtonPressed}>Create a Room</button>
            </div>
        )
    };
    const title = update ? "Update Room" : "Create a Room";
    return (
        <div className='flex my-auto'>
                <div className='h h-fit w-fit m-auto space-y-3'>
                    <h1 className='text-3xl justify-center text-center'>{title}</h1>
                    <div className='justify-center text-center'>Guest Control of playback state</div>
                    <div className='flex py-2'>

                        <label className="relative inline-flex items-center cursor-pointer flex-1">
                            <div className='flex flex-col flex-1'>
                                <input type="checkbox" className="sr-only peer" onClick={() => {setGuestCanPause(!guestCanPause)}}/>
                                <div className="w-11 h-6 mx-auto bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[35px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300 justify-center text-center">Play/Pause</span>
                            </div>
                        </label>

                        <label className="relative inline-flex items-center cursor-pointer flex-1">
                            <div className='flex flex-col flex-1'>
                                <input type="checkbox" className="sr-only peer" onClick={() => {setGuestCanAddMusic(!guestCanAddMusic)}}/>
                                <div className="w-11 h-6 mx-auto bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[35px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300 justify-center text-center">Add Music</span>
                            </div>
                        </label>
                    </div>
                    
                    <input type="number" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={votesToSkip2 || votesToSkip} onChange={handleVotesChanged} />
                    <p id="helper-text-explanation  " className="mt-2 text-sm text-gray-500 dark:text-gray-400">Votes required to skip a song.</p>                    
                    <input type="name" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleUserChange} />
                    <p id="helper-text-explanation  " className="mt-2 text-sm text-gray-500 dark:text-gray-400">Username</p>
                    {renderButtons()}
                </div>
            </div>
    )
}

export default CreateRoomPage

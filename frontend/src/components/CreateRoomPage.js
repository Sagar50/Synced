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
                    <button className='bg-[#f3396a] flex-1 rounded-lg p-4 uppercase w-full my-auto' onClick={handleUpdateButtonPressed}>Update Room</button>
                </div>
            )
        }
        return (
            <div className='w-full flex py-3 space-x-2'>
                <button className='bg-[#f5b079] flex-1 rounded-lg p-4 uppercase text-white' onClick={onBackClick}>Back</button>
                <button className='bg-[#db3321] flex-1 rounded-lg p-4 uppercase text-white' onClick={handleRoomButtonPressed}>Create a Room</button>
            </div>
        )
    };
    const title = update ? "Update Room" : "Create a Room";
    return (
        <div className='h-screen w-screen flex'>
			<div className='my-auto mx-auto h-[60%] xs:h-[50%]  w-[80%] md:w-[40%] xl:w-[25%] flex flex-col justify-between p-6 rounded-2xl shadow-2xl	'>
                <div className='flex'>
					<h1 className='text-3xl justify-center mx-auto text-center font-extrabold bg-gradient-to-r from-[#f5b079] via-[#f3396a] to-[#db3321] inline-block text-transparent bg-clip-text'>{title}</h1>
				</div>
            
                    
                    <div className='justify-center text-center'>Guest Control of playback state</div>
                    <div className='flex flex-col space-y-3 sm:space-y-0 sm:flex-row py-2 justify-between'>
                        <label className=" mx-auto xs:mx-0 relative inline-flex items-center cursor-pointer">
                            <div className='flex'>
                                <input type="checkbox" className="sr-only peer" onClick={() => {setGuestCanPause(!guestCanPause)}}/>
                                <div className="w-11 h-6 mx-auto bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className=" ml-2 text-sm font-medium text-gray-900 justify-center text-center">Play/Pause</span>
                            </div>
                        </label>

                        <label className=" mx-auto xs:mx-0 relative inline-flex items-center cursor-pointer ">
                            <div className='flex w-fit'>
                                <input type="checkbox" className="sr-only peer" onClick={() => {setGuestCanAddMusic(!guestCanAddMusic)}}/>
                                <div className="w-11 h-6 mx-auto bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className=" ml-2 text-sm font-medium text-gray-900 justify-center text-center">Add Music</span>
                            </div>
                        </label>
                    </div>
                    
                    <div>
						<p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Votes:</p>
						<input type="number"  placeholder={votesToSkip2 || votesToSkip} onChange={handleVotesChanged} id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"/>
					</div>
					<div>
						<p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Username</p>
						<input type="name" id="helper-text" className="block px-2.5 pb-2.5 pt-4 w-full text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 " onChange={handleUserChange} />
					</div>
                    
                    
                    {renderButtons()}
                
            </div>    
        </div>
    )
}

export default CreateRoomPage

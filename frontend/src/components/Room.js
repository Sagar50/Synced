import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import QueueSong from './QueueSong';

function Room( {clearRoomCode} ) {
    const [votesToSkip, setVotesToSkip] = useState(1);
    const [guestCanAddMusic, setGuestCanAddMusic] = useState(false);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const roomCode = useParams().roomCode;
    const [showSettings, setShowSettings] = useState(false);
    const [song, setSong] = useState({});
    const [queue, setQueue] = useState([{}]);
    const [showQueue, setShowQueue] = useState(false);
    const [showSearchSong, setShowSearchSong] = useState(true);
    const [users, setUsers] = useState([]);

    const [currentSong, setCurrentSong] = useState();

    let navigate = useNavigate(); 


    useEffect(() => {
        authenticateSpotify();
        fetch('/api/get-room' + '?code=' + roomCode)
            .then((response) => {
                if (!response.ok) {
                    clearRoomCode();
                    window.location.href="/";
                    navigate("/");
                    
                }
                return response.json();
            })
            .then((data) => {

                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setGuestCanAddMusic(data.guest_can_add_music);
                setIsHost(data.is_host);
                
            })
        getUsers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentSong();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getQueue();
    }, [currentSong]);
    const authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                // setSpotifyAuthenticated(data.status);
                if (!data.status){
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        })
                }
            })
    };

    const onLeaveRoom = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/leave-room', requestOptions)
            .then((_response) => {
                clearRoomCode();
                window.location.href="/";
                navigate("/");
                
            }
        )
    };

    const getQueue = () => {
        fetch('/spotify/get-queue')
            .then((response) => response.json())
            .then((data) => {
                setQueue(data.queue);
              
            })
    }
    const updateShowSettings = (value) => {
        setShowSettings(value);
    }; 
    const renderSettings = () => {
        return (
            <div>
                <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanAddMusic={guestCanAddMusic}
                guestCanPause={guestCanPause} roomCode={roomCode}  />
                
                <button className='bg-red-500 flex-1 rounded-lg p-4 uppercase w-full' onClick={() => {updateShowSettings(false)}}>Close</button>
            </div>
            
        )
    };
    
    if (showSettings){
        return renderSettings();
    }

    
    const getCurrentSong = () => {
        fetch('/spotify/current-song')
            .then((response) => {
                if (!response.ok){
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                
                setSong(data);
                if(data?.id !== currentSong?.id){
                    setCurrentSong(data.id);
                }
            })
    };

    const searchSong = (songToSearch) => {
        if(songToSearch.length >= 3){
            fetch('/spotify/search-song' + '?song=' + songToSearch)
                .then((response) => {
                    if (!response.ok){
                        return {};
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    console.log(data)
                })
        }
    };
    const getUsers = () => {
        fetch('/api/get-users')
            .then((response) => response.json())
            .then((data) => {
                if(typeof data[0] === 'string' ){
                    setUsers(data);
                }else {
                    setUsers(data[0])
                }
                    

            })
    };
    return (
        <div className='space-y-4'>
            <div className=''>
                <h1 className='justify-center text-center text-3xl font-bold'>Code: {roomCode}</h1>
                <p className='justify-center text-center font-semibold'>Is Host: {isHost.toString()}</p>
            </div>
            
            <div className='flex'>
                <div className='space-y-2 flex-1 m-4 rounded shadow-lg'>
                    <div className='flex bg-gray-200 rounded-lg border justify-center text-center p-4 '><h1 className='shadow-lg py-2 px-4 border rounded-xl bg-gray-300' onClick={() => {getUsers()}}>Users in Room</h1></div>
                    {
                        users?.map((user, id) => {
                           
                            return <p key={id} className='p-4 border-b-2 border-black'>{user}</p>
                        }
                        )
                    }
                </div>
                <MusicPlayer {...song} />
                
                <div className='space-y-2 flex-1 m-4 rounded shadow-lg '>
                    <div className='flex justify-between p-4 bg-gray-200 rounded-lg border'>
                        <button onClick={() => {getQueue(); setShowQueue(true); setShowSearchSong(false)}} className={`${showQueue ? 'shadow-lg py-2 px-4 border rounded-xl bg-gray-300' : ''}`}>View Queue</button>
                        <button onClick={()=> {setShowSearchSong(true); setShowQueue(false);}} className={`${showSearchSong ? 'shadow-lg py-2 px-4 border rounded-xl bg-gray-300' : ''}`}>Add Song</button>
                    </div>
                    {showQueue && 
                        <div className='p-4 bg-gray-200 rounded-lg h-[600px] border overflow-scroll overflow-x-hidden'>
                        {queue?.map((song, id) => {
                                return <QueueSong key={id} {...song} />}
                            )}
                        </div>
                    }
                    {showSearchSong &&
                        <input type='search' className='w-full' onChange={(e) => searchSong(e.target.value) }/>
                    }
                    
                </div>
                
            </div>
            <div className='space-x-4 flex p-2'>
                    {isHost && <button className='bg-green-500 flex-1 rounded-lg p-4 uppercase' onClick={() => {updateShowSettings(true)}} >Settings</button>}
                    <button className='bg-red-500 flex-1 rounded-lg p-4 uppercase' onClick={onLeaveRoom}>Leave Room</button>
            </div>
        </div>
        
    )
}

export default Room
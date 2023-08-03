import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import QueueSong from './QueueSong';
import SearchSong from './SearchSong';

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

    const [currentSong, setCurrentSong] = useState(); // current song playing (id)
    const [searchResults, setSearchResults] = useState([]); // search results

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
                if(data?.id !== currentSong){
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
                    setSearchResults(data);
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

    const handleHideUI = () => {
        let ui = document.getElementById('ui');
        let backdrop = document.getElementById('backdrop');
        let trackImg = document.getElementById('imgDiv');
        if ( ui.classList.contains('hidden')){
            ui.classList.remove('hidden');
            // backdrop.classList.add('backdrop-blur');
            // backdrop.classList.add('bg-black/50');
            trackImg.classList.add('hidden');
            trackImg.classList.remove('flex');
        } else {
            ui.classList.add('hidden');
            // backdrop.classList.remove('backdrop-blur');
            // backdrop.classList.remove('bg-black/50');
            trackImg.classList.remove('hidden');
            trackImg.classList.add('flex');
            
        }
    }
    return (
        <div className='w-full h-screen bg-center bg-cover bg-no-repeat bg-[image:var(--image-url)]'
        style={{'--image-url': `url(${song?.image_url})`}} 
        >
            <div className='absolute z-50 top-0 right-0'>
                    <button className=' m-2 py-1 px-2 border-2 border-white cursor-pointer text-white bg-black/30  hover:-translate-y-1 transition-all' onClick={() => {handleHideUI()}}>Hide UI</button>
            </div>
            <div id='imgDiv' className='hidden absolute top-0 left-0 w-full h-screen z-40'>
                <img src={song?.image_url} alt="" className='w-[250px] rounded-full mx-auto my-auto'/>
            </div>
            <div id="backdrop" className='w-full h-full flex justify-center items-center backdrop-blur'>
                
                <div id="ui" className='space-y-4 h-[90%] w-[75%] transition-all'>
                    <div className=''>
                        <h1 className='justify-center text-center text-3xl text-white font-bold m-4'>Code: {roomCode}</h1>
                        <p className='justify-center text-center text-white  font-semibold'>Is Host: {isHost.toString()}</p>
                    </div>
                
                    <div className='flex h-[80%]'>
                        <div className='space-y-2 flex flex-col flex-1 m-4 rounded shadow-lg bg-gray-400'>
                            <div className='flex bg-gray-200 rounded-lg w-[80%] mx-auto border justify-center text-center m-2 px-1 border-b-2 border-black'><h1 className='py-2 px-4 border rounded-xl' onClick={() => {getUsers()}}>Users in Room</h1></div>
                            {
                                users?.map((user, id) => {
                                    return <p key={id} className='p-4 border-b-2 border-black'>{user}</p>
                                }
                                )
                            }
                        </div>
                        <MusicPlayer {...song} />
                    
                        <div className='space-y-2 flex flex-col flex-1 m-4 rounded shadow-lg bg-gray-400'>
                            <div className='flex justify-between w-[80%] mx-auto m-2 py-1 px-2 bg-gray-200 rounded-lg border border-b-2 border-black'>
                                <button onClick={() => {getQueue(); setShowQueue(true); setShowSearchSong(false)}} className={`${showQueue ? ' transition-all shadow-lg py-2 px-4 border rounded-xl bg-gray-300' : ''}`}>View Queue</button>
                                <button onClick={()=> {setShowSearchSong(true); setShowQueue(false);}} className={`${showSearchSong ? ' transition-all shadow-lg py-2 px-4 border rounded-xl bg-gray-300' : ''}`}>Add Song</button>
                            </div>
                            {showQueue && 
                                <div className='rounded-lg border overflow-scroll overflow-x-hidden'>
                                {queue?.map((song, id) => {
                                        return <QueueSong key={id} {...song} />}
                                    )}
                                </div>
                            }
                            {showSearchSong &&
                                // <input type='search' className="w-[80%] mx-auto bg-[url('../../static/images/search.png')] bg-no-repeat" onChange={(e) => searchSong(e.target.value) }/>
                                
                                <div className="relative text-gray-600 focus-within:text-gray-400 mx-auto">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </span>
                                    <input type="search" className="py-2 text-white bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." onChange={(e) => searchSong(e.target.value) }/>
                                </div>
    

                            
                            }
                            <div className='overflow-scroll overflow-x-hidden'>
                                {
                                    showSearchSong && 
                                    
                                    searchResults?.tracks?.items?.map((song, id) => {
                                        return <SearchSong key={id} {...song} />
                                    })
                                }
                            </div>
                           
                            
                        </div>
                    
                    </div>
                    <div className='space-x-4 flex p-3'>
                            {isHost && <button className='border-2 border-[#f5b079] bg-black/30 text-white flex-1 rounded-lg p-4 uppercase  hover:-translate-y-1 transition-all' onClick={() => {updateShowSettings(true)}} >Settings</button>}
                            <button className='border-2 border-[#db3321] bg-black/30 flex-1 text-white rounded-lg p-4 uppercase  hover:-translate-y-1 transition-all' onClick={onLeaveRoom}>Leave Room</button>
                    </div>
                </div>
            </div>
            
            
        </div>
        
        
    )
}

export default Room
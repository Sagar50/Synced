import React, { useEffect, useState } from 'react'

function MusicPlayer( { ...song  } ) {
    
    const convertTime = (time) => {
        var min = Math.floor((time/1000/60) << 0);
        var sec = Math.floor((time/1000) % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }

    const pauseSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        };
      
        fetch('/spotify/pause', requestOptions);
  
        
        
    }

    const playSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/spotify/play', requestOptions);
    }

    const skipSong = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/spotify/skip', requestOptions);
    }

    const prevSong = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/spotify/prev', requestOptions);
    }

    const seekSong = (position) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                position_ms: position,
            }),
        };
        fetch('/spotify/seek', requestOptions);
    }

    
    
    var timeToUse = song.time / song.duration * 100;
    timeToUse = timeToUse + '%';

    return (

            
            <div className="flex-1 flex items-center justify-center my-auto">
                <div className="p-4">
                    <div className="flex flex-col">
                        <div className='flex-1'>
                            <img className="max-h-[380px]" src={song.image_url} alt="Album Pic" />
                        </div>
                        <div className="p-6 flex-1">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-2xl font-medium text-white">{song.title}</h3>
                                    <p className="text-sm mt-1 text-white">{song.artist}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6 flex-1">
                                
                                <div className="hover:cursor-pointer" onClick={() => {prevSong()}}>
                                    <svg className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/></svg>
                                </div>
                                <div className="text-white p-6 rounded-full hover:cursor-pointer" onClick={() => {song.is_playing ? pauseSong() : playSong()}}>
                                    {song.is_playing ?
                                    <svg className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                                    :
                                    <img src='../../static/images/play.png' className='w-8 h-8'/>
                                    }   
                                </div>
                                <div className="hover:cursor-pointer" onClick={() => {skipSong()}}>
                                    <svg className="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/></svg>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="mx-8 py-4">
                        <div className="flex justify-between text-sm text-white">
                            <p>{convertTime(song.time)}</p>
                            <p>{convertTime(song.duration)}</p>
                        </div>
                        <div>
                            {song ?
                                <input type="range" className="w-full" value={song.time} max={song.duration} onInput={(e) => {seekSong(e.target.value)}} ></input>
                            : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default MusicPlayer
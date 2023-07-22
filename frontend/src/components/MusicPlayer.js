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
            <div className="flex-1 h-full">
                {/* <SpotifyPlayer
                    token={song.access_token}
                    uris={song.uri}
                    
                    play={song.is_playing}
                    styles={{
                        bgColor: '#1F1F1F',
                        color: '#FFFFFF',
                        loaderColor: '#FFFFFF',
                        sliderColor: '#1ED760',
                        savedColor: '#FFFFFF',
                        trackArtistColor: '#FFFFFF',
                        trackNameColor: '#FFFFFF',
                        sliderHandleColor: '#FFFFFF',
                        sliderTrackColor: '#FFFFFF',
                        sliderColor: '#FFFFFF',
                    }}
                /> */}
            
                <div className="flex items-center justify-center">
                    <div className=" p-4 shadow-lg rounded-lg w-[6  0%]" style={{'width': '45rem !important'}}>
                        <div className="">
                            <div>
                                <img className="rounded block" src={song.image_url} alt="Album Pic" />
                            </div>
                            <div className=" p-8">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-2xl font-medium">{song.title}</h3>
                                        <p className="text-sm mt-1">{song.artist}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-8">
                                    
                                    <div className="hover:cursor-pointer" onClick={() => {prevSong()}}>
                                        <svg className="w-8 h-8" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/></svg>
                                    </div>
                                    <div className="text-white p-8 rounded-full bg-red-light shadow-lg hover:cursor-pointer" onClick={() => {song.is_playing ? pauseSong() : playSong()}}>
                                        {song.is_playing ?
                                        <svg className="w-8 h-8" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                                        :
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M23 12l-22 12v-24l22 12zm-21 10.315l18.912-10.315-18.912-10.315v20.63z"/></svg>
                                        }
                                    </div>
                                    <div className="hover:cursor-pointer" onClick={() => {skipSong()}}>
                                        <svg className="w-8 h-8" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/></svg>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="mx-8 py-4">
                            <div className="flex justify-between text-sm">
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
            </div>
        )
}

export default MusicPlayer
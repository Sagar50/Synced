import React from 'react'

function QueueSong( { ...song  }) {

    const artistNames = song.artists?.map((artist) => artist.name).join(", ");

    return (
        <div className='flex space-x-4 border-b-2 border-black p-2'>
            <img className="block h-[40px] w-[40px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/1577px-Question_mark_alternate.svg.png" alt="Album Pic" />
            <div className='flex-1'>
                <h3 className="text-md font-bold">{song.name}</h3>
                <p className="text-xs mt-1">{artistNames}</p>
            </div>
        </div>
    )
}

export default QueueSong
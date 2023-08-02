import React from 'react'

function SearchSong( { ...song  }) {

    const artistNames = song.artists?.map((artist) => artist.name).join(", ");

    const addSong = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                song_uri: song.uri,
            }),
        };
        fetch('/spotify/add-song', requestOptions);
    }

    return (
        <div className='flex space-x-4 border-b-2 border-black p-2'>
            <img className="block h-[40px] w-[40px]" src={song.album.images[0].url} alt="Album Pic" />
            <div className='flex-1'>
                <h3 className="text-md font-bold">{song.name}</h3>
                <p className="text-xs mt-1">{artistNames}</p>
            </div>
            <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {addSong()}}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default SearchSong
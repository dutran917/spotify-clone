import React, { useEffect,useState } from 'react'
import ListTrack from './ListTrack'
import axios from 'axios'
const DisplayPlaylist = ({playlist,token,setPlaying}) => {
    const [listTrack,setListTrack] = useState(null)
    useEffect(()=>{
        if(playlist.playlist_id !== null)
        {
            axios.get(`https://api.spotify.com/v1/playlists/${playlist.playlist_id}/tracks`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
            }).then((res)=>{
                console.log(res)
                if(res.data.items)
                {
                    let temp = []
                    res.data.items.forEach(item => {
                        temp.push(item.track)
                    })
                    setListTrack(temp)
                } 
            })
        }
    },[playlist])
    useEffect(()=>{
        console.log(listTrack)
    },[listTrack])
  return (
    <div className='display-playlist'>
        <div className='display-playlist-title' > 
            <img src={playlist.bg} style={{width:'250px',height:'250px'}}></img>
            <div style={{marginLeft:'20px'}}>
            <h3>Playlist</h3>
            <h1>{playlist.name}</h1>
            </div>
        </div>
        <ListTrack listTrack={listTrack} setPlaying={setPlaying}></ListTrack>
    </div>
  )
}

export default DisplayPlaylist
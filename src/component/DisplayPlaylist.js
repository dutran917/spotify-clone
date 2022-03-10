import React, { useEffect,useState } from 'react'
import ListTrack from './ListTrack'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setNewList } from '../action/list'
const DisplayPlaylist = ({playlist,token,playing,setPlaying,setPlayingIndex}) => {
    const [listTrack,setListTrack] = useState(null)
    const dispatch = useDispatch()
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
                    const action = setNewList(temp)
                    dispatch(action)
                } 
            })
        }
    },[playlist])
    useEffect(()=>{
        setPlayingIndex(0)
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
        <ListTrack listTrack={listTrack} playing={playing} setPlaying={setPlaying} setPlayingIndex={setPlayingIndex}></ListTrack>
    </div>
  )
}

export default DisplayPlaylist
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const PlaylistByUser = ({token,setDisplayPll}) => {
    const [list,setList] = useState(null)
    useEffect(()=>{
        axios.get('https://api.spotify.com/v1/me/playlists',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data)=>{
            setList(data.data.items)
        })
    },[])
    // useEffect(()=>{
    //     console.log(list)
    // },[list])
  return (
    <div>
        <h1 style={{marginLeft:'20px'}}>Playlist</h1>
        <div className='playlist'>
        {
          list ? list.map((item)=>
            <Link to={`playlist/${item.id}`} className='playlist-item' key={item.id} onClick={()=>{setDisplayPll({name: item.name, playlist_id: item.id, bg:item.images[0].url}) }}>
              <img src={item.images.length !==0 ? item.images[0].url : ''}></img>
              <h3>{item ? item.name : ''}</h3>
            </Link>
          ) : <>Nothing here today...</>
        }
        </div>
    </div>
  )
}

export default PlaylistByUser
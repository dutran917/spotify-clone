import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const PlaylistByCategory = ({token,cate,playlist,setDisplayPll}) => {
  useEffect(()=>{
  },[])
  
  const url = window.location.href
  return (
    <div>
        <h1 style={{marginLeft:'20px'}}>{cate ? cate : ""}</h1>
        <div className='playlist'>
        {
          playlist ? playlist.map((item)=>
            <Link to={`playlist/${item.id}`} className='playlist-item' key={item.id} onClick={()=>{setDisplayPll({name: item.name, playlist_id: item.id, bg:item.images[0].url}) }}>
              <img src={item.images[0].url}></img>
              <h3>{item.name}</h3>
            </Link>
          ) : <>Nothing here today...</>
        }
        </div>
    </div>
  )
}

export default PlaylistByCategory
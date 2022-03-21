import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CurrentUserPlaylist = ({token,setDisplayPll}) => {
    const [list,setList] = useState(null)
    useEffect(()=>{
        axios.get('https://api.spotify.com/v1/me/playlists',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data)=>{
            setList(data)
        })
    },[])
  return (
    <div className='user-playlist'>
    {
       list ? list.data.items.map((item)=>
       <Link key={item.id} className='user-playlist-item' to={`/playlist/${item.id}`} key={item.id} onClick={()=>{setDisplayPll({name: item.name, playlist_id: item.id, bg:item.images[0].url}) }}>
           {
               item.name
           }
           <div className='line'>        
            </div>
       </Link>
       ) : <></>
    }
    </div>
  )
}

export default CurrentUserPlaylist
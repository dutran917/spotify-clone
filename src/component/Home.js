import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({token,setPlaylistId,setPlaylist,setName}) => {
    const [cate,setCate] =  useState(null)
    useEffect(()=>{
        axios.get("https://api.spotify.com/v1/browse/categories",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data)=>{
            const data_ = data.data.categories.items
            data_.shift()
            setCate(data_)
        })
    },[])
    const getPlaylistByCategory = (category_id) => {    
        axios.get(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setPlaylist(res.data.playlists.items)
        })
    }
  return <div className='home'>
      <h1 style={{marginLeft:'20px'}}>Themed playlists</h1>
      <div className='cate-list' style={{display:"flex",flexWrap: "wrap", width: "100%"}}>
      {
          cate ? cate.map((item)=>
          <Link 
            to={`home/category/${item.id}`}
            className='categories' 
            key={item.id} 
            onClick = {()=>{
                getPlaylistByCategory(item.id)
                setPlaylistId(item.id)
                setName(item.name)
            }}
          >
              <img src={item.icons[0].url} width="200px" height="200px" ></img>
              <h3>{item.name}</h3>     
          </Link>
          ) : <></>
      }
      </div>
  </div>;
};

export default Home;

import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ListTrack from './ListTrack';
import {BsSearch} from 'react-icons/bs'
const Search = ({token,setPlaying}) => {
  const [listTrack,setListTrack] = useState(null)
  const [search,setSearch] = useState("")

  const searchTrack = async (e) => {
      const x = document.getElementById('search')
      e.preventDefault()
      const data =await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: search,
          type: "track"
      }
      })
      console.log(data)
      setListTrack(data.data.tracks.items)
      x.reset()
  } 
  useEffect(()=>{
    console.log(listTrack)
  },[listTrack])
  return <div className='search'>
      <form id='search' className='search-form' onSubmit={(e)=>searchTrack(e)}>
          <input placeholder='enter the name of song...' onChange={(e)=> setSearch(e.target.value)}></input>
          <BsSearch size='30px' className='search-btn' onClick={(e)=>searchTrack(e)}></BsSearch>
      </form>
      <ListTrack listTrack={listTrack} setPlaying={setPlaying}></ListTrack>
  </div>;
};

export default Search;

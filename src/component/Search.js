import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListTrack from './ListTrack';
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { setNewList } from '../action/list';
const Search = ({ token, playing, setPlaying, setPlayingIndex }) => {
    const listTrack = useSelector(state => state.listTrack)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const searchTrack = async (e) => {
        const x = document.getElementById('search')
        e.preventDefault()
        const data = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: search,
                type: "track"
            }
        })
        const action = setNewList(data.data.tracks.items)
        dispatch(action)
        x.reset()
    }
    return <div className='search'>
        <form id='search' className='search-form' onSubmit={(e) => searchTrack(e)}>
            <input placeholder='enter the name of song...' onChange={(e) => setSearch(e.target.value)}></input>
            <BsSearch size='30px' className='search-btn' onClick={(e) => searchTrack(e)}></BsSearch>
        </form>
        <ListTrack listTrack={listTrack} playing={playing} setPlaying={setPlaying} setPlayingIndex={setPlayingIndex}></ListTrack>
    </div>;
};

export default Search;

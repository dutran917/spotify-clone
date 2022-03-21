import React, { useEffect, useState } from 'react';
import {BiLogOut} from 'react-icons/bi'
import {BrowserRouter as Router,Route,Link, Redirect}  from "react-router-dom";
import {AiFillHome,AiOutlineSearch,AiOutlineUnorderedList,AiFillLike} from "react-icons/ai"
import {GrSpotify} from "react-icons/gr"
import Home from './Home';
import Search from './Search';
import PlayController from './PlayController';
import PlaylistByCategory from './PlaylistByCategory';
import DisplayPlaylist from './DisplayPlaylist';
import CurrentUserPlaylist from './CurrentUserPlaylist';
import PlaylistByUser from './PlaylistByUser';
import { useSelector } from 'react-redux';
const Mainpage = ({token,user,logout}) => { 
    const [url,setUrl] = useState('/')
    const [playing,setPlaying] = useState(null)
    const [playingIndex,setPlayingIndex] = useState(0)
    const [playlistId,setPlaylistId] = useState()
    const [playlist,setPlaylist] = useState(null)
    const [name,setName] = useState("")
    const listTrack = useSelector(state => state.listTrack)
    useEffect(() => {
        setPlaying(listTrack[playingIndex])
    },[playingIndex])
    const next = () => {
        if(playingIndex === listTrack.length - 1) {
            setPlayingIndex(0)
        }
        else {
            setPlayingIndex(playingIndex + 1)
        }
    }
    const prev = () => {
        if(playingIndex === 0) {
            setPlayingIndex(listTrack.length - 1)
        }
        else {
            setPlayingIndex(playingIndex - 1)
        }
    }
    const [displayPll,setDisplayPll] = useState({
        name: "",
        playlist_id: null,
        bg: ""
    })
    const style = {
        link: {
            background: "gray",
            width: "100%",
            height:"100%",
            position:"absolute",
            zIndex: "-1",
            borderRadius: "10px",
            left: "-15px"
        }
    }

    return <Router>
        <div className='mainpage'>
        {user!=null && <div className='user'>
            <img src={user.images[0].url}></img>
            <p>{user.display_name}</p>
            <BiLogOut size="30px" style={{cursor:"pointer"}} onClick={logout}></BiLogOut>
            </div>}
            <div className="test-router">
                <div className = "menu">
                    <Link to="/home" className="logo"> 
                        <GrSpotify size="50px"></GrSpotify>
                        <h2>Spotify</h2>
                    </Link>
                    <div className="nav">
                        <Link to="/home" className="link" onClick={()=>setUrl('/')}>
                            <AiFillHome size="35px"></AiFillHome>
                            <h5>Home</h5>
                            {url=="/" && <div style={style.link}> </div>}
                        </Link>
                        <Link to="/search" className="link" onClick={()=>setUrl('/search')}>
                            <AiOutlineSearch size="35px"></AiOutlineSearch>
                            <h5>Search</h5>
                            {url=="/search" && <div style={style.link}></div>}
                        </Link>
                        <Link to="/playlist" className="link" onClick={()=>setUrl('/collection/playlist')}>
                            <AiOutlineUnorderedList size="35px"></AiOutlineUnorderedList>
                            <h5>Playlist</h5>
                            {url=="/collection/playlist" && <div style={style.link}></div>}
                        </Link>
                    </div>
                    <CurrentUserPlaylist token={token} setDisplayPll={setDisplayPll}></CurrentUserPlaylist>
                </div>
                <div className='main-content'>
                    <Route exact path="/">
                        {token ? <Redirect to="/home" /> : <></>}
                    </Route>
                    <Route exact path='/home'>
                        <Home token={token} setPlaylist={setPlaylist} setPlaylistId={setPlaylistId} setName={setName}></Home>
                    </Route>
                    <Route exact path='/search'>
                        <Search token={token}  playing={playing} setPlaying={setPlaying} setPlayingIndex={setPlayingIndex} playingIndex={playingIndex}></Search>
                    </Route>
                    <Route exact path='/playlist'>
                        <PlaylistByUser token={token} setDisplayPll={setDisplayPll}></PlaylistByUser>
                    </Route>
                    <Route exact path={`/home/category/${playlistId}`}>
                        <PlaylistByCategory token={token} cate={name} playlist={playlist} setDisplayPll={setDisplayPll}></PlaylistByCategory>
                    </Route>
                    <Route exact path={`/home/category/playlist/${displayPll.playlist_id}`}>
                    <DisplayPlaylist token={token} playlist={displayPll} playing={playing} setPlaying={setPlaying} setPlayingIndex={setPlayingIndex} playingIndex={playingIndex}></DisplayPlaylist>
                    </Route>
                    <Route exact path={`/playlist/${displayPll.playlist_id}`}>
                        <DisplayPlaylist token={token} playlist={displayPll} playing={playing}  setPlaying={setPlaying} setPlayingIndex={setPlayingIndex} playingIndex={playingIndex}></DisplayPlaylist>
                    </Route>
                </div>
                <PlayController item={playing} next={next} prev={prev}></PlayController>
            </div>
        </div>
    </Router>

};

export default Mainpage;

import React from 'react'
import {FcLike} from "react-icons/fc"
import {ImPause,ImNext, ImPlay2,ImPrevious} from "react-icons/im"
import {BsFillVolumeMuteFill} from "react-icons/bs"
import { useState,useRef,useEffect} from 'react'
const PlayController = ({item,next,prev}) => {
    const [playing_song,setPlaying ]= useState(false)
    const [duration,setDuration] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const [percent,setPercent] = useState(0)
    const audioRef = useRef()
    const [position,setPosition] = useState(0)
    const [volume,setVolume] = useState(50)
    useEffect(()=>{
        console.log(item)
    },[item])
    function justplay(){
        if(item.preview_url)
        {
            const audio = audioRef.current
            
            if(!playing_song)
            {
                setPlaying(true)
                
                audio.play()
            }
            if(playing_song)
            {
                setPlaying(false)
                audio.pause()
            }
        }
    }
    function onchange(e){
        if(item != null)
        {
            const audio = audioRef.current
            audio.currentTime = (audio.duration / 100) * e.target.value
            setPercent(e.target.value)
        }
       }
    function changeVolume(e) {
        setVolume(e.target.value)
    }
 

    function getCurrDuration(e){
        const per =((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime
        setPercent(+per)
        setCurrentTime(time.toFixed(2)) 
    }
    function secondsToMin(seconds){
        if(!seconds) return '00 : 00'
        let dura = seconds
        let hours = dura / 3600
        dura = dura % 3600
        let min = parseInt(dura / 60)
        dura = dura % 60
        let sec = parseInt(dura)
        if(sec < 10){
            sec = `0${sec}`
        }
        if(min < 10){
            min = `0${min}`
        }
        if(parseInt(hours,10) > 0){
            return `${parseInt(hours,10)} : ${min} : ${sec}`
        }
        else if(min == 0){
            return `00 : ${sec}`
        }
        else {
            return `${min} : ${sec}`
        }
    }
    useEffect(()=>{
        if(item)
        {
            setPosition(percent)
            const audio = audioRef.current
            audio.volume = volume/100 
        }
    },[percent,volume])
    useEffect(()=>{
        console.log(position)
        setPlaying(false)
        // setPosition(0)
        setCurrentTime(0)
    },[item])
  return (
    item ? <div className="playing">
    <div className="left">
    <img src={item.album.images[2].url} height="60px" width="60px"></img>
    <div className="info">
        <p className="track-title" style={{fontWeight:'600'}}>{item.name}</p>
        <p className="track-artist" style={{color:'#cccccc'}}>{item.artists[0].name}</p>
    </div>
  
    </div>
    <div className="middle">
        <div className="control">  
            <ImPrevious id="pre" className="butcontrol" onClick={() => {
                prev()
                const audio = audioRef.current
                audio.pause()
            }}></ImPrevious> 
            {playing_song==false && <ImPlay2 id="play" className="butcontrol" onClick={()=>justplay()}></ImPlay2> }
            {playing_song && <ImPause className="butcontrol" onClick={()=>justplay()}></ImPause>}
            <ImNext id="next"  className="butcontrol" onClick={() => {
                next()
                const audio = audioRef.current
                audio.pause()
            }}></ImNext> 
        </div>
            <p className="currentTime">{secondsToMin(currentTime)}</p>
        <div className="duration">
            {item!=null && <input type="range" min="0" max="100" value={position}  step="0.01"  onChange={(e)=>onchange(e)}/>}
        </div>
            <p className="totalTime">{secondsToMin(duration)}</p>
       
        {item!= null &&
        <audio 
        ref={audioRef} 
        src = {item.preview_url}
        onLoadedData = {(e)=>{
            console.log(e.currentTarget.duration)
            setDuration(e.currentTarget.duration.toFixed(2))
        }}
        onTimeUpdate = {getCurrDuration}
        
        >        
        </audio>
        }
    </div>
    <div className="right">
        
        <div className="volume">
        {volume==0 && <BsFillVolumeMuteFill size="20"></BsFillVolumeMuteFill>}
        {volume!=0 && <p> {volume} </p>}
        </div>
        <div className="volume-control">
            <input type="range" min="0" max="100" value={volume} id="volume_bar" onChange={(e)=>changeVolume(e)}/>
        </div>
    </div>
    </div>
    : <></>
  )
}

export default PlayController
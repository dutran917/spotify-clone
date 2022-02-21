import React from 'react'
import {BiTimeFive} from 'react-icons/bi'
const ListTrack = ({listTrack,setPlaying}) => {
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  return (
        listTrack ?
        <table className='list-track'>
        <tr>
            <td></td>
            <td>NAME</td>
            <td>RELEASED DATE</td>
            <td>
                <BiTimeFive></BiTimeFive>
            </td>
        </tr>
        {
            listTrack!==null && listTrack.map((item)=>
            <tr className='list-track-item' onClick={()=>setPlaying(item)}>
                <td><img src={item.album.images[2].url} ></img></td>
                <td>
                    <p style={{marginBottom:'2px',fontWeight:'600'}}>{item.name}</p>
                    <div>
                    {item.artists.map((artist=>
                     <p  style={{display:'inline',color:'#cccccc'}}>{artist.name} </p>   
                        ))}
                    </div>
                </td>
                <td><p>{item.album.release_date}</p></td>
                <td>{millisToMinutesAndSeconds(item.duration_ms)}</td>
            </tr>
            )
        }
    </table>
    : <></>
  )
}

export default ListTrack
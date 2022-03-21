import React from 'react'
import { BiTimeFive } from 'react-icons/bi'
const ListTrack = ({ listTrack, playing, setPlaying, setPlayingIndex }) => {

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        <div>
            {
                listTrack.length > 0 ?
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
                            listTrack.map((item, index) =>
                                <tr className={item === playing ? 'list-track-item-playing' : 'list-track-item'} key={item.id} onClick={() => {
                                    setPlaying(item)
                                    setPlayingIndex(index)
                                }}>
                                    <td><img src={item.album.images[2].url} ></img></td>
                                    <td>
                                        <p style={{ marginBottom: '2px', fontWeight: '600' }}>{item.name}</p>
                                        <div>
                                            {item.artists.map((artist =>
                                                <p key={artist.id} style={{ display: 'inline', color: '#cccccc' }}>{artist.name} </p>
                                            ))}
                                        </div>
                                    </td>
                                    <td><p>{item.album.release_date}</p></td>
                                    <td>{millisToMinutesAndSeconds(item.duration_ms)}</td>
                                </tr>
                            )
                        }
                    </table > : <></>
            }
        </div>
    )
}
export default ListTrack
import {useState, useEffect} from 'react'
import axios from 'axios'
import Mainpage from './component/Mainpage'
import './App.css'
import {BsSpotify} from 'react-icons/bs'

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")
  const [user,setUser] = useState(null)
  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }
      setToken(token)
      axios.get('https://api.spotify.com/v1/me',{
      headers: {
        Authorization: `Bearer ${token}`
      }
      }).then((res)=>{
        console.log(res.data)
        setUser(res.data)
      })
  }, [token])

  useEffect(() => {
    setTimeout(() => {
      setToken("")
      window.localStorage.removeItem("token")
    },600000)
  },[])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  return (
      <div className="App">
      {
        !token ? <div className='login'>
        <div className='login-form'>
          <div style={{display:'flex', alignItems: 'center', width: '100%', justifyContent: 'center', fontSize: '30px', height:'60px',marginBottom: '50px'}}> 
            <BsSpotify></BsSpotify>
            <p style={{marginLeft: '5px'}}>LOGIN</p>
          </div>
       
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private`}>
              <div className='btn-lg'>
                LOGIN TO SPOTIFY  
              </div>  
            </a>
     
        </div>
        </div> : 
       <Mainpage token={token} user={user} logout={logout}></Mainpage>
      }
      </div>
  );
}

export default App;
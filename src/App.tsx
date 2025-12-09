import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [userData, setUserData] = useState({})

  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: '/api/users/user-details/'
  //   })
  //   .then((response) => {
  //     console.log(response);
      
  //     setUserData(response)
  //   })
  // })

  return (
    <div>
      Hello guys!
      <h2>
        {/* {userData} */}
      </h2>
    </div>
  )
}

export default App

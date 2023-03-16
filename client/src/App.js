import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router';

import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";



function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch('/me')
    .then(r => {
      if (r.ok){
        r.json().then(user => setCurrentUser(user))
      }
    })
  }, [])

  
  return (
    <>
    <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
    <Routes>
      <Route path='/signup' element={<Signup setCurrentUser={setCurrentUser}/>} />
      <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} /> } />
      <Route path='/home' element={<Home currentUser={currentUser} />} />
      <Route path='/profile/:id' element={<UserProfile currentUser={currentUser} />} />
      <Route path='/profile' element={<Profile currentUser={currentUser} />} />
    </Routes>
    </>
  );
}


export default App;
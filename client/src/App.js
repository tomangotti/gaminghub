import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router';

import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Games from "./components/Games";
import GamePage from "./components/GamePage";



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
  const body = document.getElementsByTagName('body')[0];
  
  if(currentUser){
    if(currentUser.about){
      console.log(currentUser.about.background_image)
        body.style.backgroundImage = `url(${currentUser.about.background_image})`
    } 
  }

  return (
    <div className="websiteContainer" >
    <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
    <Routes>
      <Route exact path="/" />
      <Route path='/signup' element={<Signup setCurrentUser={setCurrentUser}/>} />
      <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} /> } />
      <Route path='/home' element={<Home currentUser={currentUser} />} />
      <Route path='/profile/:id' element={<UserProfile currentUser={currentUser} />} />
      <Route path='/profile' element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      <Route path='/games' element={<Games currentUser={currentUser}/>} />
      <Route path='/games/:id' element={<GamePage currentUser={currentUser}/>} />
    </Routes>
    </div>
  );
}


export default App;
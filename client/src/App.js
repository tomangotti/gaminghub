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
  let background_image = "https://img.freepik.com/premium-vector/random-geometric-shapes-pattern-abstract-background-geometrical-simple-illustration-creative-ans-luxury-style_510351-3974.jpg?w=2000"
  if(currentUser){
    if(currentUser.about){
      if(currentUser.about.background_image){
        background_image = currentUser.about.background_image
      }
    } 
  }

  return (
    <div className="websiteContainer" style={{backgroundImage: `url(${background_image})`}}>
    <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
    <Routes>
      <Route path='/signup' element={<Signup setCurrentUser={setCurrentUser}/>} />
      <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} /> } />
      <Route path='/home' element={<Home currentUser={currentUser} />} />
      <Route path='/profile/:id' element={<UserProfile currentUser={currentUser} />} />
      <Route path='/profile' element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      <Route path='/games' element={<Games />} />
      <Route path='/games/:id' element={<GamePage />} />
    </Routes>
    </div>
  );
}


export default App;
import { useState } from "react";
import { Routes, Route } from 'react-router';

import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  if(currentUser === null){
    return (
    <>
    <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </>
    )
  } else{
  return (
    <Routes>
      <Route path='/home' element={<Home currentUser={currentUser} />} />
    </Routes>
  );
}
}

export default App;
import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
    </>
  )
}

export default App

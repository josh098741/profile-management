import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return(
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={< Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )  
}

export default App

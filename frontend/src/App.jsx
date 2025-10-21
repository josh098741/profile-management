import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectRoute from './components/ProtectRoute'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return(
    <div className="flex flex-col">
      <div className="">
        <Header />
        <Toaster />
      </div>
      <div className="flex flex-1">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/home" 
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            } 
          />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )  
}

export default App

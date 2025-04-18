
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/shared/Header'
import SignupFrom from './auth/SignupFrom'
import Home from './pages/Home'
import SigninFrom from './auth/SigninFrom'
import About from './pages/About'
import Tasks from './pages/Tasks'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import '/src/App.css' 
import PrivateRoute from './component/shared/PrivateRoute'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>

       
       <Route path="/sign-up" element={<SignupFrom />} />
       <Route path="/sign-in" element={<SigninFrom />} />
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/task" element={<Tasks />} />
       <Route path="/contact" element={<Contact />} />
       <Route element={<PrivateRoute />}>
       <Route path="/dashboard" element={<Dashboard />} />
       </Route>

      </Routes>
      <Footer />
      
      </BrowserRouter>
    </div>
  )
}

export default App
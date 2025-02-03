
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/shared/Header'
import SignupFrom from './auth/SignupFrom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>

       
       <Route path="/signup" element={<SignupFrom />} />

      </Routes>
      
      
      </BrowserRouter>
    </div>
  )
}

export default App
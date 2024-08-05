import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Projects } from './pages/Projects.tsx'
import { Profile } from './pages/Profile.tsx'
import { NotFound } from './pages/NotFound.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

          <BrowserRouter > 
        <Routes>

        <Route path='/' element ={<App />} />  
        <Route path='/projects' element ={<Projects />} />  
        <Route path='/profile' element ={<Profile />} />  
        <Route path='*' element ={<NotFound />} />  
        </Routes> 
      </BrowserRouter>


)

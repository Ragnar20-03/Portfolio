

import { useEffect, useState } from 'react'
import './App.css'

import { Nav } from './components/Nav'



function App() {
  const [msg, setMsg] = useState<any | Response> (null)
  
  return (
    <>
      <Nav />

    </>

  )
}

export default App

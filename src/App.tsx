import { useEffect, useState } from 'react'
import './App.css'
import { fetchEvents } from './service/DataService';

function App() {

  useEffect(() => {
    fetchEvents.then();
  },[]);

  return (
    <>
    <p>coucou</p>
    </>
  )
}

export default App

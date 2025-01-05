import { useState } from 'react';
import './App.css'
import { PlayGroundComponent } from './component/PlayGroundComponent';
import { StartingComponent } from './component/StartingComponent';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted ?
        <StartingComponent start={setIsStarted} />
        :
        <PlayGroundComponent />
      }
    </>
  )
}

export default App

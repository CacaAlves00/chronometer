import { useEffect, useState } from 'react'
import './App.scss'
import LengthCounter from './components/LengthCounter'
import Timer from './components/Timer'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)

  useEffect(() => {
    if (breakLength < 1)
      setBreakLength(0)
    else if (breakLength > 60)
      setBreakLength(60)
  }, [breakLength])

  useEffect(() => {
    if (sessionLength < 1)
      setSessionLength(0)
    else if (sessionLength > 60)
      setSessionLength(60)
  }, [sessionLength])

  return (
    <div className='App'>
      <h1>25 + 5 Clock</h1>
      <div id='length-counters-container'>
        <LengthCounter name='session' length={sessionLength} setLength={setSessionLength} />
        <LengthCounter name='break' length={breakLength} setLength={setBreakLength} />
      </div>
      <Timer sessionLength={sessionLength} breakLength={breakLength} />
    </div>
  )
}

export default App

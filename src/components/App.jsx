import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'
import { Joystick } from 'react-joystick-component';

import './styles/app.scss';

function App() {

  const [position, setPosition] = useState({ x: 400, y: 400 })
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 })

  const [isMove, setIsMove] = useState(false);
  const [isBorder, setIsBorder] = useState(false);

  const config = {
    border: { top: 0, left: 0, right: 750, bottom: 750 }
  }


  useEffect(() => {

    if (position.x + newPosition.x > 0 && position.x + newPosition.x < 750 && position.y - newPosition.y > 0 && position.y - newPosition.y < 750) {
      
    }
    
    if (position.x + newPosition.x > 0 && position.x + newPosition.x < 750 && position.y - newPosition.y > 0 && position.y - newPosition.y < 750) {
      
    }

    setPosition({ x: position.x + newPosition.x, y: position.y - newPosition.y })

  }, [newPosition])

  useEffect(() => {

    setTimeout(() => {
      if (isMove && checkBorder()) {
        setPosition({ x: position.x + newPosition.x, y: position.y - newPosition.y })
      }
    }, 1)
  }, [position])

  const checkBorder = () => {
    if (position.x > 0 && position.x < 750 && position.y > 0 && position.y < 750) {

      return true;
    }

    return false;
  }

  const handleMove = (IJoystickUpdateEvent) => {

    setNewPosition({ x: IJoystickUpdateEvent.x * .9, y: IJoystickUpdateEvent.y * .9 })

  }

  const handleStart = () => {
    setIsMove(true)
  }

  const handleStop = () => {
    setIsMove(false)
  }

  return (
    <div className='main'>
      <div className='game'>
        <div className='joystick'>
          <Joystick start={handleStart} move={handleMove} stop={handleStop} />
        </div>
        <Canvas position={position} />
      </div>
    </div>
  )
}

export default App
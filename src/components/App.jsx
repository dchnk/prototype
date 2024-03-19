import { useEffect, useState } from 'react'
import Canvas from './Canvas'
import { Joystick } from 'react-joystick-component';

import './styles/app.scss';

function App() {

  const [position, setPosition] = useState({ x: 400, y: 400 })
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 })

  const [isMove, setIsMove] = useState(false);
  const [speed, setSpeed] = useState(.7);

  // const config = {
  //   border: { top: 0, left: 0, right: 750, bottom: 750 }
  // }


  useEffect(() => {
    checkBorder(position, newPosition);
  }, [newPosition])

  useEffect(() => {
    setTimeout(() => {
      if (isMove) {
        checkBorder(position, newPosition);
      }
    }, 1)
  }, [position])

  const checkBorder = (position, newPosition) => {
    if (position.x + newPosition.x < 70 || position.x + newPosition.x > 680) {
    
      console.log('first')
      if (position.y - newPosition.y < 70 || position.y - newPosition.y > 680) {
        return setPosition({ x: position.x, y: position.y })
      }

      return setPosition({ x: position.x, y: position.y - newPosition.y });
    }


    if (position.y - newPosition.y < 70 || position.y - newPosition.y > 680) {
      if (position.x + newPosition.x < 70 || position.x + newPosition.x > 680) {
        return setPosition({ x: position.x, y: position.y })
      }

      return setPosition({ x: position.x + newPosition.x, y: position.y });
    }

    setPosition({ x: position.x + newPosition.x, y: position.y - newPosition.y })
  }

  const handleMove = (IJoystickUpdateEvent) => {
  console.log(IJoystickUpdateEvent)
    setNewPosition({ x: IJoystickUpdateEvent.x * speed, y: IJoystickUpdateEvent.y * speed })
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
          <Joystick
            start={handleStart}
            move={handleMove}
            stop={handleStop}
            size={80}
            baseColor={'#d5d5d580'}
            stickColor={'#000000b0'}
          />
        </div>
        <Canvas position={position} />
      </div>
    </div>
  )
}

export default App
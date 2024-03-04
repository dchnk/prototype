import React, { useEffect, useRef, useState } from 'react'
import './styles/canvas.scss';
// import CanvasMethods from './canvas-elements/canvas';

function Canvas({ position }) {
  const canvasRef = useRef()
  let ctx, canvas;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drowHero()
  }, [position])


  const drowHero = (x = position.x, y = position.y) => {
    ctx.fillStyle = 'red';
    
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    ctx.closePath();
    ctx.fill();
  }




  return (
    <div className='container'>
      <canvas className='canvas' ref={canvasRef}  width={800} height={800}/>
    </div>
  )
}

export default Canvas
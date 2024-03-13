import React, { useEffect, useRef, useState } from 'react'
import './styles/canvas.scss';
import map from '../img/map.png'
import cook from '../img/cook.png'

let ctx, canvas, mapImg, cookImg;
function loadImage(image, cors = true) {
  return new Promise((resolve) => {
  
    if (!image) return resolve(null);

    const img = new Image();

    img.crossOrigin = cors ? 'use-credentials' : 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = image;
  });
}

loadImage(map).then((res) => {

  mapImg = res;

})

loadImage(cook).then((res) => {

  cookImg = res;

})

function Canvas({ position }) {
  const canvasRef = useRef()

  useEffect(() => {  
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
  }, [])

  useEffect(() => {
  
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!mapImg && !cookImg) return;
    ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height)
    drowHero()
  }, [position])


  const drowHero = (x = position.x, y = position.y) => {
    // ctx.beginPath();
    ctx.drawImage(cookImg, x, y, 50, 50)
    // ctx.closePath();
    // ctx.fill();
  }




  return (
    <div className='container'>
      <canvas className='canvas' ref={canvasRef} width={800} height={800} />
    </div>
  )
}

export default Canvas
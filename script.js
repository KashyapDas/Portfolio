// setting the cursor
window.addEventListener("mousemove",(e)=>{
    gsap.to("#cursor",{
        left : e.clientX,
        top : e.clientY,
        duration : 0.5,
        opacity : 1,
    })
})

// MAKING THE CANVAS 
import Grid2Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.17/build/backgrounds/grid2.cdn.min.js'
Grid2Background(document.getElementById('webgl-canvas'))

// MASK MAGNET USING SHERY JS
Shery.makeMagnet("#menu", {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

Shery.makeMagnet("#kashyap", {
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
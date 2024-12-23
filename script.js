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
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });

Shery.makeMagnet("#kashyap", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
// gsap implementation for black screen animation
const tl = gsap.timeline();
window.addEventListener("load",()=>{
  document.querySelector("body").style.overflow = "hidden";
  tl.to("#bar",{
    width : "105%",
    duration : 2.5,
    ease : "power2.inOut"
  },0)
  .to(".black1",{
    height : "100%",
    duration : 0.8,
    ease: "circ.out",
  },2)
  .to(".black2",{
    height : "100%",
    duration : 0.8,
    ease: "circ.out",
  },2)
  tl.from("#black-heading h1",{
    x : 1000,
    opacity : 0,
    duration : 1,
    ease : "circ.out"
  })
  tl.to("#black-div",{
    y : "-100%",
    duration : 1.3,
    delay : 0.2,
    ease : "power4.inOut",
    onended: ()=>{
      document.querySelector("body").style.overflowY = "auto" 
      setTimeout(()=>document.querySelector("#black-div").style.display = "none",900);
    }
  })
})

// menu will open when click on menu btn
const menu = document.querySelector("#menu");
const icon1 = document.querySelector(".ri-arrow-right-line");
let menuFlag = false;

menu.addEventListener("click",()=>{
  document.querySelector("body").style.overflow = "hidden";
  if(!menuFlag)
  {
    gsap.to("#menuPage",{
      left : "0%",
      opacity : 1,
      duration : 1.5,
      delay : 0.1,
      ease : "expo.inOut",
    })
    menuFlag = true;
  }
})

icon1.addEventListener("click",()=>{
  document.querySelector("body").style.overflowY = "auto"
  if(menuFlag)
    {
      gsap.to("#menuPage",{
        left : "100%",
        opacity : 0,
        duration : 1.5,
        delay : 0.1,
        ease : "expo.inOut",
      })
      menuFlag = false;
    }
    console.log("icon1")
})

icon1.addEventListener('mouseenter', () => {
  gsap.to(icon1, {
    scale : 1.02, 
    duration: 0.3,
    ease: "power2.out"
  });
});
icon1.addEventListener('mouseleave', () => {
  gsap.to(icon1, {
    scale: 1, 
    duration: 0.3,
    ease: "power2.out"
  });
});





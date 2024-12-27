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
// menu animation on click the menu's button
  const menus = document.querySelectorAll(".optionHover");
  let targetSection;
  menus.forEach((menu)=>{
    menu.addEventListener("click",()=>{
      menuFlag = false;
      gsap.to("#menuPage",{
        left : "100%",
        opacity : 0,
        ease : "expo.inOut",
      })
    })
  })  
// Icon Scale animation 
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

// Page 2 Summary Animation using Scroll Trigger

// breaking the h1 content into span. 
let page2Heading  = document.querySelector(".page2Heading");
const clutter = page2Heading.textContent.split("");
page2Heading.textContent = "";
for(let i=0; i<clutter.length; i++)
{
  const span = document.createElement("span");
  span.textContent = clutter[i];
  page2Heading.appendChild(span);
}

gsap.to("#leftPage2 h1 span",{
    color : "antiquewhite",
    opacity : 1,
    stagger : 0.1,
    scrollTrigger : {
      trigger : "#leftPage2 h1 ",
      scroller : "body",
      // markers : true,
      start : "top 90%",
      end : "top 10%",
      scrub : 1,
    }
});

// Page2 right side image effect
Shery.imageEffect(".images", {
  style: 1,
  scrollSnapping: true,
  scrollSpeed: 6,
  touchSpeed: 6,
  damping: 7,
});

// page 3 whole animation

$(document).ready(function () {
  // Image Animation
  const items = document.querySelectorAll(".anime-list li");
  items.forEach((el) => {
    gsap.set(".hover-img", { xPercent: -50, yPercent: -50 });
    const image = el.querySelector(".hover-img");
    const innerImage = el.querySelector(".hover-img img");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = {
      x: pos.x
    };
    const speed = 0.1;
    const xSet = gsap.quickSetter(image, "x", "px");
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      xSet(pos.x);
    });

    var direction = "",
      oldx = 0,
      // Vars
      lastCursorX = null,
      lastCursorY = null,
      cursorThreshold = 150,
      mousemovemethod = function (e) {
        if (e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshold) {
          direction = "left";
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(-15deg)";
        } else if (
          e.pageX > oldx &&
          e.clientX >= lastCursorX + cursorThreshold
        ) {
          direction = "right";
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(15deg)";
        }
        oldx = e.pageX;
      };
    $(document).on("mousemoveend", function () {
      innerImage.style.transform = "translateX(0%) rotate(0deg)";
    });
    document.addEventListener("mousemove", mousemovemethod);
    (function ($) {
      var timeout;
      $(document).on("mousemove", function (event) {
        if (timeout !== undefined) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
          $(event.target).trigger("mousemoveend");
        }, 100);
      });
    })(jQuery);
  });

  // Hacky Code
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;
  const list = document.querySelectorAll(".anime-list li");

  list.forEach((el) => {
    el.onmouseenter = (event) => {
      const target_element = event.target.querySelector("h2");
      let iteration = 0;
      const interval = setInterval(() => {
        target_element.innerText = target_element.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return target_element.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= target_element.dataset.value.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 20);
    };
  });
});


// disable the inspect screen for the security purpose

// Disable right-click option 
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Disable F12 and other shortcuts for DevTools
document.addEventListener('keydown', function(event) {
  if (event.key === 'F12' || 
      (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C')) || 
      (event.ctrlKey && event.key === 'U')) {
      event.preventDefault();
  }
});

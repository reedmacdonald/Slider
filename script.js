
let spanObject={}
let activespan=-1;
let transitionTime = 500;

const createspanObject = () => {
    const navspans = document.querySelectorAll('span');
    Array.from(navspans).forEach(function (navspan) {
        spanObject[navspan.innerText]={left:navspan.offsetLeft+'px', width:navspan.offsetWidth+'px'};
    });
};
getTime = (diff) => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let hourFinal=hours+Number(diff);
    if (hourFinal>24){
        hourFinal=hourFinal-24;
    }
    document.querySelector('.hours').innerHTML = hourFinal;
     document.querySelector('.minutes').innerHTML = minutes;

}
const moveSlider = () => {
    const navspans = document.querySelectorAll('span');
    const slider = document.querySelector('#slider');
    
    Array.from(navspans).forEach(function (navspan,index) {        
        navspan.addEventListener('click', function () {
            navspans[activespan]?.classList?.remove('selected');
            navspans[activespan]?.classList?.remove('underlined');
            //Unhide slider to begin sliding animation
            slider.classList.remove('hidden');
            slider.style.left = spanObject[navspan.innerText].left;
            slider.style.width = spanObject[navspan.innerText].width;
            navspan.classList.add('selected');
            activespan=index;
            const hourDif=navspan.dataset.timedif;
            getTime(hourDif);
            setTimeout(() => {
                //Remove all underlines to prepare for rare case where user clicks faster than animations
                Array.from(navspans).forEach(function (navspan) {
                    navspan.classList.remove('underlined');
                 });
                navspan.classList.add('underlined')
                //Hide the slider once it has finished sliding for easier resizing
                slider.classList.add('hidden');
            }, transitionTime);
        });
    });
};

window.onload = function () {
    createspanObject();
    getTime(0);
    moveSlider(spanObject);
  };

  window.addEventListener("resize",debounce(function(){
        createspanObject();
  }));


  
  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }
  

let labelObject={}
let activeLabel=-1;
let transitionTime = 500;

const createLabelObject = () => {
    const navLabels = document.querySelectorAll('label');
    Array.from(navLabels).forEach(function (navLabel) {
        labelObject[navLabel.innerText]={left:navLabel.offsetLeft+'px', width:navLabel.offsetWidth+'px'};
    });
};
const moveSlider = () => {
    const navLabels = document.querySelectorAll('label');
    const slider = document.querySelector('#slider');
    
    Array.from(navLabels).forEach(function (navLabel,index) {        
        navLabel.addEventListener('click', function () {
            navLabels[activeLabel]?.classList?.remove('selected');
            navLabels[activeLabel]?.classList?.remove('underlined');
            //Unhide slider to begin sliding animation
            slider.classList.remove('hidden');
            slider.style.left = labelObject[navLabel.innerText].left;
            slider.style.width = labelObject[navLabel.innerText].width;
            navLabel.classList.add('selected');
            activeLabel=index;
            setTimeout(() => {
                //Remove all underlines to prepare for rare case where user clicks faster than animations
                Array.from(navLabels).forEach(function (navLabel) {
                    navLabel.classList.remove('underlined');
                 });
                navLabel.classList.add('underlined')
                //Hide the slider once it has finished sliding for easier resizing
                slider.classList.add('hidden');
            }, transitionTime);
        });
    });
};

window.onload = function () {
    createLabelObject();
    moveSlider(labelObject);
  };

  window.addEventListener("resize",debounce(function(){
        createLabelObject();
  }));
  
  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }
  
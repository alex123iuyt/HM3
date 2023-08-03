// Необходимо написать скрипт, который будет экспортировать функцию/класс для создания слайдера.

// Функция/Конструктор получает на вход айднишник контейнера с картинкам и объект с параметрами.

// Необходимо через скрипт сделать слайдер со следующими параметрами вызова:

// - id контейнера (обязательно)

// - циклится или нет (обязательно)

// - количество слайдов на одном фрейме слайдера (обязательно)

// - кнопки управления (обязательно)

// - скрыть кнопки или нет (необязательно)

// - автопрокручивание (необязательно)

// - интервал прокрутки (необязательно)

// const createSlider = (options) => {
//     const slider = document.getElementById('slider');
//     const imageSlider = slider.querySelectorAll('.imageSlider');
//     const dot = slider.querySelectorAll('.dot');
//     const leftArrow = slider.querySelector('.left-arrow');
//     const rightArrow = slider.querySelector('.right-arrow');
//     const controls = slider.querySelector('.slider-control');
  
//     dot[0].classList.add('selectImage');
//     imageSlider[0].classList.add('selectImage');
  
//     let counter = 0;
//     let visibleSlides = options.maxSlides || 1;


// if (!options.controls) {
//     controls.style.display = 'none';
//   }
  
//   const sliderSize = ()=>{
//     slider.style.width =`${100/visibleSlides}%`
//   }


// leftArrow.addEventListener('click',()=>{
//     for(let i = 0; i<imageSlider.length; i++){
//         dot[i].classList.remove('selectImage')
//         imageSlider[i].classList.remove('selectImage')
//     }
//     counter--;
//    if(counter<0){
//     counter = imageSlider.length-1
//    }
//    imageSlider[counter].classList.add('selectImage')
//    dot[counter].classList.add('selectImage')
// })

// rightArrow.addEventListener('click',()=>{
//     for(let i = 0; i<imageSlider.length; i++){
//         dot[i].classList.remove('selectImage')
//         imageSlider[i].classList.remove('selectImage')
//     }
//     counter++;
//    if(counter>=imageSlider.length){
//     counter = 0
//    }
//    imageSlider[counter].classList.add('selectImage')
//    dot[counter].classList.add('selectImage')
// })

// const pushSlider = () => {
//     for (let i = 0; i < imageSlider.length; i++) {
//       dot[i].classList.remove('selectImage');
//       imageSlider[i].classList.remove('selectImage');
//     }
  
//     counter++;
//     if (counter >= imageSlider.length) {
//       counter = 0;
//     }
  
//     imageSlider[counter].classList.add('selectImage');
//     dot[counter].classList.add('selectImage');
//   };
  


// if (options.autoPlay) {
//     const intervalImage = setInterval(pushSlider, options.interval);
//   }
// };

const createSlider = (options) => {
  const slider = document.getElementById('slider');
  const imageSlider = slider.querySelectorAll('.imageSlider');
  const controls = slider.querySelector('.slider-control');

  let counter = 0;

  let maxSlides = options.maxSlides || 1;

  const loop = options.loop !== undefined ? options.loop : true;
  
  const updateSlide = () => {
    for (let i = 0; i < imageSlider.length; i++) {
      imageSlider[i].classList.remove('selectImage');
    }
    
   updatePagination();

   if (loop) {
    for (let i = 0; i < maxSlides; i++) {
      const index = (counter + i) % imageSlider.length;
      imageSlider[index].classList.add('selectImage');
    }
  } else {
    const newIndex = Math.min(counter, imageSlider.length - maxSlides);
    for (let i = 0; i < maxSlides; i++) {
      if (newIndex + i < imageSlider.length) {
        imageSlider[newIndex + i].classList.add('selectImage');
      }
    }
};
if (!options.controls) {
    controls.style.display = 'none';
  }
};
  const rightArrow = controls.querySelector('.right-arrow');
  rightArrow.addEventListener('click', () => {
    if (loop) {
      counter = (counter + 1) % imageSlider.length;
    } else {
      counter = Math.min(counter + 1, imageSlider.length - maxSlides);
    }
    updateSlide();
  });

  const leftArrow = controls.querySelector('.left-arrow');
  leftArrow.addEventListener('click', () => {
    if (loop) {
      counter = (counter - 1 + imageSlider.length) % imageSlider.length;
    } else {
      counter = Math.max(counter - 1, 0);
    }
    updateSlide();
  });

  const createDots = () => {
    const dotContainer = document.createElement('div');
    dotContainer.classList.add('pagination');

    for (let i = 1; i < imageSlider.length; i++) {
      const dotItem = document.createElement('div');
      dotItem.classList.add('dot');
      dotItem.addEventListener('click', () => {
        counter = i;
        updateSlide();
      });
      dotContainer.appendChild(dotItem);
    }

    controls.appendChild(dotContainer);
  };



  const updatePagination = () => {
    const dotItems = slider.querySelectorAll('.dot');
    dotItems.forEach((dotItem, index) => {
      dotItem.classList.remove('selectImage');
      if (index === counter) {
        dotItem.classList.add('selectImage');
      }
    });
  };

  const startSlider = () => {
    createDots();
    updateSlide();
  };

  if (options.autoPlay) {
    setInterval(() => {
      counter = (counter + 1) % imageSlider.length;
      updateSlide();
    }, options.interval);
  }

  startSlider();
};

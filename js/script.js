'use strict';

//Start basics elements bibliography 

// Создать повторяющиеся блоки на основе классов и метода this 

// Сделать анимацию


// Tabs

const content = document.querySelectorAll('.tabwrapper'),
      tabs = document.querySelectorAll('.tabwrapper__btn'),
      tabsParent = document.querySelector('.tabwrapper-btn');


function deleteContent() {
    content.forEach((item) => {
        item.classList.add('hide');
        item.classList.remove('show');
    });

    tabs.forEach(item => {
        item.classList.remove('tabwrapper__btn_active');
    });
}

function showContent(i = 0) {
            content[i].classList.remove('hide');
            content[i].classList.add('show');
            tabs[i].classList.add('tabwrapper__btn_active');
}

deleteContent();
showContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains('tabwrapper__btn')) {
        tabs.forEach((item,i) => {
            if(target == item) {
                deleteContent();
                showContent(i);
            }
        });
    }
});

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modalClose = document.querySelector('[data-close]'),
      modal = document.querySelector('.show-modal');

for(let i = 0; i < modalTrigger.length; i++) {
    modalTrigger[i].addEventListener('click', () => {
        modal.classList.add('show-flex');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    });
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show-flex');
    document.body.style.overflow = '';  
}

modalClose.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (event) => {
    if(event.target == modal) {
        closeModal(); 
    }
});

document.addEventListener('keydown', (e) => {
if(e.code == 'Escape' && modal.classList.contains('show-flex')) {
    closeModal();
}
});


// Timer

const deadline = '2023-09-02';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if(t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t/(1000 * 60 * 60 * 24));
        hours = Math.floor((t/(1000 * 60 * 60) % 24));
        minutes = Math.floor((t/(1000 * 60) % 60));
        seconds = Math.floor((t/1000) % 60);
    }


    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };

}

function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

updateClock ();

function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
    
function updateClock () {           
    const t = getTimeRemaining(endtime); 

    days.innerHTML = getZero(t.days);       
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if(t.total <= 0) {
        clearInterval(timeInterval);
    }
}
}

setClock ('.timer', deadline);


getTimeRemaining(deadline);




//This and ES6 classes


class MenuCard {
    constructor(title, img, descr, parentSelector) {
        this.title = title;
        this.img = img;
        this.descr = descr;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="this__first-block">
                    <div class="this__first-block-title">${this.title}</div>
                    <img class="this__img" src=${this.img} alt="">
                    <p class="this__first-block-subtitle">${this.descr}</p>
                </div>
        `;
        this.parent.append(element);
    }
}

const lake = new MenuCard(
    'Озеро Телецкое',
    '"./img/lake.jpg"',
    'Жемчужина Алтая, кристально чистое озеро Телецкое. Это – крупнейшее природное водохранилище горного края. Его питают ледниковые реки. Именно поэтому температура воды почти всегда постоянная – хрустально студеная.',
    '.this-blocks'
);

const desert = new MenuCard(
    'Белые пески',
    '"./img/desert.jpg"',
    'За миллионы лет солнце высушило море, которое находилось здесь ранее, оставив на его месте только белые гипсовые пески, которые не нагреваются на солнце. В центральной части пустыни можно встретить растения, редкие кактусы и даже пустынную дыню.',
    '.this-blocks'
);

const field = new MenuCard(
    'Альпийские луга',
    '"./img/field.jpg"',
    'Для альпийских лугов характерна специфическая, низкорослая растительность, а также растительность, образующая «травяные подушки». Это сближает данный тип экосистем с тундрой, благодаря чему альпийские луга также называют «горной тундрой».',
    '.this-blocks'
);

lake.render();
desert.render();
field.render();




// Save the changes in localStorage

// localStorage.clear();

const buttons = document.querySelectorAll('.btn-lc');

buttons.forEach(item => {
    item.addEventListener('click', () => {
        const elementLocal = item.id;
        localStorage.setItem(elementLocal, 'active');
        const resultLocal = localStorage.getItem(elementLocal);
        if(resultLocal === 'active') {
            item.classList.add('active');
            console.log('active');
        }
    });
});

function render() {
    const keysOfLocal = Object.keys(localStorage);
    keysOfLocal.forEach(item1 => {
        buttons.forEach(item2 => {
            const id = item2.id;
            if(item1 === id) {
                item2.classList.add('active');
            }
        });
    });
}

render();



// Fetch API
// Вариант со спиннером можно посмотреть в App Pratice #2
// ДОДЕЛАТЬ СПИННЕР И ВАРИАНТ В СЛУЧАЕ ОШИБОК

const form = document.querySelector('.forms');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Добро пожаловать',
    failure: 'Произошла ошибка!'
};

postData(form);

function postData(forms) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(forms);

    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;    //Очень важно всегда казывать name для input
    });

    console.log(object);

    fetch('server.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
    })
    .then(data => data.text())      //Важно выбрать правильный метод обработки запроса
    .then(data => {
        
        console.log(data);      
        });

        const thanks = form.append(message.success + ' ' + object.names);

    });

    
}


// Slider #1



// const slides = document.querySelectorAll('.offer__slide');
// const prev = document.querySelector('.offer__slider-prev');
// const next = document.querySelector('.offer__slider-next');
// const current = document.getElementById('current');

// let i = 0;

// function hideCard() {
//     slides.forEach(item => {
//         item.classList.add('hide');
//     });
//     current.innerHTML = `0${i+1}`;
// }

// function showCard(){
//     slides[i].classList.remove('hide');
//     slides[i].classList.add('show');
// }

// hideCard();
// showCard();

// prev.addEventListener('click', (e) => {
//     if(i <= 0) {
//         i = 3;
//         hideCard();
//         showCard();
//     } else {
//         hideCard();
//         i--;
//         showCard();
//         current.innerHTML = `0${i+1}`;
//     }
// });

// next.addEventListener('click', (e) => {
//     if(i >= slides.length - 1) {
//         i = 0;
//         hideCard();
//         showCard();
//     } else {
//         hideCard();
//         i++;
//         showCard();
//         current.innerHTML = `0${i+1}`;
//         }
// });


// Slider #2


const slides = document.querySelectorAll('.offer__slide');
const slider = document.querySelector('.offer__slider');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const current = document.getElementById('current');
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
const slidesInner = document.querySelector('.offer__slider-inner');
const width = window.getComputedStyle(slidesWrapper).width;     //Получаем примененные свойства из css

let slideIndex = 1;
let offset = 0;

current.innerHTML = `0${slideIndex}`;

slidesInner.style.width = 100 * slides.length + '%';    //Резервируем место под все наши элементы карусели
slidesInner.style.display = 'flex';
slidesInner.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;      //Каждый слайд будет равен окну демонстрации
});

slider.style.position = 'relative';

const indicators = document.createElement('ol');
const dots = [];
indicators.classList.add('carousel-indicators');

indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 150px;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

    if(i == 0) {
        dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
}

next.addEventListener('click', () => {
if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    offset = 0;
} else {
    offset += +width.slice(0, width.length - 2)
}

    slidesInner.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    current.innerHTML = `0${slideIndex}`;

    dots.forEach(item => item.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if(offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }
    
        slidesInner.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    
        current.innerHTML = `0${slideIndex}`;

        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset =+width.slice(0, width.length - 2) * (slideTo - 1);
        slidesInner.style.transform = `translateX(-${offset}px)`;

        current.innerHTML = `0${slideIndex}`;


        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
});

function calc() {
    // Calc

const counter = document.querySelector('.calculating__result span');


let sex, weight, height, age, ratio;

// хранилище

if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

// хранилище

function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }

        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender div', 'calculating__choose-item_active'); 
initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); 

function calcTotal() {
    if(!sex || !weight || !height || !age || !ratio) {
        counter.textContent = 'Ошибка';
        return;
    }

    if(sex === 'female') {
       counter.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        counter.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

}

calcTotal();

function getStaticInformation (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(e.target.getAttribute('data-ratio')) {   //Если есть такой блок то мы понимаем что работает с блоком активности если нет то другой блок
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));

            }
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
    
            e.target.classList.add(activeClass);
    
            calcTotal();
        });
    });

}

getStaticInformation ('#gender div', 'calculating__choose-item_active'); 
getStaticInformation ('.calculating__choose_big div', 'calculating__choose-item_active'); 

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;

                case 'weight':
                    weight = +input.value;
                    break;
                    
                case 'age':
                    age = +input.value;
                    break;   
            }
            calcTotal();
        });

       
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

calc();


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







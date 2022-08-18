'use strict';

//Start basics elements bibliography 

//Создать элемент с функционалом табов и анимацией

// Создать таймер

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
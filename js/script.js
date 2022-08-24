'use strict';

//Start basics elements bibliography 

// Создать таймер

// Добавить элементы HTML для модального окна

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
      modal = document.querySelector('.modal');

for(let i = 0; i < modalTrigger.length; i++) {
    modalTrigger[i].addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    });
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
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
if(e.code == 'Escape' && modal.classList.contains('show')) {
    closeModal();
}
});
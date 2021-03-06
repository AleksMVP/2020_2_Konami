'use strict';

const template = require('./MeetTemplate.pug');
const mobileTemplate = require('./MeetMobileTemplate.pug');


export function createMeetPage(data, isMobile) {
    let startDate = new Date(data.card.startDate);
    let endDate = new Date(data.card.endDate);
    let currentDate = Date.now();

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options = {weekday: 'long', month: 'long', day: 'numeric' };
    data.dateStr = startDate.toLocaleDateString('ru-RU', options);

    if (data.currentUserId === data.card.authorId) {
        data.buttonStatus = {
            class: 'meet__button_edit',
            text: 'Редактировать',
        };
    } else if (data.isRegistered) {
        data.buttonStatus = {
            class: 'meet__button_go',
            text: 'Отменить',
        };
    } else if (data.card.seatsLeft > 0 && endDate > currentDate) {
        data.buttonStatus = {
            class: 'meet__button_go',
            text: 'Пойти',
        };
    }

    const tmp = document.createElement('div');
    if (isMobile) {
        tmp.innerHTML = mobileTemplate(data);
    } else {
        tmp.innerHTML = template(data);
    }

    return tmp.firstElementChild;
}
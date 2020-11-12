'use strict';

import { createMeetPage } from "@/components/meet/meet.js";
import BaseView from "@/js/basics/BaseView/BaseView.js";
import { patchMeeting } from "@/js/services/API/api.js";
import EventBus from "@/js/services/EventBus/EventBus.js";
import { displayNotification } from "@/components/auth/Notification/Notification.js";
import {
    OPEN_LOGIN_MODAL,
    REDIRECT,
    PASS_MEET_DATA_TO_EDIT
} from "@/js/services/EventBus/EventTypes.js";

export default class MeetView extends BaseView {

    constructor(parent, model) {
        super(parent);
        this.parent = parent;
        this.model = model;
        this._this = null;
        this._data = null;

        this._clickLikeHandler = (evt) => {
            let isLiked = false;
            if (evt.target.firstChild != undefined) {
                if (evt.target.firstChild.src.includes('heart')) {
                    evt.target.firstChild.src = '/assets/like.svg';
                    isLiked = true;
                } else {
                    evt.target.firstChild.src = '/assets/heart.svg';
                    isLiked = false;
                }
            } else {
                if (evt.target.src.includes('heart')) {
                    evt.target.src = '/assets/like.svg';
                    isLiked = true;
                } else {
                    evt.target.src = '/assets/heart.svg';
                    isLiked = false;
                }
            }
            patchMeeting({
                meetId: this._data.card.label.id,
                fields: {
                    isLiked,
                },
            }).then(obj => {
                if (obj.statusCode === 200) {
                    displayNotification("Вы оценили мероприятие");
                } else {
                    alert('Permission denied');
                }
            });
        };
    
        this._clickGoButtonHandler = (evt) => {
            let isRegistered = false;
            if (evt.target.innerHTML === 'Пойти') {
                evt.target.innerHTML = 'Отменить поход';
                isRegistered = true;
            } else {
                evt.target.innerHTML = 'Пойти';
                isRegistered = false;
            }
            patchMeeting({
                meetId: this._data.card.label.id,
                fields: {
                    isRegistered,
                },
            }).then(obj => {
                if (obj.statusCode === 200) {
                    if (isRegistered) {
                        displayNotification("Вы зарегистрировались");
                    } else {
                        displayNotification("Вы отменили регистрацию");
                    }
                } else if (obj.statusCode === 409) {
                    alert('Вы не можете зарегистрироваться на мероприятие, которе уже прошло');
                } else {
                    alert('Permission denied');
                }
            });
        };
    }

    render(data) {
        this._data = data;

        this._this = createMeetPage(data);
        this.parent.appendChild(this._this);

        const likeIcon = this._this.getElementsByClassName('meet__like-icon')[0];
        const goButton = this._this.getElementsByClassName('meet__button_go')[0];
        const editButton = this._this.getElementsByClassName('meet__button_edit')[0];
        // тут нужно что то сделать с editbutton
        this.model.checkAuth().then(isAuth => {
            // снизу ж*па
            if (isAuth) {
                if (likeIcon !== undefined) {
                    likeIcon.addEventListener('click', this._clickLikeHandler);
                }
                if (goButton !== undefined) {
                    goButton.addEventListener('click', this._clickGoButtonHandler);
                }
                if (editButton !== undefined) {
                    editButton.addEventListener('click', this._clickEditButtonHandler.bind(this));
                }
            } else {
                if (likeIcon !== undefined) {
                    likeIcon.addEventListener('click', () => {
                        EventBus.dispatchEvent(OPEN_LOGIN_MODAL);
                    });
                }
                if (goButton !== undefined) {
                    goButton.addEventListener('click', () => {
                        EventBus.dispatchEvent(OPEN_LOGIN_MODAL);
                    });
                }
                if (editButton !== undefined) {
                    editButton.addEventListener('click', () => {
                        EventBus.dispatchEvent(OPEN_LOGIN_MODAL);
                    });
                }
            }
        });

    }

    erase() {
        if (this._this !== null) {
            this._this.remove();
            this._removeEventListeners();
        }
    }

    _clickEditButtonHandler(evt) {
        EventBus.dispatchEvent(REDIRECT, {url: '/edit-meeting'});
        setTimeout(() => {
            EventBus.dispatchEvent(PASS_MEET_DATA_TO_EDIT, this._data);
        }, 500); // таймаут нужен из за checkAuth, который промис возвращает(((
    }

    _removeEventListeners() {
        const likeIcon = this._this.getElementsByClassName('meet__like-icon')[0];
        if (likeIcon !== undefined) {
            likeIcon.removeEventListener('click', this._clickLikeHandler);
        }

        const goButton = this._this.getElementsByClassName('meet__button_go')[0];
        if (goButton !== undefined) {
            goButton.removeEventListener('click', this._clickGoButtonHandler);
        }

        const editButton = this._this.getElementsByClassName('meet__button_edit')[0];
        if (editButton !== undefined) {
            editButton.removeEventListener('click', this._clickEditButtonHandler.bind(this));
        }
    }
}

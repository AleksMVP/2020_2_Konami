'use strict';

import BaseView from "@/js/basics/BaseView/BaseView.js";
import EventBus from "@/js/services/EventBus/EventBus.js";
import {
    LOGIN_SUCCESS,
    LOGOUT_USER,
    OPEN_LOGIN_MODAL,
    REDIRECT
} from "@/js/services/EventBus/EventTypes.js";
import { createHeaderMobile } from "@/components/header/Header/HeaderMobile";
import {createHeaderLinksPopup} from "@/components/header/HeaderLinksPopup/HeaderLinksPopup";
import { getSearchMeeting } from "@/js/services/API/api.js"

export default class HeaderView extends BaseView {

    constructor(parent, model) {
        super(parent);
        this.parent = parent;
        this.model = model;

        this._this = null;

        this._initEventHandlers();
    }

    _initEventHandlers() {
        this._eventHandlers = {
            onLoginedUser: () => {
                this._updateHeader();
            },

            onLogoutUser: () => {
                this._downHeader();
                this.model.logout();
            },

            onRedirect: () => {
                let popup = document.getElementById('popupLinksContainer');
                if (popup && popup.classList.contains('show')) {
                    popup.classList.toggle('show');
                }
            }
        }
    }

    render() {
        const searchLimit = 10;
        this._this = createHeaderMobile(this.model.isMobile());
        this.parent.appendChild(this._this);

        let icon = document.getElementById('profileIcon');
        icon.addEventListener('click', this._onProfileIconClick);

        const search = document.getElementsByClassName('search-block__search-input')[0];
        search.addEventListener('keyup', () => {
            if (search.value.length > 3) {
                getSearchMeeting(search.value, searchLimit).then(result => {
                    const offers = document.getElementsByClassName('search-block__offers')[0];
                    offers.innerHTML = '';
                    result.parsedJson.forEach(item => {
                        const offer = this._createSearchOffer(item);
                        offers.appendChild(offer);
                    });
                });
            } else {
                const offers = document.getElementsByClassName('search-block__offers')[0];
                offers.innerHTML = '';
            }
        });
    }

    _createSearchOffer(data) {
        const offer = document.createElement('div');
        offer.classList.add('search-block__offer');

        const offerImg = document.createElement('img');
        offerImg.classList.add('search-block__offer-img');
        offerImg.src = data.card.label.imgSrc;

        const offerTitle = document.createElement('span');
        offerTitle.innerHTML = data.card.label.title;

        offer.append(offerImg, offerTitle);

        const modalSearch = document.getElementsByClassName('search-block')[0];
        offer.addEventListener('click', () => {
            EventBus.dispatchEvent(REDIRECT, {url: `/meeting?meetId=${data.card.label.id}`});
            /*if (data.type === 'meeting') {
                EventBus.dispatchEvent(REDIRECT, {url: `/meeting?meetId=${data.id}`});
            } else {
                EventBus.dispatchEvent(REDIRECT, {url: `/profile?userId=${data.id}`});
            }*/
            modalSearch.style.display = 'none';
        });

        return offer;
    }

    registerEvents() {
        EventBus.onEvent(LOGIN_SUCCESS, this._eventHandlers.onLoginedUser);
        EventBus.onEvent(LOGOUT_USER, this._eventHandlers.onLogoutUser)
        EventBus.onEvent(REDIRECT, this._eventHandlers.onRedirect);

    }

    unRegisterEvents() {
        EventBus.offEvent(LOGIN_SUCCESS, this._eventHandlers.onLoginedUser);
        EventBus.offEvent(LOGOUT_USER, this._eventHandlers.onLogoutUser);
        EventBus.offEvent(REDIRECT, this._eventHandlers.onRedirect);

    }

    _updateHeader() {
        const profileIcon = document.getElementById('profileIcon');
        profileIcon.removeEventListener('click', this._onProfileIconClick);
        // profileIcon.dataset.section = 'profile';

        this._addProfileLinks();
    }

    _addProfileLinks() {
        const profileIcon = document.getElementById('profileIcon');
        const linksContainer = createHeaderLinksPopup();

        const wrapperIcon = document.createElement('div');
        wrapperIcon.classList.add('popup-links');
        wrapperIcon.append(profileIcon, linksContainer);

        document.getElementsByClassName('header-mobile__logo-wrapper')[0].appendChild(wrapperIcon);

        profileIcon.onclick = () => {
            let popup = document.getElementById('popupLinksContainer');
            if (popup) {
                popup.classList.toggle('show');
            }
        }

        const profileLink = document.getElementById('profileLink');
        profileLink.addEventListener('click', (evt) => {
            evt.preventDefault();
            EventBus.dispatchEvent(REDIRECT, {url: '/profile'});
        });

        this._setUserGeolocation();
        // locationLink.addEventListener('click', (evt) => {
        //     evt.preventDefault();
        //     EventBus.dispatchEvent(REDIRECT, {url: '/profile'});
        // });

        const editprofileLink = document.getElementById('editprofileLink');
        editprofileLink.addEventListener('click', (evt) => {
            evt.preventDefault();
            EventBus.dispatchEvent(REDIRECT, {url: '/editprofile'});
        });

        const signoutLink = document.getElementById('signoutLink');
        signoutLink.addEventListener('click', (evt) => {
            evt.preventDefault();
            EventBus.dispatchEvent(LOGOUT_USER);
            EventBus.dispatchEvent(REDIRECT, {url: '/meetings'});
        });

        const newMeetLink = document.getElementById('newMeetLink');
        newMeetLink.addEventListener('click', (evt) => {
            evt.preventDefault();
            EventBus.dispatchEvent(REDIRECT, {url: '/new-meeting'});
        });
    }

    _downHeader() {
        const profileIcon = document.getElementById('profileIcon');
        profileIcon.addEventListener('click', this._onProfileIconClick);
        profileIcon.removeAttribute('data-section');

        this._deleteProfileLinks();
    }

    _deleteProfileLinks() {
        const icon = document.getElementById('profileIcon');
        const wrapperIcon = document.getElementsByClassName('popup-links')[0];

        const header =document.getElementsByClassName('header-mobile__logo-wrapper')[0];
        header.removeChild(wrapperIcon);

        header.appendChild(icon);
    }

    _onProfileIconClick() {
        EventBus.dispatchEvent(OPEN_LOGIN_MODAL);
    }

    _setUserGeolocation() {
        const locationLink = document.getElementById('locationLinkText');

        if (this.model._user.userCity === null) {
            this.model._user.getUserGeolocation();

            setTimeout(() => {
                locationLink.textContent = this.model._user.userCity || 'Москва';
            }, 2000);
        } else {
            locationLink.textContent = this.model._user.userCity;
        }
    }

}

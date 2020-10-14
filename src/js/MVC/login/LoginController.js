'use strict';

import Controller from "../../basics/Controller/Controller.js";
import LoginView from "./LoginView.js";
import LoginModel from "./LoginModel.js";
import EventBus from "../../services/EventBus/EventBus.js";
import {hideModal} from "../../utils/auth/authModalUtils.js";

import {
    HIDE_LOGIN_MODAL,
    LOGIN_SUCCESS
} from "../../services/EventBus/EventTypes.js";

export default class LoginController extends Controller {

    constructor(parent) {
        super(parent);
        this.model = new LoginModel()
        this.view = new LoginView(parent, this.model);
    }

    /** При вызове деструктора модальное окно просто удаляется из application*/
    destructor() {
        const modal = document.getElementById('authModal');
        this.parent.removeChild(modal);

        EventBus.offEvent(HIDE_LOGIN_MODAL, hideModal);
        EventBus.offEvent(LOGIN_SUCCESS, this.model.onLoginSuccess)
    }

    activate() {
        this.view.render();

    }
}

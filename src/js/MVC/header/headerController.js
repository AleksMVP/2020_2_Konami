'use strict';

import Controller from "@/js/basics/Controller/Controller.js";
import HeaderView from "./headerView.js";
import HeaderModel from "./headerModel.js";
import EventBus from "@/js/services/EventBus/EventBus.js";
import {
    LOGIN_SUCCESS
} from "@/js/services/EventBus/EventTypes.js";

export default class HeaderController extends Controller {

    constructor(parent) {
        super(parent);
        this.model = new HeaderModel();
        this.view = new HeaderView(parent, this.model);
    }

    activate() {
        this.view.registerEvents();
        this.view.render();
        this.model.checkAuth()
            .then((isAuth) => {
                if (isAuth) {
                    EventBus.dispatchEvent(LOGIN_SUCCESS);
                }
            });
    }

    deactivate() {
        this.view.unRegisterEvents();
    }

}

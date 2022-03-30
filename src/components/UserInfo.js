export class UserInfo {

    constructor({nameSelector, positionSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._positionElement = document.querySelector(positionSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            position: this._positionElement.textContent,
        };
    }

    setUserInfo({name, position}) {
        this._nameElement.textContent = name;
        this._positionElement.textContent = position;
    }
}
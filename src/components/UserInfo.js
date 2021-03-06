export class UserInfo {

    constructor({nameSelector, positionSelector, iconSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._positionElement = document.querySelector(positionSelector);
        this._iconElement = document.querySelector(iconSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            position: this._positionElement.textContent,
        };
    }

    setUserInfo({name, position, url, id}) {
        this._nameElement.textContent = name;
        this._positionElement.textContent = position;
        this._iconElement.src = url;
        this._id = id;
    }

    refreshAvatarOnForm(url) {
        this._iconElement.src = url
    }

    getUserId() {
        return this._id;
    }
}
export class Api {
    constructor( cohort = 'cohort-39', token = '49225ff9-8b01-4660-8c51-8d10489a2608') {
        this._baseUrl = `https://mesto.nomoreparties.co/v1/${cohort}/`;
        this._token = token;
    }

    _request(path = "", body = false, method = 'GET') {

        const reqObject = {
            method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            reqObject['body'] = JSON.stringify(body);
        }

        return fetch(this._baseUrl + path, reqObject)
                .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    getProfileInfo() {
        return this._request('users/me')
            .then((data) => {
                // console.log(data);
                this._userId = data._id;
                return data;
            })
            .catch((err) => {
                console.log('Произошла ошибка', err);
            })
    }

    updateProfileInfo({name, about}) {
        return this._request('users/me', {name, about}, 'PATCH')
        .then( (data) => {
            // console.log(data);
            return data;
        })
        .catch((err) => {
            console.log('Произошла ошибка', err);
        })

    }

    getCards() {
        return this._request('cards')
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.log('Произошла ошибка', err);
            })
    }

    addCard({name, link}) {
        return this._request('cards', {name, link}, 'POST')
                .then((data) => {
                    // console.log(data)
                    return data
                })
                .catch((err) => {
                    console.log('Произошла ошибка', err);
                })

    }

    getMyId() {
        return this._userId;
    }
}

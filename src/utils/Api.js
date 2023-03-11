class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Огромное Вам спасибо за этот метод, с большим интересом разобрался и использовал его!
  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request('/users/me', {
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request('/cards', {
      headers: this._headers
    })
  }

  editProfile({name, about}) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, about
      })
    })
  }

  addNewCard({name, link}) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setLike(cardId, method) {
    return this._request(`/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers
    })
  }

  addNewAvatar({avatar}) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
  }
}

// Создаём экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'cfebb862-70aa-4cd6-a9bd-6d5609babeaa',
    'Content-Type': 'application/json'
  }
});

export { api }
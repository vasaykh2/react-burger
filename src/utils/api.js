import { BASE_URL } from './constants';

/*export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}*/

class Api {
  constructor(url) {
    this.url = url;
  }

  /* _checkResponce(res) {
    return res.ok
      ? res.json().then((data) => data)
      : res.json().then((data) => Promise.reject(data));
  }*/

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getIngredients() {
    return this._request(`${this.url}/ingredients`);
  }

  postOrderDetails(listId, token = '') {
    return this._request(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    });
  }

  requestPasswordReset(email) {
    return this._request(`${this.url}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  }

  resetPassword(password, token) {
    return this._request(`${this.url}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });
  }

  logIn(email, password) {
    return this._request(`${this.url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  register(email, password, name) {
    return this._request(`${this.url}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
  }

  logOut(token) {
    return this._request(`${this.url}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  }



  refreshToken(token) {
    return this._request(`${this.url}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });
  }


  getOrder(orderNumber) {
    return this._request(`${this.url}/orders/${orderNumber}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  getUserInfo(token = '') {
    return this._request(`${this.url}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
  }

  patchUserInfo(email, password, name, token = '') {
    return this._request(`${this.url}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ email, password, name }),
    });
  }
}

const api = new Api(BASE_URL);

export { api };

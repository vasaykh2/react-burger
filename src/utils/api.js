import { BASE_URL } from './constants';
import { setCookie } from '../utils/cookie';

class Api {
  constructor(url) {
    this.url = url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  async _fetchWithRefresh(url, options) {
    try {
      const res = await fetch(url, options);
      return await this._checkResponse(res);
    } catch (err) {
      if (err.message === 'jwt expired') {
        const refreshData = await this.refreshToken(
          localStorage.getItem('refreshToken')
        );
        if (!refreshData.success) {
          Promise.reject(refreshData);
        }
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        setCookie('accessToken', refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await this._checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }

  getIngredients() {
    return this._request(`${this.url}/ingredients`);
  }

  postOrderDetails(listId, token = '') {
    return this._fetchWithRefresh(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    });
  }

  postOrder(order, token = '') {
    return this._fetchWithRefresh(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify( order
      ),
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

  /*postOrderDetails(listId, token = '') {
    return this._request(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        ingredients: listId,
      }),
    });
  }*/

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

  getUserInfo(token = '') {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
    });
  }

  patchUserInfo(email, password, name, token = '') {
    return this._fetchWithRefresh(`${this.url}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ email, password, name }),
    });
  }
}

const api = new Api(BASE_URL);

export { api };

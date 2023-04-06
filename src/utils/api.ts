import { BASE_URL } from './constants';
import { setCookie } from './cookie';
import { TOrder } from '../types/order';

class Api {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }
  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(
    url: string,
    options?: {
      method?: string;
      headers?: {
        'Content-type': 'application/json';
        authorization?: string;
      };
      body?: string;
    }
  ) {
    return fetch(url, options).then(this._checkResponse);
  }

  async _fetchWithRefresh(
    url: string,
    options: {
      method: string;
      headers: {
        'Content-type': 'application/json';
        authorization: string;
      };
      body?: string;
    }
  ) {
    try {
      const res = await fetch(url, options);
      return await this._checkResponse(res);
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        const refreshData: {
          accessToken: string;
          success: boolean;
          refreshToken: string;
        } = await this.refreshToken(localStorage.getItem('refreshToken'));
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

  postOrderDetails(listId: TOrder, token = '') {
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

  postOrder(order: TOrder, token = '') {
    return this._fetchWithRefresh(`${this.url}/orders`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(order),
    });
  }

  getOrder(orderNumber: number) {
    return this._request(`${this.url}/orders/${orderNumber}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  requestPasswordReset(email: string) {
    return this._request(`${this.url}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  }

  resetPassword(password: string, token: string) {
    return this._request(`${this.url}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });
  }

  logIn(email: string, password: string) {
    return this._request(`${this.url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  register(email: string, password: string, name: string) {
    return this._request(`${this.url}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
  }

  logOut(token: string | null) {
    return this._request(`${this.url}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  }

  refreshToken(token: string | null) {
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

  patchUserInfo(email: string, password: string, name: string, token = '') {
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

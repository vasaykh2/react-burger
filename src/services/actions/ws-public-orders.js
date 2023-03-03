export const WS_PUBLIC_START = 'WS_PUBLIC_START';
export const WS_PUBLIC_SUCCESS = 'WS_PUBLIC_SUCCESS';
export const WS_PUBLIC_ERROR = 'WS_PUBLIC_ERROR';
export const WS_PUBLIC_CLOSED = 'WS_PUBLIC_CLOSED';
export const WS_PUBLIC_ORDERS = 'WS_PUBLIC_ORDERS';

export const startPublicWsConnection = () => {
  return {
    type: WS_PUBLIC_START,
  };
};

export const closePublicWsConnection = () => {
  return {
    type: WS_PUBLIC_CLOSED,
  };
};

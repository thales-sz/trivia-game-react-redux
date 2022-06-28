import md5 from 'crypto-js/md5';

export const USER_LOGIN = 'USER_LOGIN';

export const userAction = (userInfo) => ({
  type: USER_LOGIN,
  payload: userInfo,
});

// Actions para pegar a imagem do gravatar
export const GET_GRAVATAR = 'GET_GRAVATAR';

const sendProfileImageURL = (url) => ({
  type: GET_GRAVATAR,
  payload: { url },
});

export const getProfileImageURLAction = (email) => (dispatch) => {
  const hash = md5(email).toString();
  const url = `https://www.gravatar.com/avatar/${hash}`;
  dispatch(sendProfileImageURL(url));
};

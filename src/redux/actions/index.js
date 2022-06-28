import md5 from 'crypto-js/md5';

export const USER_LOGIN = 'USER_LOGIN';

export const userAction = (userInfo) => ({
  type: USER_LOGIN,
  payload: userInfo,
});

// funçao para requisição do token do usuario
export async function requestUserToken() {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(ENDPOINT);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

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


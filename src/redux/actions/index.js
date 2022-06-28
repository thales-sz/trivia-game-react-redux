export const USER_LOGIN = 'USER_LOGIN';

export const userAction = (userInfo) => ({
  type: USER_LOGIN,
  payload: userInfo,
});

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

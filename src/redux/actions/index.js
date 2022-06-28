export const USER_LOGIN = 'USER_LOGIN';

export const userAction = (userInfo) => ({
  type: USER_LOGIN,
  payload: userInfo,
});

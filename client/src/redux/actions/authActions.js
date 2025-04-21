// export const loginSuccess = (userData) => {
//   return {
//     type: 'LOGIN_SUCCESS',
//     payload: userData
//   };
// };

// export const logout = () => {
//   return {
//     type: 'LOGOUT'
//   };
// };

// // Optional: for async login
// export const authenticateLogin = (loginData) => async (dispatch) => {
//   try {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(loginData)
//     });

//     const data = await response.json();
//     if (response.ok) {
//       dispatch(loginSuccess(data.user));
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     console.error('Login failed:', error);
//   }
// };

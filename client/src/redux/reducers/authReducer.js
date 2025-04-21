// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       localStorage.setItem('user', JSON.stringify(action.payload));
//       localStorage.setItem('loginTime', Date.now()); // Save login time
//       return { ...state, user: action.payload };

//     case 'LOGOUT':
//       localStorage.removeItem('user');
//       localStorage.removeItem('loginTime');
//       return { ...state, user: null };

//     default:
//       return state;
//   }
// };

// export default authReducer;

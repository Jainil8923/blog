// import { createContext, useState, useEffect } from "react";
// import PropTypes from 'prop-types';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//     fetch('http://localhost:3000/api/user/verifyToken', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.valid) {
//         setAuth({ token, userId: data.userId });
//       } else {
//         localStorage.removeItem("jwtToken");
//         setAuth(null);
//       }
//     })
//     .catch(error => {
//       console.error('Error verifying token:', error);
//       localStorage.removeItem("jwtToken");
//       setAuth(null);
//     });
//       setAuth({ token });
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("jwtToken", token);
//     setAuth({ token });
//   };

//   const logout = () => {
//     localStorage.removeItem("jwtToken");
//     setAuth(null);
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default AuthProvider;

import axios from 'axios'

import { createContext, useEffect, useState } from 'react'
import {profileRoute} from '../utils/url'
export const userContext = createContext()



export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(profileRoute);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle errors, e.g., if the user is not authenticated
        console.error('Error fetching user profile:', error);
      }
    };

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (isLogin && token) {
      fetchData();
    }
  }, [isLogin]);

  const logOut = () => {
    // Clear the authentication token
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Update the login state
    setIsLogin(false);
    // Reset the user state
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, setUser, isLogin, setIsLogin,logOut }}>
      {children}
    </userContext.Provider>
  );
}

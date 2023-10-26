import { createContext, useContext, useEffect, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  // eslint-disable-next-line no-undef
  currentUser: JSON.parse(localStorage.getItem('user-login-duendeMaquillista')) || null
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem('user-login-duendeMaquillista', JSON.stringify(state.currentUser))
  }, [state.currentUser])

  const LogOut = () => {
    dispatch({ type: 'LOGOUT', payload: null })
  }

  const GetUserID = ()=>{
    return state.currentUser?.user?.id;
  }

  const getUserType = () => {
    return state.currentUser?.user?.userType | 0
  }
  const getLoginStatus = () => {
    return state.currentUser?.loggedIn || false
  }
  return (
    <AuthContext.Provider value={{ LogOut, GetUserID, dispatch, getUserType, getLoginStatus }}>
      {children}
    </AuthContext.Provider>
  )
}
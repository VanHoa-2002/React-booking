import { createContext, useEffect, useReducer } from "react";

const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item && item !== "undefined" ? JSON.parse(item) : null;
};

const initialState = {
  user: getItem("user"),
  role: getItem("role"),
  token: getItem("token"),
};
export const authContext = createContext(initialState);
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "UPDATE_PROFILE":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("role", JSON.stringify(state.role));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state]);
  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

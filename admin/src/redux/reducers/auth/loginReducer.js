import {LOGIN} from "../../constant/auth/loginConstants";

const loginDefaultState = {
  userRole: "admin",
  loginLoading: false,
  loginData: null,
  loginError: null
}

export const login = (state = loginDefaultState, action) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_JWT": {
      return { ...state, values: action.payload }
    }
    case "LOGOUT_WITH_JWT": {
      return { ...state, values: action.payload }
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload }
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole }
    }
    case LOGIN.REQUEST:
      return {...state, loginLoading: true, loginData: null, loginError: null}
    case LOGIN.SUCCESS:
      return {...state, loginLoading: false, loginData: {...action.payload, statusCode: action.status}, loginError: null}
    case LOGIN.FAIL:
      return {...state, loginLoading: false, loginData: null, loginError: action.payload}
    default: {
      return state
    }
  }
}

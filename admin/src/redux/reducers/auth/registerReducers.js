import {REGISTRATION} from "../../constant/auth/registerConstants";

const registrationDefaultState = {
  registrationLoading: false,
  registrationData: null,
  registrationError: null
}

export const register = (state = registrationDefaultState, action) => {
  switch (action.type) {
    case "SIGNUP_WITH_EMAIL":
      return {...state, values: action.payload}
    case "SIGNUP_WITH_JWT":
      return {...state, values: action.payload}
    case REGISTRATION.REQUEST:
      return {...state, registrationLoading: true, registrationData: null, registrationError: null}
    case REGISTRATION.SUCCESS:
      return {...state, registrationLoading: false, registrationData: {...action.payload, statusCode: action.status}, registrationError: null}
    case REGISTRATION.FAIL:
      return {...state, registrationLoading: false, registrationData: null, registrationError: action.payload}
    case REGISTRATION.RESET:
      return {...state, registrationLoading: false, registrationData: null, registrationError: null}
    default:
      return state
  }
}

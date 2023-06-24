// import * as firebase from "firebase/app"
import { history } from "../../../history"
// import "firebase/auth"
// import "firebase/database"
import Axios from "axios"
import {REGISTRATION} from "../../constant/auth/registerConstants";
// import { config } from "../../../authServices/firebase/firebaseConfig"

// // Init firebase if not already initialized
// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
// }
//
// let firebaseAuth = firebase.auth()

// export const signupWithFirebase = (email, password, name) => {
//   return dispatch => {
//     let userEmail = null,
//       loggedIn = false
//     // userName = null
//
//     firebaseAuth
//       .createUserWithEmailAndPassword(email, password)
//       .then(result => {
//         firebaseAuth.onAuthStateChanged(user => {
//           result.user.updateProfile({
//             displayName: name
//           })
//           if (user) {
//             userEmail = user.email
//             // let userName = user.displayName
//             loggedIn = true
//             dispatch({
//               type: "SIGNUP_WITH_EMAIL",
//               payload: {
//                 email: userEmail,
//                 name,
//                 isSignedIn: loggedIn
//               }
//             })
//             dispatch({
//               type: "LOGIN_WITH_EMAIL",
//               payload: {
//                 email: userEmail,
//                 name
//               }
//             })
//           }
//         })
//         history.push("/")
//       })
//       .catch(error => {
//         console.log(error.message)
//       })
//   }
// }

// export const signupWithJWT = (obj) => {
//   return dispatch => {
//     axios
//       .post("/api/authenticate/register/user", {
//         email: email,
//         password: password,
//         name: name
//       })
//       .then(response => {
//         let loggedInUser;
//         if (response.data) {
//           loggedInUser = response.data.user
//           localStorage.setItem("token", response.data.token)
//           dispatch({
//             type: "LOGIN_WITH_JWT",
//             payload: {loggedInUser, loggedInWith: "jwt"}
//           })
//           history.push("/")
//         }
//       })
//       .catch(err => console.log(err))
//   }
// }

// --- Register Action
const setLocalData = (dataObj, response) => {
  const data = {
    email: dataObj.email,
    accessToken: response.accessToken,
    role: 'admin'
  }
  localStorage.setItem(process.env.REACT_APP_USER_DATA, JSON.stringify(data));
}

export const signupWithJWT = (dataObj) => async (dispatch) => {
  dispatch({type: REGISTRATION.REQUEST});
  const headers = {'Accept': 'application/json'}
  try {
    const {data, status} = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, dataObj, {headers: headers});
    setLocalData(dataObj, data)
    dispatch({type: REGISTRATION.SUCCESS, payload: data, status});
  } catch (error) {
    dispatch({type: REGISTRATION.FAIL, payload: error.message});
  }
}

export const signupWithJWTReset = () => async (dispatch) => {
  dispatch({type: REGISTRATION.RESET});
}

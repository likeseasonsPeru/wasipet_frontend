import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE, USER } from '../types';
import { API } from '../../config';
import { setCookie, removeCookie, getCookie } from '../../utils/cookie';

// register user


const register = ({ name, photo, email, phone, type_user, password, confirm_password }, type) => {
  if (type !== 'register') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    var headers = {
      'Content-Type': 'application/json' 
    }
    var postData = {
      name: name,
      photo: photo,
      email : email,
      phone: phone,
      type: type_user,
      password: password,
      old_password: password,
      provide_services: "Web",
    };
    axios.post(`${API}/${type}`, postData,{
      headers: headers
    })
      .then((response) => {
        setCookie('token', response.data.token);
        Router.push('/dashboard');
        dispatch({type: AUTHENTICATE, payload: response.data.token});
      })
      .catch((err) => {
        /*switch (err.response.status) {
          case 422:
          alert(err.response.data.meta.message);
            break;
          case 401:
          alert(err.response.data.meta.message);
            break;
          case 500:
          alert('Interval server error! Try again!');
            break;
          default:
          alert(err.response.data.meta.message);
            break;
        }*/
        console.log(err);
      });
  };
};
// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'login') {
    throw new Error('Wrong API call!');
  }
  return (dispatch) => {
    var headers = {
      'Content-Type': 'application/json' 
    }
    var postData = {
      email : email,
      password: password
    };
    axios.post(`${API}/${type}`, postData,{
      headers: headers
    })
      .then((response) => {
        console.log(response);
        setCookie('token', response.data.token);
        Router.push('/dashboard');
        dispatch({type: AUTHENTICATE, payload: response.data.token});
      })
      .catch((err) => {
        switch (err.response.status) {
          case 422:
          alert(err.response.data);
          
            break;
          case 404:
            alert(err.response.data);
            break;
          case 500:
          alert('Error Interno del servidor! Intentelo!');
            break;
          default:
          alert(err.response.data);
            break;
        }
        //console.log(err.response.data);
      });
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, payload: token});
  };
};

// removing the token
const deauthenticate = () => {
  
  return (dispatch) => {
    var token = getCookie('token');
    axios.delete(`${API}/logout`,{headers: {
      "Content-Type": "application/json",
      "Authorization" : "Bearer " + token
    }
  })
      .then((response) => {
          removeCookie('token');
          Router.push('/');
          dispatch({type: DEAUTHENTICATE});
      })
      .catch((error) => {
        /*switch (err.response.status) {
          case 422:
          alert(err.response.data.meta.message);
            break;
          case 401:
          alert(err.response.data.meta.message);
            break;
          case 500:
          alert('Interval server error! Try again!');
            break;
          default:
          alert(err.response.data.meta.message);
            break;
        }*/
        console.log(error);
      });
  };
  
};

const getUser = ({ token }, type) => {
  return (dispatch) => {
    axios.get(`${API}/${type}`,{headers: {
      "Authorization" : "Bearer " + token
    }
  })
      .then((response) => {
        dispatch({ type: USER, payload: response.data });
      })
      .catch((error) => {
        /*switch (err.response.status) {
          case 422:
          alert(err.response.data.meta.message);
            break;
          case 401:
          alert(err.response.data.meta.message);
            break;
          case 500:
          alert('Interval server error! Try again!');
            break;
          default:
          alert(err.response.data.meta.message);
            break;
        }*/
        console.log(error);
      });
  };
};


export default {
  register,
  authenticate,
  reauthenticate,
  deauthenticate,
  getUser,
};
import React from 'react';
import { Menu } from 'antd';
// import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, userStateReset } from '../../../../_reducers/user_reducer';

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userStateReset());
    dispatch(logoutUser()).then((response) => {
      if (response.status === 200) {
        // dispatch(userStateReset());
        props.history.push('/login');
      } else {
        console.log('Log Out Failed');
      }
    });
  };

  if (!user.data) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <a href='/login'>Signin</a>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Signup</a>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu mode={props.mode}>
      <Menu.Item key='logout'>
        <div onClick={logoutHandler}>Logout</div>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(RightMenu);

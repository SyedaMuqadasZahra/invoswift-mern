/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_reducers/user_reducer';

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      // To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        // Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
          // Loggined in Status
        } else {
          // supposed to be Admin page, but not admin person wants to go inside
          // eslint-disable-next-line
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          }
          // Logged in Status, but Try to go into log in page
          else if (option === false) {
            props.history.push('/');
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route>
      {() =>
        !props.loggedIn ? <Redirect to="/main" /> : <Component {...props} /> 
      }
    </Route>
  );
};

export default ProtectedRoute;

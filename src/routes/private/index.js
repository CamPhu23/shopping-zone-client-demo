import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UnAuthorizationPage } from '../../pages'
import { ClientLayout } from '../../layouts/client/client-main.jsx'
import _ from 'lodash'

const ClientPrivateRoutes = ({ component, requirePermission }) => {
  const user = useSelector(state => state.auth.user);
  if (_.isEmpty(user)) {
    return <Navigate to="/login" />;
  }

  if (user.permission !== requirePermission) {
    return <UnAuthorizationPage />;
  }

  return <ClientLayout component={component} />;
};

const AdminPrivateRoutes = ({ component, requirePermission }) => {
  const user = useSelector(state => state.auth.user);
  console.log(user);
  if (user.permission !== requirePermission) {
    return <UnAuthorizationPage />;
  }

  return (  
    <div>ClientPrivateRoutes</div>
  )
};

export {
  ClientPrivateRoutes,
  AdminPrivateRoutes,
};
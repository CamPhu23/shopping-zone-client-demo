import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminPrivateRoutes, ClientPrivateRoutes } from "./private";
import {
  ADMIN_PERMISSION,
  CLIENT_PERMISSION,
} from "../constants/authentication";
import { PublicRoutes } from "./public";

const AppRoute = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => {
        if (route.private) {
          if (route.permission === ADMIN_PERMISSION) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AdminPrivateRoutes
                    requirePermission={ADMIN_PERMISSION}
                    component={route.component}
                  />
                }
              />
            );
          } else if (route.permission === CLIENT_PERMISSION) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ClientPrivateRoutes
                    requirePermission={CLIENT_PERMISSION}
                    component={route.component}
                  />
                }
              />
            );
          }
        } else {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoutes component={route.component} />}
            />
          );
        }
      })}
    </Routes>
  );
};

export default AppRoute;

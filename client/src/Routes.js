import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

//Errors
import ErrorBad from "./page/errors/bad";
import ErrorNull from "./page/errors/null";

//Dashboard
import Dashboard from "./page/platforms";

// Sessions
import Login from "./page/sessions/login";
import Register from "./page/sessions/register/sample";

// Glocal Components
import UserProfile from "./components/profile";
import Cart from "./components/navbar/cart";
import Attendances from "./components/attendance";

// import { Admin, Manager, Cashier } from "./page/platforms/RootRoutes";
import { BASE } from "./components/utilities";
import RootRoutes from "./page/platforms/RootRoutes";
import TaskPrint from "./page/printout/task";
import ClaimingStab from "./page/printout/pos";

const Routers = () => {
  // const { onDuty } = useSelector(({ auth }) => auth);

  return (
    <Routes>
      {/* Initial */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Platforms */}
      <Route path={BASE} element={<Dashboard />}>
        <Route path="profile" element={<UserProfile view={false} />} />
        <Route path="/snapshot/cart" element={<Cart />} />

        {/* {handleRoutes(onDuty)} */}
        {RootRoutes.map(({ name, children }) =>
          children.map(({ path, grandsons, element }, index) => {
            if (grandsons) {
              return grandsons?.map((gs) => (
                <Route
                  path={`${name}/${path}/${gs.path}`}
                  key={`${name}/${path}/${index}/${gs.path}`}
                  element={gs.element}
                />
              ));
            } else {
              return (
                <Route
                  path={`${name}/${path}`}
                  key={`${name}/${path}/${index}`}
                  element={element}
                />
              );
            }
          })
        )}

        {/* Error 400 */}
        <Route path="" element={<ErrorBad />} />
      </Route>

      <Route path="attendance/:id" element={<Attendances />} />

      {/* Printout */}
      <Route path="frontdesk/results/:form/printout" element={<TaskPrint />} />
      <Route path="printout/stub" element={<ClaimingStab />} />

      {/* Sessions */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Error 404 */}
      <Route path="*" element={<ErrorNull />} />
    </Routes>
  );
};

export default Routers;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Pages/Auth/Register";
import Login from "./Components/Pages/Auth/Login";
import CreateGroupComponent from "./Components/Pages/Group/CreateGroup";
import Expence from "./Components/Pages/Group/Expence";
import AllExpence from "./Components/Pages/Group/AllExpence";
import GroupDetails from "./Components/Pages/Group/GroupDetails";
import InviteFriends from "./Components/Pages/Invite/InviteFriends";
import WelcomePage from "./Components/Pages/Invite/WelcomePage";
import Home from "./Components/Pages/Home/Home";
import Layout from "./Components/layout";
import ProtectRoute from "./Components/Auth_protecter/protectRoute";
import Redirect from "./Components/Auth_protecter/redirect";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* homeRoute */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/sa" element={<ProtectRoute />} /> */}

          {/* Authroutes */}
          <Route
            path="/register"
            element={
              <Redirect>
                <Register />
              </Redirect>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Redirect>
                <Login />
              </Redirect>
            }
          ></Route>
          {/* grouproutes */}
          <Route
            path="/group/:groupId"
            element={
              <Layout>
                <GroupDetails />
              </Layout>
            }
          />
          <Route
            path="/creategroup"
            element={
              <ProtectRoute>
                <Layout>
                  <CreateGroupComponent />
                </Layout>
              </ProtectRoute>
            }
          ></Route>
          <Route
            path="/group/:groupId/add-expense"
            element={
              <ProtectRoute>
                <Expence />
              </ProtectRoute>
            }
          />
          <Route
            path="/group/:groupId/all-expenses"
            element={
              <ProtectRoute>
                <AllExpence />
              </ProtectRoute>
            }
          />
          <Route
            path="/group/invite"
            element={
              <ProtectRoute>
                <InviteFriends />
              </ProtectRoute>
            }
          />
          <Route path="/group/invitation" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../../screens";
import { Typography } from "antd";
import { appInfo } from "../../constants/appInfos";

const { Title } = Typography;

const AuthRouter = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col d-none d-lg-block text-center my-auto">
          <div className="mb-4">
            <img
              style={{
                width: 256,
                objectFit: "cover",
              }}
              src={appInfo.logo}
              alt=""
            />
          </div>
          <div>
            <Title className="text-primary">
              {appInfo.name.split(" ")[0].toUpperCase()}
            </Title>
          </div>
        </div>

        <div className="col content-center my-auto">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;

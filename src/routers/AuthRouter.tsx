import { Typography } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appInfo } from "../constants/appInfos";
import { Login, SignUp } from "../screens";

const { Title } = Typography;

const AuthRouter = () => {
  // get pathname
  const pathname = window.location.pathname;
  if (pathname === "/") window.location.pathname = "login";

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
          <div className="mx-auto w-75">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;

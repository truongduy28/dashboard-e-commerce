import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appInfo } from "../constants/appInfos";
import {
  addAuth,
  authSelector,
  AuthState,
} from "../redux/reducers/authReducer";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Routers = () => {
  const dispatch = useDispatch();

  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const authInfo = localStorage.getItem(appInfo.localKey);
    authInfo && dispatch(addAuth(JSON.parse(authInfo)));
  };

  return !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;

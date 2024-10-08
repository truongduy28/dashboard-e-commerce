import { useDispatch, useSelector } from "react-redux";
import AuthRouter from "./AuthRouter";
import {
  addAuth,
  authSelector,
  AuthState,
} from "../../redux/reducers/authReducer";
import MainRouter from "./MainRouter";
import { useEffect } from "react";
import { appInfo } from "../../constants/appInfos";

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

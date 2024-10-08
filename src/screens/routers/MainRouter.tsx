import { useEffect } from "react";
import { useDispatch } from "react-redux";
import handleAPI from "../../apis/handleApi";
import { removeAuth } from "../../redux/reducers/authReducer";

const MainRouter = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuth({}));
  };

  const tryMiddleware = async () => {
    const res = await handleAPI("test/try-middleware");
    console.log(res);
  };

  useEffect(() => {
    tryMiddleware();
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default MainRouter;

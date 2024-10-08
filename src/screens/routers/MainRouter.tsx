import { useDispatch } from "react-redux";
import { removeAuth } from "../../redux/reducers/authReducer";

const MainRouter = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeAuth({}));
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default MainRouter;

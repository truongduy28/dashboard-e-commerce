import { Avatar, Button, Dropdown, Input, MenuProps, Space } from "antd";
import { signOut } from "firebase/auth";
import { Notification, SearchNormal1 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { colors } from "../constants/appInfos";
import { auth } from "../firebase/config";
import { authSelector, removeAuth } from "../redux/reducers/authReducer";

const CustomHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Sign out",
      onClick: () => {
        signOut(auth);
        localStorage.clear();
        dispatch(removeAuth(undefined));
        navigate("/login");
      },
    },
  ];
  return (
    <div className="row w-100 px-4 m-0 bg-white py-1">
      <div className="col-8 my-auto">
        <Input
          className="w-50"
          placeholder="Search"
          style={{ borderRadius: "10px" }}
          prefix={<SearchNormal1 className="text-muted mr-2" size={16} />}
        />
      </div>
      <div className="col-4 d-flex justify-content-end">
        <Space>
          <Button
            type="text"
            icon={<Notification size={22} color={colors.gray600} />}
          />
          <Dropdown menu={{ items }}>
            <Avatar src={user.photoUrl} size={40} />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default CustomHeader;

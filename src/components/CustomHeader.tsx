import { Avatar, Button, Dropdown, Input, MenuProps, Space } from "antd";
import { Notification, SearchNormal1 } from "iconsax-react";
import { colors } from "../constants/appInfos";

const CustomHeader = () => {
  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Đăng xuất",
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
            <Avatar
              src={
                "https://s3.cloud.cmctelecom.vn/2game-vn/pictures/images/2016/4/28/2game_28_4_NgocRongDaiChien_1.png"
              }
              size={40}
            />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default CustomHeader;

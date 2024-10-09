import { Layout, Menu, MenuProps, Typography } from "antd";
import { Box, Chart, Home2, ProfileCircle } from "iconsax-react";
import { CiViewList } from "react-icons/ci";
import { FaTags } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
import { appInfo, colors } from "../constants/appInfos";

const { Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

const CustomSider = () => {
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: <Link to={"/"}>Dashboard</Link>,
      icon: <Home2 size={20} />,
    },
    {
      key: "inventory",
      label: "Inventory",
      icon: <MdOutlineInventory size={20} />,
      children: [
        {
          key: "inventory",
          label: <Link to={"/inventory"}>All</Link>,
        },
        {
          key: "addNew",
          label: <Link to={`/inventory/add-product`}>Add new</Link>,
        },
      ],
    },
    {
      key: "Categories",
      label: <Link to={"/categories"}>Categories</Link>,
      icon: <FaTags size={20} className="text-muted" />,
    },
    {
      key: "Report",
      label: <Link to={"/report"}>Report</Link>,
      icon: <Chart size={20} />,
    },
    {
      key: "Suppliers",
      label: <Link to={"/suppliers"}>Suppliers</Link>,
      icon: <ProfileCircle size={20} />,
    },
    {
      key: "Orders",
      label: <Link to={"/orders"}>Orders</Link>,
      icon: <Box size={20} />,
    },
    {
      key: "Manage Store",
      label: <Link to={"/manage-store"}>Manage Store</Link>,
      icon: <CiViewList size={20} />,
    },
  ];

  return (
    <Sider width={280} theme="light" style={{ height: "100vh" }}>
      <div className="p-2 d-flex">
        <img src={appInfo.logo} width={48} alt="app-logo" />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: colors.primary500,
            margin: 0,
          }}
        >
          {appInfo.name.split(" ")[0].toUpperCase()}
        </Text>
      </div>
      <Menu mode="inline" items={items} theme="light" />
    </Sider>
  );
};

export default CustomSider;

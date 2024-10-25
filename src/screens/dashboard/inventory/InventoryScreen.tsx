import { Avatar, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import { antdColors } from "../../../constants/appInfos";
import { useGetProducts } from "../../../hooks/tanstackquery/useProduct";
import { IProduct } from "../../../interfaces/product";

const { Text } = Typography;

const InventoryScreen = () => {
  // API: Get all products
  const { data } = useGetProducts({ page: 1, size: 999999 });
  const productsData = useMemo(() => {
    if (data?.data) {
      return data.data.items;
    }
    return [];
  }, [data]);

  const columns: ColumnProps<IProduct>[] = [
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
      width: 300,
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 400,
      render: (item) => (
        <Tooltip title={item}>
          <Text>{item.length > 50 ? item.slice(0, 50) + "..." : item}</Text>
        </Tooltip>
      ),
    },
    {
      key: "categories",
      dataIndex: "categories",
      title: "Categories",
      width: 300,
      render: (item) =>
        item.map((i: { title: string; _id: string }) => (
          <Tag
            color={antdColors[Math.floor(Math.random() * antdColors.length)]}
          >
            {i.title}
          </Tag>
        )),
    },
    {
      key: "images",
      dataIndex: "images",
      title: "Images",
      width: 300,
      render: (item) => (
        <Avatar.Group>
          {item.map((i: any) => (
            <Avatar key={i} src={i} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "",
      fixed: "right",
      width: 150,
      align: "right",
    },
  ];

  return (
    <Table
      dataSource={productsData}
      columns={columns}
      scroll={{ x: 1200, y: 520 }}
    />
  );
};

export default InventoryScreen;

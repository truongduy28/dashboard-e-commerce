import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  message,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import confirm from "antd/es/modal/confirm";
import { ColumnsType } from "antd/es/table/interface";
import { BoxAdd, Edit2, Trash } from "iconsax-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import SubProductForms from "../../../components/modals/SubProductForms";
import { appColors } from "../../../constants/antd";
import { antdColors } from "../../../constants/appInfos";
import {
  useDeleteProduct,
  useGetProducts,
} from "../../../hooks/tanstackquery/useProduct";
import { useDialog } from "../../../hooks/useDialogV2";
import { IProduct } from "../../../interfaces/product";

const { Text } = Typography;

const InventoryScreen = () => {
  // API: Get all products
  const { data } = useGetProducts({ page: 1, size: 999999 });
  const productsData = useMemo(
    () => (data?.data ? data.data.items : []),
    [data]
  );

  const columns: ColumnsType<IProduct> = [
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
            key={i._id}
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
          {item.map((i: string) => (
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
      width: 120,
      align: "center",
      render: (value) => (
        <ActionsPartial
          item={value}
          setShow={toggleSubProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ),
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const { isShow: isSubProductShow, toggle: toggleSubProduct } = useDialog();

  return (
    <>
      <Table
        dataSource={productsData}
        columns={columns}
        scroll={{ x: 1200, y: 520 }}
      />
      <SubProductForms
        visible={isSubProductShow}
        onClose={() => {
          toggleSubProduct();
          setSelectedProduct(undefined);
        }}
        product={selectedProduct}
      />
    </>
  );
};

export default InventoryScreen;

const ActionsPartial = ({
  item,
  setShow,
  setSelectedProduct,
}: {
  item: IProduct;
  setShow: () => void;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<IProduct | undefined>
  >;
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteProduct(item._id);
  const navigate = useNavigate();

  const openSubProductForms = () => {
    setShow();
    setSelectedProduct(item);
  };

  const deleteProduct = () => {
    confirm({
      type: "warning",
      title: "Confirmation",
      content: "Are you sure you want to delete this product?",
      onOk: () => {
        mutate(undefined, {
          onSuccess(data) {
            message.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["get-products"] });
          },
        });
      },
    });
  };

  return (
    <Space size={"small"}>
      <Tooltip title="Add sub product">
        <Button type="text" className="p-0" onClick={openSubProductForms}>
          <BoxAdd color={appColors.purple.purple4} />
        </Button>
      </Tooltip>
      <Tooltip title="Edit product">
        <Button
          type="text"
          className="p-0"
          onClick={() => navigate(`/inventory/add-product?id=${item._id}`)}
        >
          <Edit2 color={appColors.blue.blue4} />
        </Button>
      </Tooltip>
      <Tooltip title="Remove product">
        <Button type="text" className="p-0" onClick={deleteProduct}>
          <Trash color={appColors.red.red4} />
        </Button>
      </Tooltip>
    </Space>
  );
};

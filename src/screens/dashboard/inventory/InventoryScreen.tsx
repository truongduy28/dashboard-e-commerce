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
import usePagination from "../../../hooks/usePagination";
import useWindow from "../../../hooks/useWindow";
import { IProduct, ISubProduct } from "../../../interfaces/product";
import { rangeValue } from "../../../utils/formater";

const { Text } = Typography;

const InventoryScreen = () => {
  const { page, pageSize, setPage, setPageSize } = usePagination();

  // API: Get all products
  const { data, isLoading } = useGetProducts({ page, size: pageSize });
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
      render: (item: string) => (
        <Tooltip title={item}>
          <Text>
            {item ? (item.length > 50 ? item.slice(0, 50) + "..." : item) : "-"}
          </Text>
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
      width: 200,
      render: (item) => (
        <Avatar.Group>
          {item.map((i: string) => (
            <Avatar key={i} src={i} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      key: "colors",
      dataIndex: "subProducts",
      title: "Colors",
      width: 150,
      render: (v: ISubProduct[]) => {
        const colors = v.map((i) => i.color);
        return <ColorsPartial items={colors} />;
      },
    },
    {
      key: "sizes",
      dataIndex: "subProducts",
      title: "Sizes",
      width: 150,
      render: (v: ISubProduct[]) => {
        const sizes = v.map((i) => i.size);
        return <SizesPartial items={sizes} />;
      },
    },
    {
      key: "prices",
      dataIndex: "subProducts",
      title: "Prices",
      width: 150,
      render: (v: ISubProduct[]) => {
        const prices = v.map((i) => i.price);
        return <PricesPartial items={prices} />;
      },
      align: "center",
    },
    {
      key: "stocks",
      dataIndex: "subProducts",
      title: "Stocks",
      width: 150,
      render: (v: ISubProduct[]) => {
        const value = v.reduce((a, b) => a + b.qty, 0);
        return value > 0 ? value : "-";
      },
      align: "center",
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
  const { innerHeight } = useWindow();
  return (
    <>
      <Table
        pagination={{
          total: data?.data.total || 0,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        loading={isLoading}
        dataSource={productsData}
        columns={columns}
        scroll={{ x: 1200, y: innerHeight - 190 }}
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

const ColorsPartial = ({ items }: { items: string[] }) => {
  return (
    <Avatar.Group>
      {items.map((i) => (
        <Avatar key={i} style={{ backgroundColor: i }} />
      ))}
    </Avatar.Group>
  );
};

const SizesPartial = ({ items }: { items: string[] }) => {
  return (
    <Space size={"small"} wrap>
      {items.map((i) => (
        <Tag key={i}>{i}</Tag>
      ))}
    </Space>
  );
};

const PricesPartial = ({ items }: { items: number[] | string[] }) => {
  const values: string[] = items.map((i) => i.toString());
  return <Text>{rangeValue(values)}</Text>;
};

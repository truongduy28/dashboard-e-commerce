import { Avatar, Button, Modal, Space, Table, Tag, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit2, Trash } from "iconsax-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubProductForms from "../../../components/modals/SubProductForms";
import { colors } from "../../../constants/appInfos";
import { useGetProductDetail } from "../../../hooks/tanstackquery/useProduct";
import { useDialog } from "../../../hooks/useDialogV2";
import { IProduct, ISubProduct } from "../../../interfaces/product";
import { FormatCurrency } from "../../../utils/formater";

const { Title } = Typography;

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetProductDetail(id);
  const { product, subProducts } = useMemo(() => {
    return {
      product: data?.data.product || ({} as IProduct),
      subProducts: data?.data.subProducts || [],
    };
  }, [data]);

  const columns: ColumnProps<ISubProduct>[] = [
    {
      key: "images",
      dataIndex: "images",
      title: "Images",
      render: (imgs: string[]) => (
        <Space>
          {imgs.length > 0 && imgs.map((img) => <Avatar src={img} size={40} />)}
        </Space>
      ),
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      render: (size: string) => <Tag>{size}</Tag>,
      align: "center",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
      render: (color: string) => <Tag color={color}>{color}</Tag>,
      align: "center",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (price: number) => currencyFormat(price),
      align: "right",
    },
    {
      key: "discount",
      title: "Discount",
      dataIndex: "discount",
      render: (discount: number) =>
        discount ? currencyFormat(discount) : null,
      align: "right",
    },
    {
      key: "stock",
      title: "stock",
      dataIndex: "qty",
      render: (qty: number) => qty.toLocaleString(),
      align: "right",
    },
    {
      key: "actions",
      dataIndex: "",
      render: (item: ISubProduct) => (
        <Space>
          <Button
            type="text"
            onClick={() => {
              setSelectedSubProduct(item._id);
              toggle();
            }}
            icon={<Edit2 variant="Bold" color={colors.primary500} size={18} />}
          />
          <Button
            onClick={() =>
              Modal.confirm({
                title: "Confirm",
                content:
                  "Are you sure you want to remove this sub product item?",
                //   onOk: async () => await handleRemoveSubProduct(item._id),
              })
            }
            type="text"
            danger
            icon={<Trash variant="Bold" size={18} />}
          />
        </Space>
      ),
      align: "right",
      fixed: "right",
    },
  ];

  const currencyFormat = (n: number) => FormatCurrency.VND.format(n);

  const { isShow, toggle } = useDialog();
  const [selectedSubProduct, setSelectedSubProduct] = useState<
    string | undefined
  >(undefined);

  const closeSubProductForm = () => {
    setSelectedSubProduct(undefined);
    toggle();
  };

  const openSubProductForm = closeSubProductForm;

  if (isLoading) return <div>Loading...</div>; // TODO: Add skeleton when isLoading

  return (
    <div className="mx-4">
      <div className="row mt-3">
        <div className="col">
          <Title level={3}>{product.title}</Title>
        </div>
        <div className="col text-right">
          <Button onClick={openSubProductForm} type="primary">
            Add sub product
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Table dataSource={subProducts} columns={columns} />
      </div>
      <SubProductForms
        product={product}
        visible={isShow}
        onClose={closeSubProductForm}
        subProductId={selectedSubProduct}
      />
    </div>
  );
};

export default ProductDetailPage;

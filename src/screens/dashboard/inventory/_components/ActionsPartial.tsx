import { useQueryClient } from "@tanstack/react-query";
import { Button, message, Space, Tooltip } from "antd";
import confirm from "antd/es/modal/confirm";
import { BoxAdd, Edit2, Trash } from "iconsax-react";
import { useNavigate } from "react-router";
import { appColors } from "../../../../constants/antd";
import { useDeleteProduct } from "../../../../hooks/tanstackquery/useProduct";
import { IProduct } from "../../../../interfaces/product";

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
export default ActionsPartial;
